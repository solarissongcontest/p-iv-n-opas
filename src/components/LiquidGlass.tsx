import * as React from "react";
import { cn } from "@/lib/utils";

export type GlassVariant = "regular" | "clear" | "thick" | "interactive";

type GlassProps<T extends React.ElementType> = {
  as?: T;
  variant?: GlassVariant;
  /** Adds the specular/edge highlight layer (tier 1+). Default true. */
  specular?: boolean;
  /** Enables the SVG lensing layer when the device can afford it (tier 2). */
  lensing?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const VARIANTS: Record<GlassVariant, string> = {
  regular: "glass-base",
  clear: "glass-base glass-clear",
  thick: "glass-base glass-thick",
  interactive: "glass-base glass-interactive",
};

/** True when the device is likely able to render an extra displacement layer. */
function useHighPerf(enabled: boolean) {
  const [ok, setOk] = React.useState(false);
  React.useEffect(() => {
    if (!enabled) return;
    const reduced =
      window.matchMedia("(prefers-reduced-transparency: reduce)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cores = navigator.hardwareConcurrency ?? 4;
    const mem = (navigator as { deviceMemory?: number }).deviceMemory ?? 8;
    setOk(!reduced && cores >= 8 && mem >= 4);
  }, [enabled]);
  return ok;
}

/**
 * Liquid Glass surface for the navigation / control layer only
 * (sidebar, bottom nav, floating actions, command palette, sheets, toolbars).
 * Never use this for ordinary content cards — those use `panel`.
 *
 * Progressive enhancement:
 *  tier 0 opaque surface, tier 1 blur + saturation + adaptive tint + specular edge,
 *  tier 2 SVG displacement/lensing when performance allows.
 */
export function LiquidGlass<T extends React.ElementType = "div">({
  as,
  variant = "regular",
  specular = true,
  lensing = false,
  className,
  children,
  ...rest
}: GlassProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof GlassProps<T>>) {
  const Comp = (as ?? "div") as React.ElementType;
  const tier2 = useHighPerf(lensing);

  return (
    <Comp
      className={cn(VARIANTS[variant], specular && "glass-specular", className)}
      data-glass={variant}
      data-glass-tier={tier2 ? 2 : 1}
      {...rest}
    >
      {tier2 && <GlassLens />}
      {children}
    </Comp>
  );
}

/** Tier 2: subtle SVG displacement giving the edge a lensed feel. */
function GlassLens() {
  const id = React.useId().replace(/[:]/g, "");
  return (
    <svg aria-hidden className="pointer-events-none absolute size-0" focusable="false">
      <filter id={`lens-${id}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" />
        <feDisplacementMap in="SourceGraphic" scale="6" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
