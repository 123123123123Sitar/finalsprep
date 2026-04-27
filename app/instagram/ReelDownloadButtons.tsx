"use client";

import { useState } from "react";

export default function ReelDownloadButtons({
  reelId,
}: {
  reelId: number;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const href = `/api/instagram/reel/${reelId}`;
  const filename = `finalsprep-reel-${String(reelId).padStart(2, "0")}.mp4`;

  async function download() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(href, { cache: "no-store" });
      if (!res.ok) throw new Error("Could not render this reel.");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      setError(e?.message || "Could not render this reel.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-5">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={download}
          disabled={loading}
          className="btn-primary text-sm disabled:cursor-wait disabled:opacity-70"
        >
          {loading ? "Rendering MP4..." : "Download 9:16 MP4"}
        </button>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost text-sm"
        >
          Preview MP4
        </a>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
