/**
 * Model-agnostic streaming helpers for /api/chat. Each runner streams
 * token deltas into the supplied callback and returns final
 * input/output token counts so the route can charge the caller.
 */
import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ChatImage } from "./images";

export type ChatMsg = { role: "user" | "assistant"; content: string };

export type StreamRunResult = {
  inputTokens: number;
  outputTokens: number;
};

export type StreamContext = {
  messages: ChatMsg[];
  imagesForVision: ChatImage[];
  systemPrompt: string;
  outputTokenLimit: number;
  onDelta: (text: string) => void;
};

export async function runAnthropicStream(
  ctx: StreamContext,
  opts: { apiKey: string; model: string }
): Promise<StreamRunResult> {
  const { messages, imagesForVision, systemPrompt, outputTokenLimit, onDelta } =
    ctx;
  const client = new Anthropic({ apiKey: opts.apiKey });

  const anthMessages: Anthropic.MessageParam[] = messages.map((m, i) => {
    const isLastUser =
      i === messages.length - 1 &&
      m.role === "user" &&
      imagesForVision.length > 0;
    if (!isLastUser) return { role: m.role, content: m.content };
    const content: any[] = imagesForVision.map((img) => ({
      type: "image",
      source: {
        type: "base64",
        media_type: img.mediaType,
        data: img.data,
      },
    }));
    if (m.content.trim().length > 0) {
      content.push({ type: "text", text: m.content });
    } else {
      content.push({
        type: "text",
        text: "Please help me with the work in this image.",
      });
    }
    return { role: "user" as const, content };
  });

  const response = client.messages.stream({
    model: opts.model,
    max_tokens: outputTokenLimit,
    system: systemPrompt,
    messages: anthMessages,
  });

  let capturedInput = 0;
  let capturedOutput = 0;
  for await (const event of response) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      onDelta(event.delta.text);
    } else if (event.type === "message_start") {
      const u = (event as any).message?.usage;
      if (u?.input_tokens) capturedInput = u.input_tokens;
    } else if (event.type === "message_delta") {
      const u = (event as any).usage;
      if (u?.output_tokens) capturedOutput = u.output_tokens;
    }
  }
  if (!capturedInput || !capturedOutput) {
    try {
      const final = await response.finalMessage();
      if (!capturedInput) capturedInput = final.usage?.input_tokens ?? 0;
      if (!capturedOutput)
        capturedOutput = final.usage?.output_tokens ?? 0;
    } catch {
      // fall through with whatever we captured
    }
  }
  return { inputTokens: capturedInput, outputTokens: capturedOutput };
}

export async function runGeminiStream(
  ctx: StreamContext,
  opts: { apiKey: string; model: string }
): Promise<StreamRunResult> {
  const { messages, imagesForVision, systemPrompt, outputTokenLimit, onDelta } =
    ctx;
  const genAi = new GoogleGenerativeAI(opts.apiKey);
  const model = genAi.getGenerativeModel({
    model: opts.model,
    systemInstruction: systemPrompt,
    generationConfig: { maxOutputTokens: outputTokenLimit },
  });
  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
  const lastText = messages[messages.length - 1]?.content || "";
  const lastParts: any[] = [];
  for (const img of imagesForVision) {
    lastParts.push({
      inlineData: { mimeType: img.mediaType, data: img.data },
    });
  }
  if (lastText.trim().length > 0) {
    lastParts.push({ text: lastText });
  } else if (imagesForVision.length > 0) {
    lastParts.push({
      text: "Please help me with the work in this image.",
    });
  }
  const chat = model.startChat({ history });
  const result = await chat.sendMessageStream(lastParts);
  for await (const chunk of result.stream) {
    const t = chunk.text();
    if (t) onDelta(t);
  }
  let inputTokens = 0;
  let outputTokens = 0;
  try {
    const agg = await result.response;
    const usage = (agg as any).usageMetadata;
    if (usage) {
      inputTokens = usage.promptTokenCount || 0;
      outputTokens = usage.candidatesTokenCount || 0;
    }
  } catch {
    // fall through
  }
  return { inputTokens, outputTokens };
}
