import Anthropic from "@anthropic-ai/sdk";
import { getAuthedUser } from "@/lib/authGuard";
import { isAdminConfigured } from "@/lib/firebaseAdmin";
import { spendTokens } from "@/lib/spend";

/** Flat cost for chat-title generation. Bypasses the standard aiCost
 *  formula because titles are tiny side-calls — billing them at the
 *  100-token formula floor would unfairly tax a normal chat exchange. */
const TITLE_TOKEN_COST = 10;

export const runtime = "nodejs";

/**
 * Small helper route that turns the first user+assistant exchange of a new
 * chat into a short, human-readable title (3-6 words). Called from the
 * chat UI right after the first reply finishes streaming.
 *
 * Uses Claude Haiku (cheapest) with a tight prompt and low max_tokens so
 * the cost is negligible compared to the main chat turn.
 */
function jsonError(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const TITLE_MODEL = "claude-haiku-4-5-20251001";
const TITLE_SYSTEM = `You write ultra-short chat titles (3-6 words, under 50 characters).
Rules:
- Describe the topic, not the user's greeting or pleasantry.
- Title case, no trailing punctuation, no quotes.
- Prefer concrete nouns over verbs ("Quadratic factoring", not "Solving a quadratic").
- If a problem type is obvious (related rates, projectile motion, u-substitution), name it.
- Never mention that you are an AI, never mention the model.
Respond with ONLY the title. No prefix, no explanation.`;

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return jsonError(500, { error: "ANTHROPIC_API_KEY missing" });

  const adminOn = isAdminConfigured();
  const user = adminOn ? await getAuthedUser(req) : null;
  if (adminOn && !user) return jsonError(401, { error: "Not signed in" });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return jsonError(400, { error: "Invalid JSON" });
  }

  const firstUser = typeof body?.userMessage === "string" ? body.userMessage : "";
  const firstAssistant =
    typeof body?.assistantMessage === "string" ? body.assistantMessage : "";
  if (!firstUser.trim()) return jsonError(400, { error: "userMessage required" });

  // Cap inputs so we don't send kilobytes just to generate a title.
  const user1 = firstUser.slice(0, 1200);
  const asst1 = firstAssistant.slice(0, 800);

  try {
    const client = new Anthropic({ apiKey });
    const res = await client.messages.create({
      model: TITLE_MODEL,
      max_tokens: 30,
      system: TITLE_SYSTEM,
      messages: [
        {
          role: "user",
          content: `First user message:\n${user1}\n\nFirst assistant reply:\n${asst1}\n\nTitle:`,
        },
      ],
    });
    const block = res.content?.[0];
    const raw = block && block.type === "text" ? block.text : "";
    let title = raw
      .trim()
      .replace(/^["'`]+|["'`]+$/g, "")
      .replace(/[.!?]+$/g, "")
      .replace(/\s+/g, " ")
      .slice(0, 60);
    if (!title) title = "New chat";

    // Flat 10-token cost — see TITLE_TOKEN_COST.
    if (user?.uid) {
      await spendTokens(user.uid, TITLE_TOKEN_COST);
    }
    return new Response(JSON.stringify({ title }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return jsonError(500, { error: e?.message || "Title generation failed" });
  }
}
