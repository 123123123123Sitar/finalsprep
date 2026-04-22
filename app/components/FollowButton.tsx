"use client";
import { useState } from "react";
import { useAuth } from "@/app/components/AuthProvider";

type Props = {
  targetUid: string;
  initialFollowing: boolean;
  initialRequested?: boolean;
  onChange?: (state: { isFollowing: boolean; isRequested: boolean }) => void;
};

type FollowState = "none" | "requested" | "following";

export default function FollowButton({
  targetUid,
  initialFollowing,
  initialRequested,
  onChange,
}: Props) {
  const { user, getIdToken } = useAuth();
  const [state, setState] = useState<FollowState>(
    initialFollowing ? "following" : initialRequested ? "requested" : "none"
  );
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
    // DELETE covers both "unfollow" and "cancel pending request".
    const method = state === "none" ? "POST" : "DELETE";
    try {
      const res = await fetch(`/api/users/${targetUid}/follow`, {
        method,
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        const next: FollowState = data.isFollowing
          ? "following"
          : data.isRequested
          ? "requested"
          : "none";
        setState(next);
        onChange?.({
          isFollowing: !!data.isFollowing,
          isRequested: !!data.isRequested,
        });
      }
    } finally {
      setBusy(false);
    }
  }

  if (user?.uid === targetUid) return null;

  const label =
    state === "following" ? "Following" : state === "requested" ? "Requested" : "Follow";

  const cls =
    state === "following"
      ? "border border-hair bg-paper text-ink hover:border-red-300 hover:bg-red-50 hover:text-red-700"
      : state === "requested"
      ? "border border-hair bg-offwhite text-muted hover:border-red-300 hover:bg-red-50 hover:text-red-700"
      : "bg-ink text-paper hover:bg-ink/90";

  return (
    <button
      onClick={toggle}
      disabled={busy}
      className={`rounded-md px-4 py-1.5 text-[13px] font-medium transition disabled:opacity-50 ${cls}`}
    >
      {busy ? "…" : label}
    </button>
  );
}
