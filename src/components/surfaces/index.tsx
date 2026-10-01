import type { HTMLAttributes, ReactNode } from "react";

type SurfaceProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

function classes(base: string, extra?: string) {
  return extra ? base + " " + extra : base;
}

export function OpenSection({ children, className, ...props }: SurfaceProps) {
  return (
    <section className={classes("surface-open", className)} {...props}>
      {children}
    </section>
  );
}

export function GroupedSurface({ children, className, ...props }: SurfaceProps) {
  return (
    <section className={classes("surface-grouped", className)} {...props}>
      {children}
    </section>
  );
}

export function EmphasisSurface({ children, className, ...props }: SurfaceProps) {
  return (
    <section className={classes("surface-emphasis", className)} {...props}>
      {children}
    </section>
  );
}

export function InteractiveRow({
  children,
  className,
  ...props
}: SurfaceProps) {
  return (
    <section className={classes("surface-interactive-row", className)} {...props}>
      {children}
    </section>
  );
}
