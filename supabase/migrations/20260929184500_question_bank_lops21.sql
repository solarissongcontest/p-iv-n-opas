-- Question Bank / Assessment Engine.
-- LOPS21 is an enforced data boundary, not a presentation label.
create table if not exists public.question_bank (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  topic_id uuid references public.topics(id) on delete cascade,
  curriculum text not null default 'LOPS21',
  module_code text not null,
  question_type text not null,
  prompt text not null,
  options jsonb not null default '[]'::jsonb,
  correct_answer text,
  explanation text not null default '',
  hints jsonb not null default '[]'::jsonb,
  skills text[] not null default '{}'::text[],
  expected_concepts text[] not null default '{}'::text[],
  difficulty integer not null default 2,
  estimated_seconds integer,
  status text not null default 'active',
  source_type text not null default 'manual',
  source_ref text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (curriculum = 'LOPS21'),
  check (difficulty between 1 and 5),
  check (estimated_seconds is null or estimated_seconds between 10 and 7200),
  check (question_type in (
    'free_recall','short_answer','calculation','application','multiple_choice',
    'explanation','ordering','error_detection','simulation','recognition'
  )),
  check (status in ('draft','validated','active','retired')),
  check (source_type in ('manual','ai','material','seed')),
  check (jsonb_typeof(options) = 'array'),
  check (jsonb_typeof(hints) = 'array')
);

create index if not exists question_bank_owner_course_idx
  on public.question_bank(owner_id, course_id, status);
create index if not exists question_bank_owner_topic_idx
  on public.question_bank(owner_id, topic_id, difficulty);

alter table public.question_bank enable row level security;
drop policy if exists owner_all_question_bank on public.question_bank;
create policy owner_all_question_bank
  on public.question_bank
  for all
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create or replace function public.question_bank_touch_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists question_bank_touch_updated_at on public.question_bank;
create trigger question_bank_touch_updated_at
before update on public.question_bank
for each row execute function public.question_bank_touch_updated_at();
