-- Prevent a stale phone/desktop planner edit from silently overwriting
-- a newer edit made on another device. Client mutations can compare the
-- row's updated_at value they originally read with the current server value.

create or replace function public.opk_touch_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists plan_items_opk_touch_updated_at on public.plan_items;
create trigger plan_items_opk_touch_updated_at
before update on public.plan_items
for each row
execute function public.opk_touch_updated_at();
