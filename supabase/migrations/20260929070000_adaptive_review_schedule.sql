-- Make review spacing respond to retrieval evidence instead of a rigid level-only table.
-- The existing log_study_session RPC remains the source of mastery evidence; this
-- BEFORE UPDATE trigger adjusts only the next review date it writes.

create or replace function public.adapt_topic_review_schedule()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_gap integer;
  v_elapsed integer := 0;
begin
  if new.last_review is null
     or new.last_review is not distinct from old.last_review then
    return new;
  end if;

  v_gap := case greatest(0, least(5, new.verified_level))
    when 0 then 1
    when 1 then 2
    when 2 then 4
    when 3 then 7
    when 4 then 14
    else 28
  end;

  -- A low current confidence signal keeps the next retrieval close.
  -- self_level=0 means "not rated" and therefore does not shorten the interval.
  if new.self_level = 1 then
    v_gap := least(v_gap, 2);
  elsif new.self_level = 2 then
    v_gap := least(v_gap, 4);
  end if;

  if old.last_review is not null then
    v_elapsed := greatest(1, new.last_review - old.last_review);
  end if;

  -- Successful delayed retrieval is strong retention evidence. Lengthen the
  -- interval relative to both the base interval and the interval just survived.
  if new.delayed_successes > old.delayed_successes
     and new.verified_level >= 3 then
    v_gap := greatest(
      v_gap,
      round(greatest(v_gap, v_elapsed) * 1.6)::integer
    );
  elsif new.exam_successes > old.exam_successes
        and new.verified_level >= 3 then
    v_gap := greatest(v_gap, round(v_gap * 1.25)::integer);
  end if;

  v_gap := greatest(1, least(60, v_gap));
  new.next_review := new.last_review + v_gap;
  return new;
end;
$$;

drop trigger if exists topics_adaptive_review_schedule on public.topics;

create trigger topics_adaptive_review_schedule
before update of last_review, verified_level, self_level, delayed_successes, exam_successes
on public.topics
for each row
execute function public.adapt_topic_review_schedule();

revoke all on function public.adapt_topic_review_schedule() from public, anon;
grant execute on function public.adapt_topic_review_schedule() to authenticated, service_role;
