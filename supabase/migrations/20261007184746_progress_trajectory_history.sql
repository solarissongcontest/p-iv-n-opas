alter table public.study_sessions
  add column if not exists plan_item_id uuid references public.plan_items(id) on delete set null;

create index if not exists study_sessions_plan_item_id_idx
  on public.study_sessions(plan_item_id)
  where plan_item_id is not null;

update public.study_sessions s
set plan_item_id = pi.id
from public.plan_items pi
where pi.session_id = s.id
  and s.plan_item_id is null;

alter table public.plan_items
  add column if not exists completed_at timestamptz;

update public.plan_items pi
set completed_at = coalesce(
  (
    select min(s.created_at)
    from public.study_sessions s
    where s.plan_item_id = pi.id
       or (pi.session_id is not null and s.id = pi.session_id)
  ),
  pi.updated_at
)
where pi.status = 'completed'
  and pi.completed_at is null;

create or replace function public.set_plan_item_completed_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  if new.status = 'completed' then
    if tg_op = 'INSERT' or old.status is distinct from 'completed' then
      new.completed_at := coalesce(new.completed_at, now());
    elsif new.completed_at is null then
      new.completed_at := old.completed_at;
    end if;
  else
    new.completed_at := null;
  end if;
  return new;
end;
$$;

revoke all on function public.set_plan_item_completed_at() from public, anon, authenticated;

drop trigger if exists plan_items_set_completed_at on public.plan_items;
create trigger plan_items_set_completed_at
before insert or update of status, completed_at on public.plan_items
for each row execute function public.set_plan_item_completed_at();

create table if not exists public.plan_item_events (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  plan_item_id uuid,
  course_id uuid not null,
  event_type text not null check (event_type in ('created','moved','resized','completed','reopened','skipped','status_changed','edited','deleted')),
  changes text[] not null default '{}',
  event_date date not null,
  occurred_at timestamptz not null default now(),
  old_snapshot jsonb,
  new_snapshot jsonb
);

create index if not exists plan_item_events_owner_course_date_idx
  on public.plan_item_events(owner_id, course_id, event_date, occurred_at);
create index if not exists plan_item_events_plan_item_idx
  on public.plan_item_events(plan_item_id, occurred_at);

alter table public.plan_item_events enable row level security;
revoke all on table public.plan_item_events from anon, authenticated;
grant select on table public.plan_item_events to authenticated;

drop policy if exists "personal plan history" on public.plan_item_events;
create policy "personal plan history"
on public.plan_item_events
for select
to authenticated
using (owner_id = (select auth.uid()));

create or replace function public.plan_item_event_snapshot(p public.plan_items)
returns jsonb
language sql
stable
set search_path = public, pg_temp
as $$
  select jsonb_build_object(
    'id', p.id,
    'course_id', p.course_id,
    'topic_id', p.topic_id,
    'date', p.date,
    'start_time', p.start_time,
    'phase', p.phase,
    'kind', p.kind,
    'title', p.title,
    'min_minutes', p.min_minutes,
    'target_minutes', p.target_minutes,
    'extra_minutes', p.extra_minutes,
    'status', p.status,
    'moved_from', p.moved_from,
    'session_id', p.session_id,
    'completed_at', p.completed_at
  );
$$;

revoke all on function public.plan_item_event_snapshot(public.plan_items) from public, anon, authenticated;

create or replace function public.capture_plan_item_event()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_owner uuid;
  v_course uuid;
  v_type text;
  v_changes text[] := '{}';
  v_old jsonb;
  v_new jsonb;
  v_occurred timestamptz := now();
