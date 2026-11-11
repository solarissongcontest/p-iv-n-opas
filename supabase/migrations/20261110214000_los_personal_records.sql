-- LOS! v1 personal data storage. Never stores book source content.
-- Apply only through the existing reviewed migration/deployment process.
create table if not exists public.los_user_records (
  owner_id uuid not null default auth.uid(),
  record_key text not null,
  book_id text not null,
  kind text not null,
  content_version text not null,
  payload jsonb not null,
  client_updated_at timestamptz not null,
  server_updated_at timestamptz not null default now(),
  constraint los_user_records_pk primary key (owner_id, record_key),
  constraint los_user_records_book_check check (book_id ~ '^los-[1-8]$'),
  constraint los_user_records_kind_check check (
    kind in ('lesson', 'exercise', 'marks', 'notes', 'bookmark', 'preferences', 'review', 'skill')
  ),
  constraint los_user_records_key_check check (char_length(record_key) between 1 and 200),
  constraint los_user_records_version_check check (char_length(content_version) between 1 and 60),
  constraint los_user_records_payload_check check (
    jsonb_typeof(payload) = 'object' and
    octet_length(payload::text) < 262144
  )
);
create index if not exists los_user_records_owner_book_idx
  on public.los_user_records (owner_id, book_id, kind);

alter table public.los_user_records enable row level security;
revoke all on table public.los_user_records from anon;
grant select, insert, update, delete on table public.los_user_records to authenticated;

drop policy if exists los_owner_only on public.los_user_records;
create policy los_owner_only on public.los_user_records
  for all to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

-- Atomic, idempotent upsert. An old offline draft must not replace a newer
-- record on another device. Older attempts remain preserved locally for review.
create or replace function public.los_save_record(
  p_record_key text,
  p_book_id text,
  p_kind text,
  p_content_version text,
  p_payload jsonb,
  p_client_updated_at timestamptz
) returns boolean
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
declare
  v_owner uuid := (select auth.uid());
  v_inserted boolean := false;
begin
  if v_owner is null then
    raise exception 'Login required' using errcode = '28000';
  end if;

  insert into public.los_user_records as current_row (
    owner_id, record_key, book_id, kind, content_version,
    payload, client_updated_at, server_updated_at
  ) values (
    v_owner, p_record_key, p_book_id, p_kind, p_content_version,
    p_payload, p_client_updated_at, now()
  )
  on conflict (owner_id, record_key) do update
    set payload = excluded.payload,
        content_version = excluded.content_version,
        kind = excluded.kind,
        book_id = excluded.book_id,
        client_updated_at = excluded.client_updated_at,
        server_updated_at = now()
    where current_row.client_updated_at <= excluded.client_updated_at
  returning true into v_inserted;

  return coalesce(v_inserted, false);
end;
$$;

revoke all on function public.los_save_record(text,text,text,text,jsonb,timestamptz) from public, anon;
grant execute on function public.los_save_record(text,text,text,text,jsonb,timestamptz) to authenticated;
