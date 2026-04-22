"use client";
import katex from "katex";
import { useMemo, type ReactNode } from "react";
import { autoLatex } from "@/lib/autoLatex";

/**
 * Lightweight markdown renderer for assistant chat output. Handles the
 * subset the model actually emits — headings, paragraphs, fenced code,
 * lists, blockquotes, horizontal rules, plus inline bold/italic/code/links
 * — and delegates math to KaTeX. Intentionally not a full CommonMark
 * implementation; we don't accept user-authored markdown here so we can
 * skip the long-tail edge cases.
 */
export default function Markdown({ children }: { children: string }) {
  const blocks = useMemo(() => parseBlocks(children ?? ""), [children]);
  return (
    <div className="space-y-3 text-[15.5px] leading-relaxed">
      {blocks.map((b, i) => renderBlock(b, i))}
    </div>
  );
}

type Block =
  | { type: "p"; text: string }
  | { type: "h"; level: 1 | 2 | 3 | 4 | 5 | 6; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; lang: string; text: string }
  | { type: "quote"; text: string }
  | { type: "hr" }
  | { type: "math"; tex: string };

function parseBlocks(input: string): Block[] {
  const lines = input.split("\n");
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      i++;
      const buf: string[] = [];
      while (i < lines.length && !lines[i].startsWith("```")) {
        buf.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++; // closing fence
      blocks.push({ type: "code", lang, text: buf.join("\n") });
      continue;
    }

    const trimmed = line.trim();
    if (trimmed.startsWith("$$")) {
      const after = trimmed.slice(2);
      if (after.endsWith("$$") && after.length >= 2) {
        blocks.push({ type: "math", tex: after.slice(0, -2).trim() });
        i++;
        continue;
      }
      const buf: string[] = [];
      if (after) buf.push(after);
      i++;
      while (i < lines.length && !lines[i].trim().endsWith("$$")) {
        buf.push(lines[i]);
        i++;
      }
      if (i < lines.length) {
        const last = lines[i].trim().slice(0, -2);
        if (last) buf.push(last);
        i++;
      }
      blocks.push({ type: "math", tex: buf.join("\n").trim() });
      continue;
    }

    if (/^\s*(---|\*\*\*|___)\s*$/.test(line)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    const h = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (h) {
      blocks.push({
        type: "h",
        level: h[1].length as 1 | 2 | 3 | 4 | 5 | 6,
        text: h[2],
      });
      i++;
      continue;
    }

    if (/^\s*>/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) {
        buf.push(lines[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      blocks.push({ type: "quote", text: buf.join("\n") });
      continue;
    }

    if (/^\s*[-*+]\s+/.test(line)) {
      const items = collectListItems(lines, i, /^\s*[-*+]\s+/);
      i = items.next;
      blocks.push({ type: "ul", items: items.list });
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items = collectListItems(lines, i, /^\s*\d+\.\s+/);
      i = items.next;
      blocks.push({ type: "ol", items: items.list });
      continue;
    }

    if (trimmed === "") {
      i++;
      continue;
    }

    const buf: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("```") &&
      !lines[i].trim().startsWith("$$") &&
      !/^(#{1,6})\s+/.test(lines[i]) &&
      !/^\s*>/.test(lines[i]) &&
      !/^\s*[-*+]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !/^\s*(---|\*\*\*|___)\s*$/.test(lines[i])
    ) {
      buf.push(lines[i]);
      i++;
    }
    blocks.push({ type: "p", text: buf.join("\n") });
  }
  return blocks;
}

// Continuation lines of a list item are merged into the same item if they
// are indented past the marker. Keeps the parser tolerant of the soft-wrap
// the model often produces.
function collectListItems(
  lines: string[],
  start: number,
  marker: RegExp
): { list: string[]; next: number } {
  const list: string[] = [];
  let i = start;
  while (i < lines.length) {
    const m = marker.exec(lines[i]);
    if (m) {
      list.push(lines[i].slice(m[0].length));
      i++;
      while (
        i < lines.length &&
        lines[i].trim() !== "" &&
        !marker.test(lines[i]) &&
        /^\s{2,}\S/.test(lines[i])
      ) {
        list[list.length - 1] += "\n" + lines[i].trim();
        i++;
      }
      continue;
    }
    break;
  }
  return { list, next: i };
}

const HEADING_CLASSES: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: "mt-2 font-serif text-[22px] font-normal leading-tight text-ink",
  2: "mt-2 font-serif text-[19px] font-normal leading-tight text-ink",
  3: "mt-1 font-serif text-[17px] font-normal leading-tight text-ink",
  4: "mt-1 text-[15.5px] font-semibold text-ink",
  5: "mt-1 text-[14px] font-semibold text-ink",
  6: "mt-1 text-[13px] font-semibold uppercase tracking-wide text-muted",
};

function renderBlock(b: Block, key: number): ReactNode {
  switch (b.type) {
    case "p":
      return (
        <p key={key} className="text-body">
          {renderInline(b.text)}
        </p>
      );
    case "h": {
      const Tag = (`h${b.level}` as unknown) as keyof JSX.IntrinsicElements;
      return (
        <Tag key={key} className={HEADING_CLASSES[b.level]}>
          {renderInline(b.text)}
        </Tag>
      );
    }
    case "ul":
      return (
        <ul key={key} className="list-disc space-y-1 pl-5 marker:text-muted">
          {b.items.map((it, i) => (
            <li key={i} className="text-body">
              {renderInline(it)}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={key} className="list-decimal space-y-1 pl-5 marker:text-muted">
          {b.items.map((it, i) => (
            <li key={i} className="text-body">
              {renderInline(it)}
            </li>
          ))}
        </ol>
      );
    case "code":
      return <TerminalCode key={key} lang={b.lang} text={b.text} />;
    case "quote":
      return (
        <blockquote
          key={key}
          className="border-l-2 border-orange/40 bg-orange-tint/30 px-3 py-2 text-body"
        >
          {renderInline(b.text)}
        </blockquote>
      );
    case "hr":
      return <hr key={key} className="my-2 border-hair" />;
    case "math":
      return <DisplayMath key={key} tex={b.tex} />;
  }
}

function DisplayMath({ tex }: { tex: string }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(tex, {
        displayMode: true,
        throwOnError: false,
        output: "html",
        strict: "ignore",
        trust: false,
      });
    } catch {
      return tex;
    }
  }, [tex]);
  return (
    <div
      className="my-1 overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// Inline pass: tokenize text into runs of math, code, bold, italic, link,
// or plain text. Math goes through autoLatex first so plain-text patterns
// like x^2 become $x^{2}$ before katex sees them.
function renderInline(input: string): ReactNode[] {
  const prepared = autoLatex(input);
  const out: ReactNode[] = [];
  let key = 0;
  let buf = "";

  const flushText = () => {
    if (!buf) return;
    out.push(...renderEmphasisAndLinks(buf, () => key++));
    buf = "";
  };

  let i = 0;
  while (i < prepared.length) {
    const ch = prepared[i];

    // Inline code: `...`
    if (ch === "`") {
      const end = prepared.indexOf("`", i + 1);
      if (end !== -1) {
        flushText();
        out.push(
          <code
            key={`c-${key++}`}
            className="rounded bg-[#11161d] px-1.5 py-0.5 font-mono text-[13px] text-emerald-300"
          >
            {prepared.slice(i + 1, end)}
          </code>
        );
        i = end + 1;
        continue;
      }
    }

    // Display math $$...$$
    if (ch === "$" && prepared[i + 1] === "$") {
      const end = prepared.indexOf("$$", i + 2);
      if (end !== -1) {
        flushText();
        out.push(<DisplayMath key={`dm-${key++}`} tex={prepared.slice(i + 2, end).trim()} />);
        i = end + 2;
        continue;
      }
    }

    // Inline math $...$
    if (ch === "$") {
      const end = prepared.indexOf("$", i + 1);
      if (end !== -1 && end > i + 1 && !/\n/.test(prepared.slice(i + 1, end))) {
        flushText();
        const tex = prepared.slice(i + 1, end);
        out.push(<InlineMath key={`im-${key++}`} tex={tex} />);
        i = end + 1;
        continue;
      }
    }

    // \( ... \)
    if (ch === "\\" && prepared[i + 1] === "(") {
      const end = prepared.indexOf("\\)", i + 2);
      if (end !== -1) {
        flushText();
        out.push(<InlineMath key={`im-${key++}`} tex={prepared.slice(i + 2, end)} />);
        i = end + 2;
        continue;
      }
    }

    // \[ ... \]
    if (ch === "\\" && prepared[i + 1] === "[") {
      const end = prepared.indexOf("\\]", i + 2);
      if (end !== -1) {
        flushText();
        out.push(<DisplayMath key={`dm-${key++}`} tex={prepared.slice(i + 2, end).trim()} />);
        i = end + 2;
        continue;
      }
    }

    buf += ch;
    i++;
  }
  flushText();
  return out;
}

/**
 * Fenced code blocks render as a dark "terminal" card: a slate title bar with
 * three mac-style dots and a language label, a near-black body with a
 * lightweight Java syntax highlighter. Fancy enough to feel like an IDE,
 * regex-driven enough to stay readable and cheap.
 */
function TerminalCode({ lang, text }: { lang: string; text: string }) {
  const label = (lang || "code").toLowerCase();
  const highlighted = useMemo(
    () => (isJavaLang(label) ? highlightJava(text) : [text]),
    [label, text]
  );
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-800/70 bg-[#0b0f14] shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-800/70 bg-[#11161d] px-3 py-1.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
        </div>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-zinc-500">
          {label}
        </span>
      </div>
      <pre className="overflow-x-auto px-4 py-3 text-[13px] leading-relaxed text-zinc-100">
        <code className="font-mono">{highlighted}</code>
      </pre>
    </div>
  );
}

function isJavaLang(lang: string): boolean {
  return lang === "" || lang === "code" || lang === "java" || lang === "jsh";
}

const JAVA_KEYWORDS = new Set([
  "abstract", "assert", "break", "case", "catch", "class", "const", "continue",
  "default", "do", "else", "enum", "extends", "final", "finally", "for", "goto",
  "if", "implements", "import", "instanceof", "interface", "native", "new",
  "package", "private", "protected", "public", "return", "static", "strictfp",
  "super", "switch", "synchronized", "this", "throw", "throws", "transient",
  "try", "void", "volatile", "while", "true", "false", "null",
]);

const JAVA_TYPES = new Set([
  "int", "double", "boolean", "char", "byte", "short", "long", "float",
  "String", "Integer", "Double", "Boolean", "Character", "Object", "ArrayList",
  "List", "Math", "System",
]);

/**
 * Single-pass scanner that emits colored spans for Java comments, strings,
 * keywords, types, and numbers. Not a real parser — approximate but robust
 * enough for the CED snippets we ship.
 */
function highlightJava(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  let buf = "";
  let key = 0;
  const flush = () => {
    if (buf) {
      out.push(buf);
      buf = "";
    }
  };
  const push = (node: ReactNode) => {
    flush();
    out.push(node);
  };

  let i = 0;
  while (i < code.length) {
    const c = code[i];

    // line comment
    if (c === "/" && code[i + 1] === "/") {
      let end = code.indexOf("\n", i);
      if (end === -1) end = code.length;
      push(
        <span key={`c-${key++}`} className="italic text-zinc-500">
          {code.slice(i, end)}
        </span>
      );
      i = end;
      continue;
    }
    // block comment
    if (c === "/" && code[i + 1] === "*") {
      const end = code.indexOf("*/", i + 2);
      const stop = end === -1 ? code.length : end + 2;
      push(
        <span key={`bc-${key++}`} className="italic text-zinc-500">
          {code.slice(i, stop)}
        </span>
      );
      i = stop;
      continue;
    }
    // string literal
    if (c === '"') {
      let end = i + 1;
      while (end < code.length && code[end] !== '"') {
        if (code[end] === "\\" && end + 1 < code.length) end += 2;
        else end++;
      }
      end = Math.min(end + 1, code.length);
      push(
        <span key={`s-${key++}`} className="text-emerald-300">
          {code.slice(i, end)}
        </span>
      );
      i = end;
      continue;
    }
    // char literal
    if (c === "'") {
      let end = i + 1;
      while (end < code.length && code[end] !== "'") {
        if (code[end] === "\\" && end + 1 < code.length) end += 2;
        else end++;
      }
      end = Math.min(end + 1, code.length);
      push(
        <span key={`ch-${key++}`} className="text-emerald-300">
          {code.slice(i, end)}
        </span>
      );
      i = end;
      continue;
    }
    // identifier / keyword / type
    if (/[A-Za-z_$]/.test(c)) {
      let end = i;
      while (end < code.length && /[A-Za-z0-9_$]/.test(code[end])) end++;
      const word = code.slice(i, end);
      if (JAVA_KEYWORDS.has(word)) {
        push(
          <span key={`k-${key++}`} className="text-indigo-300">
            {word}
          </span>
        );
      } else if (JAVA_TYPES.has(word)) {
        push(
          <span key={`t-${key++}`} className="text-cyan-300">
            {word}
          </span>
        );
      } else {
        buf += word;
      }
      i = end;
      continue;
    }
    // number
    if (/[0-9]/.test(c)) {
      let end = i;
      while (end < code.length && /[0-9._A-Fa-fx]/.test(code[end])) end++;
      push(
        <span key={`n-${key++}`} className="text-amber-300">
          {code.slice(i, end)}
        </span>
      );
      i = end;
      continue;
    }
    buf += c;
    i++;
  }
  flush();
  return out;
}

function InlineMath({ tex }: { tex: string }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(tex, {
        displayMode: false,
        throwOnError: false,
        output: "html",
        strict: "ignore",
        trust: false,
      });
    } catch {
      return tex;
    }
  }, [tex]);
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

// Emphasis + links. We process bold (**…**) before italic (*…* / _…_) so
// the longer marker wins, then handle [text](url). Plain text retains
// soft-wrap whitespace.
function renderEmphasisAndLinks(
  text: string,
  nextKey: () => number
): ReactNode[] {
  const tokens = tokenizeEmphasis(text);
  return tokens.map((t) => {
    const k = nextKey();
    if (t.kind === "text") {
      return (
        <span key={`t-${k}`} className="whitespace-pre-wrap">
          {linkify(t.value, nextKey)}
        </span>
      );
    }
    if (t.kind === "bold") {
      return (
        <strong key={`b-${k}`} className="font-semibold text-ink">
          {linkify(t.value, nextKey)}
        </strong>
      );
    }
    return (
      <em key={`i-${k}`} className="italic">
        {linkify(t.value, nextKey)}
      </em>
    );
  });
}

type EmToken = { kind: "text" | "bold" | "italic"; value: string };

function tokenizeEmphasis(input: string): EmToken[] {
  const out: EmToken[] = [];
  let i = 0;
  let buf = "";
  const flush = () => {
    if (buf) {
      out.push({ kind: "text", value: buf });
      buf = "";
    }
  };
  while (i < input.length) {
    if (input[i] === "*" && input[i + 1] === "*") {
      const end = input.indexOf("**", i + 2);
      if (end !== -1) {
        flush();
        out.push({ kind: "bold", value: input.slice(i + 2, end) });
        i = end + 2;
        continue;
      }
    }
    if (input[i] === "_" && input[i + 1] === "_") {
      const end = input.indexOf("__", i + 2);
      if (end !== -1) {
        flush();
        out.push({ kind: "bold", value: input.slice(i + 2, end) });
        i = end + 2;
        continue;
      }
    }
    if (input[i] === "*") {
      const end = input.indexOf("*", i + 1);
      if (end !== -1 && end > i + 1) {
        flush();
        out.push({ kind: "italic", value: input.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }
    if (input[i] === "_" && (i === 0 || /\s|[(\[{]/.test(input[i - 1]))) {
      const end = input.indexOf("_", i + 1);
      if (end !== -1 && end > i + 1) {
        flush();
        out.push({ kind: "italic", value: input.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }
    buf += input[i];
    i++;
  }
  flush();
  return out;
}

const LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

function linkify(text: string, nextKey: () => number): ReactNode[] {
  const parts: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;
  while ((m = LINK_RE.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <a
        key={`l-${nextKey()}`}
        href={m[2]}
        target="_blank"
        rel="noreferrer"
        className="text-orange-ink underline decoration-orange/40 underline-offset-2 hover:decoration-orange"
      >
        {m[1]}
      </a>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length > 0 ? parts : [text];
}
