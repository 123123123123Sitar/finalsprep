"use client";

import { useState } from "react";

export default function CopyScriptButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-md border border-hair bg-offwhite px-2.5 py-1 text-[11px] font-medium text-ink transition-colors hover:border-orange/60 hover:text-orange"
      aria-label="Copy script to clipboard"
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}
