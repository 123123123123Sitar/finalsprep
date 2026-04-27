import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Scene = {
  start: number;
  end: number;
  eyebrow: string;
  headline: string;
  kind: string;
};

type ReelExport = {
  id: number;
  title: string;
  hook: string;
  duration: number;
  route: string;
  scenes: Scene[];
};

type ReelTheme = {
  primary: string;
  soft: string;
  bg: string;
};

const W = 1080;
const H = 1920;
const FPS = 30;

const reels: ReelExport[] = [
  {
    id: 1,
    title: "The One-Tab AP Prep Pitch",
    hook: "Stop bouncing between notes, YouTube, and random practice sites.",
    duration: 18,
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
    duration: 16,
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
    duration: 15,
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
    duration: 17,
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
    duration: 14,
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
    duration: 16,
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
    duration: 15,
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
    duration: 15,
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
    duration: 18,
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
    duration: 16,
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
    duration: 15,
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
    duration: 14,
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
    duration: 16,
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
    duration: 15,
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
    duration: 20,
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

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const reel = reels.find((r) => r.id === id);
  if (!reel) {
    return new Response("Reel not found", { status: 404 });
  }

  const workDir = path.join(tmpdir(), `finalsprep-reel-${id}-${randomUUID()}`);
  const listPath = path.join(workDir, "frames.txt");
  const outputPath = path.join(workDir, `finalsprep-reel-${pad(id)}.mp4`);

  await mkdir(workDir, { recursive: true });

  try {
    const framePaths = await Promise.all(
      reel.scenes.map(async (scene, idx) => {
        const framePath = path.join(workDir, `frame-${idx}.png`);
        const { start, end } = scene;
        await sharp(Buffer.from(buildSceneSvg(reel, scene, start, end)))
          .png()
          .toFile(framePath);
        return { framePath, duration: Math.max(0.25, end - start) };
      })
    );

    const concatList = [
      ...framePaths.flatMap((frame) => [
        `file '${frame.framePath}'`,
        `duration ${frame.duration.toFixed(3)}`,
      ]),
      `file '${framePaths[framePaths.length - 1].framePath}'`,
    ].join("\n");
    await writeFile(listPath, concatList, "utf8");

    await runFfmpeg([
      "-y",
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      listPath,
      "-f",
      "lavfi",
      "-i",
      `anullsrc=channel_layout=stereo:sample_rate=44100:d=${reel.duration}`,
      "-map",
      "0:v",
      "-map",
      "1:a",
      "-shortest",
      "-r",
      String(FPS),
      "-vf",
      `scale=${W}:${H}:flags=lanczos,format=yuv420p`,
      "-c:v",
      "libx264",
      "-preset",
      "medium",
      "-crf",
      "21",
      "-pix_fmt",
      "yuv420p",
      "-profile:v",
      "high",
      "-level",
      "4.0",
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      "-movflags",
      "+faststart",
      outputPath,
    ]);

    const video = await readFile(outputPath);
    return new Response(video, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": `attachment; filename="finalsprep-reel-${pad(id)}.mp4"`,
        "Content-Length": String(video.length),
        "Cache-Control": "no-store",
      },
    });
  } catch (error: any) {
    return new Response(error?.message || "Could not render MP4", {
      status: 500,
    });
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
}

