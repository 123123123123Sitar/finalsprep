/**
 * autoLatex
 *
 * Takes a string written in plain-text math notation (like what lives in
 * topics.ts) and wraps math-looking substrings in $...$ so that KaTeX can
 * render them. Preserves any existing $...$, $$...$$, \(...\), or \[...\]
 * blocks untouched.
 *
 * Handled patterns:
 *   x^2, 2x^2, b^2          ->  $...^{...}$
 *   x^(n+1), 2^(k-1)        ->  $...^{...}$
 *   (x-h)^2, (x+1)^3        ->  $(x-h)^{2}$
 *   sqrt(x), sqrt(b^2 - 4)  ->  $\sqrt{...}$
 *   x_1, a_n                ->  $..._{...}$
 *
 * Non-math prose is untouched.
 */

const PLACEHOLDER = "\u0001";

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

  // 2. sqrt(...) -> $\sqrt{...}$ with the inner pre-latex-ified
  t = t.replace(/sqrt\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g, (_m, inner: string) => {
    return `$\\sqrt{${innerToLatex(inner)}}$`;
  });

  // 3. (expr)^exp -> $(expr)^{exp}$, expr^exp -> $expr^{exp}$
  //    expr can be a parenthesized group, a word, or a digit-letter combo.
  //    exp  can be a parenthesized group, a signed int, or an identifier.
  t = t.replace(
    /(\([^()]+\)|[A-Za-z0-9]+)\^(\([^()]+\)|-?[A-Za-z0-9]+)/g,
    (_m, base: string, exp: string) => {
      const expInner = exp.startsWith("(") ? exp.slice(1, -1) : exp;
      return `$${base}^{${expInner}}$`;
    }
  );

  // 4. subscripts x_1, a_n, v_0 -> $x_{1}$ etc.
  //    Only single-letter bases followed by alphanumeric subscript.
  t = t.replace(/([A-Za-z])_([A-Za-z0-9]+)/g, (_m, base: string, sub: string) => {
    return `$${base}_{${sub}}$`;
  });

  // 5. Collapse adjacent inline math blocks that are separated only by a
  //    single space or an operator (e.g. "$x^{2}$ - $y^{2}$" stays as-is,
  //    but "$x^{2}$$y^{2}$" becomes "$x^{2} y^{2}$"). The simple case of
  //    touching blocks only happens rarely in our data, so keep this light.
  t = t.replace(/\$([^$\n]+)\$\$([^$\n]+)\$/g, "$$$1 $2$$");

  // 6. Restore protected blocks.
  t = t.replace(
    new RegExp(`${PLACEHOLDER}(\\d+)${PLACEHOLDER}`, "g"),
    (_m, i: string) => blocks[parseInt(i, 10)]
  );

  return t;
}

function innerToLatex(s: string): string {
  return s
    .replace(
      /(\([^()]+\)|[A-Za-z0-9]+)\^(\([^()]+\)|-?[A-Za-z0-9]+)/g,
      (_m, base: string, exp: string) => {
        const expInner = exp.startsWith("(") ? exp.slice(1, -1) : exp;
        return `${base}^{${expInner}}`;
      }
    )
    .replace(/([A-Za-z])_([A-Za-z0-9]+)/g, "$1_{$2}");
}
