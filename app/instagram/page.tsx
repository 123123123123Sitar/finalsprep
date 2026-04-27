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
      className="relative mx-auto aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-[34px] border border-ink/10 bg-[#0c0c0e] shadow-[0_30px_70px_-32px_rgba(0,0,0,0.55)]"
      style={{ "--reel-duration": `${reel.duration}s` } as React.CSSProperties}
    >
      {/* Phone notch */}
      <div className="pointer-events-none absolute left-1/2 top-2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />

      {/* Top progress bar (animated by reelProgress keyframes from existing styles) */}
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
      <PhoneAppHeader title="Projectile question" route="8.4k / 10k" />
      <div className="flex-1 space-y-2 overflow-hidden px-3 py-3">
        <div className="ml-auto max-w-[82%] rounded-2xl bg-offwhite px-3 py-2 text-[10.5px] leading-snug text-body">
          A ball is thrown up at 20 m/s. How high does it go?
        </div>
        <div className="max-w-[92%] border-l-2 border-orange bg-paper px-3 py-2 text-[10.5px] leading-snug text-body">
          Call up positive. At the peak v = 0. Use{" "}
          <span className="italic">v² = v₀² − 2gh</span> →{" "}
          <strong className="text-ink">h = 20 m</strong>.
        </div>
        <div className="max-w-[70%] border-l-2 border-orange bg-paper px-3 py-2 text-[10.5px] leading-snug text-muted">
          <span className="inline-block h-1.5 w-1.5 animate-pulseSoft rounded-full bg-orange align-middle" />
          <span className="ml-1">Want the full walkthrough?</span>
        </div>
        <div className="rounded-lg border border-hair bg-offwhite px-3 py-2 text-[10px] text-muted">
          <span className="font-semibold text-ink">Common mistake.</span> Treating
          speed as slope without direction.
        </div>
      </div>
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#1f1f22] px-3 py-2 shadow-[0_8px_22px_-10px_rgba(0,0,0,0.45)]">
          <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full text-white/70">
            <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="currentColor">
              <path d="M8 2v12M2 8h12" />
            </svg>
          </span>
          <span className="flex-1 truncate text-[10px] text-white/45">
            Ask a follow-up…
          </span>
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-orange text-paper">
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
      <PhoneAppHeader title="AP Physics 1 · Unit 1" route="study" />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[38%] shrink-0 border-r border-hair bg-offwhite/70 px-2 py-3 text-[9px]">
          <div className="text-[7px] font-semibold uppercase tracking-[0.18em] text-orange-ink/80">
            Unit 1
          </div>
          <div className="font-serif text-[11px] text-ink">Kinematics</div>
          <div className="mt-2 space-y-0.5 border-l-2 border-orange/60 pl-2">
            <div className="flex items-center gap-1 text-orange">
              <span className="h-1 w-1 rounded-full bg-orange" />
              <span>1.1 Motion</span>
            </div>
            <div className="flex items-center gap-1 text-muted">
              <span className="h-1 w-1 rounded-full bg-ink/30" />
              <span>1.2 Vectors</span>
            </div>
            <div className="flex items-center gap-1 text-muted">
              <span className="h-1 w-1 rounded-full bg-ink/30" />
              <span>1.3 Projectile</span>
              <span className="ml-auto text-green-700">✓</span>
            </div>
          </div>
          <div className="mt-3 text-[7px] font-semibold uppercase tracking-[0.18em] text-orange-ink/80">
            Unit 2
          </div>
          <div className="font-serif text-[10.5px] text-ink">Forces</div>
          <div className="mt-3 text-[7px] font-semibold uppercase tracking-[0.18em] text-muted/70">
            Unit 3
          </div>
          <div className="font-serif text-[10.5px] text-muted">Energy 🔒</div>
        </div>
        <div className="min-w-0 flex-1 px-3 py-3">
          <div className="text-[7.5px] uppercase tracking-wider text-muted">
            Unit 1 · Exam weight 12–18%
          </div>
          <div className="mt-0.5 font-serif text-[12px] leading-tight text-ink">
            Kinematics in one dimension
          </div>
          <div className="mt-2 flex gap-2 border-b border-hair text-[8.5px]">
            <span className="-mb-px border-b-2 border-orange py-1 text-ink">
              Overview
            </span>
            <span className="py-1 text-muted">Practice</span>
            <span className="py-1 text-muted">Interactive</span>
          </div>
          <div className="mt-2 space-y-1">
            <div className="h-1.5 w-[95%] rounded-full bg-ink/10" />
            <div className="h-1.5 w-[88%] rounded-full bg-ink/10" />
            <div className="h-1.5 w-[72%] rounded-full bg-ink/10" />
          </div>
          <div className="mt-3 rounded border border-hair bg-offwhite px-2 py-1.5 text-[8.5px] leading-snug text-body">
            <span className="font-semibold text-ink">Big idea.</span> Position,
            velocity, and acceleration are each the derivative of the last.
          </div>
          <div className="mt-2 flex flex-wrap gap-1 text-[7.5px] text-muted">
            <span className="rounded-full border border-hair bg-paper px-2 py-0.5">
              v = v₀ + at
            </span>
            <span className="rounded-full border border-hair bg-paper px-2 py-0.5">
              x = v₀t + ½at²
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HiFiBook() {
  return (
    <div className="flex h-full flex-col bg-paper">
      <PhoneAppHeader title="Book Mode" route="study" />
      <div className="relative flex h-full items-stretch justify-center bg-gradient-to-b from-offwhite to-paper p-4">
        <div className="relative flex aspect-[3/4] w-full max-w-[200px] flex-col rounded-sm border border-hair bg-paper shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)]">
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
          <div className="flex-1 space-y-1 px-4 py-3">
            <div className="h-1.5 w-[88%] rounded-full bg-ink/10" />
            <div className="h-1.5 w-[94%] rounded-full bg-ink/10" />
            <div className="h-1.5 w-[78%] rounded-full bg-ink/10" />
            <div className="my-2 rounded bg-offwhite px-2 py-1 text-center font-serif text-[11px] italic text-ink">
              ∫ u dv = uv − ∫ v du
            </div>
            <div className="h-1.5 w-[88%] rounded-full bg-ink/10" />
            <div className="h-1.5 w-[70%] rounded-full bg-ink/10" />
          </div>
          <div className="flex items-center justify-between border-t border-hair px-3 py-1.5 font-serif text-[8px] italic text-muted">
            <span>← Prev</span>
            <span>3 / 7</span>
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
      <PhoneAppHeader title="Interactives" route="live widget" />
      <div className="flex h-full flex-col gap-2 p-3">
        <div className="flex items-center gap-1.5 text-[9px] text-muted">
          <span className="rounded border border-hair bg-offwhite px-1.5 py-0.5 text-ink">
            Graph 2D
          </span>
          <span className="rounded border border-hair px-1.5 py-0.5">3D</span>
          <span className="rounded border border-hair px-1.5 py-0.5">
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
            <line
              x1="0"
              y1="120"
              x2="200"
              y2="120"
              stroke="rgb(var(--rule))"
              strokeWidth="0.7"
            />
            <line
              x1="100"
              y1="0"
              x2="100"
              y2="240"
              stroke="rgb(var(--rule))"
              strokeWidth="0.7"
            />
            <path
              d="M10 200 C 50 80, 150 80, 190 200"
              fill="none"
              stroke="rgb(var(--orange))"
              strokeWidth="2"
            />
            <path
              d="M10 120 C 40 80, 70 160, 100 120 S 160 80, 190 120"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="1.6"
              strokeDasharray="3 3"
            />
            <circle cx="100" cy="80" r="2.6" fill="rgb(var(--orange))" />
          </svg>
        </div>
        <div className="rounded-md border border-hair bg-offwhite px-2 py-1.5 font-mono text-[9px] text-ink">
          <span className="text-muted">f(x) = </span>
          <span>sin(x)</span>
          <span className="ml-2 text-muted">T₃(x) = </span>
          <span>x − x³/6</span>
        </div>
      </div>
    </div>
  );
}

