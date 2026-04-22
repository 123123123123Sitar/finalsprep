/**
 * autoLatex
 *
 * Takes a string written in plain-text math notation (like what lives in
 * topics.ts and lib/practice) and wraps math-looking substrings in $...$
 * so that KaTeX can render them. Preserves any existing $...$, $$...$$,
 * \(...\), or \[...\] blocks untouched.
 *
 * Handled patterns:
 *   sin(x), cos(2*pi/3), sin^2(x)     ->  $\sin(...)$ etc.
 *   log_2(32), log_2^3(x)              ->  $\log_{2}(32)$
 *   sqrt(x), sqrt(b^2 - 4)             ->  $\sqrt{...}$
 *   x^2, 2x^2, b^2                     ->  $...^{...}$
 *   x^(n+1), 2^(k-1)                   ->  $...^{...}$
 *   (x-h)^2                            ->  $(x-h)^{2}$
 *   x_1, a_n                           ->  $..._{...}$
 *   pi, theta, alpha, Omega, ...       ->  $\pi$ etc. (standalone)
 *
 * Non-math prose is untouched.
 */

const PLACEHOLDER = "";

// Longest first so "sinh" beats "sin", "arcsin" beats "sin", etc.
const MATH_FN_NAMES = [
  "arcsin",
  "arccos",
  "arctan",
  "sinh",
  "cosh",
  "tanh",
  "sin",
  "cos",
  "tan",
  "sec",
  "csc",
  "cot",
  "log",
  "ln",
  "exp",
  "lim",
  "max",
  "min",
];
const MATH_FNS = MATH_FN_NAMES.join("|");

const GREEK_NAMES = [
  "alpha",
  "beta",
  "gamma",
  "delta",
  "epsilon",
  "zeta",
  "eta",
  "theta",
  "iota",
  "kappa",
  "lambda",
  "mu",
  "nu",
  "xi",
  "pi",
  "rho",
  "sigma",
  "tau",
  "upsilon",
  "phi",
  "chi",
  "psi",
  "omega",
  "Gamma",
  "Delta",
  "Theta",
  "Lambda",
  "Pi",
  "Sigma",
  "Phi",
  "Psi",
  "Omega",
];
const GREEK = GREEK_NAMES.join("|");