function buildSceneSvg(
  reel: ReelExport,
  scene: Scene,
  start: number,
  end: number
): string {
  const visual = kindVisual(scene.kind);
  const theme = reelTheme(reel.id);
  const progress = Math.max(48, Math.round((end / reel.duration) * (W - 144)));
  const titleLines = wrap(reel.title, 22).slice(0, 2);
  const hookLines = wrap(reel.hook, 43).slice(0, 3);
  const headlineLines = wrap(scene.headline, 21).slice(0, 3);
  const bodyLines = wrap(visual.body, 40).slice(0, 2);
  const bodyFill = scene.kind === "code" || scene.kind === "voice" ? "#f3f4f6" : "#1a1a1a";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
      <path d="M72 0H0V72" fill="none" stroke="#0a0a0a" stroke-width="2" opacity="0.05"/>
    </pattern>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f7f4ee"/>
      <stop offset="1" stop-color="${theme.bg}"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#000000" flood-opacity="0.18"/>
    </filter>
  </defs>
  <rect width="1080" height="1920" fill="url(#fade)"/>
  <rect width="1080" height="1920" fill="url(#grid)"/>

  <g transform="translate(72 58)">
    <rect width="54" height="40" rx="10" fill="${theme.soft}" stroke="${theme.primary}" stroke-width="3"/>
    <path d="M11 11C18 7 24 7 27 11v22c-7 0-12 2-16 4V11Z" fill="none" stroke="#0a0a0a" stroke-width="3"/>
    <path d="M43 11C36 7 30 7 27 11v22c7 0 12 2 16 4V11Z" fill="none" stroke="${theme.primary}" stroke-width="3"/>
    <text x="72" y="28" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="700" fill="#0a0a0a">Finals<tspan font-family="Georgia, serif" font-style="italic" fill="${theme.primary}">Prep</tspan></text>
    <text x="72" y="66" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#6b6b6b">${escapeXml(reel.route)}</text>
  </g>

  <text x="72" y="188" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" letter-spacing="3" fill="${theme.primary}">AP EXAM PREP / FINALSPREP.COM</text>
  ${titleLines
    .map(
      (line, lineIdx) =>
        `<text x="72" y="${270 + lineIdx * 78}" font-family="Georgia, serif" font-size="68" fill="#0a0a0a">${escapeXml(line)}</text>`
    )
    .join("")}
  ${hookLines
    .map(
      (line, lineIdx) =>
        `<text x="72" y="${430 + lineIdx * 42}" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#1a1a1a">${escapeXml(line)}</text>`
    )
    .join("")}

  <g filter="url(#shadow)">
    <rect x="72" y="590" width="936" height="980" rx="44" fill="#ffffff"/>
    <rect x="72" y="590" width="936" height="980" rx="44" fill="none" stroke="#e8e6e0" stroke-width="6"/>
    <rect x="72" y="590" width="${progress}" height="12" rx="6" fill="${theme.primary}"/>
    <text x="118" y="668" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" letter-spacing="3" fill="${theme.primary}">${escapeXml(scene.eyebrow.toUpperCase())}</text>
    ${headlineLines
      .map(
        (line, lineIdx) =>
          `<text x="118" y="${748 + lineIdx * 74}" font-family="Georgia, serif" font-size="66" fill="#0a0a0a">${escapeXml(line)}</text>`
      )
      .join("")}

    <rect x="120" y="940" width="840" height="448" rx="28" fill="${ffColorToSvg(visual.panel)}"/>
    <rect x="120" y="940" width="840" height="448" rx="28" fill="none" stroke="#e8e6e0" stroke-width="4"/>
    <text x="168" y="1008" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="700" fill="${ffColorToSvg(visual.accent)}">${escapeXml(visual.title)}</text>
    ${bodyLines
      .map(
        (line, lineIdx) =>
          `<text x="168" y="${1062 + lineIdx * 40}" font-family="Arial, Helvetica, sans-serif" font-size="29" fill="${bodyFill}">${escapeXml(line)}</text>`
      )
      .join("")}
    ${miniSvg(scene.kind, theme)}
  </g>

  <rect x="72" y="1622" width="936" height="150" rx="34" fill="#111113"/>
  <text x="122" y="1683" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" fill="#ffffff">Study smarter for every AP exam</text>
  <text x="122" y="1733" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="${theme.primary}">finalsprep.com</text>
</svg>`;
}

function miniSvg(kind: string, theme: ReelTheme): string {
  if (kind === "interactive" || kind === "physics") {
    return `
      <g opacity="0.95">
        <rect x="168" y="1162" width="744" height="176" rx="24" fill="#ffffff" stroke="#dbeafe" stroke-width="3"/>
        <path d="M205 1290H865M535 1188V1315" stroke="#c9c5ba" stroke-width="3"/>
        <path d="M210 1285 C320 1168 455 1168 560 1250 S750 1340 860 1212" fill="none" stroke="${theme.primary}" stroke-width="7" stroke-linecap="round"/>
        <path d="M210 1240 C330 1190 430 1214 540 1248 S740 1315 860 1240" fill="none" stroke="#0284c7" stroke-width="6" stroke-dasharray="16 12" stroke-linecap="round"/>
        <rect x="190" y="1348" width="290" height="48" rx="15" fill="#ffffff" stroke="#dbeafe" stroke-width="3"/>
        <text x="212" y="1380" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="#0284c7">Live graph</text>
        <rect x="585" y="1348" width="280" height="48" rx="15" fill="#ffffff" stroke="${theme.soft}" stroke-width="3"/>
        <text x="607" y="1380" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="${theme.primary}">Adjust values</text>
      </g>`;
  }

  if (kind === "voice") {
    return `
      <rect x="168" y="1164" width="744" height="72" rx="24" fill="#ffffff" opacity="0.12"/>
      <text x="206" y="1211" font-family="Arial, Helvetica, sans-serif" font-size="29" fill="#ffffff">Explain this FRQ out loud...</text>
      <g transform="translate(246 1234)" fill="${theme.primary}">
        <rect x="0" y="48" width="34" height="92" rx="17"/>
        <rect x="70" y="0" width="34" height="140" rx="17"/>
        <rect x="140" y="34" width="34" height="106" rx="17"/>
        <rect x="210" y="-28" width="34" height="168" rx="17"/>
        <rect x="280" y="18" width="34" height="122" rx="17"/>
        <rect x="350" y="-12" width="34" height="152" rx="17"/>
        <rect x="420" y="54" width="34" height="86" rx="17"/>
      </g>`;
  }

  if (kind === "code") {
    return `
      <rect x="168" y="1164" width="744" height="186" rx="18" fill="#111113"/>
      <text x="202" y="1210" font-family="Menlo, monospace" font-size="25" fill="#ffffff">for (int r = 0; r &lt; grid.length; r++)</text>
      <text x="202" y="1254" font-family="Menlo, monospace" font-size="25" fill="${theme.primary}">  sum += grid[r][r];</text>
      <text x="202" y="1308" font-family="Menlo, monospace" font-size="24" fill="#ffffff">trace: 3, 8, 14</text>`;
  }

  if (kind === "cards") {
    return `
      <rect x="202" y="1198" width="420" height="150" rx="24" fill="${theme.soft}" stroke="#e8e6e0" stroke-width="4"/>
      <rect x="232" y="1164" width="420" height="150" rx="24" fill="#ffffff" stroke="${theme.primary}" stroke-width="4"/>
      <text x="270" y="1230" font-family="Georgia, serif" font-size="34" fill="#0a0a0a">Newton's 2nd law?</text>
      <rect x="700" y="1260" width="160" height="60" rx="18" fill="#dcfce7"/>
      <text x="746" y="1300" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#047857">Easy</text>`;
  }

  if (kind === "photo") {
    return `
      <g transform="translate(224 1198) rotate(-3)">
        <rect width="430" height="150" rx="14" fill="#fffdf7" stroke="#e8e6e0" stroke-width="4"/>
        <text x="34" y="54" font-family="Georgia, serif" font-size="30" fill="#0a0a0a">x^2 + y^2 = 100</text>
        <text x="34" y="102" font-family="Georgia, serif" font-size="30" fill="${theme.primary}">dy/dt = -x/y dx/dt</text>
      </g>`;
  }

  if (kind === "home") {
    return `
      <rect x="168" y="1170" width="330" height="62" rx="18" fill="#ffffff" stroke="${theme.soft}" stroke-width="3"/>
      <text x="196" y="1212" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="700" fill="${theme.primary}">AI tutor</text>
      <rect x="535" y="1170" width="330" height="62" rx="18" fill="#ffffff" stroke="${theme.soft}" stroke-width="3"/>
      <text x="563" y="1212" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="700" fill="${theme.primary}">AP lessons</text>
      <rect x="168" y="1250" width="330" height="62" rx="18" fill="#ffffff" stroke="${theme.soft}" stroke-width="3"/>
      <text x="196" y="1292" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="700" fill="${theme.primary}">Practice</text>
      <rect x="535" y="1250" width="330" height="62" rx="18" fill="#ffffff" stroke="${theme.soft}" stroke-width="3"/>
      <text x="563" y="1292" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="700" fill="${theme.primary}">Review bank</text>`;
  }

  if (kind === "chat") {
    return `
      <rect x="355" y="1168" width="510" height="70" rx="26" fill="${theme.soft}" stroke="${theme.soft}" stroke-width="3"/>
      <text x="390" y="1213" font-family="Arial, Helvetica, sans-serif" font-size="25" fill="#1a1a1a">Why is my slope negative?</text>
      <rect x="168" y="1260" width="620" height="76" rx="22" fill="#ffffff" stroke="${theme.primary}" stroke-width="4"/>
      <text x="205" y="1308" font-family="Arial, Helvetica, sans-serif" font-size="25" fill="#1a1a1a">Because y decreases as x grows.</text>`;
  }

  if (kind === "study") {
    return `
      <rect x="168" y="1166" width="220" height="168" rx="20" fill="#ffffff" stroke="#e8e6e0" stroke-width="3"/>
      <text x="198" y="1212" font-family="Arial, Helvetica, sans-serif" font-size="23" font-weight="700" fill="${theme.primary}">Unit 1</text>
      <text x="198" y="1252" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#1a1a1a">Kinematics</text>
      <text x="198" y="1292" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#6b6b6b">Forces</text>
      <rect x="430" y="1166" width="435" height="168" rx="20" fill="#ffffff" stroke="#e8e6e0" stroke-width="3"/>
      <text x="465" y="1216" font-family="Georgia, serif" font-size="34" fill="#0a0a0a">Projectile motion</text>
      <text x="465" y="1270" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#1a1a1a">Overview · Practice · Tools</text>
      <text x="465" y="1310" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#047857">Progress saved</text>`;
  }

  if (kind === "lesson") {
    return `
      <rect x="168" y="1168" width="700" height="70" rx="20" fill="#ffffff" stroke="#e8e6e0" stroke-width="3"/>
      <text x="204" y="1214" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#0a0a0a">Key idea: explain before calculating</text>
      <rect x="168" y="1256" width="700" height="72" rx="20" fill="${theme.soft}" stroke="${theme.soft}" stroke-width="3"/>
      <text x="204" y="1303" font-family="Arial, Helvetica, sans-serif" font-size="25" fill="${theme.primary}">Common mistake: memorizing the sign</text>`;
  }

  if (kind === "book") {
    return `
      <rect x="255" y="1148" width="560" height="205" rx="10" fill="#ffffff" stroke="#e8e6e0" stroke-width="4"/>
      <text x="320" y="1200" font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="3" fill="#6b6b6b">BOOK MODE</text>
      <text x="320" y="1260" font-family="Georgia, serif" font-size="38" fill="#0a0a0a">Integration by parts</text>
      <text x="320" y="1316" font-family="Georgia, serif" font-size="32" fill="${theme.primary}">Page 3 of 7</text>`;
  }

  if (kind === "frq") {
    return `
      <rect x="168" y="1165" width="744" height="70" rx="18" fill="#ffffff" stroke="#e8e6e0" stroke-width="3"/>
      <text x="202" y="1210" font-family="Arial, Helvetica, sans-serif" font-size="25" fill="#1a1a1a">Explain your claim using evidence.</text>
      <rect x="168" y="1258" width="226" height="72" rx="18" fill="#dcfce7"/>
      <text x="218" y="1303" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#047857">2/2 claim</text>
      <rect x="422" y="1258" width="226" height="72" rx="18" fill="#fef3c7"/>
      <text x="472" y="1303" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#92400e">1/2 evidence</text>
      <rect x="676" y="1258" width="190" height="72" rx="18" fill="${theme.soft}"/>
      <text x="727" y="1303" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="${theme.primary}">Revise</text>`;
  }

  if (kind === "exam") {
    return `
      <text x="168" y="1168" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#0a0a0a">Question 7 of 20</text>
      <rect x="705" y="1136" width="160" height="52" rx="18" fill="${theme.primary}"/>
      <text x="737" y="1172" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="700" fill="#ffffff">18:42</text>
      <rect x="168" y="1216" width="700" height="54" rx="16" fill="#ffffff" stroke="#e8e6e0" stroke-width="3"/>
      <text x="198" y="1253" font-family="Arial, Helvetica, sans-serif" font-size="23" fill="#1a1a1a">A. ∫ v(t) dt</text>
      <rect x="168" y="1282" width="700" height="54" rx="16" fill="${theme.soft}" stroke="${theme.primary}" stroke-width="3"/>
      <text x="198" y="1319" font-family="Arial, Helvetica, sans-serif" font-size="23" font-weight="700" fill="${theme.primary}">B. ∫ |v(t)| dt</text>`;
  }

  if (kind === "insights") {
    return `
      <rect x="168" y="1162" width="330" height="70" rx="20" fill="#ffffff" stroke="#e8e6e0" stroke-width="3"/>
      <text x="200" y="1208" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="700" fill="${theme.primary}">5 day streak</text>
      <rect x="535" y="1162" width="330" height="70" rx="20" fill="#ffffff" stroke="#e8e6e0" stroke-width="3"/>
      <text x="567" y="1208" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="700" fill="#0a0a0a">42k tokens</text>
      <rect x="168" y="1258" width="700" height="64" rx="18" fill="#ffffff" stroke="${theme.soft}" stroke-width="3"/>
      <text x="204" y="1300" font-family="Arial, Helvetica, sans-serif" font-size="25" fill="#1a1a1a">Review: related rates ladder problem</text>`;
  }

  if (kind === "schedule") {
    return `
      <rect x="168" y="1158" width="700" height="58" rx="18" fill="#ffffff" stroke="#e8e6e0" stroke-width="3"/>
      <text x="202" y="1196" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#047857">✓ Calc lesson · 20 min</text>
      <rect x="168" y="1230" width="700" height="58" rx="18" fill="#ffffff" stroke="#e8e6e0" stroke-width="3"/>
      <text x="202" y="1268" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#047857">✓ Physics review bank · 25 min</text>
      <rect x="168" y="1302" width="700" height="58" rx="18" fill="${theme.soft}" stroke="${theme.soft}" stroke-width="3"/>
      <text x="202" y="1340" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="${theme.primary}">+800 bonus AI tokens</text>`;
  }

  return `
    <rect x="168" y="1200" width="744" height="72" rx="20" fill="#ffffff" stroke="#e8e6e0" stroke-width="3"/>
    <text x="204" y="1246" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#1a1a1a">FinalsPrep turns AP prep into a plan.</text>
    <rect x="168" y="1290" width="520" height="62" rx="20" fill="${theme.soft}" stroke="${theme.soft}" stroke-width="3"/>
    <text x="204" y="1331" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="700" fill="${theme.primary}">Start at finalsprep.com</text>`;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function ffColorToSvg(color: string): string {
  return color.startsWith("0x") ? `#${color.slice(2, 8)}` : color;
}

