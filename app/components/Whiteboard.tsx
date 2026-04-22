"use client";
import { useEffect, useRef, useState } from "react";
import MathRender from "./Math";

type Tool = "pen" | "eraser" | "text";
type Point = { x: number; y: number };
type Bbox = { minX: number; minY: number; maxX: number; maxY: number };
type PendingText = { x: number; y: number; value: string };

// Logical drawing surface. Much larger than the visible modal so the student
// has room to spread their work out and can zoom out to see more at once.
const LOGICAL_W = 2400;
const LOGICAL_H = 1600;
const ZOOM_MIN = 0.35;
const ZOOM_MAX = 2.0;
const ZOOM_STEP = 0.15;
const HISTORY_LIMIT = 40;

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
  storageKey,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  questionText?: string;
  canSubmit?: boolean;
  submitting?: boolean;
  onSubmitAnswer?: (imageBase64: string) => void | Promise<void>;
  storageKey?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef(false);
  const lastRef = useRef<Point | null>(null);
  const strokeRef = useRef<Point[]>([]);
  const historyRef = useRef<string[]>([]);
  const pendingTextRef = useRef<PendingText | null>(null);
  const initializedRef = useRef(false);
  const [tool, setTool] = useState<Tool>("pen");
  const [color, setColor] = useState<string>("#111");
  const [size, setSize] = useState<number>(2);
  const [zoom, setZoom] = useState<number>(1);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [circleBbox, setCircleBbox] = useState<Bbox | null>(null);
  const [historyDepth, setHistoryDepth] = useState(0);
  const [pendingText, setPendingText] = useState<PendingText | null>(null);
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

  function saveDrawing() {
    if (!storageKey || typeof window === "undefined") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const dataUrl = canvas.toDataURL("image/png");
      window.localStorage.setItem(storageKey, dataUrl);
    } catch {}
  }

  // Initialise the canvas once when it opens. The logical size is fixed, so
  // we don't need to re-resize on window resize — the CSS transform handles
  // display scaling.
  useEffect(() => {
    if (!open) {
      setCircleBbox(null);
      historyRef.current = [];
      setHistoryDepth(0);
      setPendingText(null);
      pendingTextRef.current = null;
      initializedRef.current = false;
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(LOGICAL_W * dpr);
    canvas.height = Math.floor(LOGICAL_H * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (!initializedRef.current && storageKey) {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const img = new Image();
        img.onload = () => {
          const c = canvasRef.current;
          if (!c) return;
          const cctx = c.getContext("2d");
          if (!cctx) return;
          cctx.save();
          cctx.setTransform(1, 0, 0, 1, 0, 0);
          cctx.drawImage(img, 0, 0, c.width, c.height);
          cctx.restore();
        };
        img.src = raw;
      }
      initializedRef.current = true;
    }
  }, [open, storageKey]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !pendingTextRef.current) {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  function getPos(e: React.PointerEvent<HTMLCanvasElement>): Point {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    // rect.width/height are after CSS scale, so dividing maps back into the
    // logical 0..LOGICAL_W / 0..LOGICAL_H coordinate system.
    return {
      x: ((e.clientX - rect.left) / rect.width) * LOGICAL_W,
      y: ((e.clientY - rect.top) / rect.height) * LOGICAL_H,
    };
  }

  function pushHistory() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const snap = canvas.toDataURL("image/png");
      historyRef.current.push(snap);
      if (historyRef.current.length > HISTORY_LIMIT) historyRef.current.shift();
      setHistoryDepth(historyRef.current.length);
    } catch {}
  }

  function undo() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const prev = historyRef.current.pop();
    setHistoryDepth(historyRef.current.length);
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    if (prev) {
      const img = new Image();
      img.onload = () => {
        const c = canvasRef.current;
        if (!c) return;
        const cctx = c.getContext("2d");
        if (!cctx) return;
        cctx.save();
        cctx.setTransform(1, 0, 0, 1, 0, 0);
        cctx.drawImage(img, 0, 0, c.width, c.height);
        cctx.restore();
        saveDrawing();
      };
      img.src = prev;
    } else {
      saveDrawing();
    }
    setCircleBbox(null);
  }

  function commitPendingText() {
    const p = pendingTextRef.current;
    pendingTextRef.current = null;
    setPendingText(null);
    if (!p) return;
    const value = p.value.trim();
    if (!value) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    pushHistory();
    ctx.save();
    ctx.font = `${14 + size * 3}px Georgia, "Times New Roman", serif`;
    ctx.fillStyle = color;
    ctx.textBaseline = "alphabetic";
    ctx.fillText(value, p.x, p.y);
    ctx.restore();
    saveDrawing();
  }

  function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    e.preventDefault();
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    const p = getPos(e);
    if (tool === "text") {
      commitPendingText();
      const next = { x: p.x, y: p.y, value: "" };
      pendingTextRef.current = next;
      setPendingText(next);
      return;
    }
    pushHistory();
    drawingRef.current = true;
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
    const wasDrawing = drawingRef.current;
    drawingRef.current = false;
    lastRef.current = null;
    strokeRef.current = [];
    if (wasDrawing) saveDrawing();
  }

  function clear() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    pushHistory();
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    setCircleBbox(null);
    saveDrawing();
  }

  function handleClose() {
    commitPendingText();
    saveDrawing();
    onClose();
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

  function setZoomAround(nextZoom: number) {
    const clamped = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, nextZoom));
    const scroller = scrollRef.current;
    if (!scroller) {
      setZoom(clamped);
      return;
    }
    // Keep the view's center point stable across zoom changes.
    const prevZoom = zoom;
    const rect = scroller.getBoundingClientRect();
    const centerX = scroller.scrollLeft + rect.width / 2;
    const centerY = scroller.scrollTop + rect.height / 2;
    const factor = clamped / prevZoom;
    setZoom(clamped);
    requestAnimationFrame(() => {
      if (!scroller) return;
      scroller.scrollLeft = centerX * factor - rect.width / 2;
      scroller.scrollTop = centerY * factor - rect.height / 2;
    });
  }

  function zoomIn() {
    setZoomAround(zoom + ZOOM_STEP);
  }

  function zoomOut() {
    setZoomAround(zoom - ZOOM_STEP);
  }

  function fitToView() {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const rect = scroller.getBoundingClientRect();
    const fit = Math.min(rect.width / LOGICAL_W, rect.height / LOGICAL_H);
    setZoomAround(fit);
  }

  function resetZoom() {
    setZoomAround(1);
  }

  const colors = ["#111", "#e11d48", "#2563eb", "#059669", "#d97706"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={handleClose}
    >
      <div
        className="flex h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-lg border border-hair bg-paper shadow-xl"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex cursor-move flex-wrap items-center justify-between gap-2 border-b border-hair px-4 py-2 select-none"
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
          <div className="flex flex-wrap items-center gap-2">
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
              <button
                type="button"
                onClick={() => setTool("text")}
                className={`rounded px-2 py-1 text-xs ${
                  tool === "text" ? "bg-paper text-ink" : "text-muted"
                }`}
              >
                Text
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
            <div className="flex items-center gap-1 rounded-md border border-hair bg-offwhite p-0.5">
              <button
                type="button"
                onClick={zoomOut}
                disabled={zoom <= ZOOM_MIN + 0.001}
                className="rounded px-2 py-1 text-xs text-ink disabled:opacity-40"
                title="Zoom out for more room to write"
              >
                −
              </button>
              <button
                type="button"
                onClick={resetZoom}
                className="rounded px-2 py-1 text-xs text-ink"
                title="Reset zoom to 100%"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                type="button"
                onClick={zoomIn}
                disabled={zoom >= ZOOM_MAX - 0.001}
                className="rounded px-2 py-1 text-xs text-ink disabled:opacity-40"
                title="Zoom in"
              >
                +
              </button>
              <button
                type="button"
                onClick={fitToView}
                className="rounded px-2 py-1 text-[11px] text-muted hover:text-ink"
                title="Fit entire canvas in view"
              >
                Fit
              </button>
            </div>
            <button
              type="button"
              onClick={undo}
              disabled={historyDepth === 0}
              className="rounded-md border border-hair bg-offwhite px-2 py-1 text-xs text-ink hover:border-orange disabled:opacity-40"
              title="Undo last stroke"
            >
              ↶ Undo
            </button>
            <button
              type="button"
              onClick={clear}
              className="rounded-md border border-hair bg-offwhite px-2 py-1 text-xs text-ink hover:border-red-400"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-md border border-hair bg-offwhite px-2 py-1 text-xs text-ink hover:border-orange"
            >
              Close
            </button>
          </div>
        </div>
        {questionText && (
          <div className="max-h-40 overflow-y-auto border-b border-hair bg-offwhite px-4 py-2 text-[13px] text-ink">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
              Question
            </div>
            <div className="whitespace-pre-wrap">
              <MathRender auto>{questionText}</MathRender>
            </div>
          </div>
        )}
        <div
          ref={scrollRef}
          className="relative flex-1 overflow-auto bg-neutral-100"
        >
          <div
            className="relative bg-white shadow-sm"
            style={{
              width: LOGICAL_W * zoom,
              height: LOGICAL_H * zoom,
            }}
          >
            <canvas
              ref={canvasRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
              className="absolute left-0 top-0 touch-none"
              style={{
                width: LOGICAL_W * zoom,
                height: LOGICAL_H * zoom,
                cursor:
                  tool === "eraser"
                    ? "cell"
                    : tool === "text"
                    ? "text"
                    : "crosshair",
              }}
            />
            {pendingText && (
              <input
                autoFocus
                value={pendingText.value}
                onChange={(e) => {
                  const next = { ...pendingText, value: e.target.value };
                  pendingTextRef.current = next;
                  setPendingText(next);
                }}
                onBlur={commitPendingText}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    commitPendingText();
                  } else if (e.key === "Escape") {
                    pendingTextRef.current = null;
                    setPendingText(null);
                  }
                }}
                placeholder="Type…"
                style={{
                  position: "absolute",
                  left: Math.max(0, pendingText.x * zoom - 4),
                  top: Math.max(
                    0,
                    pendingText.y * zoom - (18 + size * 3) * zoom
                  ),
                  font: `${(14 + size * 3) * zoom}px Georgia, "Times New Roman", serif`,
                  color,
                  background: "rgba(255,255,255,0.9)",
                  border: "1px dashed #9ca3af",
                  padding: "2px 4px",
                  outline: "none",
                  minWidth: 80,
                }}
              />
            )}
          </div>
          {circleBbox && canSubmit && onSubmitAnswer && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="sticky bottom-4 right-4 ml-auto mr-4 mt-[-48px] block rounded-md border border-purple-600 bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:opacity-90 disabled:opacity-60"
              title="OCR your circled answer and grade it"
            >
              {submitting ? "Submitting…" : "✨ Submit circled answer"}
            </button>
          )}
          {circleBbox && !canSubmit && (
            <div className="pointer-events-none sticky bottom-4 right-4 ml-auto mr-4 mt-[-40px] block w-max rounded-md border border-hair bg-paper/90 px-3 py-1.5 text-[11px] text-muted shadow">
              Circle detected · Hacker plan required to OCR-grade
            </div>
          )}
        </div>
        <div className="flex items-center justify-between border-t border-hair bg-offwhite px-4 py-1.5 text-[11px] text-muted">
          <span>
            Canvas: {LOGICAL_W} × {LOGICAL_H} px · zoom out to spread out your
            work, or scroll to pan.
          </span>
          <span>
            {Math.round(zoom * 100)}% zoom
          </span>
        </div>
      </div>
    </div>
  );
}
