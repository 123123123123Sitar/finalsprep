// Split lib/blogPosts.ts into per-article files under lib/blog/posts/.
// Each article becomes its own module exporting a single named
// BlogPost. The old lib/blogPosts.ts is rewritten to import each and
// assemble BLOG_POSTS (all helpers keep working because they read that
// array).

import fs from "fs";
import path from "path";

const SRC = "lib/blogPosts.ts";
const src = fs.readFileSync(SRC, "utf8");

// Find the BLOG_POSTS array body. The array is delimited by
// `export const BLOG_POSTS: BlogPost[] = [` ... `];`.
const openMatch = src.match(/export const BLOG_POSTS: BlogPost\[\] = \[\s*\n/);
if (!openMatch || openMatch.index === undefined) {
  throw new Error("Could not find BLOG_POSTS declaration");
}
const bodyStart = openMatch.index + openMatch[0].length;

// Walk from bodyStart finding matching `];` at bracket depth 1 closing.
// Actually simpler: find "\n];" after bodyStart where the bracket
// depth is 0. Track brackets.
let depth = 1; // We're inside [
let inString = false;
let stringChar = "";
let escape = false;
let inBackticks = false;
let i = bodyStart;
let bodyEnd = -1;
for (; i < src.length; i++) {
  const c = src[i];
  if (escape) { escape = false; continue; }
  if (inString) {
    if (c === "\\") { escape = true; continue; }
    if (c === stringChar) inString = false;
    continue;
  }
  if (inBackticks) {
    if (c === "\\") { escape = true; continue; }
    if (c === "`") inBackticks = false;
    continue;
  }
  if (c === '"' || c === "'") { inString = true; stringChar = c; continue; }
  if (c === "`") { inBackticks = true; continue; }
  if (c === "[") depth++;
  else if (c === "]") {
    depth--;
    if (depth === 0) {
      bodyEnd = i;
      break;
    }
  }
}
if (bodyEnd === -1) throw new Error("Could not find end of BLOG_POSTS");

const header = src.slice(0, openMatch.index); // type defs + comment
const bodyText = src.slice(bodyStart, bodyEnd);
const footer = src.slice(bodyEnd + 1); // after `]` — starts with `;\n\n...`

// Split bodyText into top-level `{ ... },` blocks. Same bracket-depth
// trick but for `{`.
const articles: string[] = [];
let aDepth = 0;
let aStart = -1;
inString = false; stringChar = ""; escape = false; inBackticks = false;
for (let j = 0; j < bodyText.length; j++) {
  const c = bodyText[j];
  if (escape) { escape = false; continue; }
  if (inString) {
    if (c === "\\") { escape = true; continue; }
    if (c === stringChar) inString = false;
    continue;
  }
  if (inBackticks) {
    if (c === "\\") { escape = true; continue; }
    if (c === "`") inBackticks = false;
    continue;
  }
  if (c === '"' || c === "'") { inString = true; stringChar = c; continue; }
  if (c === "`") { inBackticks = true; continue; }
  if (c === "{") {
    if (aDepth === 0) aStart = j;
    aDepth++;
  } else if (c === "}") {
    aDepth--;
    if (aDepth === 0 && aStart >= 0) {
      articles.push(bodyText.slice(aStart, j + 1));
      aStart = -1;
    }
  }
}

console.log(`Extracted ${articles.length} articles`);

// For each article, pull out slug and write a file.
const slugRegex = /slug:\s*"([^"]+)"/;
const outDir = "lib/blog/posts";
fs.mkdirSync(outDir, { recursive: true });

const imports: string[] = [];
const arrayEntries: string[] = [];

for (const article of articles) {
  const m = slugRegex.exec(article);
  if (!m) throw new Error("Article without slug: " + article.slice(0, 80));
  const slug = m[1];
  // Convert slug to identifier: kebab-case -> snake_case UPPER
  const id = "POST_" + slug.replace(/-/g, "_").toUpperCase();
  const contents = `// Auto-split from lib/blogPosts.ts by tools/split_blogposts.ts.
// One file per post so diffs are small and git blame is readable.
//
// Do not edit the shape of this file manually; the loader in
// lib/blogPosts.ts expects a single named default export per slug.

import type { BlogPost } from "../../blogPosts";

export const ${id}: BlogPost = ${article.trim()};
`;
  fs.writeFileSync(path.join(outDir, `${slug}.ts`), contents);
  imports.push(`import { ${id} } from "./blog/posts/${slug}";`);
  arrayEntries.push(`  ${id},`);
}

// Rewrite lib/blogPosts.ts: keep type defs and helpers, but replace
// the inline BLOG_POSTS array with imports + assembly.
const newContent = `${header}// Per-article modules live in ./blog/posts/<slug>.ts. Keeping each post
// in its own file makes diffs small and git blame per-article readable.
// The helpers below still read from the flat BLOG_POSTS array so no
// caller needs to change.
${imports.join("\n")}

export const BLOG_POSTS: BlogPost[] = [
${arrayEntries.join("\n")}
]${footer}`;

fs.writeFileSync(SRC, newContent);
console.log(`Rewrote ${SRC}`);
