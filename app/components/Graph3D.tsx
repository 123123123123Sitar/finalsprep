"use client";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * 3D surface plotter: z = f(x, y). Renders via CSS 3D transforms of a
 * wireframe mesh built in the canvas. The parser supports the same subset
 * as the 2D calculator plus `y` as a second variable. No eval, no injection.
 */

type Node =
  | { kind: "num"; value: number }
  | { kind: "var"; name: "x" | "y" }
  | { kind: "unary"; op: "-"; arg: Node }
  | { kind: "binary"; op: "+" | "-" | "*" | "/" | "^"; left: Node; right: Node }
  | { kind: "call"; name: string; args: Node[] };

function tokenize(s: string) {
  const tokens: { type: string; value: string }[] = [];
  s = s.replace(/\s+/g, "");
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/[0-9.]/.test(c)) {
      let j = i + 1;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      tokens.push({ type: "num", value: s.slice(i, j) });
      i = j;
    } else if (/[a-zA-Z]/.test(c)) {
      let j = i + 1;
      while (j < s.length && /[a-zA-Z0-9_]/.test(s[j])) j++;
      tokens.push({ type: "ident", value: s.slice(i, j) });
      i = j;
    } else if ("+-*/^".includes(c)) {
      tokens.push({ type: "op", value: c });
      i++;
    } else if (c === "(" || c === ")" || c === ",") {
      tokens.push({ type: "paren", value: c });
      i++;
    } else {
      throw new Error(`Unexpected character: ${c}`);
    }
  }
  return tokens;
}

function parse(input: string): Node {
  const tokens = tokenize(input);
  let pos = 0;
  const peek = () => tokens[pos];
  const eat = () => tokens[pos++];

  function expect(type: string, value?: string) {
    const t = eat();
    if (!t || t.type !== type || (value && t.value !== value)) {
      throw new Error(`Expected ${value || type}`);
    }
    return t;
  }

  function parseExpr(): Node {
    return parseAdd();
  }
  function parseAdd(): Node {
    let left = parseMul();
    while (peek() && peek().type === "op" && (peek().value === "+" || peek().value === "-")) {
      const op = eat().value as "+" | "-";
      const right = parseMul();
      left = { kind: "binary", op, left, right };
    }
    return left;
  }
  function parseMul(): Node {
    let left = parsePow();
    while (peek() && peek().type === "op" && (peek().value === "*" || peek().value === "/")) {
      const op = eat().value as "*" | "/";
      const right = parsePow();
      left = { kind: "binary", op, left, right };
    }
    return left;
  }
  function parsePow(): Node {
    let base = parseUnary();
    if (peek() && peek().type === "op" && peek().value === "^") {
      eat();
      return { kind: "binary", op: "^", left: base, right: parsePow() };
    }
    return base;
  }
  function parseUnary(): Node {
    if (peek() && peek().type === "op" && peek().value === "-") {
      eat();
      return { kind: "unary", op: "-", arg: parseUnary() };
    }
    return parsePrimary();
  }
  function parsePrimary(): Node {
    const t = peek();
    if (!t) throw new Error("Unexpected end");
    if (t.type === "num") {
      eat();
      return { kind: "num", value: parseFloat(t.value) };
    }
    if (t.type === "ident") {
      eat();
      const name = t.value.toLowerCase();
      if (peek() && peek().type === "paren" && peek().value === "(") {
        eat();
        const args: Node[] = [parseExpr()];
        while (peek() && peek().type === "paren" && peek().value === ",") {
          eat();
          args.push(parseExpr());
        }
        expect("paren", ")");
        return { kind: "call", name, args };
      }
      if (name === "x" || name === "y") return { kind: "var", name };
      if (name === "pi") return { kind: "num", value: Math.PI };
      if (name === "e") return { kind: "num", value: Math.E };
      throw new Error(`Unknown identifier: ${name}`);
    }
    if (t.type === "paren" && t.value === "(") {
      eat();
      const expr = parseExpr();
      expect("paren", ")");
      return expr;
    }
    throw new Error("Unexpected token");
  }

  const ast = parseExpr();
  if (pos < tokens.length) throw new Error("Trailing input");
  return ast;
}