export function autoLatex(text: string): string {
  if (!text) return text;

  // 1. Protect existing math regions so we don't double-wrap.
  const blocks: string[] = [];
  let t = text.replace(
    /\$\$[\s\S]+?\$\$|\$[^$\n]+?\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)/g,
    (m) => {
      blocks.push(m);
      return `${PLACEHOLDER}${blocks.length - 1}${PLACEHOLDER}`;
    }
  );

  // 2. Math function calls, optionally with ^exponent and/or _subscript.
  //    sin(x), cos^2(x), log_2(x), log_2^3(x), arcsin(x/2), ln(x+1)
  t = t.replace(
    new RegExp(
      `\\b(${MATH_FNS})` +
        `(?:\\^(\\([^()]+\\)|-?[A-Za-z0-9]*\\.?[A-Za-z0-9]+))?` +
        `(?:_(\\([^()]+\\)|-?[A-Za-z0-9]*\\.?[A-Za-z0-9]+))?` +
        `\\(([^()]*(?:\\([^()]*\\)[^()]*)*)\\)`,
      "g"
    ),
    (
      _m,
      fn: string,
      exp: string | undefined,
      sub: string | undefined,
      inner: string
    ) => {
      const expPart = exp
        ? `^{${exp.startsWith("(") ? exp.slice(1, -1) : exp}}`
        : "";
      const subPart = sub
        ? `_{${sub.startsWith("(") ? sub.slice(1, -1) : sub}}`
        : "";
      return `$\\${fn}${subPart}${expPart}(${innerToLatex(inner)})$`;
    }
  );

  // 3. sqrt(...) at the top level (function-call pass already handles
  //    sqrt() nested inside another math call via innerToLatex).
  t = t.replace(
    /sqrt\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g,
    (_m, inner: string) => {
      return `$\\sqrt{${innerToLatex(inner)}}$`;
    }
  );

  // 4. (expr)^exp -> $(expr)^{exp}$, expr^exp -> $expr^{exp}$
  //    Exp allows optional decimal (e.g. 2^3.5, 2^-3.5, 2^(t/3)).
  t = t.replace(
    /(\([^()]+\)|[A-Za-z0-9]+)\^(\([^()]+\)|-?[A-Za-z0-9]*\.?[A-Za-z0-9]+)/g,
    (_m, base: string, exp: string) => {
      const expInner = exp.startsWith("(") ? exp.slice(1, -1) : exp;
      return `$${base}^{${expInner}}$`;
    }
  );

  // 5. Subscripts x_1, a_n, v_0 -> $x_{1}$
  t = t.replace(/([A-Za-z])_([A-Za-z0-9]+)/g, (_m, base: string, sub: string) => {
    return `$${base}_{${sub}}$`;
  });

  // 6. Standalone greek letters. Not preceded by backslash (so \pi stays
  //    intact) or another letter (so "alpha" in "alphabet" stays prose).
  //    Not followed by another letter.
  t = t.replace(
    new RegExp(`(^|[^\\\\a-zA-Z])(${GREEK})(?![a-zA-Z])`, "g"),
    (_m, pre: string, g: string) => `${pre}$\\${g}$`
  );

  // 7. Merge math blocks joined by * (the student's multiplication).
  //    Runs a few times so chains like 2*pi/3 -> $2 \cdot \pi /3$ settle.
  //    Handles numeric coefficients, variable tokens like 6x, and two
  //    adjacent math blocks.
  for (let i = 0; i < 4; i++) {
    const before = t;
    t = t.replace(
      /(^|[^A-Za-z0-9$\\])(-?\d+(?:\.\d+)?[A-Za-z]*|[A-Za-z]+)\s*\*\s*\$([^$\n]+)\$/g,
      (_m, pre: string, n: string, rest: string) =>
        `${pre}$${n} \\cdot ${rest}$`
    );
    t = t.replace(
      /\$([^$\n]+)\$\s*\*\s*(-?\d+(?:\.\d+)?[A-Za-z]*|[A-Za-z]+)(?![A-Za-z0-9])/g,
      (_m, rest: string, n: string) => `$${rest} \\cdot ${n}$`
    );
    t = t.replace(
      /\$([^$\n]+)\$\s*\*\s*\$([^$\n]+)\$/g,
      (_m, a: string, b: string) => `$${a} \\cdot ${b}$`
    );
    if (t === before) break;
  }

  // 8. Collapse adjacent inline math blocks separated by nothing or a
  //    single space (e.g. $x^{2}$$y^{2}$ -> $x^{2} y^{2}$).
  t = t.replace(/\$([^$\n]+)\$\$([^$\n]+)\$/g, "$$$1 $2$$");

  // 9. Restore protected blocks.
  t = t.replace(
    new RegExp(`${PLACEHOLDER}(\\d+)${PLACEHOLDER}`, "g"),
    (_m, i: string) => blocks[parseInt(i, 10)]
  );

  return t;
}

function innerToLatex(s: string): string {
  let inner = s;

  // Greek letters (not preceded by backslash/letter, not followed by letter).
  inner = inner.replace(
    new RegExp(`(^|[^\\\\a-zA-Z])(${GREEK})(?![a-zA-Z])`, "g"),
    (_m, pre: string, g: string) => `${pre}\\${g} `
  );

  // Math function names inside math expressions (sin -> \sin) when used
  // as a function call (followed by '(' after optional ^exp or _sub).
  inner = inner.replace(
    new RegExp(
      `\\b(${MATH_FNS})` +
        `(?=\\^|_|\\()`,
      "g"
    ),
    (_m, fn: string) => `\\${fn}`
  );

  // sqrt(...) inside
  inner = inner.replace(
    /sqrt\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g,
    (_m, nested: string) => `\\sqrt{${innerToLatex(nested)}}`
  );

  // Exponents (no $ wrap - already inside math)
  inner = inner.replace(
    /(\([^()]+\)|[A-Za-z0-9]+)\^(\([^()]+\)|-?[A-Za-z0-9]*\.?[A-Za-z0-9]+)/g,
    (_m, base: string, exp: string) => {
      const expInner = exp.startsWith("(") ? exp.slice(1, -1) : exp;
      return `${base}^{${expInner}}`;
    }
  );

  // Subscripts (no $ wrap)
  inner = inner.replace(/([A-Za-z])_([A-Za-z0-9]+)/g, "$1_{$2}");

  // Multiplication * -> \cdot
  inner = inner.replace(/\s*\*\s*/g, " \\cdot ");

  return inner;
}
