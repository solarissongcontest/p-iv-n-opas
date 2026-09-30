import { useEffect, useRef, useState } from "react";

export function SketchAnswerCanvas({
  value,
  onChange,
  mode = "diagram",
  disabled = false,
}: {
  value?: string;
  onChange: (value: string) => void;
  mode?: "diagram" | "graph";
  disabled?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.max(600, Math.round(rect.width * ratio));
    canvas.height = Math.round(320 * ratio);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(ratio, ratio);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2;
    ctx.strokeStyle = getComputedStyle(canvas).color || "#111";
    ctx.fillStyle = getComputedStyle(canvas).backgroundColor || "#fff";
    ctx.fillRect(0, 0, rect.width, 320);

    if (mode === "graph") {
      ctx.save();
      ctx.globalAlpha = 0.14;
      ctx.lineWidth = 1;
      for (let x = 20; x < rect.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 320);
        ctx.stroke();
      }
      for (let y = 20; y < 320; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(rect.width, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 0.55;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(40, 15);
      ctx.lineTo(40, 290);
      ctx.lineTo(rect.width - 15, 290);
      ctx.stroke();
      ctx.restore();
    }

    if (value) {
      const image = new Image();
      image.onload = () => {
        ctx.drawImage(image, 0, 0, rect.width, 320);
      };
      image.src = value;
    }
    setReady(true);
  }, [mode]);

  function point(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function start(event: React.PointerEvent<HTMLCanvasElement>) {
    if (disabled) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    drawingRef.current = true;
    canvas.setPointerCapture(event.pointerId);
    const p = point(event);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }

  function move(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current || disabled) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const p = point(event);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  }

  function end() {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    const canvas = canvasRef.current;
    if (canvas) onChange(canvas.toDataURL("image/png"));
  }

  function clear() {
    const canvas = canvasRef.current;
    if (!canvas || disabled) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, 320);
    ctx.fillStyle = getComputedStyle(canvas).backgroundColor || "#fff";
    ctx.fillRect(0, 0, rect.width, 320);
    if (mode === "graph") {
      ctx.save();
      ctx.globalAlpha = 0.14;
      ctx.lineWidth = 1;
      for (let x = 20; x < rect.width; x += 20) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 320); ctx.stroke();
      }
      for (let y = 20; y < 320; y += 20) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(rect.width, y); ctx.stroke();
      }
      ctx.restore();
    }
    onChange("");
  }

  return (
    <div className="space-y-2">
      <canvas
        ref={canvasRef}
        aria-label={mode === "graph" ? "Kuvaajavastaus" : "Piirrosvastaus"}
        className="h-80 w-full touch-none rounded-xl border border-border bg-surface text-foreground"
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerCancel={end}
      />
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          {ready ? (mode === "graph" ? "Piirrä kuvaaja ruudukolle." : "Piirrä ja merkitse vastaus tähän.") : "Valmistellaan luonnosta…"}
        </p>
        <button type="button" disabled={disabled} onClick={clear} className="min-h-10 rounded-xl border border-border bg-surface px-3 text-sm">
          Tyhjennä
        </button>
      </div>
    </div>
  );
}
