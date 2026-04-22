"use client";
import { useState } from "react";
import { useAuth } from "@/app/components/AuthProvider";

export default function FollowButton({
  targetUid,
  initialFollowing,
  onChange,
}: {
  targetUid: string;
  initialFollowing: boolean;
  onChange?: (following: boolean) => void;
}) {
  const { user, getIdToken } = useAuth();
  const [following, setFollowing] = useState(initialFollowing);
  const [busy, setBusy] = useState(false);

  async function toggle() {
    if (!user) {
      window.location.href = `/signin?next=${encodeURIComponent(
        `/users/${targetUid}`
      )}`;
      return;
    }
    setBusy(true);
    const token = await getIdToken();
    if (!token) {
      setBusy(false);
      return;
    }
    const method = following ? "DELETE" : "POST";
    try {
      const res = await fetch(`/api/users/${targetUid}/follow`, {
        method,
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setFollowing(data.isFollowing);
        onChange?.(data.isFollowing);
      }
    } finally {
      setBusy(false);
    }
  }

  if (user?.uid === targetUid) return null;

  return (
    <button
      onClick={toggle}
      disabled={busy}
      className={`rounded-md px-4 py-1.5 text-[13px] font-medium transition disabled:opacity-50 ${
        following
          ? "border border-hair bg-paper text-ink hover:border-red-300 hover:bg-red-50 hover:text-red-700"
          : "bg-ink text-paper hover:bg-ink/90"
      }`}
    >
      {busy ? "…" : following ? "Following" : "Follow"}
    </button>
  );
}