function HiFiReview() {
  return (
    <div className="flex h-full flex-col bg-paper">
      <PhoneAppHeader title="Insights · Review" route="last 7 days" />
      <div className="flex h-full flex-col p-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-[8px] uppercase tracking-wider text-muted">
              Token usage
            </div>
            <div className="font-serif text-[14px] text-ink">42,180</div>
          </div>
          <div className="text-right">
            <div className="text-[8px] uppercase tracking-wider text-muted">
              Streak
            </div>
            <div className="font-serif text-[14px] text-orange">5 days</div>
          </div>
        </div>
        <div className="mt-2 flex h-12 items-end gap-1">
          {[8, 14, 11, 18, 9, 16, 22].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-orange/70"
              style={{ height: `${(h / 22) * 100}%` }}
            />
          ))}
        </div>
        <div className="mt-3 text-[8px] uppercase tracking-wider text-muted">
          Review bank · topics to revisit
        </div>
        <div className="mt-1 space-y-1">
          <div className="flex items-center justify-between rounded border border-hair px-2 py-1 text-[10px] text-body">
            <span>Related rates · ladder</span>
            <span className="text-orange-ink">retry</span>
          </div>
          <div className="flex items-center justify-between rounded border border-hair px-2 py-1 text-[10px] text-body">
            <span>Gibbs free energy · sign</span>
            <span className="text-orange-ink">retry</span>
          </div>
          <div className="flex items-center justify-between rounded border border-hair px-2 py-1 text-[10px] text-body">
            <span>Projectile · range</span>
            <span className="text-green-700">✓ fixed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HiFiSchedule() {
  return (
    <div className="flex h-full flex-col bg-paper">
      <PhoneAppHeader title="Today · April 17" route="schedule" />
      <div className="flex h-full flex-col p-3">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-[8px] uppercase tracking-wider text-muted">
              Goal
            </div>
            <div className="font-serif text-[13px] text-ink">
              45 / 60 min studied
            </div>
          </div>
          <div className="text-[10px] text-orange-ink">
            <span className="font-semibold">+800</span> bonus
          </div>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-offwhite">
          <div
            className="h-full rounded-full bg-orange"
            style={{ width: "75%" }}
          />
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="flex items-center gap-2 rounded border border-hair bg-offwhite px-2 py-1.5 text-[10px]">
            <span className="grid h-4 w-4 place-items-center rounded bg-green-100 text-center text-green-700">
              ✓
            </span>
            <span className="text-muted line-through">
              Calc BC · 6.3 Integration
            </span>
            <span className="ml-auto text-[9px] text-muted">20m</span>
          </div>
          <div className="flex items-center gap-2 rounded border border-hair bg-offwhite px-2 py-1.5 text-[10px]">
            <span className="grid h-4 w-4 place-items-center rounded bg-green-100 text-center text-green-700">
              ✓
            </span>
            <span className="text-muted line-through">
              Physics 1 · review bank
            </span>
            <span className="ml-auto text-[9px] text-muted">25m</span>
          </div>
          <div className="flex items-center gap-2 rounded border border-orange/40 bg-orange-tint px-2 py-1.5 text-[10px] text-orange-ink">
            <span className="grid h-4 w-4 place-items-center rounded border border-orange/40 bg-paper text-center">
              ·
            </span>
            <span>Chem · FRQ warm-up</span>
            <span className="ml-auto text-[9px]">15m</span>
          </div>
        </div>
      </div>
    </div>
  );
}
