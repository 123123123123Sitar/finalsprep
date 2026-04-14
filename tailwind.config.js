/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#ffffff",
        offwhite: "#fafaf7",
        ink: "#0a0a0a",
        body: "#1a1a1a",
        muted: "#6b6b6b",
        dim: "#9a9a9a",
        hair: "#e8e6e0",
        rule: "#d4d1c8",
        orange: {
          DEFAULT: "#c2410c", // burnt orange, functional use only
          hover: "#9a330a",
          ink: "#7c2d0a",
          tint: "#fff1e6",
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
