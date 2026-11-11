-- LOS! chapter drafts: private server-mediated synchronization.
-- Not exposed to either browser role. A password-protected server route is
-- required because the existing username-only device token is NOT a secure
-- proof of identity for sensitive LOS! cloud records.
create table if not exists public.los_chapter_drafts (
  owner_id uuid not null,
  book_id smallint not null check (book_id between 1 and 8),
  chapter_id text not null check (chapter_id ~ '^[0-9]{2}$'),
  revision bigint not null default 1 check (revision > 0),
  payload jsonb not null check (
    jsonb_typeof(payload) = 'object'
    and octet_length(payload::text) <= 65536
  ),
  updated_at timestamptz not null default now(),
  primary key (owner_id, book_id, chapter_id)
);

alter table public.los_chapter_drafts enable row level security;
revoke all privileges on public.los_chapter_drafts from public, anon, authenticated;
grant select, insert, update on public.los_chapter_drafts to service_role;

-- The owner id is a server-verified JWT subject, never client-supplied.
-- No browser-accessible SELECT/INSERT/UPDATE/DELETE policies are defined.
-- service_role bypasses RLS; the server route checks LOS_SYNC_PASSPHRASE and
-- the JWT signature BEFORE making any query, and explicitly scopes all rows.
comment on table public.los_chapter_drafts is
  'Private LOS! study drafts. No anon/authenticated grants. Read/write only via passphrase-protected server endpoint.';

-- Composite primary key efficiently supports an owner's book+chapter lookup.
