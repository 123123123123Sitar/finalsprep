import type { Metadata } from "next";
import SiteNav from "@/app/components/SiteNav";
import { LogoMark } from "@/app/components/Logo";
import ReelDownloadButtons from "./ReelDownloadButtons";
import CopyScriptButton from "./CopyScriptButton";
import PasswordGate from "./PasswordGate";

function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

type RevisedReelKind =
  | "chat"
  | "study"
  | "book"
  | "tools"
  | "review"
  | "schedule";

type RevisedReel = {
  id: number;
  title: string;
  hook: string;
  target: string;
  duration: number;
  route: string;
  kind: RevisedReelKind;
  voiceNote: string;
  script: string;
  beats: { time: string; copy: string }[];
};

const revisedReels: RevisedReel[] = [
  {
    id: 1,
    kind: "chat",
    title: "The AI tutor that actually explains.",
    hook: "Concept first. Then the math. Then the trap most students fall for.",
    target: "Chat tutor",
    duration: 18,
    route: "finalsprep.com/chat",
    voiceNote: "calm, conversational — like a friendly upperclassman",
    script:
      "Most AP study tools throw notes at you. This is different.\nAsk any AP question, and the tutor explains the concept first — then walks the math, then calls out the mistake most students make.\nVoice mode. Image uploads. Your full message history.\nFinalsPrep dot com.",
    beats: [
      { time: "0–3s", copy: "Hold on the typed question — pulse the cursor" },
      { time: "3–10s", copy: "AI response streams in with math notation" },
      { time: "10–14s", copy: "Token meter ticks up; follow-up appears" },
      { time: "14–18s", copy: "Composer pill highlights; URL card fades in" },
    ],
  },
  {
    id: 2,
    kind: "study",
    title: "Every AP unit, the College Board way.",
    hook: "Exam guide, big ideas, per-topic walkthroughs — structured like the CED.",
    target: "Lessons",
    duration: 16,
    route: "finalsprep.com/study",
    voiceNote: "confident, instructional, even pace",
    script:
      "Pick your AP. Get the unit map straight from the College Board's official curriculum.\nBig ideas. Essential knowledge. Exam strategy. Every unit, every topic, walked through.\nPractice problems and interactives sit on the same page, ready when you are.\nFinalsPrep dot com slash study.",
    beats: [
      { time: "0–3s", copy: "Sidebar units highlight in sequence" },
      { time: "3–9s", copy: "Lesson tabs cycle through Overview / Practice / Interactive" },
      { time: "9–13s", copy: "Big-idea callout pulses; progress bar fills" },
      { time: "13–16s", copy: "Cursor lands on Practice; URL card fades in" },
    ],
  },
  {
    id: 3,
    kind: "book",
    title: "Your lesson, paginated.",
    hook: "Book Mode flips a lesson into pages. No scroll.",
    target: "Book mode",
    duration: 14,
    route: "finalsprep.com/study",
    voiceNote: "warm, lower energy, focused — bedtime-reading vibe",
    script:
      "Reading a long lesson on a screen wears you out.\nBook Mode paginates the whole thing — one section per page, eight reading themes, arrow keys to flip.\nLess scrolling. More actual reading.\nFinalsPrep dot com slash study.",
    beats: [
      { time: "0–3s", copy: "Lesson scrolls — then snap-locks into book pages" },
      { time: "3–8s", copy: "Page 3 of 7 visible; formula in italic" },
      { time: "8–11s", copy: "Theme picker cycles two reading themes" },
      { time: "11–14s", copy: "Arrow flips to last page; CTA fades in" },
    ],
  },
  {
    id: 4,
    kind: "tools",
    title: "Ask in chat. Get the widget.",
    hook: "Type the graph you want. The AI builds it live.",
    target: "Interactives",
    duration: 17,
    route: "finalsprep.com/interactives",
    voiceNote: "slightly playful, energetic but clean",
    script:
      "Type 'graph y equals sine x and its Taylor approximation.' That's it.\nThe tutor drops a live, draggable graph into the chat.\nSame goes for physics simulations, 3D plots, and a Java sandbox — preloaded with your problem.\nSee it. Tweak it. Understand it.\nFinalsPrep dot com slash interactives.",
    beats: [
      { time: "0–3s", copy: "Prompt types into chat — cursor blinking" },
      { time: "3–10s", copy: "Graph fades in; sin curve and Taylor curve animate" },
      { time: "10–14s", copy: "Tabs cycle: 2D / 3D / Physics / Java" },
      { time: "14–17s", copy: "Equation pill highlights; URL card fades in" },
    ],
  },
  {
    id: 5,
    kind: "review",
    title: "Your wrong answers come back.",
    hook: "Spaced and re-served the day before you'd forget.",
    target: "Review & insights",
    duration: 16,
    route: "finalsprep.com/insights",
    voiceNote: "steady, slightly serious — coach tone",
    script:
      "Miss a problem? It doesn't disappear.\nThe AI lands it in your review bank, then re-asks it the day before you'd forget.\nStreak, token usage, weakest topics — all in one dashboard.\nStop relearning the same thing. Start retaining it.\nFinalsPrep dot com slash insights.",
    beats: [
      { time: "0–3s", copy: "Token bars rise from zero — streak counter ticks" },
      { time: "3–9s", copy: "Review-bank rows slide in with 'retry' tags" },
      { time: "9–13s", copy: "One row flips to 'fixed' green check" },
      { time: "13–16s", copy: "Dashboard pulls back; URL card fades in" },
    ],
  },
  {
    id: 6,
    kind: "schedule",
    title: "Show up. Earn tokens.",
    hook: "Daily AP plan that pays you in AI usage.",
    target: "Schedule",
    duration: 15,
    route: "finalsprep.com/schedule",
    voiceNote: "motivational but not hype — quiet confidence",
    script:
      "Set a daily AP study target.\nFinish your sessions, earn bonus AI tokens that stack on top of your plan and never expire.\nBuilt so the work actually pays off.\nFinalsPrep dot com slash schedule.",
    beats: [
      { time: "0–3s", copy: "Today header; progress bar at zero" },
      { time: "3–9s", copy: "Tasks check off one by one; bar fills to 75%" },
      { time: "9–13s", copy: "+800 bonus tokens pop with subtle scale" },
      { time: "13–15s", copy: "URL card fades in; bar completes" },
    ],
  },
];

export const metadata: Metadata = {
  title: "FinalsPrep Instagram Ads",
  description:
    "Downloadable vertical Instagram ads for FinalsPrep.",
};

type SceneKind =
  | "home"
  | "chat"
  | "voice"
  | "study"
  | "lesson"
  | "book"
  | "interactive"
  | "physics"
  | "code"
  | "frq"
  | "exam"
  | "insights"
  | "schedule"
  | "cards"
  | "photo"
  | "community"
  | "leaderboard";

type ReelScene = {
  start: number;
  end: number;
  eyebrow: string;
  headline: string;
  kind: SceneKind;
};

type Reel = {
  id: number;
  title: string;
  hook: string;
  target: string;
  duration: string;
  route: string;
  scenes: ReelScene[];
};

