import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAuthedUser } from "@/lib/authGuard";
import { isAdminConfigured } from "@/lib/firebaseAdmin";
import { getPlan } from "@/lib/userPlan";
import { logEvent } from "@/lib/events";
import { aiCost } from "@/lib/aiCost";
import { estimateTokens } from "@/lib/rateLimit";
import { spendTokens } from "@/lib/spend";

export const runtime = "nodejs";

/**
 * The spec the model must emit as strict JSON. The client renders whichever
 * kind matches using the existing GraphingCalculator / Graph3D / PhysicsSim /
 * CodeSandbox components. The model never writes executable code directly —
 * it only picks a widget kind and fills in parameters.
 */
const SPEC_INSTRUCTIONS = `You are designing an interactive learning widget for a student.

Return ONLY a JSON object, no prose, no markdown, no code fences. The object
must have this shape and match one of the allowed "kind" values exactly:

{
  "kind": "graph2d" | "graph3d" | "physics-sim" | "code-java" | "code-pseudo",
  "title": "short one-line title",
  "description": "2-3 sentence explanation of what the student should explore",
  "config": { ...kind-specific fields... }
}

graph2d config:
  { "expressions": ["x^2 - 2*x + 1", "sin(x)"] }
  — array of 1-4 math expressions in x. Use JavaScript math syntax
  (Math.sin, Math.sqrt, etc. get rewritten by the renderer). Keep it simple.

graph3d config:
  { "expression": "x^2 - y^2" }
  — one expression in x and y.

physics-sim config:
  { "kind": "projectile" | "pendulum" | "spring" | "collision" }

code-java config:
  { "prompt": "short task description", "initialCode": "public class Main { ... }", "expectedOutput": "…" }

code-pseudo config:
  { "prompt": "short task description", "initialCode": "DISPLAY 'Hello'", "expectedOutput": "Hello" }

Rules:
- Pick the simplest kind that teaches the concept.
- Expressions must be directly renderable (no equals signs, no "y =" prefix).
- No triple-backticks, no markdown, no comments outside the JSON.
- Keep strings under 300 chars each.
`;

type Spec = {
  kind:
    | "graph2d"
    | "graph3d"
    | "physics-sim"
    | "code-java"
    | "code-pseudo";
  title: string;
  description: string;
  config: any;
};

function extractJson(text: string): Spec | null {
  // Models occasionally wrap JSON in ```json fences or add extra prose.
  const cleaned = text
    .replace(/```json\s*/gi, "")
    .replace(/```\s*$/g, "")
    .trim();
  // Prefer a direct parse; fall back to extracting the first {...} block.
  try {
    return JSON.parse(cleaned) as Spec;
  } catch {
    const m = cleaned.match(/\{[\s\S]*\}/);
    if (!m) return null;
    try {
      return JSON.parse(m[0]) as Spec;
    } catch {
      return null;
    }
  }
}

function validateSpec(spec: any): spec is Spec {
  if (!spec || typeof spec !== "object") return false;
  if (
    ![
      "graph2d",
      "graph3d",
      "physics-sim",
      "code-java",
      "code-pseudo",
    ].includes(spec.kind)
  ) {
    return false;
  }
  if (typeof spec.title !== "string" || typeof spec.description !== "string") {
    return false;
  }
  if (!spec.config || typeof spec.config !== "object") return false;
  return true;
}

export async function POST(req: Request) {
  const adminOn = isAdminConfigured();
  const user = adminOn ? await getAuthedUser(req) : null;
  if (adminOn && (!user || !user.emailVerified)) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }
  const userPlan = user ? await getPlan(user.uid) : null;
  const plan = userPlan?.plan ?? "learner";
  if (plan === "learner") {
    return NextResponse.json(
      {
        error: "Interactives is a Pro feature.",
        upgrade: true,
      },
      { status: 402 }
    );
  }

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt || prompt.length > 500) {
    return NextResponse.json(
      { error: "Prompt must be 1-500 characters." },
      { status: 400 }
    );
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const geminiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  let rawText = "";
  let inputTokens = 0;
  let outputTokens = 0;
  try {
    if (anthropicKey) {
      const client = new Anthropic({ apiKey: anthropicKey });
      const res = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 800,
        system: SPEC_INSTRUCTIONS,
        messages: [{ role: "user", content: prompt }],
      });
      rawText = res.content
        .map((c) => (c.type === "text" ? c.text : ""))
        .join("");
      inputTokens = (res as any).usage?.input_tokens ?? estimateTokens(SPEC_INSTRUCTIONS + prompt);
      outputTokens = (res as any).usage?.output_tokens ?? estimateTokens(rawText);
    } else if (geminiKey) {
      const genAi = new GoogleGenerativeAI(geminiKey);
      const model = genAi.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: SPEC_INSTRUCTIONS,
      });
      const res = await model.generateContent(prompt);
      rawText = res.response.text();
      inputTokens = estimateTokens(SPEC_INSTRUCTIONS + prompt);
      outputTokens = estimateTokens(rawText);
    } else {
      return NextResponse.json(
        { error: "No model API key configured." },
        { status: 500 }
      );
    }
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Model request failed" },
      { status: 500 }
    );
  }

  // Charge using the shared formula; daily first, overflow from bonus bank.
  if (user?.uid) {
    const cost = aiCost({ inputTokens, outputTokens, plan });
    await spendTokens(user.uid, cost);
  }

  const spec = extractJson(rawText);
  if (!spec || !validateSpec(spec)) {
    return NextResponse.json(
      {
        error: "Model returned an invalid spec.",
        raw: rawText.slice(0, 500),
      },
      { status: 502 }
    );
  }

  void logEvent({
    kind: "chat.send",
    uid: user?.uid,
    email: user?.email,
    plan,
    meta: { kind: "interactives.generate", spec_kind: spec.kind },
  });

  return NextResponse.json({ spec });
}
