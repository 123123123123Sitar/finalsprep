import Link from "next/link";

/**
 * FinalsPrep mark.
 *
 * The old integral glyph felt too literal and too delicate. This version uses
 * a compact open-book silhouette with an orange spine so the mark reads as
 * study material first, not calculus specifically.
 */

export function LogoMark({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 44 32"
      width={size}
      height={Math.round((size * 32) / 44)}
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M6 7.5C9.6 5.2 13.8 4 18.6 4C20.4 4 21.8 5.4 21.8 7.2V27.5C17.2 27.5 12.2 28.7 6 31V7.5Z"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path
        d="M38 7.5C34.4 5.2 30.2 4 25.4 4C23.6 4 22.2 5.4 22.2 7.2V27.5C26.8 27.5 31.8 28.7 38 31V7.5Z"
        fill="#c2410c"
        fillOpacity="0.14"
      />
      <path
        d="M6 7.5C9.6 5.2 13.8 4 18.6 4C20.4 4 21.8 5.4 21.8 7.2V27.5C17.2 27.5 12.2 28.7 6 31V7.5Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M38 7.5C34.4 5.2 30.2 4 25.4 4C23.6 4 22.2 5.4 22.2 7.2V27.5C26.8 27.5 31.8 28.7 38 31V7.5Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M22 6.5V28.2"
        stroke="#c2410c"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M11 13H17M11 17.8H17"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M27 13H33M27 17.8H33"
        stroke="#c2410c"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({
  size = 22,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2 text-ink ${className}`}
      aria-label="FinalsPrep home"
    >
      <LogoMark
        size={size + 6}
        className="text-ink transition-transform duration-300 group-hover:-translate-y-[1px] group-hover:scale-[1.02]"
      />
      <span className="flex items-baseline gap-px text-[15px] tracking-[0.01em]">
        <span className="font-semibold">Finals</span>
        <span className="font-serif text-[16px] italic text-orange-ink">Prep</span>
      </span>
    </Link>
  );
}
