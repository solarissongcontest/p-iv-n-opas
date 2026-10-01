import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { LiquidGlass } from "@/components/LiquidGlass";

export const input = "mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring";
export const button = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-primary-foreground disabled:opacity-50";
export const secondary = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4";

export function Dialog({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const focusable = () => [...(ref.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]') ?? [])];
    focusable()[0]?.focus();
    function trap(event: KeyboardEvent) {
      if (event.key === "Escape") { event.stopPropagation(); close.current(); }
      if (event.key !== "Tab") return;
      const elements = focusable(), first = elements[0], last = elements[elements.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", trap);
    return () => { document.removeEventListener("keydown", trap); previous?.focus(); };
  }, []);
  return <div ref={ref} className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4" onMouseDown={event=>{if(event.target===event.currentTarget)onClose();}}>
    <LiquidGlass lensing variant="thick" role="dialog" aria-modal="true" aria-label={title} className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl p-5 shadow-2xl sm:rounded-3xl sm:p-7">
      <div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-semibold">{title}</h2><button type="button" aria-label="Sulje" className={secondary+" !size-11 !p-0"} onClick={onClose}><X size={18}/></button></div>{children}
    </LiquidGlass>
  </div>;
}
