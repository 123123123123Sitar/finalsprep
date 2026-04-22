/**
 * Convert LaTeX-flavored text into a TTS-friendly string. Greek letters,
 * operators, functions, and common structural macros become their spoken
 * equivalents ("\\times" → "times", "\\frac{a}{b}" → "a over b"). We don't
 * try to be a full parser — just handle the cases that show up in math/
 * physics tutor replies. Unknown commands collapse to a space so they
 * don't leave backslashes for the voice to stumble over.
 */

const WORD: Record<string, string> = {
  // Greek lowercase
  alpha: "alpha",
  beta: "beta",
  gamma: "gamma",
  delta: "delta",
  epsilon: "epsilon",
  varepsilon: "epsilon",
  zeta: "zeta",
  eta: "eta",
  theta: "theta",
  vartheta: "theta",
  iota: "iota",
  kappa: "kappa",
  lambda: "lambda",
  mu: "mu",
  nu: "nu",
  xi: "xi",
  omicron: "omicron",
  pi: "pi",
  varpi: "pi",
  rho: "rho",
  varrho: "rho",
  sigma: "sigma",
  varsigma: "sigma",
  tau: "tau",
  upsilon: "upsilon",
  phi: "phi",
  varphi: "phi",
  chi: "chi",
  psi: "psi",
  omega: "omega",
  // Greek uppercase
  Gamma: "capital gamma",
  Delta: "delta",
  Theta: "capital theta",
  Lambda: "capital lambda",
  Xi: "capital xi",
  Pi: "capital pi",
  Sigma: "capital sigma",
  Upsilon: "capital upsilon",
  Phi: "capital phi",
  Psi: "capital psi",
  Omega: "capital omega",
  // Arithmetic operators
  times: "times",
  cdot: "times",
  div: "divided by",
  pm: "plus or minus",
  mp: "minus or plus",
  ast: "times",
  star: "star",
  circ: "composed with",
  bullet: "dot",
  // Relations
  leq: "less than or equal to",
  le: "less than or equal to",
  geq: "greater than or equal to",
  ge: "greater than or equal to",
  neq: "not equal to",
  ne: "not equal to",
  approx: "approximately",
  equiv: "equivalent to",
  sim: "similar to",
  propto: "proportional to",
  cong: "congruent to",
  // Arrows
  to: "to",
  rightarrow: "goes to",
  leftarrow: "comes from",
  Rightarrow: "implies",
  Leftarrow: "is implied by",
  Leftrightarrow: "if and only if",
  leftrightarrow: "maps to",
  iff: "if and only if",
  mapsto: "maps to",
  // Set + logic
  in: "in",
  notin: "not in",
  subset: "subset of",
  subseteq: "subset of or equal to",
  supset: "superset of",
  cup: "union",
  cap: "intersection",
  emptyset: "the empty set",
  forall: "for all",
  exists: "there exists",
  nexists: "there does not exist",
  land: "and",
  lor: "or",
  lnot: "not",
  neg: "not",
  // Trig + logs
  sin: "sine",
  cos: "cosine",
  tan: "tangent",
  csc: "cosecant",
  sec: "secant",
  cot: "cotangent",
  arcsin: "arc sine",
  arccos: "arc cosine",
  arctan: "arc tangent",
  sinh: "hyperbolic sine",
  cosh: "hyperbolic cosine",
  tanh: "hyperbolic tangent",
  log: "log",
  ln: "natural log",
  lg: "log",
  exp: "exponential",
  // Calculus / analysis
  sum: "sum",
  prod: "product",
  int: "integral",
  iint: "double integral",
  iiint: "triple integral",
  oint: "contour integral",
  partial: "partial",
  nabla: "del",
  infty: "infinity",
  lim: "limit",
  limsup: "lim sup",
  liminf: "lim inf",
  // Punctuation / misc
  ldots: ", dot dot dot,",
  cdots: ", dot dot dot,",
  dots: ", dot dot dot,",
  vdots: ", dot dot dot,",
  quad: " ",
  qquad: " ",
  ",": " ",
  ";": " ",
  "!": "",
  ":": " ",
  " ": " ",
  // Accents (speak as "x hat")
  hat: "",
  bar: "",
  tilde: "",
  vec: "vector",
  dot: "",
  ddot: "",
  // Formatting macros — keep content, drop wrapper
  text: "",
  textrm: "",
  textbf: "",
  textit: "",
  mathrm: "",
  mathbf: "",
  mathbb: "",
  mathcal: "",
  mathsf: "",
  mathtt: "",
  operatorname: "",
  // Delimiters-as-commands (drop; the chars remain)
  left: "",
  right: "",
  big: "",
  Big: "",
  bigg: "",
  Bigg: "",
  // Whitespace + linebreak
  "\\": " ",
};

const SUPER_DIGIT: Record<string, string> = {
  "0": "zero",
  "1": "one",
  "2": "squared",
  "3": "cubed",
  "4": "to the fourth",
  "5": "to the fifth",
  "6": "to the sixth",
  "7": "to the seventh",
  "8": "to the eighth",
  "9": "to the ninth",
};

