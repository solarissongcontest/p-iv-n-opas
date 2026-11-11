-- LOS! editorial material is shipped as versioned source data. Only personal
-- progress, responses, notes and review dates belong in this RLS table.
-- Apply using Production Database Migrations: preview, then explicit apply.
create table if not exists public.los_user_items (
 owner_id uuid not null default auth.uid(),
 item_key text not null check (char_length(item_key) between 1 and 160),
 value jsonb not null default '{}'::jsonb,
 updated_at timestamptz not null default now(),
 primary key (owner_id,item_key)
);
create index if not exists los_user_items_updated_idx on public.los_user_items(owner_id,updated_at desc);
alter table public.los_user_items enable row level security;
drop policy if exists "los read own" on public.los_user_items;
create policy "los read own" on public.los_user_items for select to authenticated using(owner_id=(select auth.uid()));
drop policy if exists "los insert own" on public.los_user_items;
create policy "los insert own" on public.los_user_items for insert to authenticated with check(owner_id=(select auth.uid()));
drop policy if exists "los update own" on public.los_user_items;
create policy "los update own" on public.los_user_items for update to authenticated using(owner_id=(select auth.uid())) with check(owner_id=(select auth.uid()));
drop policy if exists "los delete own" on public.los_user_items;
create policy "los delete own" on public.los_user_items for delete to authenticated using(owner_id=(select auth.uid()));
revoke all on public.los_user_items from anon,public;
grant select,insert,update,delete on public.los_user_items to authenticated,service_role;
create or replace function public.touch_los_user_items() returns trigger
language plpgsql security invoker set search_path='' as $$
begin new.updated_at=now();return new;end;
$$;
revoke all on function public.touch_los_user_items() from anon,public,authenticated;
drop trigger if exists los_user_items_touch on public.los_user_items;
create trigger los_user_items_touch before update on public.los_user_items
for each row execute function public.touch_los_user_items();
