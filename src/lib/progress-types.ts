export type PlanItemSnapshot = {
  id?: string | null;
  course_id?: string | null;
  topic_id?: string | null;
  date?: string | null;
  start_time?: string | null;
  phase?: string | null;
  kind?: string | null;
  title?: string | null;
  min_minutes?: number | null;
  target_minutes?: number | null;
  extra_minutes?: number | null;
  status?: string | null;
  moved_from?: string | null;
  session_id?: string | null;
  completed_at?: string | null;
};

export type PlanItemEventType =
  | "created"
  | "moved"
  | "resized"
  | "completed"
  | "reopened"
  | "skipped"
  | "status_changed"
  | "edited"
  | "deleted";

export type PlanItemEvent = {
  id: string;
  owner_id: string;
  plan_item_id: string | null;
  course_id: string;
  event_type: PlanItemEventType;
  changes: string[];
  event_date: string;
  occurred_at: string;
  old_snapshot: PlanItemSnapshot | null;
  new_snapshot: PlanItemSnapshot | null;
};

export type TrajectoryMode = "progress" | "workload" | "mastery";
