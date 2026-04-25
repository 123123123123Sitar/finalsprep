import type { Metadata } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";
import { AuthProvider } from "@/app/components/AuthProvider";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import { BookModeProvider } from "@/app/components/BookMode";
import StudyTimeBanner from "@/app/components/StudyTimeBanner";
import OnboardingFlow from "@/app/components/OnboardingFlow";
import FirstLookProvider from "@/app/components/FirstLookProvider";
import SentryClientInit from "@/sentry.client.config";

// Runs before React hydrates so we don't flash the wrong theme or a
// full SiteNav on pages that are embedded in a chat-extension overlay
// (the chat sidebar iframes these pages with ?embed=1).
const bootstrap = `
try {
  var t = localStorage.getItem('fp-theme');
  if (t === 'auto') {
    var h = new Date().getHours();
    t = (h >= 6 && h < 18) ? 'light' : 'dark';
  }
  var allowed = ['light','dark','sepia','solarized','nord','rose','forest','contrast'];
  if (allowed.indexOf(t) !== -1) {
    document.documentElement.setAttribute('data-theme', t);
  }
  var params = new URLSearchParams(window.location.search);
  if (params.get('embed') === '1') {
    document.documentElement.setAttribute('data-embed', '1');
  }
} catch (e) {}
`;

export const metadata: Metadata = {
  title: "FinalsPrep - an AI-powered AP study tutor that actually explains",
  description:
    "Paste a homework problem. Get a patient, step-by-step explanation - written the way a human tutor would. Algebra through calc 2, plus intro physics.",
  openGraph: {
    title: "FinalsPrep - an AI-powered AP study tutor that actually explains",
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
          id="fp-bootstrap"
          dangerouslySetInnerHTML={{ __html: bootstrap }}
        />
      </head>
      <body className="min-h-screen bg-paper text-body antialiased">
        <SentryClientInit />
        <AuthProvider>
          <ThemeProvider>
            <BookModeProvider>
              <FirstLookProvider>
                <StudyTimeBanner />
                {children}
                <OnboardingFlow />
              </FirstLookProvider>
            </BookModeProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
