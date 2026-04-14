"use client";
import katex from "katex";
import { useMemo } from "react";
import { autoLatex } from "@/lib/autoLatex";

/**
 * Renders a string containing LaTeX math into React nodes.
 * Supports:  $...$   $$...$$   \( ... \)   \[ ... \]
 *
 * When `auto` is true, plain-text math notation like x^2, sqrt(x), (x-h)^2,
 * and a_n is converted to LaTeX before rendering.
 */
export default function Math({
  children,
  auto = false,
}: {
  children: string;
  auto?: boolean;
}) {
  const source = useMemo(
    () => (auto ? autoLatex(children) : children),
    [children, auto]
  );
  const nodes = useMemo(() => render(source), [source]);
  return <>{nodes}</>;
}

function render(input: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  // Match $$...$$, \[...\], $...$, \(...\) - in priority order via alternation
  // We run one regex; note that $$ must be handled before $.
  const re =
    /\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\$([^\n$]+?)\$|\\\(([\s\S]+?)\\\)/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(input)) !== null) {
    if (m.index > last) {
      out.push(
        <span key={`t-${key++}`} className="whitespace-pre-wrap">
          {input.slice(last, m.index)}
        </span>
      );
    }
    const display = m[1] !== undefined || m[2] !== undefined;
    const tex = (m[1] ?? m[2] ?? m[3] ?? m[4] ?? "").trim();
    try {
      const html = katex.renderToString(tex, {
        displayMode: display,
        throwOnError: false,
        output: "html",
        strict: "ignore",
        trust: false,
      });
      if (display) {
        out.push(
          <div
            key={`m-${key++}`}
            className="my-3 overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } else {
        out.push(
          <span key={`m-${key++}`} dangerouslySetInnerHTML={{ __html: html }} />
        );
      }
    } catch {
      out.push(<span key={`err-${key++}`}>{m[0]}</span>);
    }
    last = m.index + m[0].length;
  }
  if (last < input.length) {
    out.push(
      <span key={`t-${key++}`} className="whitespace-pre-wrap">
        {input.slice(last)}
      </span>
    );
  }
  return out;
}