const reels: Reel[] = [
  {
    id: 1,
    title: "The One-Tab AP Prep Pitch",
    hook: "Stop bouncing between notes, YouTube, and random practice sites.",
    target: "Broad awareness",
    duration: "18s",
    route: "finalsprep.com",
    scenes: [
      { start: 0, end: 3, eyebrow: "Home", headline: "AI tutor for every AP", kind: "home" },
      { start: 3, end: 7, eyebrow: "Chat", headline: "Ask the exact thing you missed", kind: "chat" },
      { start: 7, end: 11, eyebrow: "Study", headline: "Lessons organized by AP units", kind: "study" },
      { start: 11, end: 15, eyebrow: "Tools", headline: "Graphs, sims, and code built in", kind: "interactive" },
      { start: 15, end: 18, eyebrow: "Review", headline: "Your mistakes come back at the right time", kind: "insights" },
    ],
  },
  {
    id: 2,
    title: "AI Tutor That Actually Explains",
    hook: "Ask the question you were too embarrassed to ask in class.",
    target: "Chat tutor",
    duration: "16s",
    route: "finalsprep.com/chat",
    scenes: [
      { start: 0, end: 3, eyebrow: "Question", headline: "Why is the slope negative here?", kind: "chat" },
      { start: 3, end: 7, eyebrow: "Concept", headline: "It starts with the idea", kind: "lesson" },
      { start: 7, end: 11, eyebrow: "Steps", headline: "Then it walks the math", kind: "chat" },
      { start: 11, end: 14, eyebrow: "Mistake", headline: "It calls out the trap", kind: "insights" },
      { start: 14, end: 16, eyebrow: "History", headline: "And remembers the thread", kind: "chat" },
    ],
  },
  {
    id: 3,
    title: "Voice Mode for Studying",
    hook: "Studying without typing every question.",
    target: "Voice AI",
    duration: "15s",
    route: "finalsprep.com/chat",
    scenes: [
      { start: 0, end: 3, eyebrow: "Tap mic", headline: "Say the question out loud", kind: "voice" },
      { start: 3, end: 6, eyebrow: "Live transcript", headline: "It listens while you talk", kind: "voice" },
      { start: 6, end: 10, eyebrow: "Tutor reply", headline: "Then answers like a tutor", kind: "chat" },
      { start: 10, end: 13, eyebrow: "Follow up", headline: "Ask again, hands-free", kind: "voice" },
      { start: 13, end: 15, eyebrow: "Use case", headline: "Perfect for last-night review", kind: "schedule" },
    ],
  },
  {
    id: 4,
    title: "AP Lessons, Not Random Notes",
    hook: "Every course is organized around AP units.",
    target: "Lessons",
    duration: "17s",
    route: "finalsprep.com/study",
    scenes: [
      { start: 0, end: 3, eyebrow: "Course picker", headline: "Choose your AP course", kind: "study" },
      { start: 3, end: 7, eyebrow: "Unit tree", headline: "See the exact unit map", kind: "study" },
      { start: 7, end: 11, eyebrow: "Lesson", headline: "Read the walkthrough", kind: "lesson" },
      { start: 11, end: 14, eyebrow: "Practice tab", headline: "Try problems right there", kind: "exam" },
      { start: 14, end: 17, eyebrow: "Progress", headline: "Mark it complete and move on", kind: "insights" },
    ],
  },
  {
    id: 5,
    title: "Book Mode for Focus",
    hook: "Turn a lesson into pages instead of an endless scroll.",
    target: "Book mode",
    duration: "14s",
    route: "finalsprep.com/study",
    scenes: [
      { start: 0, end: 3, eyebrow: "Lesson", headline: "Open any lesson", kind: "lesson" },
      { start: 3, end: 6, eyebrow: "Toggle", headline: "Switch on Book Mode", kind: "book" },
      { start: 6, end: 10, eyebrow: "Pages", headline: "Flip through one section at a time", kind: "book" },
      { start: 10, end: 12, eyebrow: "Themes", headline: "Choose the reading theme", kind: "book" },
      { start: 12, end: 14, eyebrow: "Focus", headline: "Less scrolling. More reading.", kind: "lesson" },
    ],
  },
  {
    id: 6,
    title: "AI-Built Graphs",
    hook: "Ask for the graph. Get the graph.",
    target: "Interactives",
    duration: "16s",
    route: "finalsprep.com/interactives",
    scenes: [
      { start: 0, end: 3, eyebrow: "Prompt", headline: "Graph sin(x) and its Taylor approximation", kind: "chat" },
      { start: 3, end: 7, eyebrow: "Generated", headline: "A live graph appears", kind: "interactive" },
      { start: 7, end: 10, eyebrow: "Compare", headline: "Move the curve and see divergence", kind: "interactive" },
      { start: 10, end: 13, eyebrow: "Explain", headline: "The tutor connects it to the lesson", kind: "lesson" },
      { start: 13, end: 16, eyebrow: "Repeat", headline: "Ask for a new widget any time", kind: "interactive" },
    ],
  },
  {
    id: 7,
    title: "Physics Sim for AP Physics",
    hook: "Projectile motion makes way more sense when it moves.",
    target: "Physics interactives",
    duration: "15s",
    route: "finalsprep.com/interactives",
    scenes: [
      { start: 0, end: 3, eyebrow: "Prompt", headline: "Show projectile motion with launch angle", kind: "chat" },
      { start: 3, end: 7, eyebrow: "Simulation", headline: "Angle and speed controls appear", kind: "physics" },
      { start: 7, end: 10, eyebrow: "Observation", headline: "Range changes in real time", kind: "physics" },
      { start: 10, end: 13, eyebrow: "Formula", headline: "The equation finally has a picture", kind: "lesson" },
      { start: 13, end: 15, eyebrow: "AP Physics", headline: "Study by experimenting", kind: "physics" },
    ],
  },
  {
    id: 8,
    title: "Code Playground for AP CSA",
    hook: "AP Computer Science practice with a runnable sandbox.",
    target: "Code tools",
    duration: "15s",
    route: "finalsprep.com/study",
    scenes: [
      { start: 0, end: 3, eyebrow: "AP CSA", headline: "Open an array problem", kind: "study" },
      { start: 3, end: 6, eyebrow: "Code", headline: "Use the Java playground", kind: "code" },
      { start: 6, end: 9, eyebrow: "Trace", headline: "See the loop step by step", kind: "code" },
      { start: 9, end: 12, eyebrow: "Tutor", headline: "Ask why the output changed", kind: "chat" },
      { start: 12, end: 15, eyebrow: "Practice", headline: "Then solve the AP-style version", kind: "exam" },
    ],
  },
  {
    id: 9,
    title: "FRQ Grader",
    hook: "Practice FRQs like an AP reader is watching.",
    target: "FRQ practice",
    duration: "18s",
    route: "finalsprep.com/practice",
    scenes: [
      { start: 0, end: 3, eyebrow: "Practice", headline: "Pick a past FRQ", kind: "frq" },
      { start: 3, end: 7, eyebrow: "Response", headline: "Write your answer in parts", kind: "frq" },
      { start: 7, end: 11, eyebrow: "Rubric", headline: "AI grades against the rubric", kind: "frq" },
      { start: 11, end: 15, eyebrow: "Feedback", headline: "See where points were lost", kind: "insights" },
      { start: 15, end: 18, eyebrow: "Retry", headline: "Fix the exact weak spot", kind: "frq" },
    ],
  },
  {
    id: 10,
    title: "Timed Mock Exam",
    hook: "Stop only studying. Start rehearsing.",
    target: "Mock exams",
    duration: "16s",
    route: "finalsprep.com/practice",
    scenes: [
      { start: 0, end: 3, eyebrow: "Setup", headline: "Choose course, count, and timer", kind: "exam" },
      { start: 3, end: 7, eyebrow: "Question", headline: "AP-style MCQs at exam pace", kind: "exam" },
      { start: 7, end: 10, eyebrow: "Timer", headline: "Feel the real time pressure", kind: "exam" },
      { start: 10, end: 13, eyebrow: "Results", headline: "Review what broke down", kind: "insights" },
      { start: 13, end: 16, eyebrow: "Loop", headline: "Missed topics go into review", kind: "insights" },
    ],
  },
  {
    id: 11,
    title: "Wrong-Answer Bank",
    hook: "Your missed questions should not disappear.",
    target: "Review and insights",
    duration: "15s",
    route: "finalsprep.com/insights",
    scenes: [
      { start: 0, end: 3, eyebrow: "Missed", headline: "Get a problem wrong", kind: "exam" },
      { start: 3, end: 6, eyebrow: "Saved", headline: "It lands in your review bank", kind: "insights" },
      { start: 6, end: 9, eyebrow: "Spaced", headline: "The AI re-serves it later", kind: "cards" },
      { start: 9, end: 12, eyebrow: "Explain", headline: "Ask for the concept again", kind: "chat" },
      { start: 12, end: 15, eyebrow: "Fixed", headline: "Turn weak spots into points", kind: "insights" },
    ],
  },
  {
    id: 12,
    title: "Flashcards That Fit the Lesson",
    hook: "Review cards tied to what you just studied.",
    target: "Flashcards",
    duration: "14s",
    route: "finalsprep.com/study",
    scenes: [
      { start: 0, end: 3, eyebrow: "Lesson", headline: "Finish a lesson", kind: "lesson" },
      { start: 3, end: 6, eyebrow: "Cards", headline: "Open flashcards from the same page", kind: "cards" },
      { start: 6, end: 9, eyebrow: "Recall", headline: "Answer before you reveal", kind: "cards" },
      { start: 9, end: 12, eyebrow: "Rate", headline: "Hard, okay, or easy", kind: "cards" },
      { start: 12, end: 14, eyebrow: "Repeat", headline: "Review without cramming", kind: "schedule" },
    ],
  },
  {
    id: 13,
    title: "Upload Handwritten Work",
    hook: "Take a photo of your work and ask what went wrong.",
    target: "Image input",
    duration: "16s",
    route: "finalsprep.com/chat",
    scenes: [
      { start: 0, end: 3, eyebrow: "Photo", headline: "Upload your handwritten work", kind: "photo" },
      { start: 3, end: 7, eyebrow: "Read", headline: "The tutor reads the setup", kind: "photo" },
      { start: 7, end: 10, eyebrow: "Find", headline: "It spots the first bad step", kind: "chat" },
      { start: 10, end: 13, eyebrow: "Fix", headline: "Then explains the correction", kind: "lesson" },
      { start: 13, end: 16, eyebrow: "Practice", headline: "Ask for one more like it", kind: "exam" },
    ],
  },
  {
    id: 14,
    title: "Daily Study Schedule",
    hook: "A daily AP plan that rewards consistency.",
    target: "Schedule and tokens",
    duration: "15s",
    route: "finalsprep.com/schedule",
    scenes: [
      { start: 0, end: 3, eyebrow: "Today", headline: "Set a 60-minute target", kind: "schedule" },
      { start: 3, end: 6, eyebrow: "Tasks", headline: "Lesson, review, FRQ", kind: "schedule" },
      { start: 6, end: 9, eyebrow: "Complete", headline: "Check off the session", kind: "schedule" },
      { start: 9, end: 12, eyebrow: "Bonus", headline: "Earn extra AI tokens", kind: "insights" },
      { start: 12, end: 15, eyebrow: "Streak", headline: "Build the habit before exam week", kind: "schedule" },
    ],
  },
  {
    id: 15,
    title: "Night-Before AP Flow",
    hook: "What to do the night before an AP exam.",
    target: "Exam-week conversion",
    duration: "20s",
    route: "finalsprep.com",
    scenes: [
      { start: 0, end: 4, eyebrow: "Step 1", headline: "Review your weakest topics", kind: "insights" },
      { start: 4, end: 8, eyebrow: "Step 2", headline: "Ask the AI for the confusing idea", kind: "chat" },
      { start: 8, end: 12, eyebrow: "Step 3", headline: "Do one timed set", kind: "exam" },
      { start: 12, end: 16, eyebrow: "Step 4", headline: "Work one FRQ with feedback", kind: "frq" },
      { start: 16, end: 20, eyebrow: "Step 5", headline: "End with flashcards, then sleep", kind: "cards" },
    ],
  },
];

