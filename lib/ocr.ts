import { createWorker, type Worker } from "tesseract.js";

/**
 * Real OCR pass that runs before the main chat completion. Uses
 * tesseract.js (pure Tesseract running in Node) so we don't burn model
 * tokens just to transcribe text off a screenshot. The goal is to turn
 * image attachments into plain text whenever possible - every downstream
 * model can then read the result, and we only send the raw image to the
 * vision API when OCR couldn't read it confidently.
 *
 * Worker initialization is the slow part (loads WASM + language model),
 * so we cache a single worker across calls for the lifetime of the
 * serverless instance.
 */

export type OcrImageInput = { mediaType: string; data: string };

// Three-state result:
//   "transcribed": high-confidence, substantial text. Safe to drop the
//                   image entirely and just send the text to the model.
//   "partial":     got some text but not confident enough to trust as
//                   ground truth. Send BOTH the OCR text (as a hint) and
//                   the image (so the vision model can verify).
//   "failed":      couldn't read anything useful. Send the image only.
export type OcrResult =
  | { kind: "transcribed"; text: string; confidence: number }
  | { kind: "partial"; text: string; confidence: number }
  | { kind: "failed"; reason: string };

// Tesseract's "confidence" runs 0-100 and skews optimistic on garbage. We
// only trust a transcription enough to drop the image entirely when it's
// rock-solid - typed text from a screenshot will hit ~90+, while anything
// hand-written or photographed sits in the 30-70 band that we shouldn't
// hand to the model as ground truth.
const HIGH_CONFIDENCE = 82;
const PARTIAL_CONFIDENCE = 40;
const MIN_TEXT_LENGTH = 12;

let workerPromise: Promise<Worker> | null = null;

function getWorker(): Promise<Worker> {
  if (workerPromise) return workerPromise;
  workerPromise = createWorker("eng").catch((e) => {
    workerPromise = null;
    throw e;
  });
  return workerPromise;
}

export async function ocrImage(img: OcrImageInput): Promise<OcrResult> {
  try {
    const buffer = Buffer.from(img.data, "base64");
    const worker = await getWorker();
    const { data } = await worker.recognize(buffer);
    const text = (data.text || "").trim();
    const confidence = typeof data.confidence === "number" ? data.confidence : 0;
    if (text.length < MIN_TEXT_LENGTH || confidence < PARTIAL_CONFIDENCE) {
      return { kind: "failed", reason: `low_${Math.round(confidence)}_${text.length}` };
    }
    if (confidence >= HIGH_CONFIDENCE) {
      return { kind: "transcribed", text, confidence };
    }
    return { kind: "partial", text, confidence };
  } catch (e) {
    return { kind: "failed", reason: (e as Error)?.message || "ocr_error" };
  }
}
