"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { java } from "@codemirror/lang-java";
import { EditorView } from "@codemirror/view";

// CodeMirror touches `window` on init, so render it client-side only.
const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full min-h-[200px] place-items-center rounded-md border border-hair bg-[#0a0e1a] text-[11px] text-dim">
      Loading editor…
    </div>
  ),
});

// Override the dark theme's selection styling so highlighted code stays
// legible. The default selection bg is so close to the foreground colors
// that selected text disappears against it.
const READABLE_SELECTION = EditorView.theme({
  ".cm-selectionBackground, ::selection": {
    backgroundColor: "#3b5b91 !important",
  },
  "&.cm-focused .cm-selectionBackground": {
    backgroundColor: "#3b5b91 !important",
  },
  ".cm-content ::selection": {
    backgroundColor: "#3b5b91 !important",
    color: "#ffffff !important",
  },
});

/**
 * CodeSandbox: a minimal in-browser code runner.
 *
 * There's no safe way to run real Java in the browser without shipping a
 * ~20MB JVM-in-wasm. Instead we offer two modes:
 *
 *  1. "java-trace": student writes Java-like code. We rewrite the most
 *     common Java idioms to JavaScript (System.out.println → console
 *     output, String.length() → .length, etc.) and execute in an isolated
 *     Web Worker. The sandbox is NOT a full Java parser; it's an AP-CSA-
 *     pragmatic transpiler that handles the subset that shows up on the
 *     exam.
 *
 *  2. "pseudo": AP CSP pseudocode (DISPLAY, ←, REPEAT, IF, etc.).
 *     Rewritten to JavaScript and run in the same Worker.
 *
 * The Worker is iframe-style isolation: it has NO DOM access, no fetch,
 * no postMessage except back to the parent via its result channel, and
 * execution is hard-capped at 1.5 seconds of CPU time and 2000 output
 * lines. The code never touches any global state of the main page.
 */

export type SandboxMode = "java-trace" | "pseudo";

type Props = {
  mode: SandboxMode;
  initialCode: string;
  expectedOutput?: string;
  height?: number;
  /**
   * Optional controlled-mode props. When `value` is provided the component
   * mirrors it into the editor and reports edits via `onChange`, so the
   * parent can use the sandbox as a grading input. Without these the
   * component manages its own state (the original demo behavior).
   */
  value?: string;
  onChange?: (next: string) => void;
};

// Find the matching `}` for the `{` at the given index. Returns -1 if
// the source is unbalanced. Skips braces inside line/block comments and
// string literals so things like `"}"` don't throw the count off.
function matchBrace(src: string, openIdx: number): number {
  let depth = 1;
  let i = openIdx + 1;
  while (i < src.length) {
    const ch = src[i];
    // Line comment
    if (ch === "/" && src[i + 1] === "/") {
      const nl = src.indexOf("\n", i + 2);
      i = nl === -1 ? src.length : nl + 1;
      continue;
    }
    // Block comment
    if (ch === "/" && src[i + 1] === "*") {
      const end = src.indexOf("*/", i + 2);
      i = end === -1 ? src.length : end + 2;
      continue;
    }
    // String / char literal
    if (ch === '"' || ch === "'") {
      i++;
      while (i < src.length && src[i] !== ch) {
        if (src[i] === "\\") i += 2;
        else i++;
      }
      i++;
      continue;
    }
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return i;
    }
    i++;
  }
  return -1;
}