function reelTheme(id: number): ReelTheme {
  const themes: ReelTheme[] = [
    { primary: "#c2410c", soft: "#fed7aa", bg: "#fff7ed" },
    { primary: "#2563eb", soft: "#dbeafe", bg: "#eff6ff" },
    { primary: "#7c3aed", soft: "#ede9fe", bg: "#f5f3ff" },
    { primary: "#059669", soft: "#d1fae5", bg: "#ecfdf5" },
    { primary: "#9f1239", soft: "#ffe4e6", bg: "#fff1f2" },
    { primary: "#0284c7", soft: "#e0f2fe", bg: "#f0f9ff" },
    { primary: "#0f766e", soft: "#ccfbf1", bg: "#f0fdfa" },
    { primary: "#4f46e5", soft: "#e0e7ff", bg: "#eef2ff" },
    { primary: "#b45309", soft: "#fef3c7", bg: "#fffbeb" },
    { primary: "#dc2626", soft: "#fee2e2", bg: "#fef2f2" },
    { primary: "#9333ea", soft: "#f3e8ff", bg: "#faf5ff" },
    { primary: "#16a34a", soft: "#dcfce7", bg: "#f0fdf4" },
    { primary: "#be185d", soft: "#fce7f3", bg: "#fdf2f8" },
    { primary: "#0d9488", soft: "#ccfbf1", bg: "#f0fdfa" },
    { primary: "#1d4ed8", soft: "#dbeafe", bg: "#eff6ff" },
  ];
  return themes[(id - 1) % themes.length];
}

