/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        offwhite: "rgb(var(--offwhite) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        body: "rgb(var(--body) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        dim: "rgb(var(--dim) / <alpha-value>)",
        hair: "rgb(var(--hair) / <alpha-value>)",
        rule: "rgb(var(--rule) / <alpha-value>)",
        orange: {
          DEFAULT: "rgb(var(--orange) / <alpha-value>)",
          hover: "rgb(var(--orange-hover) / <alpha-value>)",
          ink: "rgb(var(--orange-ink) / <alpha-value>)",
          tint: "rgb(var(--orange-tint) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Inter",
          "Helvetica Neue",
          "sans-serif",
        ],
        serif: [
          "ui-serif",
          "Iowan Old Style",
          "Georgia",
          "Cambria",
          "serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      letterSpacing: {
        tightest: "-0.035em",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
