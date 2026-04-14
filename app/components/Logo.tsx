/**
 * FinalsPrep mark.
 *
 * The integral glyph is rendered via an SVG <text> node with an explicit
 * Georgia font stack. This is more reliable than a CSS <span> because:
 *   1. The browser can't substitute a different serif and change the shape.
 *   2. The glyph scales and aligns predictably at any size.
 *   3. Italic ∫ in Georgia is already the elongated "long s" that Leibniz
 *      designed the integral symbol from - there's no path that beats it.
 *
 * The wordmark keeps "Prep" in italic serif orange, which the user liked.
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
      viewBox="0 0 28 40"
      width={size}
      height={Math.round((size * 40) / 28)}
      className={className}
      aria-hidden="true"
      overflow="visible"
    >
      <text
        x="14"
        y="31"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic"
        fontSize="34"
        fontWeight="400"
        fill="currentColor"
      >
        ∫
      </text>
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
    <a
      href="/"
      className={`group inline-flex items-center gap-2 text-ink ${className}`}
      aria-label="FinalsPrep home"
    >
      <LogoMark
        size={size}
        className="text-ink transition-transform duration-300 group-hover:-translate-y-[1px]"
      />
      <span className="text-[15px] font-semibold tracking-tight">
        Finals
        <span className="font-serif italic text-orange-ink">Prep</span>
      </span>
    </a>
  );
}
