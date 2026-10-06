import type { HTMLAttributes, ReactNode } from "react";

type SurfaceProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

type CardProps = SurfaceProps & {
  title?: string;
  eyebrow?: string;
  action?: ReactNode;
};

function classes(base: string, extra?: string) {
  return extra ? base + " " + extra : base;
}

function CardHeading({ title, eyebrow, action }: Pick<CardProps, "title" | "eyebrow" | "action">) {
  if (!title && !eyebrow && !action) return null;
  return (
    <div className="study-card-heading">
      <div className="min-w-0">
        {eyebrow ? <p className="study-card-eyebrow">{eyebrow}</p> : null}
        {title ? <h2 className="study-card-title">{title}</h2> : null}
      </div>
      {action ? <div className="study-card-action">{action}</div> : null}
    </div>
  );
}

/** Open page-level section. Use only when a visible card would add no grouping value. */
export function OpenSection({ children, className, ...props }: SurfaceProps) {
  return (
    <section className={classes("surface-open", className)} {...props}>
      {children}
    </section>
  );
}

/** Legacy-compatible grouped surface. Prefer SectionCard for new V5 work. */
export function GroupedSurface({ children, className, ...props }: SurfaceProps) {
  return (
    <section className={classes("surface-grouped", className)} {...props}>
      {children}
    </section>
  );
}

/** Legacy-compatible emphasis surface. Prefer PrimaryCard for new V5 work. */
export function EmphasisSurface({ children, className, ...props }: SurfaceProps) {
  return (
    <section className={classes("surface-emphasis", className)} {...props}>
      {children}
    </section>
  );
}

export function InteractiveRow({ children, className, ...props }: SurfaceProps) {
  return (
    <section className={classes("surface-interactive-row", className)} {...props}>
      {children}
    </section>
  );
}

/** One page may have one visually dominant decision or insight card. */
export function PrimaryCard({ children, className, title, eyebrow, action, ...props }: CardProps) {
  return (
    <section className={classes("study-card study-card-primary", className)} {...props}>
      <CardHeading title={title} eyebrow={eyebrow} action={action} />
      <div className="study-card-body">{children}</div>
    </section>
  );
}

/** Default visible grouping for one meaningful information unit. */
export function SectionCard({ children, className, title, eyebrow, action, ...props }: CardProps) {
  return (
    <section className={classes("study-card study-card-section", className)} {...props}>
      <CardHeading title={title} eyebrow={eyebrow} action={action} />
      <div className="study-card-body">{children}</div>
    </section>
  );
}

export function MetricGroup({ children, className, ...props }: SurfaceProps) {
  return <div className={classes("study-metric-group", className)} {...props}>{children}</div>;
}

export function Metric({ label, value, detail }: { label: ReactNode; value: ReactNode; detail?: ReactNode }) {
  return (
    <div className="study-metric">
      <span className="study-metric-label">{label}</span>
      <strong className="study-metric-value">{value}</strong>
      {detail ? <span className="study-metric-detail">{detail}</span> : null}
    </div>
  );
}

export function DataList({ children, className, ...props }: SurfaceProps) {
  return <div className={classes("study-data-list", className)} {...props}>{children}</div>;
}

export function DataRow({ children, className, ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return <div className={classes("study-data-row", className)} {...props}>{children}</div>;
}

export function StatusBadge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "positive" | "warning" | "danger" | "info" }) {
  return <span className={`study-status study-status-${tone}`}>{children}</span>;
}

export function InlineNotice({ children, className, ...props }: SurfaceProps) {
  return <aside className={classes("study-inline-notice", className)} {...props}>{children}</aside>;
}

export function Disclosure({ summary, children, className }: { summary: ReactNode; children: ReactNode; className?: string }) {
  return (
    <details className={classes("study-disclosure", className)}>
      <summary>{summary}</summary>
      <div className="study-disclosure-body">{children}</div>
    </details>
  );
}

export function EmptyState({ title, body, action, className }: { title: ReactNode; body: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <div className={classes("study-empty-state", className)}>
      <h3>{title}</h3>
      <p>{body}</p>
      {action ? <div className="study-empty-action">{action}</div> : null}
    </div>
  );
}
