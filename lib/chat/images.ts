/**
 * Image pre-processing for /api/chat. Accepts the raw `images` array off
 * the request body, validates it, and runs OCR on each attachment.
 *
 * Output is split into two buckets:
 *   - `imagesForVision`: images the vision model should also see (OCR
 *     either failed or was only partially confident)
 *   - `ocrBlocks`: text chunks to splice into the last user message so
 *     the model picks up anything OCR could read cleanly
 */
import { ocrImage } from "@/lib/ocr";

export type ChatImage = { mediaType: string; data: string };

const VALID_MIME = /^image\/(png|jpeg|jpg|gif|webp)$/i;
const MAX_BYTES_B64 = 10_000_000;
const MAX_IMAGES = 5;

export function validateImages(raw: unknown): ChatImage[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (img: any) =>
        img &&
        typeof img.mediaType === "string" &&
        VALID_MIME.test(img.mediaType) &&
        typeof img.data === "string" &&
        img.data.length > 0 &&
        img.data.length < MAX_BYTES_B64
    )
    .slice(0, MAX_IMAGES)
    .map((img: any) => ({ mediaType: img.mediaType, data: img.data }));
}

export type ImageSplit = {
  imagesForVision: ChatImage[];
  ocrBlocks: string[];
};

export async function runOcrSplit(images: ChatImage[]): Promise<ImageSplit> {
  if (images.length === 0) return { imagesForVision: [], ocrBlocks: [] };
  const results = await Promise.all(images.map((img) => ocrImage(img)));
  const imagesForVision: ChatImage[] = [];
  const ocrBlocks: string[] = [];
  results.forEach((r, i) => {
    if (r.kind === "transcribed") {
      ocrBlocks.push(`[OCR transcription of attached image]\n${r.text}`);
    } else if (r.kind === "partial") {
      ocrBlocks.push(
        `[Partial OCR of attached image: may be inaccurate, the image is also attached for reference]\n${r.text}`
      );
      imagesForVision.push(images[i]);
    } else {
      imagesForVision.push(images[i]);
    }
  });
  return { imagesForVision, ocrBlocks };
}
