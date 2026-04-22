import { getAuthedUser } from "@/lib/authGuard";
import { getPlan } from "@/lib/userPlan";
import { isAdminConfigured } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";
// First request downloads whisper-tiny.en (~40MB) + initializes ONNX, which
// can take 2-3 minutes on a cold box. Every subsequent request is ~1s.
// Bump way past Next's 10s default so the cold start doesn't abort.
export const maxDuration = 300;

function jsonError(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// Lazy-loaded Whisper pipeline. The model (~40MB) downloads once on the
// server's first request and is cached in node_modules/.cache or
// ~/.cache/huggingface. Subsequent requests are fully local to the server.
// We kick off the download eagerly at module-load so the first user doesn't
// eat the 2-3 minute cold-start wait.
let whisperPromise: Promise<any> | null = null;
function getWhisper() {
  if (whisperPromise) return whisperPromise;
  whisperPromise = (async () => {
    const mod = await import("@huggingface/transformers");
    const { pipeline } = mod as any;
    return pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-tiny.en",
      { quantized: true }
    );
  })().catch((e) => {
    whisperPromise = null;
    throw e;
  });
  return whisperPromise;
}
// Fire the warmup now so the model is ready when the first mic press lands.
void getWhisper().catch((e) => {
  console.warn("[transcribe] whisper warmup failed (will retry on request)", e?.message || e);
});

export async function POST(req: Request) {
  const adminOn = isAdminConfigured();
  const user = adminOn ? await getAuthedUser(req) : null;
  if (adminOn && !user) {
    return jsonError(401, { error: "Authentication required" });
  }
  const userPlan = user ? await getPlan(user.uid) : null;
  const plan = userPlan?.plan ?? "learner";
  if (plan === "learner") {
    return jsonError(403, {
      error: "Pro plan required",
      message: "Voice transcription is a Pro/Hacker feature.",
    });
  }

  // Client posts raw Float32 PCM (16kHz mono) as the body, so the server
  // can skip audio decoding entirely.
  const buf = await req.arrayBuffer();
  if (!buf || buf.byteLength < 3200) {
    return jsonError(400, { error: "Audio too short or missing." });
  }
  // 60s of 16kHz mono float32 = 60 * 16000 * 4 = 3.84MB. Cap at 2 minutes.
  if (buf.byteLength > 16000 * 4 * 120) {
    return jsonError(413, { error: "Audio too long. Keep clips under 2 min." });
  }

  // ArrayBuffer → Float32Array view. Byte length must be a multiple of 4.
  if (buf.byteLength % 4 !== 0) {
    return jsonError(400, { error: "Invalid PCM payload." });
  }
  const samples = new Float32Array(buf);

  try {
    const asr = await getWhisper();
    // whisper-tiny.en is english-only — passing `language` or `task` throws.
    // `return_timestamps: false` still helps (skips the timestamp decoder).
    const result = await asr(samples, { return_timestamps: false });
    const text = (result?.text || "").trim();
    return new Response(JSON.stringify({ transcript: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("[transcribe] whisper failed", e);
    return jsonError(500, {
      error: "Transcription failed",
      message: e?.message || "Please try again.",
    });
  }
}