begin
  if tg_op = 'DELETE' then
    v_owner := coalesce(old.owner_id, (select c.owner_id from public.courses c where c.id = old.course_id));
    v_course := old.course_id;
    v_type := 'deleted';
    v_changes := array['deleted'];
    v_old := public.plan_item_event_snapshot(old);
    v_new := null;
  elsif tg_op = 'INSERT' then
    v_owner := coalesce(new.owner_id, (select c.owner_id from public.courses c where c.id = new.course_id));
    v_course := new.course_id;
    v_type := 'created';
    v_changes := array['created'];
    v_old := null;
    v_new := public.plan_item_event_snapshot(new);
  else
    v_owner := coalesce(new.owner_id, old.owner_id, (select c.owner_id from public.courses c where c.id = new.course_id));
    v_course := new.course_id;
    v_old := public.plan_item_event_snapshot(old);
    v_new := public.plan_item_event_snapshot(new);

    if old.date is distinct from new.date then v_changes := array_append(v_changes, 'moved'); end if;
    if old.target_minutes is distinct from new.target_minutes
       or old.min_minutes is distinct from new.min_minutes
       or old.extra_minutes is distinct from new.extra_minutes then
      v_changes := array_append(v_changes, 'resized');
    end if;
    if old.status is distinct from new.status then
      if new.status = 'completed' then
        v_changes := array_append(v_changes, 'completed');
      elsif old.status = 'completed' then
        v_changes := array_append(v_changes, 'reopened');
      elsif new.status = 'skipped' then
        v_changes := array_append(v_changes, 'skipped');
      else
        v_changes := array_append(v_changes, 'status_changed');
      end if;
    end if;
    if old.title is distinct from new.title
       or old.kind is distinct from new.kind
       or old.phase is distinct from new.phase
       or old.topic_id is distinct from new.topic_id
       or old.start_time is distinct from new.start_time then
      v_changes := array_append(v_changes, 'edited');
    end if;

    if coalesce(array_length(v_changes, 1), 0) = 0 then return new; end if;

    if 'moved' = any(v_changes) then v_type := 'moved';
    elsif 'resized' = any(v_changes) then v_type := 'resized';
    elsif 'completed' = any(v_changes) then v_type := 'completed';
    elsif 'reopened' = any(v_changes) then v_type := 'reopened';
    elsif 'skipped' = any(v_changes) then v_type := 'skipped';
    elsif 'status_changed' = any(v_changes) then v_type := 'status_changed';
    else v_type := 'edited'; end if;
  end if;

  if v_owner is null then return coalesce(new, old); end if;

  insert into public.plan_item_events(
    owner_id, plan_item_id, course_id, event_type, changes, event_date, occurred_at, old_snapshot, new_snapshot
  ) values (
    v_owner, coalesce(new.id, old.id), v_course, v_type, v_changes,
    (v_occurred at time zone 'Europe/Helsinki')::date, v_occurred, v_old, v_new
  );

  return coalesce(new, old);
end;
$$;

revoke all on function public.capture_plan_item_event() from public, anon, authenticated;

drop trigger if exists plan_items_capture_history on public.plan_items;
create trigger plan_items_capture_history
after insert or update or delete on public.plan_items
for each row execute function public.capture_plan_item_event();

insert into public.plan_item_events(owner_id,plan_item_id,course_id,event_type,changes,event_date,occurred_at,old_snapshot,new_snapshot)
select coalesce(pi.owner_id,c.owner_id), pi.id, pi.course_id, 'created', array['created'],
       (pi.created_at at time zone 'Europe/Helsinki')::date, pi.created_at, null,
       jsonb_build_object(
         'id',pi.id,'course_id',pi.course_id,'topic_id',pi.topic_id,
         'date',coalesce(pi.moved_from,pi.date),'start_time',pi.start_time,'phase',pi.phase,'kind',pi.kind,'title',pi.title,
         'min_minutes',pi.min_minutes,'target_minutes',pi.target_minutes,'extra_minutes',pi.extra_minutes,
         'status','planned','moved_from',null,'session_id',null,'completed_at',null
       )
from public.plan_items pi join public.courses c on c.id=pi.course_id
where coalesce(pi.owner_id,c.owner_id) is not null
  and not exists(select 1 from public.plan_item_events e where e.plan_item_id=pi.id and e.event_type='created');

insert into public.plan_item_events(owner_id,plan_item_id,course_id,event_type,changes,event_date,occurred_at,old_snapshot,new_snapshot)
select coalesce(pi.owner_id,c.owner_id), pi.id, pi.course_id, 'moved', array['moved'],
       (pi.updated_at at time zone 'Europe/Helsinki')::date, pi.updated_at,
       jsonb_build_object('date',pi.moved_from,'target_minutes',pi.target_minutes,'status','planned'),
       public.plan_item_event_snapshot(pi)
from public.plan_items pi join public.courses c on c.id=pi.course_id
where pi.moved_from is not null and coalesce(pi.owner_id,c.owner_id) is not null
  and not exists(select 1 from public.plan_item_events e where e.plan_item_id=pi.id and e.event_type='moved');

insert into public.plan_item_events(owner_id,plan_item_id,course_id,event_type,changes,event_date,occurred_at,old_snapshot,new_snapshot)
select coalesce(pi.owner_id,c.owner_id), pi.id, pi.course_id,
       case when pi.status='completed' then 'completed' else 'skipped' end,
       array[case when pi.status='completed' then 'completed' else 'skipped' end],
       (coalesce(pi.completed_at,pi.updated_at) at time zone 'Europe/Helsinki')::date,
       coalesce(pi.completed_at,pi.updated_at),
       jsonb_build_object('date',pi.date,'target_minutes',pi.target_minutes,'status','planned'),
       public.plan_item_event_snapshot(pi)
from public.plan_items pi join public.courses c on c.id=pi.course_id
where pi.status in ('completed','skipped') and coalesce(pi.owner_id,c.owner_id) is not null
  and not exists(select 1 from public.plan_item_events e where e.plan_item_id=pi.id and e.event_type=case when pi.status='completed' then 'completed' else 'skipped' end);