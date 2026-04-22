"use client";
import { avatarColorFor } from "@/lib/social";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

const sizeMap: Record<Size, { px: number; text: string; emoji: string }> = {
  xs: { px: 22, text: "text-[10px]", emoji: "text-[12px]" },
  sm: { px: 28, text: "text-[11px]", emoji: "text-[14px]" },
  md: { px: 36, text: "text-[13px]", emoji: "text-[18px]" },
  lg: { px: 56, text: "text-[18px]", emoji: "text-[30px]" },
  xl: { px: 96, text: "text-[32px]", emoji: "text-[52px]" },
};

export default function UserAvatar({
  seed,
  label,
  size = "sm",
  emoji,
  color,
}: {
  seed: string;
  label: string;
  size?: Size;
  emoji?: string | null;
  color?: string | null;
}) {
  const bg = color || avatarColorFor(seed || label);
  const { px, text, emoji: emojiText } = sizeMap[size];
  const initial = (label || "?").trim().charAt(0).toUpperCase();
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full font-semibold text-white ${
        emoji ? emojiText : text
      }`}
      style={{ width: px, height: px, backgroundColor: bg }}
    >
      {emoji || initial || "?"}
    </span>
  );
}