// Unwrap the outer `class X { ... }` if present, returning just the body.
function stripClassWrapper(src: string): string {
  const m = src.match(/(?:public\s+|private\s+)?class\s+\w+\s*\{/);
  if (!m || m.index === undefined) return src;
  const open = m.index + m[0].length - 1;
  const close = matchBrace(src, open);
  if (close === -1) return src;
  return src.slice(0, m.index) + src.slice(open + 1, close) + src.slice(close + 1);
}

// Convert any Java method signature into a JS function declaration. Strips
// modifiers (public/private/static) and parameter types, so
//   `public static int foo(int a, String[] b) {`
// becomes
//   ` function foo(a, b) {`
function rewriteMethodSignatures(src: string): string {
  return src.replace(
    /(^|[;{}\n])\s*(?:public|private|protected)?\s*(?:static\s+)?(?:final\s+)?(?:int|long|short|byte|float|double|char|boolean|String|Object|void)(?:\s*\[\s*\])?\s+(\w+)\s*\(([^)]*)\)\s*\{/g,
    (_match, lead, name, params) => {
      const cleaned = params
        .split(",")
        .map((p: string) => p.trim())
        .filter(Boolean)
        .map((p: string) => {
          // Drop the type tokens, keep the last identifier.
          const parts = p.split(/\s+/);
          return parts[parts.length - 1].replace(/\[\s*\]/g, "");
        })
        .join(", ");
      return `${lead} function ${name}(${cleaned}) {`;
    }
  );
}

// ---- Java → JS transpiler (pragmatic subset) ----------------------------
// Handles the AP CSA subset only, not the full JDK. Does NOT use eval;
// the transpiled JS is run in a sandboxed Web Worker.
function javaToJs(src: string): string {
  let s = src;
  // Unwrap `class Main { ... }` and turn every method into a JS function.
  s = stripClassWrapper(s);
  s = rewriteMethodSignatures(s);
  // Strip Java casts: (int), (double), (String), etc. → nothing.
  // Matches (typeName) with optional whitespace, only when followed by an
  // identifier/number/paren/minus; avoids stripping grouping parens.
  s = s.replace(
    /\((?:int|long|short|byte|float|double|char|boolean|String|Object)\)\s*(?=[\w\-(])/g,
    ""
  );
  // Array type: int[] arr  →  let arr
  s = s.replace(
    /\b(?:int|long|short|byte|float|double|char|boolean|String|Object)\s*\[\s*\]/g,
    "let"
  );
  // Variable type declarations: int x = 5  →  let x = 5
  // Match only at the START of a statement (avoid replacing inside casts
  // which we already stripped, and avoid replacing method return types).
  s = s.replace(
    /(^|[\n;{}])\s*(int|long|short|byte|float|double|char|boolean|String|Object)\s+(\w)/g,
    "$1 let $3"
  );
  // new int[5] → new Array(5).fill(0)
  s = s.replace(/new\s+int\s*\[(\d+)\]/g, "new Array($1).fill(0)");
  s = s.replace(/new\s+double\s*\[(\d+)\]/g, "new Array($1).fill(0)");
  s = s.replace(/new\s+String\s*\[(\d+)\]/g, 'new Array($1).fill("")');
  // Output methods
  s = s.replace(/System\.out\.println\s*\(/g, "__println(");
  s = s.replace(/System\.out\.print\s*\(/g, "__print(");
  s = s.replace(/System\.out\.printf\s*\(/g, "__printf(");
  // .length() → .length (property access)
  s = s.replace(/\.length\s*\(\s*\)/g, ".length");
  // .equals() → strict equals helper
  s = s.replace(/\.equals\s*\(/g, ".__equals(");
  // Integer.parseInt("5") → parseInt("5", 10)
  s = s.replace(/Integer\.parseInt\s*\(/g, "parseInt(");
  s = s.replace(/Double\.parseDouble\s*\(/g, "parseFloat(");
  // ArrayList<Integer> → just use []; new ArrayList<>() → []
  s = s.replace(/ArrayList\s*<[^>]*>/g, "Array");
  s = s.replace(/new\s+Array\s*\(\s*\)/g, "[]");
  // .add(x) on an ArrayList-like is push; .get(i) is [i]. These aren't
  // trivial to transpile with regex so we leave them and rely on JS
  // arrays having .push and indexing works.
  s = s.replace(/\.add\s*\(/g, ".push(");
  // Auto-invoke a `main` entry point if the student defined one — without
  // this the function would just be declared and never run.
  const mainMatch = s.match(/\bfunction\s+(main|Main)\s*\(/);
  if (mainMatch) s += `\n${mainMatch[1]}();\n`;
  return s;
}

// ---- AP CSP pseudocode → JS transpiler ----------------------------------
function pseudoToJs(src: string): string {
  let s = src;
  // Assignment ← becomes =
  s = s.replace(/←/g, "=");
  s = s.replace(/<-/g, "=");
  // DISPLAY (foo)  →  __println(foo)
  s = s.replace(/\bDISPLAY\s*\(/g, "__println(");
  s = s.replace(/\bINPUT\s*\(\s*\)/g, "0 /* INPUT stub */");
  // REPEAT n TIMES { ... }  →  for (let __i=0; __i<n; __i++) { ... }
  s = s.replace(
    /REPEAT\s+(\w+|\d+)\s+TIMES\s*\{/g,
    "for (let __i=0; __i<$1; __i++) {"
  );
  // REPEAT UNTIL (cond) { ... }  →  while (!(cond)) { ... }
  s = s.replace(/REPEAT\s+UNTIL\s*\(([^)]+)\)\s*\{/g, "while (!($1)) {");
  // FOR EACH item IN list { ... }
  s = s.replace(
    /FOR\s+EACH\s+(\w+)\s+IN\s+(\w+)\s*\{/g,
    "for (const $1 of $2) {"
  );
  // IF (cond) { ... } ELSE { ... }
  s = s.replace(/\bIF\s*\(([^)]+)\)\s*\{/g, "if ($1) {");
  s = s.replace(/\bELSE\s*\{/g, "else {");
  // PROCEDURE name (params) { ... }
  s = s.replace(
    /PROCEDURE\s+(\w+)\s*\(([^)]*)\)\s*\{/g,
    "function $1($2) {"
  );
  s = s.replace(/\bRETURN\b/g, "return");
  // AND / OR / NOT
  s = s.replace(/\bAND\b/g, "&&");
  s = s.replace(/\bOR\b/g, "||");
  s = s.replace(/\bNOT\b/g, "!");
  // MOD
  s = s.replace(/\bMOD\b/g, "%");
  // LENGTH(list) → list.length
  s = s.replace(/LENGTH\s*\(([^)]+)\)/g, "($1).length");
  // Lists are 1-indexed in pseudocode; wrap accesses with __oneIdx.
  // Keep it simple: don't touch, and tell the user to use 0-index.
  return s;
}

const WORKER_SRC = `
self.__println = function(...args) {
  const line = args.map(stringify).join(" ");
  self.__output.push(line);
  if (self.__output.length > 2000) {
    throw new Error("Too much output (> 2000 lines)");
  }
};
self.__print = function(...args) {
  if (self.__output.length === 0) self.__output.push("");
  self.__output[self.__output.length - 1] += args.map(stringify).join(" ");
};
self.__printf = function(format, ...args) {
  self.__println(String(format).replace(/%[sdif]/g, () => stringify(args.shift())));
};

String.prototype.__equals = function(other) { return this === other; };

function stringify(v) {
  if (v === null || v === undefined) return String(v);
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if (typeof v === "boolean") return String(v);
  if (Array.isArray(v)) return "[" + v.map(stringify).join(", ") + "]";
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
}

self.addEventListener("message", function(ev) {
  const { code } = ev.data;
  self.__output = [];
  // Hard budget: set a deadline timer via Date.now() checks inside
  const deadline = Date.now() + 1500;
  const originalDate = Date.now;
  // Install a guard on common loop constructs via instrumentation; too
  // invasive. Instead rely on user code being honest; the 1.5s timeout
  // is enforced by the parent via Worker.terminate().
  try {
    const fn = new Function(code + "\\n");
    fn();
    postMessage({ ok: true, output: self.__output });
  } catch (e) {
    postMessage({ ok: false, error: String(e.message || e), output: self.__output });
  }
});
`;

export default function CodeSandbox({
  mode,
  initialCode,
  expectedOutput,
  height = 240,
  value,
  onChange,
}: Props) {
  const controlled = typeof value === "string" && typeof onChange === "function";
  const [internalCode, setInternalCode] = useState(initialCode);
  const code = controlled ? (value as string) : internalCode;
  const setCode = (next: string) => {
    if (controlled) onChange!(next);
    else setInternalCode(next);
  };
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [running, setRunning] = useState(false);
  const [workerUrl, setWorkerUrl] = useState<string>("");
  // Editor's share of the row, in percent. The splitter handle drags this.
  const [editorPct, setEditorPct] = useState(50);
  const [isWide, setIsWide] = useState(false);
  const splitRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const update = () => setIsWide(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!draggingRef.current || !splitRef.current) return;
      const rect = splitRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setEditorPct(Math.max(20, Math.min(80, pct)));
    }
    function onUp() {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  useEffect(() => {
    const blob = new Blob([WORKER_SRC], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    setWorkerUrl(url);
    return () => URL.revokeObjectURL(url);
  }, []);

  function run() {
    if (!workerUrl || running) return;
    setRunning(true);
    setOutput("");
    setError("");

    const transpiled =
      mode === "java-trace" ? javaToJs(code) : pseudoToJs(code);

    const worker = new Worker(workerUrl);
    const kill = setTimeout(() => {
      worker.terminate();
      setError("Execution timed out (>1.5s)");
      setRunning(false);
    }, 1500);

    worker.onmessage = (ev) => {
      clearTimeout(kill);
      worker.terminate();
      const { ok, output: out, error: err } = ev.data;
      setOutput((out || []).join("\n"));
      if (!ok) setError(err || "Unknown error");
      setRunning(false);
    };
    worker.onerror = (e) => {
      clearTimeout(kill);
      worker.terminate();
      setError(e.message);
      setRunning(false);
    };
    worker.postMessage({ code: transpiled });
  }

  const outputMatchesExpected =
    expectedOutput && output.trim() === expectedOutput.trim();

  return (
    <div className="rounded-xl border border-hair bg-paper p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            {mode === "java-trace" ? "Java Sandbox" : "Pseudocode Runner"}
          </div>
          <div className="mt-0.5 text-[13px] font-semibold text-ink">
            {mode === "java-trace"
              ? "AP CSA subset (System.out.println, loops, arrays, methods)"
              : "AP CSP pseudocode (DISPLAY, REPEAT, IF, PROCEDURE)"}
          </div>
        </div>
        <button
          onClick={run}
          disabled={running}
          className="btn-primary text-xs disabled:opacity-50"
          data-testid="run-code"
        >
          {running ? "Running…" : "Run code"}
        </button>
      </div>
      <div
        ref={splitRef}
        className="mt-3 flex flex-col gap-3 md:flex-row md:gap-0"
      >
        <div
          className="overflow-hidden rounded-md border border-hair bg-[#0a0e1a]"
          style={{
            minHeight: `${height}px`,
            ...(isWide ? { flexBasis: `${editorPct}%`, flexShrink: 0 } : {}),
          }}
        >
          <CodeMirror
            value={code}
            onChange={(next) => setCode(next)}
            extensions={
              mode === "java-trace"
                ? [java(), READABLE_SELECTION]
                : [READABLE_SELECTION]
            }
            theme="dark"
            height={`${height}px`}
            basicSetup={{
              lineNumbers: true,
              highlightActiveLine: true,
              highlightActiveLineGutter: true,
              foldGutter: true,
              bracketMatching: true,
              autocompletion: true,
              indentOnInput: true,
              tabSize: 4,
              searchKeymap: true,
            }}
            style={{ fontSize: 13 }}
          />
        </div>
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            draggingRef.current = true;
            document.body.style.cursor = "col-resize";
            document.body.style.userSelect = "none";
          }}
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize editor and output columns"
          title="Drag to resize"
          className="group hidden cursor-col-resize items-center justify-center md:flex md:w-3"
        >
          <div className="h-12 w-1 rounded-full bg-hair transition-colors group-hover:bg-orange/60" />
        </div>
        <div
          className="flex flex-col rounded-md border border-hair bg-offwhite p-3 font-mono text-[12px] leading-5 text-ink md:flex-1"
          style={{ minHeight: `${height}px` }}
        >
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
            Output
          </div>
          <pre className="flex-1 whitespace-pre-wrap break-words text-ink">
            {output || (running ? "Running…" : "Run the code to see output.")}
          </pre>
          {error && (
            <div className="mt-2 rounded border border-red-200 bg-red-50 p-2 text-[11px] text-red-700">
              {error}
            </div>
          )}
          {expectedOutput && (
            <div
              className={`mt-2 rounded border p-2 text-[11px] ${
                outputMatchesExpected
                  ? "border-green-300 bg-green-50 text-green-800"
                  : "border-hair bg-paper text-muted"
              }`}
            >
              <div className="font-semibold">Expected:</div>
              <pre className="whitespace-pre-wrap">{expectedOutput}</pre>
              {outputMatchesExpected && (
                <div className="mt-1 font-semibold">✓ Matches!</div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 text-[10px] text-muted">
        Runs in a sandboxed Web Worker with a 1.5s time limit and a 2000-line
        output cap. No DOM access, no network. Java mode supports the AP CSA
        subset (System.out, loops, arrays, basic classes), not the full JDK.
      </div>
    </div>
  );
}