export default function InstagramPage() {
  return (
    <PasswordGate>
    <main className="min-h-screen bg-paper text-body">
      <SiteNav sticky={false} />

      <style>{`
        .reel-phone {
          --reel-duration: 18s;
          position: relative;
          aspect-ratio: 9 / 16;
          overflow: hidden;
          border-radius: 34px;
          background: #111113;
          box-shadow: 0 28px 70px -34px rgba(0, 0, 0, 0.45);
        }
        .reel-strip {
          height: 500%;
          animation: reelPan var(--reel-duration) cubic-bezier(0.76, 0, 0.24, 1) infinite;
        }
        .reel-phone:hover .reel-strip,
        .reel-phone:hover .reel-progress span {
          animation-play-state: paused;
        }
        .reel-scene {
          height: 20%;
        }
        .reel-progress span {
          transform-origin: left;
          animation: reelProgress var(--reel-duration) linear infinite;
        }
        @keyframes reelPan {
          0%, 13% { transform: translateY(0); }
          20%, 33% { transform: translateY(-20%); }
          40%, 53% { transform: translateY(-40%); }
          60%, 73% { transform: translateY(-60%); }
          80%, 100% { transform: translateY(-80%); }
        }
        @keyframes reelProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes dotFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .dot-float {
          animation: dotFloat 1.8s ease-in-out infinite;
        }

        /* ==================================================================
         * Revised reels (v2) — high-fidelity mock animations
         * Each animation runs over the reel duration and loops, so the
         * preview always feels like a live screen recording.
         * ================================================================ */
        .v2-phone {
          --v2-duration: 16s;
          position: relative;
          aspect-ratio: 9 / 16;
          overflow: hidden;
          border-radius: 34px;
          background: #0c0c0e;
          box-shadow: 0 30px 70px -32px rgba(0, 0, 0, 0.55);
        }
        .v2-phone:hover .v2-anim,
        .v2-phone:hover .reel-progress span {
          animation-play-state: paused;
        }
        .v2-anim { animation-duration: var(--v2-duration); animation-iteration-count: infinite; animation-timing-function: linear; }

        @keyframes v2CursorBlink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .v2-cursor { animation: v2CursorBlink 0.85s steps(2) infinite; display: inline-block; width: 2px; height: 1em; background: currentColor; vertical-align: middle; margin-left: 1px; }

        @keyframes v2Typing {
          0% { width: 0; }
          12% { width: 100%; }
          82% { width: 100%; }
          90% { width: 100%; opacity: 1; }
          92% { opacity: 0; width: 0; }
          100% { opacity: 0; width: 0; }
        }
        .v2-typing { display: inline-block; overflow: hidden; white-space: nowrap; vertical-align: bottom; animation: v2Typing var(--v2-duration) linear infinite; }

        @keyframes v2FadeIn1 { 0%, 18% { opacity: 0; transform: translateY(6px); } 24%, 100% { opacity: 1; transform: translateY(0); } }
        @keyframes v2FadeIn2 { 0%, 32% { opacity: 0; transform: translateY(6px); } 38%, 100% { opacity: 1; transform: translateY(0); } }
        @keyframes v2FadeIn3 { 0%, 46% { opacity: 0; transform: translateY(6px); } 52%, 100% { opacity: 1; transform: translateY(0); } }
        @keyframes v2FadeIn4 { 0%, 60% { opacity: 0; transform: translateY(6px); } 66%, 100% { opacity: 1; transform: translateY(0); } }
        @keyframes v2FadeIn5 { 0%, 74% { opacity: 0; transform: translateY(6px); } 80%, 100% { opacity: 1; transform: translateY(0); } }
        .v2-fade-1 { animation-name: v2FadeIn1; }
        .v2-fade-2 { animation-name: v2FadeIn2; }
        .v2-fade-3 { animation-name: v2FadeIn3; }
        .v2-fade-4 { animation-name: v2FadeIn4; }
        .v2-fade-5 { animation-name: v2FadeIn5; }

        @keyframes v2Reveal {
          0%, 14% { clip-path: inset(0 100% 0 0); }
          24%, 100% { clip-path: inset(0 0 0 0); }
        }
        .v2-reveal { animation-name: v2Reveal; }

        @keyframes v2Stream {
          0%, 22% { clip-path: inset(0 100% 0 0); }
          26% { clip-path: inset(0 88% 0 0); }
          30% { clip-path: inset(0 76% 0 0); }
          34% { clip-path: inset(0 62% 0 0); }
          38% { clip-path: inset(0 48% 0 0); }
          42% { clip-path: inset(0 32% 0 0); }
          46% { clip-path: inset(0 18% 0 0); }
          50%, 100% { clip-path: inset(0 0 0 0); }
        }
        .v2-stream { animation-name: v2Stream; }

        @keyframes v2BarFill {
          0%, 12% { transform: scaleX(0); }
          70%, 100% { transform: scaleX(var(--v2-bar-end, 0.75)); }
        }
        .v2-bar-fill { transform-origin: left; animation-name: v2BarFill; }

        @keyframes v2Pulse { 0%, 100% { transform: scale(1); opacity: 0.85; } 50% { transform: scale(1.18); opacity: 1; } }
        .v2-pulse { animation: v2Pulse 1.6s ease-in-out infinite; }

        @keyframes v2Thinking { 0%, 30% { opacity: 0; } 32%, 46% { opacity: 1; } 48%, 100% { opacity: 0; } }
        .v2-thinking { animation-name: v2Thinking; }

        @keyframes v2TabSlide {
          0%, 12% { transform: translateX(0); }
          22%, 36% { transform: translateX(100%); }
          46%, 60% { transform: translateX(200%); }
          70%, 100% { transform: translateX(0); }
        }
        .v2-tab-slide { animation-name: v2TabSlide; }

        @keyframes v2HighlightCycle {
          0%, 14% { opacity: 1; }
          22%, 100% { opacity: 0.45; }
        }
        @keyframes v2HighlightCycle2 {
          0%, 14% { opacity: 0.45; }
          22%, 36% { opacity: 1; }
          44%, 100% { opacity: 0.45; }
        }
        @keyframes v2HighlightCycle3 {
          0%, 36% { opacity: 0.45; }
          44%, 58% { opacity: 1; }
          66%, 100% { opacity: 0.45; }
        }
        .v2-hl-1 { animation-name: v2HighlightCycle; }
        .v2-hl-2 { animation-name: v2HighlightCycle2; }
        .v2-hl-3 { animation-name: v2HighlightCycle3; }

        @keyframes v2GraphDraw {
          0%, 18% { stroke-dashoffset: 800; }
          50%, 100% { stroke-dashoffset: 0; }
        }
        .v2-graph-draw { stroke-dasharray: 800; stroke-dashoffset: 800; animation-name: v2GraphDraw; }

        @keyframes v2GraphDrawSlow {
          0%, 30% { stroke-dashoffset: 800; }
          70%, 100% { stroke-dashoffset: 0; }
        }
        .v2-graph-draw-2 { stroke-dasharray: 800; stroke-dashoffset: 800; animation-name: v2GraphDrawSlow; }

        @keyframes v2Tick {
          0%, 30% { transform: scale(0); opacity: 0; }
          36% { transform: scale(1.4); opacity: 1; }
          42%, 100% { transform: scale(1); opacity: 1; }
        }
        .v2-tick { animation-name: v2Tick; }

        @keyframes v2CountUp {
          0%, 18% { transform: translateY(0); }
          26% { transform: translateY(-1.1em); }
          34% { transform: translateY(-2.2em); }
          42% { transform: translateY(-3.3em); }
          50%, 100% { transform: translateY(-4.4em); }
        }
        .v2-count-up { display: inline-block; animation-name: v2CountUp; line-height: 1.1em; }

        @keyframes v2BookFlip {
          0%, 14% { transform: perspective(800px) rotateY(0); }
          22%, 38% { transform: perspective(800px) rotateY(-25deg); }
          46%, 62% { transform: perspective(800px) rotateY(0); }
          70%, 86% { transform: perspective(800px) rotateY(-25deg); }
          94%, 100% { transform: perspective(800px) rotateY(0); }
        }
        .v2-book-flip { transform-origin: left center; animation-name: v2BookFlip; animation-timing-function: ease-in-out; }

        @keyframes v2PageNumCycle {
          0%, 14% { opacity: 1; }
          22%, 38% { opacity: 0; }
          46%, 62% { opacity: 1; }
          70%, 86% { opacity: 0; }
          94%, 100% { opacity: 1; }
        }
        @keyframes v2PageNumCycle2 {
          0%, 22% { opacity: 0; }
          30%, 46% { opacity: 1; }
          54%, 70% { opacity: 0; }
          78%, 94% { opacity: 1; }
        }
        .v2-page-1 { animation-name: v2PageNumCycle; }
        .v2-page-2 { animation-name: v2PageNumCycle2; opacity: 0; }

        @keyframes v2CodeStep {
          0%, 18% { background-color: rgba(255, 137, 6, 0.0); }
          22% { background-color: rgba(255, 137, 6, 0.18); }
          30% { background-color: rgba(255, 137, 6, 0.0); }
        }
        @keyframes v2CodeStep2 {
          0%, 32% { background-color: rgba(255, 137, 6, 0.0); }
          36% { background-color: rgba(255, 137, 6, 0.18); }
          44% { background-color: rgba(255, 137, 6, 0.0); }
        }
        @keyframes v2CodeStep3 {
          0%, 46% { background-color: rgba(255, 137, 6, 0.0); }
          50% { background-color: rgba(255, 137, 6, 0.18); }
          58% { background-color: rgba(255, 137, 6, 0.0); }
        }
        .v2-code-1 { animation-name: v2CodeStep; }
        .v2-code-2 { animation-name: v2CodeStep2; }
        .v2-code-3 { animation-name: v2CodeStep3; }
      `}</style>

      <section className="mx-auto max-w-6xl px-5 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-14">
        <div className="label mb-4">Instagram ad library</div>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <h1 className="font-serif text-[44px] font-normal leading-[1.02] tracking-tightest text-ink sm:text-[64px]">
              15 post-ready ads for FinalsPrep.
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-7 text-body">
              Each preview is built like a vertical Instagram ad and moves
              through a realistic FinalsPrep product story. Download true 1080
              by 1920 MP4 files for posting.
            </p>
          </div>
          <div className="rounded-lg border border-hair bg-offwhite p-5 text-sm leading-6 text-muted">
            <div className="font-semibold text-ink">Export note</div>
            <p className="mt-2">
              Use the download button on any ad to generate a vertical MP4.
              Hovering a preview pauses the animation while you inspect the
              visuals.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 sm:px-6" id="v1">
        {reels.map((reel) => (
          <article
            key={reel.id}
            className="grid gap-6 border-t border-hair pt-10 lg:grid-cols-[360px_1fr] lg:gap-10"
          >
            <div>
              <ReelPreview reel={reel} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-orange-ink">
                <span>{reel.duration}</span>
                <span className="h-1 w-1 rounded-full bg-orange/50" />
                <span>{reel.target}</span>
              </div>
              <h2 className="mt-3 font-serif text-3xl font-normal leading-tight text-ink sm:text-4xl">
                {reel.title}
              </h2>
              <p className="mt-3 max-w-2xl text-[17px] text-body">{reel.hook}</p>
              <ReelDownloadButtons reelId={reel.id} />

              <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,520px)]">
                <div className="rounded-lg border border-hair bg-paper p-4">
                  <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">
                    Ad flow
                  </div>
                  <div className="mt-3 divide-y divide-hair">
                    {reel.scenes.map((scene, idx) => (
                      <div key={`${reel.id}-${idx}`} className="grid grid-cols-[72px_1fr] gap-3 py-3 text-sm">
                        <div className="font-mono text-[12px] text-orange-ink">
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                        <div>
                          <div className="font-medium text-ink">{scene.eyebrow}</div>
                          <div className="mt-0.5 text-muted">{scene.headline}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="border-t-4 border-orange/30 bg-offwhite/50">
        <div className="mx-auto max-w-6xl px-5 pt-16 pb-6 sm:px-6 sm:pt-20" id="v2">
          <div className="label mb-4">Revised — homepage fidelity</div>
          <h2 className="font-serif text-[40px] font-normal leading-[1.02] tracking-tightest text-ink sm:text-[56px]">
            Revised reels with voice scripts.
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-7 text-body">
            Same UI fidelity as the feature mocks on the homepage — these
            actually look like the product. Each one has an ElevenLabs script
            sized to its duration; copy it straight in, generate the VO, and
            screen-record the preview to assemble the post.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-24 sm:px-6">
          {revisedReels.map((reel) => (
            <article
              key={`v2-${reel.id}`}
              className="grid gap-8 border-t border-hair pt-10 lg:grid-cols-[320px_1fr] lg:gap-12"
            >
              <div>
                <RevisedReelPreview reel={reel} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-orange-ink">
                  <span>{reel.duration}s</span>
                  <span className="h-1 w-1 rounded-full bg-orange/50" />
                  <span>{reel.target}</span>
                  <span className="h-1 w-1 rounded-full bg-orange/50" />
                  <span className="text-muted">{reel.route}</span>
                </div>
                <h3 className="mt-3 font-serif text-3xl font-normal leading-tight text-ink sm:text-4xl">
                  {reel.title}
                </h3>
                <p className="mt-3 max-w-2xl text-[17px] text-body">
                  {reel.hook}
                </p>

                <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                  <div className="rounded-lg border border-hair bg-paper p-5">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-ink">
                        ElevenLabs script
                      </div>
                      <CopyScriptButton text={reel.script} />
                    </div>
                    <p className="mt-3 whitespace-pre-line text-[14.5px] leading-[1.6] text-body">
                      {reel.script}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted">
                      <span>~{wordCount(reel.script)} words</span>
                      <span>·</span>
                      <span>~{Math.round(wordCount(reel.script) / 2.5)}s @ 150 wpm</span>
                      <span>·</span>
                      <span>Voice direction: {reel.voiceNote}</span>
                    </div>
                  </div>

                  <div className="rounded-lg border border-hair bg-paper p-5">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                      On-screen beats
                    </div>
                    <div className="mt-3 divide-y divide-hair">
                      {reel.beats.map((b, idx) => (
                        <div
                          key={`${reel.id}-beat-${idx}`}
                          className="grid grid-cols-[58px_1fr] gap-3 py-2.5 text-sm"
                        >
                          <div className="font-mono text-[12px] text-orange-ink">
                            {b.time}
                          </div>
                          <div className="text-body">{b.copy}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
    </PasswordGate>
  );
}

function ReelPreview({ reel }: { reel: Reel }) {
  const seconds = Number(reel.duration.replace("s", ""));

  return (
    <div
      className="reel-phone mx-auto w-full max-w-[340px]"
      style={{ "--reel-duration": `${seconds}s` } as React.CSSProperties}
    >
      <div className="absolute inset-x-4 top-3 z-20 h-1 overflow-hidden rounded-full bg-white/20 reel-progress">
        <span className="block h-full rounded-full bg-white" />
      </div>

      <div className="absolute left-4 right-4 top-6 z-20 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/15 backdrop-blur">
            <LogoMark size={19} />
          </div>
          <div>
            <div className="text-[12px] font-semibold leading-none">FinalsPrep</div>
            <div className="mt-0.5 text-[10px] text-white/65">{reel.route}</div>
          </div>
        </div>
        <div className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur">
          AP prep
        </div>
      </div>

      <div className="reel-strip">
        {reel.scenes.map((scene, idx) => (
          <div key={`${reel.id}-${idx}-${scene.kind}`} className="reel-scene">
            <SceneView scene={scene} idx={idx} />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black via-black/70 to-transparent px-5 pb-5 pt-24 text-white">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
          {reel.duration} vertical ad
        </div>
        <div className="mt-2 text-[23px] font-semibold leading-tight tracking-tight">
          {reel.title}
        </div>
        <div className="mt-2 text-[13px] leading-5 text-white/72">{reel.hook}</div>
      </div>
    </div>
  );
}

function SceneView({ scene, idx }: { scene: ReelScene; idx: number }) {
  return (
    <div className="relative h-full overflow-hidden bg-[#f7f4ee] px-5 pb-32 pt-20 text-ink">
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(rgb(10 10 10) 1px, transparent 1px), linear-gradient(90deg, rgb(10 10 10) 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
      <div className="relative">
        <div className="inline-flex rounded-full border border-orange/30 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-ink">
          {scene.eyebrow}
        </div>
        <h3 className="mt-4 font-serif text-[31px] font-normal leading-[1.04] tracking-tight text-ink">
          {scene.headline}
        </h3>
      </div>
      <div className="relative mt-5">
        <MockSurface kind={scene.kind} idx={idx} />
      </div>
    </div>
  );
}

function MockSurface({ kind, idx }: { kind: SceneKind; idx: number }) {
  switch (kind) {
    case "home":
      return <HomeMock />;
    case "chat":
      return <ChatMock />;
    case "voice":
      return <VoiceMock />;
    case "study":
      return <StudyMock />;
    case "lesson":
      return <LessonMock />;
    case "book":
      return <BookMock />;
    case "interactive":
      return <GraphMock />;
    case "physics":
      return <PhysicsMock />;
    case "code":
      return <CodeMock />;
    case "frq":
      return <FrqMock />;
    case "exam":
      return <ExamMock />;
    case "insights":
      return <InsightsMock />;
    case "schedule":
      return <ScheduleMock />;
    case "cards":
      return <CardsMock />;
    case "photo":
      return <PhotoMock />;
    case "community":
      return <CommunityMock />;
    case "leaderboard":
      return <LeaderboardMock />;
    default:
      return <AppWindow title={`FinalsPrep ${idx + 1}`} />;
  }
}

function AppWindow({
  title,
  children,
  dark = false,
}: {
  title: string;
  children?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border shadow-xl ${dark ? "border-white/10 bg-[#141417] text-white" : "border-hair bg-white text-ink"}`}>
      <div className={`flex items-center gap-2 border-b px-3 py-2 ${dark ? "border-white/10 bg-white/[0.04]" : "border-hair bg-offwhite"}`}>
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className={`ml-2 truncate text-[11px] ${dark ? "text-white/60" : "text-muted"}`}>{title}</span>
      </div>
      <div className="min-h-[250px] p-4">{children}</div>
    </div>
  );
}

function HomeMock() {
  return (
    <AppWindow title="finalsprep.com">
      <div className="label mb-2 text-[9px]">An AI tutor for every AP</div>
      <div className="font-serif text-[24px] leading-tight text-ink">Your AP study tab.</div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {["Chat tutor", "Lessons", "Practice", "Interactives"].map((item) => (
          <div key={item} className="rounded-lg border border-hair bg-offwhite px-3 py-3 text-[12px] font-medium text-ink">
            {item}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-full bg-orange px-4 py-2 text-center text-[12px] font-semibold text-white">
        Start studying free
      </div>
    </AppWindow>
  );
}

function ChatMock() {
  return (
    <AppWindow title="finalsprep.com/chat">
      <div className="space-y-3">
        <div className="ml-auto max-w-[82%] rounded-2xl bg-offwhite px-4 py-3 text-[13px] leading-5 text-body">
          Why does the derivative become negative here?
        </div>
        <div className="rounded-2xl border-l-4 border-orange bg-orange-tint/40 px-4 py-3 text-[13px] leading-5 text-body">
          Because the function is decreasing as x increases. The slope points down, so dy/dx is negative.
        </div>
        <div className="rounded-lg border border-hair bg-paper p-3 text-[12px] text-muted">
          Common mistake: treating speed as slope without direction.
        </div>
        <div className="rounded-full bg-[#1f1f22] px-4 py-3 text-[12px] text-white/55">
          Ask a follow-up...
        </div>
      </div>
    </AppWindow>
  );
}

function VoiceMock() {
  return (
    <AppWindow title="voice mode" dark>
      <div className="flex min-h-[220px] flex-col justify-between">
        <div>
          <div className="text-[12px] text-white/60">Live transcript</div>
          <div className="mt-2 rounded-2xl bg-white/8 p-4 text-[17px] leading-6">
            Explain related rates like I am solving the ladder FRQ.
          </div>
        </div>
        <div className="mt-8 flex items-end justify-center gap-1.5">
          {[28, 44, 62, 86, 54, 72, 36, 64, 92, 58, 40].map((height, i) => (
            <span
              key={height + i}
              className="dot-float w-2 rounded-full bg-orange"
              style={{ height: `${height}px`, animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>
      </div>
    </AppWindow>
  );
}

function StudyMock() {
  return (
    <AppWindow title="finalsprep.com/study">
      <div className="grid grid-cols-[105px_1fr] gap-3">
        <div className="space-y-3 border-r border-hair pr-3">
          {["Unit 1", "Unit 2", "Unit 3"].map((unit, i) => (
            <div key={unit} className={i === 1 ? "border-l-2 border-orange pl-2" : "border-l-2 border-orange/25 pl-2"}>
              <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-orange-ink">{unit}</div>
              <div className="mt-0.5 text-[12px] text-ink">{i === 1 ? "Forces" : i === 0 ? "Kinematics" : "Energy"}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="text-[9px] uppercase tracking-[0.16em] text-muted">AP Physics 1</div>
          <div className="mt-1 font-serif text-[18px] leading-tight">Newton's laws</div>
          <div className="mt-3 flex gap-2 text-[10px]">
            <span className="border-b-2 border-orange pb-1 text-ink">Overview</span>
            <span className="pb-1 text-muted">Practice</span>
            <span className="pb-1 text-muted">Tools</span>
          </div>
          <LineStack />
        </div>
      </div>
    </AppWindow>
  );
}

function LessonMock() {
  return (
    <AppWindow title="lesson view">
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted">AP Chemistry · Unit 3</div>
      <div className="mt-1 font-serif text-[23px] leading-tight text-ink">Intermolecular forces</div>
      <p className="mt-3 text-[13px] leading-5 text-body">
        The stronger the attraction between particles, the more energy it takes to separate them.
      </p>
      <div className="mt-4 rounded-lg border border-orange/25 bg-orange-tint/45 p-3 text-[12px] leading-5 text-orange-ink">
        Key idea: boiling point follows attraction strength, not molecule size alone.
      </div>
      <LineStack />
    </AppWindow>
  );
}

function BookMock() {
  return (
    <AppWindow title="book mode">
      <div className="mx-auto max-w-[220px] rounded-sm border border-hair bg-paper px-5 py-5 shadow-lg">
        <div className="text-center text-[9px] uppercase tracking-[0.18em] text-muted">Page 3 of 7</div>
        <div className="mt-2 text-center font-serif text-[21px] leading-tight">Integration by parts</div>
        <div className="my-4 rounded bg-offwhite px-3 py-2 text-center font-serif text-[16px] italic text-ink">
          ∫ u dv = uv - ∫ v du
        </div>
        <LineStack />
        <div className="mt-4 flex justify-between text-[10px] text-muted">
          <span>Previous</span>
          <span>Next</span>
        </div>
      </div>
    </AppWindow>
  );
}

function GraphMock() {
  return (
    <AppWindow title="interactive graph">
      <div className="overflow-hidden rounded-xl border border-hair bg-paper">
        <svg viewBox="0 0 260 160" className="h-[190px] w-full">
          <defs>
            <pattern id="ig" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0H0V20" fill="none" stroke="#e8e6e0" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="260" height="160" fill="url(#ig)" />
          <line x1="0" y1="80" x2="260" y2="80" stroke="#c9c5ba" />
          <line x1="130" y1="0" x2="130" y2="160" stroke="#c9c5ba" />
          <path d="M12 78 C 44 18, 74 18, 104 78 S 168 138, 206 78 S 238 18, 252 42" fill="none" stroke="#c2410c" strokeWidth="4" />
          <path d="M12 82 C 62 36, 94 50, 130 80 S 198 122, 252 80" fill="none" stroke="#0284c7" strokeWidth="3" strokeDasharray="7 6" />
        </svg>
      </div>
      <div className="mt-3 rounded-lg bg-offwhite px-3 py-2 font-mono text-[11px] text-ink">f(x)=sin(x) · g(x)=x-x^3/6</div>
    </AppWindow>
  );
}

function PhysicsMock() {
  return (
    <AppWindow title="physics simulation">
      <div className="rounded-xl border border-hair bg-[#eef6ff] p-3">
        <svg viewBox="0 0 260 160" className="h-[170px] w-full">
          <path d="M24 132 C 70 40, 132 18, 228 126" fill="none" stroke="#c2410c" strokeWidth="4" />
          <path d="M24 132 L240 132" stroke="#64748b" strokeWidth="2" />
          <circle cx="92" cy="54" r="8" fill="#0ea5e9" />
          <path d="M26 130 l40 -58" stroke="#111827" strokeWidth="2" markerEnd="url(#arrow)" />
        </svg>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="rounded bg-white px-2 py-1">Angle 42°</div>
          <div className="rounded bg-white px-2 py-1">Speed 20 m/s</div>
        </div>
      </div>
    </AppWindow>
  );
}

function CodeMock() {
  return (
    <AppWindow title="java playground" dark>
      <pre className="overflow-hidden rounded-xl bg-black/30 p-4 text-[12px] leading-5 text-white/85">
{`for (int r = 0; r < grid.length; r++) {
  sum += grid[r][r];
}

// trace:
r=0 sum=3
r=1 sum=8
r=2 sum=14`}
      </pre>
      <div className="mt-3 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-[12px] text-white/70">
        Tutor: the index repeats because this is the main diagonal.
      </div>
    </AppWindow>
  );
}

function FrqMock() {
  return (
    <AppWindow title="practice · FRQs">
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted">AP Bio FRQ · Part B</div>
      <div className="mt-2 rounded-lg border border-hair bg-offwhite p-3 text-[12px] leading-5">
        Explain how the control group supports the claim.
      </div>
      <div className="mt-3 rounded-lg border border-hair bg-paper p-3 text-[12px] leading-5 text-body">
        My answer: the control group shows what happens without the treatment...
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
        <div className="rounded bg-green-50 py-2 text-green-800">2/2 claim</div>
        <div className="rounded bg-amber-50 py-2 text-amber-800">1/2 evidence</div>
        <div className="rounded bg-orange-tint py-2 text-orange-ink">revise</div>
      </div>
    </AppWindow>
  );
}

function ExamMock() {
  return (
    <AppWindow title="timed practice">
      <div className="flex items-center justify-between">
        <div className="font-serif text-[18px] text-ink">Question 7 of 20</div>
        <div className="rounded-full bg-orange px-3 py-1 font-mono text-[12px] text-white">18:42</div>
      </div>
      <div className="mt-4 rounded-lg border border-hair bg-offwhite p-3 text-[13px] leading-5">
        A particle moves with velocity v(t). Which expression gives total distance?
      </div>
      <div className="mt-3 space-y-2">
        {["∫ v(t) dt", "∫ |v(t)| dt", "v(b)-v(a)", "a(t) dt"].map((choice, i) => (
          <div key={choice} className={`rounded-lg border px-3 py-2 text-[12px] ${i === 1 ? "border-orange bg-orange-tint text-orange-ink" : "border-hair bg-paper text-body"}`}>
            {String.fromCharCode(65 + i)}. {choice}
          </div>
        ))}
      </div>
    </AppWindow>
  );
}

function InsightsMock() {
  return (
    <AppWindow title="insights">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-hair bg-offwhite p-3">
          <div className="text-[10px] uppercase tracking-[0.16em] text-muted">Streak</div>
          <div className="mt-1 font-serif text-[26px] text-orange">5 days</div>
        </div>
        <div className="rounded-lg border border-hair bg-offwhite p-3">
          <div className="text-[10px] uppercase tracking-[0.16em] text-muted">Tokens</div>
          <div className="mt-1 font-serif text-[26px] text-ink">42k</div>
        </div>
      </div>
      <div className="mt-4 flex h-20 items-end gap-2">
        {[24, 54, 38, 72, 44, 86, 64].map((h, i) => (
          <span key={h + i} className="flex-1 rounded-t bg-orange/75" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-hair px-3 py-2 text-[12px] text-body">Review: related rates ladder problem</div>
    </AppWindow>
  );
}

function ScheduleMock() {
  return (
    <AppWindow title="schedule">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-muted">Today</div>
          <div className="font-serif text-[20px] text-ink">45 / 60 min</div>
        </div>
        <div className="rounded-full bg-orange-tint px-3 py-1 text-[12px] font-semibold text-orange-ink">+800 tokens</div>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-offwhite">
        <div className="h-full w-3/4 rounded-full bg-orange" />
      </div>
      <div className="mt-4 space-y-2">
        {["Calc lesson", "Physics review bank", "Chem FRQ warm-up"].map((task, i) => (
          <div key={task} className="flex items-center gap-2 rounded-lg border border-hair bg-offwhite px-3 py-2 text-[12px]">
            <span className={`grid h-5 w-5 place-items-center rounded ${i < 2 ? "bg-green-100 text-green-700" : "border border-orange/40 text-orange-ink"}`}>{i < 2 ? "✓" : "·"}</span>
            <span className={i < 2 ? "text-muted line-through" : "text-ink"}>{task}</span>
          </div>
        ))}
      </div>
    </AppWindow>
  );
}

function CardsMock() {
  return (
    <AppWindow title="flashcards">
      <div className="relative h-[220px]">
        <div className="absolute left-5 top-5 h-40 w-56 rounded-2xl border border-hair bg-orange-tint" />
        <div className="absolute left-2 top-2 h-40 w-56 rounded-2xl border border-hair bg-offwhite" />
        <div className="absolute h-40 w-56 rounded-2xl border border-orange/30 bg-paper p-5 shadow-lg">
          <div className="text-[10px] uppercase tracking-[0.16em] text-muted">AP Physics 1</div>
          <div className="mt-3 font-serif text-[21px] leading-tight text-ink">Newton's 2nd law in one sentence?</div>
        </div>
        <div className="absolute bottom-0 right-0 rounded-xl border border-hair bg-white p-3 text-[12px] shadow-lg">
          next review<br /><span className="font-serif text-[24px] text-orange">3 days</span>
        </div>
      </div>
    </AppWindow>
  );
}

function PhotoMock() {
  return (
    <AppWindow title="image upload">
      <div className="rotate-[-2deg] rounded-xl border border-hair bg-[#fffdf7] p-4 shadow-md">
        <div className="font-serif text-[18px] text-ink">dy/dt?</div>
        <div className="mt-2 space-y-2 font-serif text-[16px] italic text-body">
          <div>x² + y² = 100</div>
          <div>2x dx/dt + 2y dy/dt = 0</div>
          <div className="text-orange-ink">dy/dt = -x/y · dx/dt</div>
        </div>
      </div>
      <div className="mt-4 rounded-lg border-l-4 border-orange bg-orange-tint/50 p-3 text-[12px] leading-5">
        First bad step: you used y=6, but the triangle gives y=8.
      </div>
    </AppWindow>
  );
}

function CommunityMock() {
  return (
    <AppWindow title="community">
      <div className="space-y-3">
        {["AP Chem help thread", "Calc BC FRQ check", "Physics 1 exam strategy"].map((post, i) => (
          <div key={post} className="rounded-lg border border-hair bg-offwhite p-3">
            <div className="text-[13px] font-medium text-ink">{post}</div>
            <div className="mt-1 text-[11px] text-muted">{i + 2} replies · active today</div>
          </div>
        ))}
      </div>
    </AppWindow>
  );
}

function LeaderboardMock() {
  return (
    <AppWindow title="leaderboard">
      <div className="space-y-2">
        {["Maya", "Jay", "Priya", "You"].map((name, i) => (
          <div key={name} className={`flex items-center justify-between rounded-lg px-3 py-2 text-[12px] ${name === "You" ? "bg-orange-tint text-orange-ink" : "bg-offwhite text-body"}`}>
            <span>{i + 1}. {name}</span>
            <span className="font-mono">{980 - i * 80}</span>
          </div>
        ))}
      </div>
    </AppWindow>
  );
}

function LineStack() {
  return (
    <div className="mt-4 space-y-2">
      <div className="h-2 w-[92%] rounded-full bg-ink/10" />
      <div className="h-2 w-[82%] rounded-full bg-ink/10" />
      <div className="h-2 w-[74%] rounded-full bg-ink/10" />
    </div>
  );
}

// =====================================================================
// Revised reels (v2) — homepage-fidelity vertical previews
// =====================================================================

function RevisedReelPreview({ reel }: { reel: RevisedReel }) {
  return (
    <div
      className="v2-phone mx-auto w-full max-w-[300px]"
      style={
        {
          "--reel-duration": `${reel.duration}s`,
          "--v2-duration": `${reel.duration}s`,
        } as React.CSSProperties
      }
      data-reel-id={reel.id}
    >
      {/* Phone notch */}
      <div className="pointer-events-none absolute left-1/2 top-2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />

      {/* Top progress bar */}
      <div className="absolute inset-x-5 top-9 z-20 h-[3px] overflow-hidden rounded-full bg-white/15 reel-progress">
        <span className="block h-full rounded-full bg-white" />
      </div>

      {/* Status row */}
      <div className="absolute inset-x-5 top-[54px] z-20 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-white/10 backdrop-blur">
            <LogoMark size={16} />
          </div>
          <div>
            <div className="text-[11px] font-semibold leading-none">FinalsPrep</div>
            <div className="mt-0.5 text-[9px] text-white/65">{reel.route}</div>
          </div>
        </div>
        <div className="rounded-full bg-white/10 px-2 py-1 text-[9px] font-medium text-white/80 backdrop-blur">
          AP prep
        </div>
      </div>

      {/* App surface */}
      <div className="absolute inset-x-3 top-[100px] bottom-[110px] overflow-hidden rounded-2xl bg-paper">
        <RevisedMock kind={reel.kind} />
      </div>

      {/* Bottom caption / hook */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black via-black/85 to-transparent px-5 pb-6 pt-16 text-white">
        <div className="text-[20px] font-semibold leading-tight tracking-tight">
          {reel.title}
        </div>
        <div className="mt-2 text-[12px] leading-[1.45] text-white/70">
          {reel.hook}
        </div>
      </div>
    </div>
  );
}

function RevisedMock({ kind }: { kind: RevisedReelKind }) {
  switch (kind) {
    case "chat":
      return <HiFiChat />;
    case "study":
      return <HiFiStudy />;
    case "book":
      return <HiFiBook />;
    case "tools":
      return <HiFiTools />;
    case "review":
      return <HiFiReview />;
    case "schedule":
      return <HiFiSchedule />;
  }
}

function PhoneAppHeader({ title, route }: { title: string; route: string }) {
  return (
    <div className="flex items-center justify-between border-b border-hair bg-offwhite/80 px-3 py-2">
      <div className="truncate font-serif text-[11px] text-ink">{title}</div>
      <div className="flex items-center gap-1 rounded-full border border-hair bg-paper px-1.5 py-0.5 text-[8px] text-muted">
        <span className="h-1 w-1 rounded-full bg-orange" />
        <span className="font-mono text-ink">{route}</span>
      </div>
    </div>
  );
}

function HiFiChat() {
  return (
    <div className="flex h-full flex-col bg-paper">
      <PhoneAppHeader title="Projectile motion" route="8.4k / 10k" />
      <div className="flex-1 space-y-2 overflow-hidden px-3 py-3">
        <div className="v2-anim v2-fade-1 ml-auto max-w-[88%] rounded-2xl bg-offwhite px-3 py-2 text-[10.5px] leading-snug text-body shadow-sm">
          A ball is thrown up at <span className="font-mono">20 m/s</span>. How high does it go before falling back?
        </div>
        <div className="v2-anim v2-thinking max-w-[55%] border-l-2 border-orange bg-paper px-3 py-2 text-[10.5px] leading-snug text-muted">
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 v2-pulse rounded-full bg-orange" />
            <span className="h-1.5 w-1.5 v2-pulse rounded-full bg-orange" style={{ animationDelay: "0.2s" }} />
            <span className="h-1.5 w-1.5 v2-pulse rounded-full bg-orange" style={{ animationDelay: "0.4s" }} />
          </span>
        </div>
        <div className="v2-anim v2-fade-2 max-w-[94%] border-l-2 border-orange bg-paper px-3 py-2 text-[10.5px] leading-snug text-body">
          <span className="font-semibold text-ink">Concept first.</span> This is{" "}
          <span className="italic">conservation of energy</span> — at the
          peak the ball is momentarily at rest, so all its kinetic energy has
          become potential.
        </div>
        <div className="v2-anim v2-fade-3 v2-stream max-w-[94%] border-l-2 border-orange bg-paper px-3 py-2 text-[10.5px] leading-snug text-body">
          Use{" "}
          <span className="rounded bg-offwhite px-1 font-mono text-[10px] text-ink">v² = v₀² − 2gh</span>
          . At the peak, v = 0. So{" "}
          <span className="font-mono">h = v₀² / (2g) = 400 / 20 = </span>
          <strong className="text-ink">20 m</strong>.
        </div>
        <div className="v2-anim v2-fade-4 rounded-lg border border-orange/30 bg-orange-tint/40 px-3 py-2 text-[10px] leading-snug text-body">
          <span className="font-semibold text-orange-ink">Common mistake.</span> Treating
          speed as displacement — they have different signs at the peak.
        </div>
      </div>
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#1f1f22] px-3 py-2 shadow-[0_8px_22px_-10px_rgba(0,0,0,0.45)]">
          <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full text-white/70">
            <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="currentColor">
              <path d="M8 2v12M2 8h12" />
            </svg>
          </span>
          <span className="flex-1 truncate text-[10px] text-white/55">
            <span className="v2-anim v2-typing">Ask a follow-up about energy losses…</span>
            <span className="v2-cursor" />
          </span>
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-orange text-paper v2-pulse">
            <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="currentColor">
              <path d="M8 14V2M3 7l5-5 5 5" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

function HiFiStudy() {
  return (
    <div className="flex h-full flex-col bg-paper">
      <PhoneAppHeader title="AP Physics 1" route="Unit 1 · Kinematics" />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[40%] shrink-0 border-r border-hair bg-offwhite/70 px-2 py-3 text-[9px]">
          <div className="text-[7px] font-semibold uppercase tracking-[0.18em] text-orange-ink/80">
            Exam guide
          </div>
          <div className="mt-1 rounded bg-orange/10 px-1.5 py-0.5 text-[8px] font-medium text-orange-ink">
            May 2 · 70 days
          </div>

          <div className="mt-3 text-[7px] font-semibold uppercase tracking-[0.18em] text-orange-ink/80">
            Unit 1
          </div>
          <div className="font-serif text-[11px] text-ink">Kinematics</div>
          <div className="mt-1.5 space-y-0.5 border-l-2 border-orange/60 pl-2">
            <div className="v2-anim v2-hl-1 flex items-center gap-1 text-orange">
              <span className="h-1 w-1 rounded-full bg-orange" />
              <span>1.1 Position & velocity</span>
            </div>
            <div className="v2-anim v2-hl-2 flex items-center gap-1 text-orange">
              <span className="h-1 w-1 rounded-full bg-orange" />
              <span>1.2 Acceleration</span>
            </div>
            <div className="v2-anim v2-hl-3 flex items-center gap-1 text-orange">
              <span className="h-1 w-1 rounded-full bg-orange" />
              <span>1.3 Projectile motion</span>
              <span className="ml-auto text-green-700">✓</span>
            </div>
            <div className="flex items-center gap-1 text-muted">
              <span className="h-1 w-1 rounded-full bg-ink/30" />
              <span>1.4 Free fall</span>
            </div>
          </div>

          <div className="mt-3 text-[7px] font-semibold uppercase tracking-[0.18em] text-orange-ink/80">
            Unit 2
          </div>
          <div className="font-serif text-[10.5px] text-ink">Dynamics</div>
          <div className="mt-3 text-[7px] font-semibold uppercase tracking-[0.18em] text-muted/70">
            Unit 3
          </div>
          <div className="flex items-center gap-1 font-serif text-[10.5px] text-muted">
            Energy <span className="text-[8px]">🔒</span>
          </div>
        </div>

        <div className="min-w-0 flex-1 px-3 py-3">
          <div className="text-[7.5px] uppercase tracking-wider text-muted">
            Unit 1 · Exam weight 12–18%
          </div>
          <div className="mt-0.5 font-serif text-[12px] leading-tight text-ink">
            Kinematics in one dimension
          </div>
          <div className="relative mt-2 flex gap-3 border-b border-hair text-[8.5px]">
            <span className="relative pb-1.5 text-ink">Overview</span>
            <span className="relative pb-1.5 text-muted">Practice</span>
            <span className="relative pb-1.5 text-muted">Interactive</span>
            <span className="absolute -bottom-px left-0 h-0.5 w-[58px] bg-orange v2-anim v2-tab-slide" />
          </div>
          <div className="v2-anim v2-fade-1 mt-2 space-y-1">
            <div className="h-1.5 w-[95%] rounded-full bg-ink/10" />
            <div className="h-1.5 w-[88%] rounded-full bg-ink/10" />
            <div className="h-1.5 w-[72%] rounded-full bg-ink/10" />
          </div>
          <div className="v2-anim v2-fade-2 mt-2 rounded border-l-2 border-orange bg-offwhite px-2 py-1.5 text-[8.5px] leading-snug text-body">
            <span className="font-semibold text-ink">Big idea.</span> Position,
            velocity, and acceleration are each the derivative of the previous.
          </div>
          <div className="v2-anim v2-fade-3 mt-2 flex flex-wrap gap-1 text-[7.5px] text-muted">
            <span className="rounded-full border border-hair bg-paper px-2 py-0.5 font-mono">
              v = v₀ + at
            </span>
            <span className="rounded-full border border-hair bg-paper px-2 py-0.5 font-mono">
              x = v₀t + ½at²
            </span>
            <span className="rounded-full border border-hair bg-paper px-2 py-0.5 font-mono">
              v² = v₀² − 2g·h
            </span>
          </div>
          <div className="v2-anim v2-fade-4 mt-2 flex items-center gap-1.5 text-[8px]">
            <span className="rounded-full bg-green-100 px-2 py-0.5 font-medium text-green-800">
              Mark complete
            </span>
            <span className="text-muted">3 of 4 topics</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HiFiBook() {
  return (
    <div className="flex h-full flex-col bg-paper">
      <PhoneAppHeader title="Book Mode" route="AP Calc BC · 6.3" />
      <div className="relative flex h-full items-stretch justify-center bg-gradient-to-b from-offwhite to-paper p-3">
        <div
          className="v2-anim v2-book-flip relative flex aspect-[3/4] w-full max-w-[210px] flex-col rounded-sm border border-hair bg-paper shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)]"
        >
          <div className="absolute inset-y-1 -right-1 w-1.5 rounded-r-sm border border-l-0 border-hair bg-offwhite opacity-70" />
          <div className="absolute inset-y-2 -right-2.5 w-1.5 rounded-r-sm border border-l-0 border-hair bg-offwhite opacity-40" />
          <div className="border-b border-hair px-3 py-2 text-center">
            <div className="text-[7px] uppercase tracking-[0.22em] text-muted">
              AP Calc BC · Unit 6
            </div>
            <div className="mt-0.5 font-serif text-[11px] text-ink">
              Integration by Parts
            </div>
          </div>

          {/* Page A — visible 0–22% & 46–62% & 94–100% */}
          <div className="v2-anim v2-page-1 flex-1 space-y-1 px-4 py-3 absolute inset-0 mt-[36px] mb-[24px]">
            <div className="font-serif text-[8px] italic text-muted">§ 6.3 · Page 3 of 7</div>
            <div className="mt-1 text-[8px] leading-[1.45] text-body">
              When a product of two functions appears under an integral, choose
              one to differentiate (u) and one to integrate (dv).
            </div>
            <div className="my-2 rounded bg-offwhite px-2 py-1 text-center font-serif text-[11px] italic text-ink">
              ∫ u dv = uv − ∫ v du
            </div>
            <div className="text-[8px] leading-[1.45] text-body">
              Pick u via <span className="font-mono">LIATE</span> — log, inverse
              trig, algebraic, trig, exponential.
            </div>
            <div className="mt-1 text-[7.5px] text-muted italic">
              Example next page →
            </div>
          </div>

          {/* Page B — visible 22–46% & 70–94% */}
          <div className="v2-anim v2-page-2 flex-1 space-y-1 px-4 py-3 absolute inset-0 mt-[36px] mb-[24px]">
            <div className="font-serif text-[8px] italic text-muted">§ 6.3 · Page 4 of 7</div>
            <div className="mt-1 text-[8px] leading-[1.45] text-body">
              Worked example: <span className="font-mono">∫ x · eˣ dx</span>.
              Set u = x and dv = eˣ dx. Then du = dx and v = eˣ.
            </div>
            <div className="my-2 rounded bg-offwhite px-2 py-1 text-center font-serif text-[10px] italic text-ink">
              x·eˣ − ∫ eˣ dx = (x − 1)eˣ + C
            </div>
            <div className="text-[8px] leading-[1.45] text-body">
              The integral on the right is now elementary, so we're done.
            </div>
            <div className="mt-1 text-[7.5px] text-muted italic">
              Try one yourself →
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-hair px-3 py-1.5 font-serif text-[8px] italic text-muted">
            <span>← Prev</span>
            <span>
              <span className="v2-anim v2-page-1">3</span>
              <span className="v2-anim v2-page-2">4</span>
              <span> / 7</span>
            </span>
            <span>Next →</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HiFiTools() {
  return (
    <div className="flex h-full flex-col bg-paper">
      <PhoneAppHeader title="Interactives" route="live graph" />

      {/* Prompt that types in */}
      <div className="border-b border-hair bg-offwhite px-3 py-2">
        <div className="text-[7px] font-semibold uppercase tracking-[0.18em] text-muted">
          Prompt
        </div>
        <div className="mt-0.5 truncate text-[10px] leading-snug text-ink">
          <span className="v2-anim v2-typing">
            graph y = sin(x) and its 3rd-order Taylor approx
          </span>
          <span className="v2-cursor text-orange" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-center gap-1.5 text-[9px] text-muted">
          <span className="v2-anim v2-hl-1 rounded border border-orange/50 bg-orange-tint/40 px-1.5 py-0.5 font-medium text-orange-ink">
            Graph 2D
          </span>
          <span className="v2-anim v2-hl-2 rounded border border-hair px-1.5 py-0.5">
            3D
          </span>
          <span className="v2-anim v2-hl-3 rounded border border-hair px-1.5 py-0.5">
            Physics
          </span>
          <span className="rounded border border-hair px-1.5 py-0.5">Java</span>
        </div>

        <div className="relative flex-1 overflow-hidden rounded-md border border-hair bg-paper">
          <svg
            viewBox="0 0 200 240"
            className="h-full w-full"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid-revised"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M20 0H0V20"
                  fill="none"
                  stroke="rgb(var(--hair))"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="200" height="240" fill="url(#grid-revised)" />
            <line x1="0" y1="120" x2="200" y2="120" stroke="rgb(var(--rule))" strokeWidth="0.7" />
            <line x1="100" y1="0" x2="100" y2="240" stroke="rgb(var(--rule))" strokeWidth="0.7" />
            {/* sin curve */}
            <path
              className="v2-anim v2-graph-draw"
              d="M0 120 C 25 70, 50 70, 75 120 S 125 170, 150 120 S 200 70, 200 120"
              fill="none"
              stroke="rgb(var(--orange))"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Taylor approx — dashed, draws second */}
            <path
              className="v2-anim v2-graph-draw-2"
              d="M0 230 C 20 160, 45 110, 70 110 S 110 130, 140 145 S 180 200, 200 230"
              fill="none"
              stroke="#0284c7"
              strokeWidth="1.6"
              strokeDasharray="800"
              strokeLinecap="round"
            />
            {/* axis labels */}
            <text x="184" y="116" fontSize="7" fill="rgb(var(--muted))" fontFamily="monospace">x</text>
            <text x="104" y="10" fontSize="7" fill="rgb(var(--muted))" fontFamily="monospace">y</text>
            <text x="6" y="116" fontSize="6" fill="rgb(var(--muted))">−π</text>
            <text x="190" y="116" fontSize="6" fill="rgb(var(--muted))">π</text>
          </svg>
          {/* Legend chip */}
          <div className="absolute left-1.5 top-1.5 flex flex-col gap-0.5 rounded bg-paper/90 px-1.5 py-1 text-[7px] backdrop-blur">
            <div className="flex items-center gap-1">
              <span className="h-0.5 w-3 bg-orange" />
              <span className="font-mono text-ink">sin(x)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="h-0.5 w-3 border-t border-dashed border-[#0284c7]" />
              <span className="font-mono text-ink">T₃(x)</span>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-hair bg-offwhite px-2 py-1.5 font-mono text-[8.5px] text-ink">
          <div>
            <span className="text-muted">f(x) =</span> <span>sin(x)</span>
          </div>
          <div>
            <span className="text-muted">T₃(x) =</span>{" "}
            <span>x − x³/6</span>
          </div>
        </div>

        <div className="text-[7.5px] text-muted">
          Drag the curve to compare divergence near x = π/2.
        </div>
      </div>
    </div>
  );
}

function HiFiReview() {
  const bars = [8, 14, 11, 18, 9, 16, 22];
  return (
    <div className="flex h-full flex-col bg-paper">
      <PhoneAppHeader title="Insights · Review" route="last 7 days" />
      <div className="flex h-full flex-col p-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-[8px] uppercase tracking-wider text-muted">
              AI tokens
            </div>
            <div className="font-serif text-[14px] text-ink">42,180</div>
          </div>
          <div className="text-right">
            <div className="text-[8px] uppercase tracking-wider text-muted">
              Streak
            </div>
            <div className="font-serif text-[14px] text-orange">
              <span>5 days</span>
              <span className="ml-1 text-[9px]">🔥</span>
            </div>
          </div>
        </div>

        <div className="mt-2 flex h-14 items-end gap-1">
          {bars.map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center justify-end gap-0.5">
              <div
                className="v2-anim v2-bar-fill w-full rounded-t bg-orange/75"
                style={
                  {
                    height: `${(h / 22) * 100}%`,
                    "--v2-bar-end": "1",
                    animationDelay: `${i * 0.08}s`,
                    transformOrigin: "bottom",
                  } as React.CSSProperties
                }
              />
              <div className="text-[6.5px] text-muted">
                {["M", "T", "W", "T", "F", "S", "S"][i]}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 text-[8px] uppercase tracking-wider text-muted">
          Review bank · spaced
        </div>
        <div className="mt-1 space-y-1">
          <div className="v2-anim v2-fade-1 flex items-center justify-between rounded border border-hair bg-paper px-2 py-1 text-[9.5px] text-body">
            <span className="truncate">Calc BC · Related rates ladder</span>
            <span className="ml-2 shrink-0 rounded-full bg-orange-tint px-1.5 py-0.5 text-[8px] font-medium text-orange-ink">
              retry
            </span>
          </div>
          <div className="v2-anim v2-fade-2 flex items-center justify-between rounded border border-hair bg-paper px-2 py-1 text-[9.5px] text-body">
            <span className="truncate">Chem · Gibbs free energy sign</span>
            <span className="ml-2 shrink-0 rounded-full bg-orange-tint px-1.5 py-0.5 text-[8px] font-medium text-orange-ink">
              retry
            </span>
          </div>
          <div className="v2-anim v2-fade-3 flex items-center justify-between rounded border border-hair bg-paper px-2 py-1 text-[9.5px] text-body">
            <span className="truncate">Phys 1 · Projectile range</span>
            <span className="ml-2 shrink-0 rounded-full bg-green-100 px-1.5 py-0.5 text-[8px] font-medium text-green-800">
              ✓ fixed
            </span>
          </div>
          <div className="v2-anim v2-fade-4 flex items-center justify-between rounded border border-hair bg-paper px-2 py-1 text-[9.5px] text-body">
            <span className="truncate">Bio · Hardy-Weinberg setup</span>
            <span className="ml-2 shrink-0 rounded-full bg-orange-tint px-1.5 py-0.5 text-[8px] font-medium text-orange-ink">
              retry
            </span>
          </div>
        </div>

        <div className="mt-2 text-[7.5px] text-muted">
          Spaced repetition: re-asks the day before you'd forget.
        </div>
      </div>
    </div>
  );
}

function HiFiSchedule() {
  return (
    <div className="flex h-full flex-col bg-paper">
      <PhoneAppHeader title="Today · April 27" route="schedule" />
      <div className="flex h-full flex-col p-3">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-[8px] uppercase tracking-wider text-muted">
              Daily goal
            </div>
            <div className="font-serif text-[13px] text-ink">
              45 / 60 min studied
            </div>
          </div>
          <div className="v2-anim v2-fade-3 text-[10px] text-orange-ink">
            <span className="font-semibold">+800</span> bonus tokens
          </div>
        </div>

        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-offwhite">
          <div
            className="v2-anim v2-bar-fill h-full rounded-full bg-orange"
            style={{ "--v2-bar-end": "0.75", width: "100%" } as React.CSSProperties}
          />
        </div>

        <div className="mt-3 space-y-1.5">
          <div className="v2-anim v2-fade-1 flex items-center gap-2 rounded border border-hair bg-offwhite px-2 py-1.5 text-[9.5px]">
            <span className="grid h-4 w-4 place-items-center rounded bg-green-100 text-[8px] text-green-700 v2-anim v2-tick">
              ✓
            </span>
            <span className="truncate text-muted line-through">
              Calc BC · 6.3 Integration by parts
            </span>
            <span className="ml-auto shrink-0 text-[9px] text-muted">20m</span>
          </div>
          <div className="v2-anim v2-fade-2 flex items-center gap-2 rounded border border-hair bg-offwhite px-2 py-1.5 text-[9.5px]">
            <span className="grid h-4 w-4 place-items-center rounded bg-green-100 text-[8px] text-green-700 v2-anim v2-tick" style={{ animationDelay: "0.4s" }}>
              ✓
            </span>
            <span className="truncate text-muted line-through">
              Physics 1 · review bank
            </span>
            <span className="ml-auto shrink-0 text-[9px] text-muted">25m</span>
          </div>
          <div className="v2-anim v2-fade-3 flex items-center gap-2 rounded border border-orange/40 bg-orange-tint px-2 py-1.5 text-[9.5px] text-orange-ink">
            <span className="grid h-4 w-4 place-items-center rounded border border-orange/40 bg-paper text-center text-[10px] v2-pulse">
              ·
            </span>
            <span className="truncate font-medium">Chem · FRQ warm-up</span>
            <span className="ml-auto shrink-0 text-[9px]">15m</span>
          </div>
          <div className="v2-anim v2-fade-4 flex items-center gap-2 rounded border border-dashed border-hair bg-paper px-2 py-1.5 text-[9.5px] text-muted">
            <span className="grid h-4 w-4 place-items-center rounded border border-hair bg-paper text-[8px]">
              ·
            </span>
            <span className="truncate">Chem · 10 spaced cards</span>
            <span className="ml-auto shrink-0 text-[9px]">10m</span>
          </div>
        </div>

        <div className="mt-2 rounded-md border border-hair bg-offwhite px-2 py-1.5 text-[8px]">
          <div className="flex items-center justify-between text-muted">
            <span>Plan tokens</span>
            <span className="font-mono text-ink">8.4k / 10k</span>
          </div>
          <div className="mt-0.5 flex items-center justify-between text-muted">
            <span>Bonus bank</span>
            <span className="font-mono text-orange-ink">+2,400</span>
          </div>
        </div>
      </div>
    </div>
  );
}
