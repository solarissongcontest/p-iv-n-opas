import type { ReactNode } from "react";
import type { Course, Topic } from "@/lib/domain";
import { GroupedSurface } from "@/components/surfaces";

export const button = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50";
export const secondary = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm hover:bg-muted";

export function Panel({ title, children, action, className = "" }: { title: string; children: ReactNode; action?: ReactNode; className?: string }) {
  return <GroupedSurface className={`panel p-4 sm:p-6 ${className}`}><div className="mb-3 flex items-center justify-between gap-3 sm:mb-4"><h2 className="text-base font-semibold sm:text-lg">{title}</h2>{action}</div>{children}</GroupedSurface>;
}

export function Bar({ value }: { value: number }) {
  const v=Math.max(0,Math.min(100,value));
  return <div className="h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}><div className="h-full rounded-full bg-primary" style={{width:`${v}%`}}/></div>;
}

export type Base = {courses:Course[];topics:Topic[]};
