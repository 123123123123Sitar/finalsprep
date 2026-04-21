"use client";
import { useEffect, useRef, useState } from "react";

type Tool = "pen" | "eraser";
type Point = { x: number; y: number };
type Bbox = { minX: number; minY: number; maxX: number; maxY: number };

function detectCircle(points: Point[]): Bbox | null {
  if (points.length < 20) return null;
  const first = points[0];
  const last = points[points.length - 1];
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;
  let length = 0;
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
    if (i > 0) {
      const dx = p.x - points[i - 1].x;
      const dy = p.y - points[i - 1].y;
      length += Math.hypot(dx, dy);
    }
  }
  const w = maxX - minX;
  const h = maxY - minY;
  const size = Math.max(w, h);
  if (size < 30) return null;
  const closure = Math.hypot(last.x - first.x, last.y - first.y) / size;
  if (closure > 0.35) return null;
  const aspect = Math.min(w, h) / Math.max(w, h);
  if (aspect < 0.25) return null;
  const perimeter = 2 * (w + h);
  if (length < perimeter * 0.7) return null;
  return { minX, minY, maxX, maxY };
}

export default function Whiteboard({
  open,
  onClose,
  title,
  questionText,
  canSubmit = false,
  submitting = false,
  onSubmitAnswer,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  questionText?: string;
  canSubmit?: boolean;
  submitting?: boolean;
  onSubmitAnswer?: (imageBase64: string) => void | Promise<void>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef(false);
  const lastRef = useRef<Point | null>(null);
  const strokeRef = useRef<Point[]>([]);
  const questionDrawnRef = useRef(false);
  const [tool, setTool] = useState<Tool>("pen");
  const [color, setColor] = useState<string>("#111");
  const [size, setSize] = useState<number>(2);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [circleBbox, setCircleBbox] = useState<Bbox | null>(null);
  const dragStateRef = useRef<{
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
  } | null>(null);

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

  function drawQuestionText(ctx: CanvasRenderingContext2D, cssWidth: number) {
    if (!questionText) return;
    ctx.save();
    ctx.font = "14px Georgia, serif";
    ctx.fillStyle = "#6b6b6b";
    ctx.textBaseline = "top";
    const prefix = "Q: ";
    const words = (prefix + questionText).split(/\s+/);
    const maxWidth = cssWidth - 24;
    let line = "";
    let y = 16;
    for (const w of words) {
      const testLine = line ? `${line} ${w}` : w;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        ctx.fillText(line, 12, y);
        y += 20;
        line = w;
      } else {
        line = testLine;
      }
      if (y > 120) break;
    }
    if (line && y <= 140) ctx.fillText(line, 12, y);
    ctx.restore();
  }

  useEffect(() => {
    if (!open) {
      questionDrawnRef.current = false;
      setCircleBbox(null);
      return;
    }
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
      if (prev.width && prev.height) {
        ctx.drawImage(prev, 0, 0, prev.width / dpr, prev.height / dpr);
      }
      if (!questionDrawnRef.current) {
        drawQuestionText(ctx, rect.width);
        questionDrawnRef.current = true;
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, questionText]);

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
    const p = getPos(e);
    lastRef.current = p;
    strokeRef.current = [p];
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
    strokeRef.current.push(next);
  }

  function onPointerUp() {
    if (drawingRef.current && tool === "pen") {
      const bbox = detectCircle(strokeRef.current);
      if (bbox) setCircleBbox(bbox);
    }
    drawingRef.current = false;
    lastRef.current = null;
    strokeRef.current = [];
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
    setCircleBbox(null);
    // Redraw question so the user can still see it after clearing.
    const dpr = window.devicePixelRatio || 1;
    const ctx2 = canvas.getContext("2d");
    if (ctx2) {
      ctx2.save();
      ctx2.scale(dpr, dpr);
      drawQuestionText(ctx2, canvas.width / dpr);
      ctx2.restore();
    }
  }

  function exportAnswerImage(): string {
    const canvas = canvasRef.current;
    if (!canvas) return "";
    return canvas.toDataURL("image/png");
  }

  async function handleSubmit() {
    if (!onSubmitAnswer || submitting) return;
    const img = exportAnswerImage();
    if (!img) return;
    await onSubmitAnswer(img);
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
            <span aria-hidden="true" className="text-muted">
              ⠿
            </span>
            <span className="truncate">
              Whiteboard{title ? ` · ${title}` : ""}
            </span>
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
          {circleBbox && canSubmit && onSubmitAnswer && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="absolute bottom-4 right-4 rounded-md border border-purple-600 bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:opacity-90 disabled:opacity-60"
              title="OCR your circled answer and grade it"
            >
              {submitting ? "Submitting…" : "✨ Submit circled answer"}
            </button>
          )}
          {circleBbox && !canSubmit && (
            <div className="pointer-events-none absolute bottom-4 right-4 rounded-md border border-hair bg-paper/90 px-3 py-1.5 text-[11px] text-muted shadow">
              Circle detected · Hacker plan required to OCR-grade
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