function kindVisual(kind: string) {
  const map: Record<string, { title: string; body: string; panel: string; accent: string }> = {
    home: {
      title: "AI tutor + lessons + practice",
      body: "FinalsPrep gives students one place for AP explanations, study flow, practice, and review.",
      panel: "0xfff7ed",
      accent: "0xc2410c",
    },
    chat: {
      title: "Concept-first AI chat",
      body: "Ask a messy question and get a patient explanation, follow-ups, math, history, and practical next steps.",
      panel: "0xffffff",
      accent: "0xc2410c",
    },
    voice: {
      title: "Voice mode",
      body: "Say the question out loud, watch the transcript, and keep the tutor conversation moving hands-free.",
      panel: "0x111113",
      accent: "0xf97316",
    },
    study: {
      title: "AP unit map",
      body: "Study pages are organized by course, unit, lesson, practice, tools, progress, and completion state.",
      panel: "0xffffff",
      accent: "0xc2410c",
    },
    lesson: {
      title: "Deep lesson walkthrough",
      body: "Lessons explain the idea, formulas, common mistakes, and the AP context around the topic.",
      panel: "0xffffff",
      accent: "0xc2410c",
    },
    book: {
      title: "Book Mode",
      body: "Turn long lessons into focused pages with reading themes, page controls, and less endless scrolling.",
      panel: "0xfafaf7",
      accent: "0xc2410c",
    },
    interactive: {
      title: "AI-built interactive",
      body: "Ask for a graph or widget and the app turns the explanation into something visual and adjustable.",
      panel: "0xf0f9ff",
      accent: "0x0284c7",
    },
    physics: {
      title: "Physics simulation",
      body: "Projectile paths, sliders, variables, and formulas become a moving model students can experiment with.",
      panel: "0xf0f9ff",
      accent: "0x0284c7",
    },
    code: {
      title: "AP CSA code sandbox",
      body: "Trace loops, arrays, outputs, and logic in a runnable coding surface with the tutor nearby.",
      panel: "0x111113",
      accent: "0xf97316",
    },
    frq: {
      title: "FRQ practice and grading",
      body: "Write responses by part, then get rubric-style feedback about points earned and points missed.",
      panel: "0xffffff",
      accent: "0xc2410c",
    },
    exam: {
      title: "Timed AP-style practice",
      body: "Choose a course, question count, and timer to rehearse under real pacing pressure.",
      panel: "0xffffff",
      accent: "0xc2410c",
    },
    insights: {
      title: "Review bank and insights",
      body: "Missed problems, weak topics, token usage, and streaks become a focused next study plan.",
      panel: "0xfafaf7",
      accent: "0xc2410c",
    },
    schedule: {
      title: "Daily study schedule",
      body: "Stack lessons, review, FRQ work, and bonus tokens into a repeatable AP prep routine.",
      panel: "0xfff7ed",
      accent: "0xc2410c",
    },
    photo: {
      title: "Handwritten work upload",
      body: "Upload the paper work, ask what went wrong, and get the first bad step explained clearly.",
      panel: "0xffffff",
      accent: "0xc2410c",
    },
  };
  return map[kind] ?? map.chat;
}

function wrap(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function pad(id: number): string {
  return String(id).padStart(2, "0");
}

function runFfmpeg(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn("ffmpeg", args, { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(stderr || `ffmpeg exited with code ${code}`));
      }
    });
  });
}
