"use client";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * 2D function grapher. Accepts user-entered expressions in a tiny
 * subset of math syntax (x is the variable; supports + - * / ^, sin/cos/tan,
 * ln, log, exp, sqrt, abs, pi, e, parentheses). No eval — we compile the
 * expression to a function via a hand-written recursive descent parser,
 * so there's no code injection risk.
 */

type Tokens = { type: "num" | "ident" | "op" | "paren"; value: string }[];

function tokenize(input: string): Tokens {
  const tokens: Tokens = [];
  let i = 0;
  const s = input.replace(/\s+/g, "");
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

type Node =
  | { kind: "num"; value: number }
  | { kind: "var" }
  | { kind: "unary"; op: "-"; arg: Node }
  | { kind: "binary"; op: "+" | "-" | "*" | "/" | "^"; left: Node; right: Node }
  | { kind: "call"; name: string; args: Node[] };

function parse(input: string): Node {
  const tokens = tokenize(input);
  let pos = 0;

  function peek() {
    return tokens[pos];
  }
  function eat() {
    return tokens[pos++];
  }
  function expect(type: string, value?: string) {
    const t = eat();
    if (!t || t.type !== type || (value && t.value !== value)) {
      throw new Error(
        `Expected ${value || type}, got ${t ? t.value : "end of input"}`
      );
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
      const exp = parsePow();
      return { kind: "binary", op: "^", left: base, right: exp };
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
    if (!t) throw new Error("Unexpected end of expression");
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
      if (name === "x") return { kind: "var" };
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
    throw new Error(`Unexpected token: ${t.value}`);
  }

  const ast = parseExpr();
  if (pos < tokens.length) {
    throw new Error(`Unexpected trailing input: ${tokens[pos].value}`);
  }
  return ast;
}

const ALLOWED_FNS: Record<string, (...a: number[]) => number> = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  sinh: Math.sinh,
  cosh: Math.cosh,
  tanh: Math.tanh,
  ln: Math.log,
  log: (x) => Math.log10(x),
  exp: Math.exp,
  sqrt: Math.sqrt,
  abs: Math.abs,
  floor: Math.floor,
  ceil: Math.ceil,
  round: Math.round,
  sign: Math.sign,
};

function evalNode(node: Node, x: number): number {
  switch (node.kind) {
    case "num":
      return node.value;
    case "var":
      return x;
    case "unary":
      return -evalNode(node.arg, x);
    case "binary": {
      const l = evalNode(node.left, x);
      const r = evalNode(node.right, x);
      switch (node.op) {
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
      const fn = ALLOWED_FNS[node.name];
      if (!fn) throw new Error(`Unknown function: ${node.name}`);
      const args = node.args.map((a) => evalNode(a, x));
      return fn(...args);
    }
  }
}

function compile(expr: string): (x: number) => number {
  const ast = parse(expr);
  return (x: number) => evalNode(ast, x);
}

const COLORS = ["#ec4899", "#4f46e5", "#10b981", "#f59e0b", "#06b6d4"];

type Plot = { expr: string; color: string; visible: boolean };

export default function GraphingCalculator({
  initialExprs = ["x^2"],
  height = 360,
}: {
  initialExprs?: string[];
  height?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [plots, setPlots] = useState<Plot[]>(
    initialExprs.map((e, i) => ({
      expr: e,
      color: COLORS[i % COLORS.length],
      visible: true,
    }))
  );
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [yMin, setYMin] = useState(-10);
  const [yMax, setYMax] = useState(10);
  const [parseError, setParseError] = useState<string>("");

  const compiled = useMemo(() => {
    const out: { fn: (x: number) => number | null; color: string }[] = [];
    setParseError("");
    for (const p of plots) {
      if (!p.visible || !p.expr.trim()) {
        out.push({ fn: () => null, color: p.color });
        continue;
      }
      try {
        const f = compile(p.expr);
        out.push({
          fn: (x: number) => {
            try {
              const y = f(x);
              if (!isFinite(y)) return null;
              return y;
            } catch {
              return null;
            }
          },
          color: p.color,
        });
      } catch (e: any) {
        setParseError(`"${p.expr}": ${e.message}`);
        out.push({ fn: () => null, color: p.color });
      }
    }
    return out;
  }, [plots]);

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

    // Grid
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    const xStep = niceStep((xMax - xMin) / 10);
    const yStep = niceStep((yMax - yMin) / 10);
    for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      const px = ((x - xMin) / (xMax - xMin)) * w;
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, h);
      ctx.stroke();
    }
    for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      const py = h - ((y - yMin) / (yMax - yMin)) * h;
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(w, py);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "#0a0e1a";
    ctx.lineWidth = 1.5;
    if (xMin <= 0 && xMax >= 0) {
      const x0 = ((0 - xMin) / (xMax - xMin)) * w;
      ctx.beginPath();
      ctx.moveTo(x0, 0);
      ctx.lineTo(x0, h);
      ctx.stroke();
    }
    if (yMin <= 0 && yMax >= 0) {
      const y0 = h - ((0 - yMin) / (yMax - yMin)) * h;
      ctx.beginPath();
      ctx.moveTo(0, y0);
      ctx.lineTo(w, y0);
      ctx.stroke();
    }

    // Tick labels
    ctx.fillStyle = "#5b6478";
    ctx.font = "10px ui-sans-serif";
    for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      if (Math.abs(x) < 1e-9) continue;
      const px = ((x - xMin) / (xMax - xMin)) * w;
      const py = h - ((0 - yMin) / (yMax - yMin)) * h;
      ctx.fillText(formatNum(x), px + 2, Math.max(10, Math.min(h - 2, py + 11)));
    }
    for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      if (Math.abs(y) < 1e-9) continue;
      const px = ((0 - xMin) / (xMax - xMin)) * w;
      const py = h - ((y - yMin) / (yMax - yMin)) * h;
      ctx.fillText(formatNum(y), Math.max(2, Math.min(w - 20, px + 3)), py - 2);
    }

    // Plot curves
    const N = Math.max(400, Math.floor(w * 2));
    for (const { fn, color } of compiled) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      let drawing = false;
      for (let i = 0; i <= N; i++) {
        const x = xMin + ((xMax - xMin) * i) / N;
        const y = fn(x);
        if (y === null || y < yMin - 1e5 || y > yMax + 1e5) {
          drawing = false;
          continue;
        }
        const px = ((x - xMin) / (xMax - xMin)) * w;
        const py = h - ((y - yMin) / (yMax - yMin)) * h;
        if (!drawing) {
          ctx.moveTo(px, py);
          drawing = true;
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.stroke();
    }
  }, [compiled, xMin, xMax, yMin, yMax, height]);

  function updatePlot(i: number, next: Partial<Plot>) {
    setPlots((p) => p.map((pl, idx) => (idx === i ? { ...pl, ...next } : pl)));
  }
  function addPlot() {
    if (plots.length >= 5) return;
    setPlots((p) => [
      ...p,
      { expr: "", color: COLORS[p.length % COLORS.length], visible: true },
    ]);
  }
  function removePlot(i: number) {
    setPlots((p) => p.filter((_, idx) => idx !== i));
  }

  return (
    <div className="rounded-xl border border-hair bg-paper p-4">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
          2D Graphing Calculator
        </div>
        <button
          onClick={addPlot}
          disabled={plots.length >= 5}
          className="text-[11px] text-orange hover:underline disabled:opacity-40"
        >
          + Add function
        </button>
      </div>
      <div className="mt-3 space-y-1.5">
        {plots.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <button
              onClick={() => updatePlot(i, { visible: !p.visible })}
              className="h-4 w-4 rounded-sm border border-hair"
              style={{ backgroundColor: p.visible ? p.color : "transparent" }}
              aria-label={`Toggle function ${i + 1}`}
            />
            <span className="font-mono text-xs text-muted">y =</span>
            <input
              type="text"
              value={p.expr}
              onChange={(e) => updatePlot(i, { expr: e.target.value })}
              placeholder="e.g. sin(x) + x/2"
              spellCheck={false}
              className="focus-ring flex-1 rounded-md border border-hair bg-offwhite px-2 py-1 font-mono text-xs text-ink"
            />
            {plots.length > 1 && (
              <button
                onClick={() => removePlot(i)}
                className="text-muted hover:text-orange"
                aria-label="Remove"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
      {parseError && (
        <div className="mt-2 rounded border border-red-200 bg-red-50 px-2 py-1 text-[11px] text-red-700">
          {parseError}
        </div>
      )}
      <div className="mt-3 grid grid-cols-4 gap-2 text-[11px] text-muted">
        <label className="flex flex-col">
          x min
          <input
            type="number"
            value={xMin}
            onChange={(e) => setXMin(Number(e.target.value))}
            className="rounded border border-hair bg-offwhite px-2 py-1 text-ink"
          />
        </label>
        <label className="flex flex-col">
          x max
          <input
            type="number"
            value={xMax}
            onChange={(e) => setXMax(Number(e.target.value))}
            className="rounded border border-hair bg-offwhite px-2 py-1 text-ink"
          />
        </label>
        <label className="flex flex-col">
          y min
          <input
            type="number"
            value={yMin}
            onChange={(e) => setYMin(Number(e.target.value))}
            className="rounded border border-hair bg-offwhite px-2 py-1 text-ink"
          />
        </label>
        <label className="flex flex-col">
          y max
          <input
            type="number"
            value={yMax}
            onChange={(e) => setYMax(Number(e.target.value))}
            className="rounded border border-hair bg-offwhite px-2 py-1 text-ink"
          />
        </label>
      </div>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: `${height}px` }}
        className="mt-3 rounded-md border border-hair bg-paper"
      />
      <div className="mt-2 text-[10px] text-muted">
        Supported: x, + - * / ^, sin/cos/tan, asin/acos/atan, ln, log, exp,
        sqrt, abs, pi, e. Expressions are parsed by a hand-written parser — no
        eval, no code injection.
      </div>
    </div>
  );
}

function niceStep(raw: number): number {
  if (raw <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const base = raw / pow;
  if (base < 1.5) return pow;
  if (base < 3) return 2 * pow;
  if (base < 7) return 5 * pow;
  return 10 * pow;
}

function formatNum(n: number): string {
  if (Math.abs(n) < 1e-9) return "0";
  if (Math.abs(n) >= 1000 || Math.abs(n) < 0.01) return n.toExponential(1);
  return n.toFixed(n === Math.round(n) ? 0 : 2);
}