/**
 * Read matched braces starting at idx (where s[idx] === '{'). Returns the
 * content between braces and the index past the closing '}'. Supports
 * nesting. If braces are mismatched, returns content up to end of string.
 */
function readBraces(s: string, idx: number): { body: string; end: number } {
  if (s[idx] !== "{") return { body: "", end: idx };
  let depth = 0;
  for (let i = idx; i < s.length; i++) {
    if (s[i] === "{") depth++;
    else if (s[i] === "}") {
      depth--;
      if (depth === 0) return { body: s.slice(idx + 1, i), end: i + 1 };
    }
  }
  return { body: s.slice(idx + 1), end: s.length };
}

function readGroupOrChar(s: string, idx: number): { body: string; end: number } {
  if (idx >= s.length) return { body: "", end: idx };
  if (s[idx] === "{") return readBraces(s, idx);
  return { body: s[idx], end: idx + 1 };
}

export function latexToSpeech(input: string): string {
  let out = "";
  let i = 0;
  while (i < input.length) {
    const c = input[i];

    // \command or \<single-char>
    if (c === "\\") {
      // match word command
      const m = /^\\([a-zA-Z]+)/.exec(input.slice(i));
      if (m) {
        const cmd = m[1];
        let j = i + m[0].length;
        // \frac{a}{b} → "a over b"
        if (cmd === "frac" || cmd === "dfrac" || cmd === "tfrac") {
          const a = readGroupOrChar(input, j);
          const b = readGroupOrChar(input, a.end);
          out += ` ${latexToSpeech(a.body)} over ${latexToSpeech(b.body)} `;
          i = b.end;
          continue;
        }
        // \sqrt[n]{x} or \sqrt{x}
        if (cmd === "sqrt") {
          if (input[j] === "[") {
            const close = input.indexOf("]", j);
            if (close !== -1) {
              const idx = input.slice(j + 1, close);
              const body = readGroupOrChar(input, close + 1);
              out += ` ${latexToSpeech(idx)} root of ${latexToSpeech(body.body)} `;
              i = body.end;
              continue;
            }
          }
          const body = readGroupOrChar(input, j);
          out += ` square root of ${latexToSpeech(body.body)} `;
          i = body.end;
          continue;
        }
        if (cmd === "vec" || cmd === "hat" || cmd === "bar" || cmd === "tilde" || cmd === "dot" || cmd === "ddot") {
          const body = readGroupOrChar(input, j);
          const suffix = cmd === "vec" ? "vector " : cmd === "hat" ? " hat" : cmd === "bar" ? " bar" : cmd === "tilde" ? " tilde" : cmd === "dot" ? " dot" : " double dot";
          if (cmd === "vec") out += ` vector ${latexToSpeech(body.body)} `;
          else out += ` ${latexToSpeech(body.body)}${suffix} `;
          i = body.end;
          continue;
        }
        if (cmd === "text" || cmd === "textrm" || cmd === "textbf" || cmd === "textit" || cmd === "mathrm" || cmd === "mathbf" || cmd === "mathbb" || cmd === "mathcal" || cmd === "mathsf" || cmd === "mathtt" || cmd === "operatorname") {
          const body = readGroupOrChar(input, j);
          out += ` ${body.body} `;
          i = body.end;
          continue;
        }
        if (Object.prototype.hasOwnProperty.call(WORD, cmd)) {
          out += ` ${WORD[cmd]} `;
        } else {
          out += " ";
        }
        i = j;
        continue;
      }
      // \, \; \! \: \  \\
      const next = input[i + 1] ?? "";
      if (Object.prototype.hasOwnProperty.call(WORD, next)) {
        out += WORD[next];
        i += 2;
        continue;
      }
      // Unknown escape — drop the backslash
      out += next;
      i += 2;
      continue;
    }

    // Superscript: ^x or ^{...}
    if (c === "^") {
      const body = readGroupOrChar(input, i + 1);
      const inner = body.body.trim();
      if (inner.length === 1 && Object.prototype.hasOwnProperty.call(SUPER_DIGIT, inner)) {
        out += ` ${SUPER_DIGIT[inner]} `;
      } else if (inner === "-1") {
        out += " to the minus one ";
      } else if (inner === "T") {
        out += " transpose ";
      } else {
        out += ` to the ${latexToSpeech(inner)} `;
      }
      i = body.end;
      continue;
    }

    // Subscript: _x or _{...}
    if (c === "_") {
      const body = readGroupOrChar(input, i + 1);
      const inner = body.body.trim();
      out += ` sub ${latexToSpeech(inner)} `;
      i = body.end;
      continue;
    }

    // Drop stray braces
    if (c === "{" || c === "}") {
      i++;
      continue;
    }

    // Asterisk → "times"
    if (c === "*") {
      out += " times ";
      i++;
      continue;
    }

    out += c;
    i++;
  }
  return out;
}
