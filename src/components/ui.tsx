import * as React from "react";
import { LiquidGlass } from "@/components/LiquidGlass";
import { cn } from "@/lib/utils";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={cn("inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50", props.className)} />;
}

export function IconButton({label,...props}: React.ButtonHTMLAttributes<HTMLButtonElement>&{label:string}) {
  return <button aria-label={label} {...props} className={cn("grid size-11 place-items-center rounded-xl border border-border bg-surface", props.className)} />;
}

export function Card(props: React.HTMLAttributes<HTMLElement>) {
  return <section {...props} className={cn("panel p-4 sm:p-6", props.className)} />;
}

export function CourseBadge({children,className}: {children:React.ReactNode;className?:string}) {
  return <span className={cn("inline-flex rounded-lg bg-accent px-2.5 py-1 text-xs font-semibold text-primary",className)}>{children}</span>;
}

export function ProgressBar({value,className}:{value:number;className?:string}) {
  const v=Math.max(0,Math.min(100,value));
  return <div className={cn("h-2 overflow-hidden rounded-full bg-muted",className)} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={v}><div className="h-full rounded-full bg-primary" style={{width:`${v}%`}}/></div>;
}

export function ProgressRing({value,size=56}:{value:number;size?:number}) {
  const v=Math.max(0,Math.min(100,value)),r=20,c=2*Math.PI*r;
  return <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label={`${v} prosenttia`}><circle cx="24" cy="24" r={r} fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth="5"/><circle cx="24" cy="24" r={r} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c*(1-v/100)} transform="rotate(-90 24 24)"/></svg>;
}

const field="w-full rounded-xl border border-border bg-surface px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring";
export const Input=React.forwardRef<HTMLInputElement,React.InputHTMLAttributes<HTMLInputElement>>((props,ref)=><input ref={ref} {...props} className={cn(field,props.className)}/>);
Input.displayName="Input";
export const Textarea=React.forwardRef<HTMLTextAreaElement,React.TextareaHTMLAttributes<HTMLTextAreaElement>>((props,ref)=><textarea ref={ref} {...props} className={cn(field,props.className)}/>);
Textarea.displayName="Textarea";
export const Select=React.forwardRef<HTMLSelectElement,React.SelectHTMLAttributes<HTMLSelectElement>>((props,ref)=><select ref={ref} {...props} className={cn(field,props.className)}/>);
Select.displayName="Select";

export function SegmentedControl<T extends string>({value,options,onChange}:{value:T;options:{value:T;label:string}[];onChange:(v:T)=>void}) {
  return <div className="inline-flex rounded-xl bg-muted p-1" role="group">{options.map(o=><button type="button" key={o.value} aria-pressed={value===o.value} onClick={()=>onChange(o.value)} className={cn("min-h-10 rounded-lg px-3 text-sm",value===o.value&&"bg-surface font-medium shadow-sm")}>{o.label}</button>)}</div>;
}

export function Sheet({title,children,onClose}:{title:string;children:React.ReactNode;onClose:()=>void}) {
  return <div className="fixed inset-0 z-50 flex items-end bg-black/30" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><LiquidGlass variant="thick" role="dialog" aria-modal="true" aria-label={title} className="w-full rounded-t-3xl p-5">{children}</LiquidGlass></div>;
}

export function Modal({title,children,onClose}:{title:string;children:React.ReactNode;onClose:()=>void}) {
  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><LiquidGlass variant="thick" role="dialog" aria-modal="true" aria-label={title} className="w-full max-w-xl rounded-3xl p-6">{children}</LiquidGlass></div>;
}

export function Tooltip({label,children}:{label:string;children:React.ReactElement}) {
  return React.cloneElement(children,{title:label} as React.HTMLAttributes<HTMLElement>);
}

export function Toast({children}:{children:React.ReactNode}) {
  return <div role="status" className="rounded-xl border border-border bg-surface px-4 py-3 text-sm shadow-sm">{children}</div>;
}

export function Tabs<T extends string>({value,tabs,onChange}:{value:T;tabs:T[];onChange:(v:T)=>void}) {
  return <div role="tablist" className="flex gap-1 overflow-x-auto rounded-xl bg-muted p-1">{tabs.map(tab=><button key={tab} role="tab" aria-selected={value===tab} onClick={()=>onChange(tab)} className={cn("min-h-11 min-w-max flex-1 rounded-lg px-3 text-sm",value===tab&&"bg-surface font-medium shadow-sm")}>{tab}</button>)}</div>;
}

export function Navigation(props: React.HTMLAttributes<HTMLElement>) {
  return <nav {...props} className={cn("flex items-center gap-1",props.className)}/>;
}

export function StudySession({title,meta,children}:{title:string;meta?:string;children?:React.ReactNode}) {
  return <Card><p className="text-xs font-semibold uppercase tracking-wide text-primary">{meta}</p><h3 className="mt-1 text-lg font-semibold">{title}</h3>{children}</Card>;
}

export function CalendarItem({title,meta,status}:{title:string;meta:string;status:string}) {
  return <div className="rounded-xl bg-muted/60 p-3"><p className="text-xs text-muted-foreground">{meta}</p><p className="mt-1 font-medium">{title}</p><p className="mt-1 text-xs text-muted-foreground">{status}</p></div>;
}

export function EmptyState({title,description,action}:{title:string;description:string;action?:React.ReactNode}) {
  return <Card><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{description}</p>{action&&<div className="mt-4">{action}</div>}</Card>;
}

export function Skeleton({className}: {className?:string}) {
  return <div aria-hidden className={cn("animate-pulse rounded-2xl bg-muted",className)}/>;
}

export function ChartCard({title,children}:{title:string;children:React.ReactNode}) {
  return <Card><h3 className="mb-4 font-semibold">{title}</h3>{children}</Card>;
}
