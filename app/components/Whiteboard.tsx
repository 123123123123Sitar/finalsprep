"use client";
import { useEffect, useRef, useState } from "react";

type Tool = "pen" | "eraser";

export default function Whiteboard({
  open,
  onClose,
  title,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef(false);
  const lastRef = useRef<{ x: number; y: number } | null>(null);
  const [tool, setTool] = useState<Tool>("pen");
  const [color, setColor] = useState<string>("#111");
  const [size, setSize] = useState<number>(2);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStateRef = useRef<{ startX: number; startY: number; baseX: number; baseY: number } | null>(null);

  function onHeaderPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("button,input,label,select")) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragStateRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      baseX: pos.x,
      baseY: pos.y,
    };
  }

  function onHeaderPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const s = dragStateRef.current;
    if (!s) return;
    setPos({
      x: s.baseX + (e.clientX - s.startX),
      y: s.baseY + (e.clientY - s.startY),
    });
  }

  function onHeaderPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragStateRef.current) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
    dragStateRef.current = null;
  }

  useEffect(() => {
    if (!open) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const prev = document.createElement("canvas");
      prev.width = canvas.width;
      prev.height = canvas.height;
      const pctx = prev.getContext("2d");
      if (pctx) pctx.drawImage(canvas, 0, 0);

      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.drawImage(prev, 0, 0, prev.width / dpr, prev.height / dpr);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function getPos(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    e.preventDefault();
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    drawingRef.current = true;
    lastRef.current = getPos(e);
  }

  function onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const next = getPos(e);
    const last = lastRef.current ?? next;
    ctx.save();
    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";
      ctx.lineWidth = size * 6;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
    }
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(next.x, next.y);
    ctx.stroke();
    ctx.restore();
    lastRef.current = next;
  }

  function onPointerUp() {
    drawingRef.current = false;
    lastRef.current = null;
  }

  function clear() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  const colors = ["#111", "#e11d48", "#2563eb", "#059669", "#d97706"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="flex h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-hair bg-paper shadow-xl"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex cursor-move items-center justify-between border-b border-hair px-4 py-2 select-none"
          onPointerDown={onHeaderPointerDown}
          onPointerMove={onHeaderPointerMove}
          onPointerUp={onHeaderPointerUp}
          onPointerCancel={onHeaderPointerUp}
        >
          <div className="flex items-center gap-2 truncate text-[13px] font-medium text-ink">
            <span aria-hidden="true" className="text-muted">⠿</span>
            <span className="truncate">Whiteboard{title ? ` · ${title}` : ""}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-md border border-hair bg-offwhite p-0.5">
              <button
                type="button"
                onClick={() => setTool("pen")}
                className={`rounded px-2 py-1 text-xs ${
                  tool === "pen" ? "bg-paper text-ink" : "text-muted"
                }`}
              >
                Pen
              </button>
              <button
                type="button"
                onClick={() => setTool("eraser")}
                className={`rounded px-2 py-1 text-xs ${
                  tool === "eraser" ? "bg-paper text-ink" : "text-muted"
                }`}
              >
                Eraser
              </button>
            </div>
            <div className="flex items-center gap-1">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setColor(c);
                    setTool("pen");
                  }}
                  title={c}
                  className={`h-5 w-5 rounded-full border ${
                    color === c && tool === "pen"
                      ? "border-ink"
                      : "border-hair"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <label className="flex items-center gap-1 text-[11px] text-muted">
              Size
              <input
                type="range"
                min={1}
                max={8}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-20"
              />
            </label>
            <button
              type="button"
              onClick={clear}
              className="rounded-md border border-hair bg-offwhite px-2 py-1 text-xs text-ink hover:border-red-400"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-hair bg-offwhite px-2 py-1 text-xs text-ink hover:border-orange"
            >
              Close
            </button>
          </div>
        </div>
        <div ref={containerRef} className="relative flex-1 bg-white">
          <canvas
            ref={canvasRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            className="absolute inset-0 h-full w-full touch-none"
            style={{ cursor: tool === "eraser" ? "cell" : "crosshair" }}
          />
        </div>
      </div>
    </div>
  );
}
