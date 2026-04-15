import type { Metadata } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";
import { AuthProvider } from "@/app/components/AuthProvider";
import { ThemeProvider } from "@/app/components/ThemeProvider";

// Runs before React hydrates so we don't flash the wrong theme.
const themeBootstrap = `
try {
  var t = localStorage.getItem('fp-theme');
  if (t === 'dark' || t === 'sepia' || t === 'light') {
    document.documentElement.setAttribute('data-theme', t);
  }
} catch (e) {}
`;

export const metadata: Metadata = {
  title: "FinalsPrep - a math & physics tutor that actually explains",
  description:
    "Paste a homework problem. Get a patient, step-by-step explanation - written the way a human tutor would. Algebra through calc 2, plus intro physics.",
  openGraph: {
    title: "FinalsPrep - a math & physics tutor that actually explains",
    description:
      "Paste a problem, get a walkthrough. Built by a tutor, not a chatbot company.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          id="fp-theme-bootstrap"
          dangerouslySetInnerHTML={{ __html: themeBootstrap }}
        />
      </head>
      <body className="min-h-screen bg-paper text-body antialiased">
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
