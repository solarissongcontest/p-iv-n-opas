import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  className?: string;
};

function cx(base: string, className?: string) {
  return className ? base + " " + className : base;
}

export function ActionDashboardLayout({ children, className }: LayoutProps) {
  return <div className={cx("layout-action-dashboard", className)}>{children}</div>;
}

export function PlannerLayout({ children, className }: LayoutProps) {
  return <div className={cx("layout-planner", className)}>{children}</div>;
}

export function LibraryDetailLayout({ children, className }: LayoutProps) {
  return <div className={cx("layout-library-detail", className)}>{children}</div>;
}

export function FocusLayout({ children, className }: LayoutProps) {
  return <div className={cx("layout-focus", className)}>{children}</div>;
}

export function InsightLayout({ children, className }: LayoutProps) {
  return <div className={cx("layout-insights", className)}>{children}</div>;
}

export function SettingsLayout({ children, className }: LayoutProps) {
  return <div className={cx("layout-settings", className)}>{children}</div>;
}
