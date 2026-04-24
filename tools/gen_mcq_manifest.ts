// Generate a manifest of lessonSlug -> courseKey (and count) by scanning MCQ files.
import fs from "fs";
import path from "path";

const MCQ_DIR = "lib/mcqs";
const files = fs.readdirSync(MCQ_DIR).filter(f =>
  f.endsWith(".ts") && f !== "index.ts" && f !== "types.ts"
);

// courseKey is the filename without .ts, used as the dynamic import path
const manifest: Record<string, { key: string; count: number }> = {};

for (const file of files) {
  const courseKey = file.replace(/\.ts$/, "");
  const src = fs.readFileSync(path.join(MCQ_DIR, file), "utf8");
  // Each LessonMcqs entry has lessonSlug: "xxx", mcqs: [array of objects]
  // Find all lessonSlug values and the count of mcqs (by counting "}," at top-level... messy).
  // Simpler: find { lessonSlug: "..." } blocks and count the mcqs in each block.
  // Use regex: match lessonSlug:"abc" and then find the next "mcqs: [" and count objects.
  const regex = /lessonSlug:\s*"([^"]+)"\s*,\s*mcqs:\s*\[/g;
  let m;
  while ((m = regex.exec(src)) !== null) {
    const slug = m[1];
    // From the position after the match, count top-level { until matching ]
    let i = regex.lastIndex;
    let depth = 1; // we're inside [
    let count = 0;
    let inString = false;
    let stringChar = "";
    let escape = false;
    let objectDepth = 0;
    for (; i < src.length && depth > 0; i++) {
      const c = src[i];
      if (escape) { escape = false; continue; }
      if (inString) {
        if (c === "\\") { escape = true; continue; }
        if (c === stringChar) inString = false;
        continue;
      }
      if (c === '"' || c === "'") { inString = true; stringChar = c; continue; }
      if (c === "`") { inString = true; stringChar = "`"; continue; }
      if (c === "[") depth++;
      else if (c === "]") depth--;
      else if (c === "{") { if (depth === 1 && objectDepth === 0) count++; objectDepth++; }
      else if (c === "}") objectDepth--;
    }
    manifest[slug] = { key: courseKey, count };
  }
}

// Emit a TypeScript manifest file
const entries = Object.entries(manifest)
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([slug, v]) => `  "${slug}": { key: "${v.key}", count: ${v.count} },`)
  .join("\n");

const output = `// Auto-generated manifest of available MCQs.
// Maps lessonSlug -> { key: source-file basename (for dynamic import),
// count: number of MCQs available }.
//
// Regenerate by running: tsx /tmp/gen_manifest.ts
//
// This exists so \`hasMcqs()\` can answer synchronously without having
// to import any of the heavy per-course MCQ data files.

export type McqManifestEntry = { key: string; count: number };

export const MCQ_MANIFEST: Record<string, McqManifestEntry> = {
${entries}
};
`;

fs.writeFileSync("lib/mcqs/manifest.ts", output);
console.log(`Wrote ${Object.keys(manifest).length} manifest entries to lib/mcqs/manifest.ts`);