const FNS: Record<string, (...a: number[]) => number> = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  ln: Math.log,
  log: (x) => Math.log10(x),
  exp: Math.exp,
  sqrt: Math.sqrt,
  abs: Math.abs,
};

function evalNode(n: Node, x: number, y: number): number {
  switch (n.kind) {
    case "num":
      return n.value;
    case "var":
      return n.name === "x" ? x : y;
    case "unary":
      return -evalNode(n.arg, x, y);
    case "binary": {
      const l = evalNode(n.left, x, y);
      const r = evalNode(n.right, x, y);
      switch (n.op) {
        case "+":
          return l + r;
        case "-":
          return l - r;
        case "*":
          return l * r;
        case "/":
          return l / r;
        case "^":
          return Math.pow(l, r);
      }
    }
    case "call": {
      const fn = FNS[n.name];
      if (!fn) throw new Error(`Unknown function: ${n.name}`);
      return fn(...n.args.map((a) => evalNode(a, x, y)));
    }
  }
}

export default function Graph3D({
  initialExpr = "sin(sqrt(x^2 + y^2))",
  height = 360,
}: {
  initialExpr?: string;
  height?: number;
}) {
  const [expr, setExpr] = useState(initialExpr);
  const [range, setRange] = useState(5);
  const [rotX, setRotX] = useState(-0.9);
  const [rotY, setRotY] = useState(0.7);
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dragRef = useRef<{ x: number; y: number } | null>(null);

  const fn = useMemo(() => {
    setError("");
    try {
      const ast = parse(expr);
      return (x: number, y: number) => {
        try {
          const z = evalNode(ast, x, y);
          return isFinite(z) ? z : 0;
        } catch {
          return 0;
        }
      };
    } catch (e: any) {
      setError(e.message);
      return () => 0;
    }
  }, [expr]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);

    const N = 28; // grid resolution
    const cx = w / 2;
    const cy = h / 2;
    const scale = Math.min(w, h) * 0.35;

    // Build the mesh points
    const zs: number[][] = [];
    let zMin = Infinity;
    let zMax = -Infinity;
    for (let i = 0; i <= N; i++) {
      const row: number[] = [];
      for (let j = 0; j <= N; j++) {
        const x = -range + (2 * range * i) / N;
        const y = -range + (2 * range * j) / N;
        const z = fn(x, y);
        row.push(z);
        if (z < zMin) zMin = z;
        if (z > zMax) zMax = z;
      }
      zs.push(row);
    }
    if (zMin === zMax) {
      zMin = -1;
      zMax = 1;
    }
    const zRange = zMax - zMin;

    function project(x: number, y: number, z: number) {
      const zn = ((z - zMin) / zRange) * 2 - 1;
      // Rotate around x axis then y axis
      const sx = Math.sin(rotX), cxA = Math.cos(rotX);
      const sy = Math.sin(rotY), cyA = Math.cos(rotY);
      // rot X
      let y1 = y * cxA - zn * sx;
      let z1 = y * sx + zn * cxA;
      // rot Y
      let x2 = x * cyA + z1 * sy;
      let z2 = -x * sy + z1 * cyA;
      // perspective
      const depth = 1 / (2 + z2 * 0.15);
      return {
        x: cx + x2 * scale * depth,
        y: cy - y1 * scale * depth,
        depth: z2,
      };
    }

    // Draw grid — lines with color by height
    type Line = { x1: number; y1: number; x2: number; y2: number; z: number; col: string };
    const lines: Line[] = [];
    for (let i = 0; i <= N; i++) {
      for (let j = 0; j <= N; j++) {
        const xa = -1 + (2 * i) / N;
        const ya = -1 + (2 * j) / N;
        if (j < N) {
          const za = (zs[i][j] - zMin) / zRange;
          const p1 = project(xa, ya, zs[i][j]);
          const p2 = project(xa, ya + 2 / N, zs[i][j + 1]);
          lines.push({
            x1: p1.x,
            y1: p1.y,
            x2: p2.x,
            y2: p2.y,
            z: (p1.depth + p2.depth) / 2,
            col: heightColor(za),
          });
        }
        if (i < N) {
          const za = (zs[i][j] - zMin) / zRange;
          const p1 = project(xa, ya, zs[i][j]);
          const p2 = project(xa + 2 / N, ya, zs[i + 1][j]);
          lines.push({
            x1: p1.x,
            y1: p1.y,
            x2: p2.x,
            y2: p2.y,
            z: (p1.depth + p2.depth) / 2,
            col: heightColor(za),
          });
        }
      }
    }
    lines.sort((a, b) => a.z - b.z);
    ctx.lineWidth = 1.1;
    for (const l of lines) {
      ctx.strokeStyle = l.col;
      ctx.beginPath();
      ctx.moveTo(l.x1, l.y1);
      ctx.lineTo(l.x2, l.y2);
      ctx.stroke();
    }
    // Axes
    ctx.strokeStyle = "#0a0e1a";
    ctx.lineWidth = 1.3;
    const ox = project(0, 0, 0);
    const xa = project(1, 0, 0);
    const ya = project(0, 1, 0);
    const za = project(0, 0, zMax);
    ctx.beginPath();
    ctx.moveTo(ox.x, ox.y);
    ctx.lineTo(xa.x, xa.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(ox.x, ox.y);
    ctx.lineTo(ya.x, ya.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(ox.x, ox.y);
    ctx.lineTo(za.x, za.y);
    ctx.stroke();
    ctx.fillStyle = "#5b6478";
    ctx.font = "10px ui-sans-serif";
    ctx.fillText("x", xa.x + 4, xa.y + 4);
    ctx.fillText("y", ya.x + 4, ya.y + 4);
    ctx.fillText("z", za.x + 4, za.y + 4);
  }, [fn, range, rotX, rotY]);

  function handlePointerDown(e: React.PointerEvent) {
    dragRef.current = { x: e.clientX, y: e.clientY };
    (e.target as Element).setPointerCapture(e.pointerId);
  }
  function handlePointerMove(e: React.PointerEvent) {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    dragRef.current = { x: e.clientX, y: e.clientY };
    setRotY((r) => r + dx * 0.01);
    setRotX((r) => r + dy * 0.01);
  }
  function handlePointerUp() {
    dragRef.current = null;
  }

  return (
    <div className="rounded-xl border border-hair bg-paper p-4">
      <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
        3D Surface Plotter
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="font-mono text-xs text-muted">z =</span>
        <input
          type="text"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          spellCheck={false}
          placeholder="e.g. sin(x)*cos(y)"
          className="focus-ring flex-1 rounded-md border border-hair bg-offwhite px-2 py-1 font-mono text-xs text-ink"
        />
        <label className="flex items-center gap-1 text-[11px] text-muted">
          range ±
          <input
            type="number"
            value={range}
            onChange={(e) =>
              setRange(Math.max(0.5, Math.min(50, Number(e.target.value))))
            }
            className="w-14 rounded border border-hair bg-offwhite px-2 py-1 text-ink"
          />
        </label>
      </div>
      {error && (
        <div className="mt-2 rounded border border-red-200 bg-red-50 px-2 py-1 text-[11px] text-red-700">
          {error}
        </div>
      )}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ width: "100%", height: `${height}px`, touchAction: "pan-y" }}
        className="mt-3 cursor-grab rounded-md border border-hair bg-paper active:cursor-grabbing"
      />
      <div className="mt-2 text-[10px] text-muted">
        Drag to rotate. Supports x, y, sin/cos/tan, ln, log, exp, sqrt, abs,
        pi, e. No eval — expressions are parsed by a hand-written parser.
      </div>
    </div>
  );
}

function heightColor(t: number): string {
  // Blue → teal → yellow → red, purely cosmetic
  const clamped = Math.max(0, Math.min(1, t));
  const r = Math.round(255 * Math.min(1, 2 * clamped));
  const g = Math.round(255 * Math.min(1, 2 * (1 - Math.abs(clamped - 0.5))));
  const b = Math.round(255 * Math.min(1, 2 * (1 - clamped)));
  return `rgb(${r},${g},${b})`;
}
