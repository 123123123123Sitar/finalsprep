import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAuthedUser } from "@/lib/authGuard";
import { getPlan } from "@/lib/userPlan";
import { isAdminConfigured } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";
export const maxDuration = 60;

const SAMPLE_RATE = 16000;

function jsonError(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Convert a Float32 PCM ([-1, 1], 16 kHz mono) payload into a complete
 * little-endian 16-bit PCM WAV file.
 */
function float32ToWav(samples: Float32Array, sampleRate = SAMPLE_RATE): Buffer {
  const dataBytes = samples.length * 2;
  const buffer = Buffer.alloc(44 + dataBytes);

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataBytes, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16); // PCM chunk size
  buffer.writeUInt16LE(1, 20); // PCM format
  buffer.writeUInt16LE(1, 22); // mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28); // byte rate
  buffer.writeUInt16LE(2, 32); // block align
  buffer.writeUInt16LE(16, 34); // bits per sample
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataBytes, 40);

  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE((s < 0 ? s * 0x8000 : s * 0x7fff) | 0, offset);
    offset += 2;
  }
  return buffer;
}

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

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return jsonError(502, {
      error: "Transcription unavailable",
      message: "Voice transcription is offline right now.",
    });
  }

  // Client posts raw Float32 PCM (16 kHz mono).
  const buf = await req.arrayBuffer();
  if (!buf || buf.byteLength < 3200) {
    return jsonError(400, { error: "Audio too short or missing." });
  }
  if (buf.byteLength > SAMPLE_RATE * 4 * 120) {
    return jsonError(413, { error: "Audio too long. Keep clips under 2 min." });
  }
  if (buf.byteLength % 4 !== 0) {
    return jsonError(400, { error: "Invalid PCM payload." });
  }

  const samples = new Float32Array(buf);
  const wav = float32ToWav(samples, SAMPLE_RATE);
  const base64 = wav.toString("base64");

  try {
    const genAi = new GoogleGenerativeAI(apiKey);
    const model = genAi.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: { maxOutputTokens: 512, temperature: 0 },
    });
    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "audio/wav",
          data: base64,
        },
      },
      {
        text:
          "Transcribe the speech in this audio clip verbatim. Output only the " +
          "transcript text with normal punctuation, no quotes, no prefaces, " +
          "no translation. If there is no speech, output an empty string.",
      },
    ]);
    const text = result.response.text().trim();

    return new Response(JSON.stringify({ transcript: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("[transcribe] gemini failed", e);
    return jsonError(500, {
      error: "Transcription failed",
      message: e?.message || "Please try again.",
    });
  }
}
