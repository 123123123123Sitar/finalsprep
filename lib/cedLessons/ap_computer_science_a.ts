/**
 * AP Computer Science A — full CED bundle.
 *
 * Self-contained module powering the Finals Prep study surface for AP CSA.
 * Each topic ships with a detailed written explanation, editable Java code
 * interactives (consumed by the embedded compiler widget), flashcards, and
 * practice problems aligned to the College Board CED (2024-25).
 *
 * Consumers:
 *  - <StudyTopic /> reads `topic.explanation`, `keyIdeas`, `commonMistakes`.
 *  - <CodeInteractive /> renders each `codeInteractives[i]` inside the
 *    sandboxed Java runner (compilable via the /api/run-java endpoint).
 *  - <Flashcards /> consumes `topic.flashcards`.
 *  - <PracticeSet /> consumes `topic.practiceProblems`.
 */

export type CsaFlashcard = {
  front: string;
  back: string;
};

export type CsaCodeInteractive = {
  id: string;
  title: string;
  description: string;
  /** Full Java source. Must compile as-is so the embedded compiler runs. */
  starterCode: string;
  /** stdout expected when the student runs starterCode unchanged. */
  expectedOutput?: string;
  /** Guided "try this" prompts that ask the student to modify the code. */
  variations?: { prompt: string; hint: string }[];
  /** Optional extra hints surfaced beside the editor. */
  hints?: string[];
};

export type CsaPracticeProblem = {
  id: string;
  difficulty: "easy" | "medium" | "hard";
  /** May contain a short Java snippet inside a fenced block. */
  prompt: string;
  /** If present, the problem is multiple choice; otherwise free response. */
  choices?: string[];
  answer: string;
  explanation: string;
};

export type CsaTopic = {
  id: string;
  title: string;
  summary: string;
  /** 300-600 word walkthrough — plain text, rendered verbatim. */
  explanation: string;
  keyIdeas: string[];
  commonMistakes: string[];
  codeInteractives: CsaCodeInteractive[];
  flashcards: CsaFlashcard[];
  practiceProblems: CsaPracticeProblem[];
};

export type CsaUnit = {
  number: number;
  title: string;
  /** e.g. "2.5–5% of exam" — College Board exam weighting. */
  examWeight: string;
  overview: string;
  topics: CsaTopic[];
};

export type ApComputerScienceACourse = {
  id: "ap-cs-a";
  title: string;
  description: string;
  language: "java";
  units: CsaUnit[];
};

export const AP_COMPUTER_SCIENCE_A: ApComputerScienceACourse = {
  id: "ap-cs-a",
  title: "AP Computer Science A",
  description:
    "Full Finals Prep bundle for AP Computer Science A — covers every CED topic across the 10 units with Java-based explanations, editable code interactives, flashcards, and practice problems aligned to College Board expectations.",
  language: "java",
  units: [],
};

// Helper: append a unit after the course constant is declared. Each unit
// module below pushes its own CsaUnit so the file stays readable and each
// unit can be edited independently.

// =============================================================================
// UNIT 1 — PRIMITIVE TYPES (2.5–5% of exam)
// =============================================================================
AP_COMPUTER_SCIENCE_A.units.push({
  number: 1,
  title: "Primitive Types",
  examWeight: "2.5–5% of exam",
  overview:
    "Unit 1 introduces Java's primitive types (int, double, boolean), variable declaration, expressions, the rules of integer vs. double arithmetic, compound assignment, and casting. Mastery here is foundational — every later unit assumes you can predict the exact value and type of an expression.",
  topics: [
    {
      id: "1.1",
      title: "Why Programming? Why Java?",
      summary:
        "Java is a compiled, strongly-typed, object-oriented language. A program is a sequence of instructions stored as source code and executed after compilation to bytecode.",
      explanation:
        "A computer program is a precise set of instructions. Java source files (.java) are compiled by javac into platform-independent bytecode (.class), which the Java Virtual Machine (JVM) interprets on whatever operating system you are on. That \"write once, run anywhere\" design is why AP CSA uses Java: you can reason about program behavior without caring what hardware is underneath.\n\nEvery Java program begins execution inside a main method with the exact signature `public static void main`(`String[] args`). This method lives inside a class; the file name must match the `public class` name. A line like `System.out.println`(\"Hello\"); prints text followed by a newline; `System.out.print` does the same without the newline. Java is case-sensitive and statement-terminated by semicolons.\n\nJava is strongly and statically typed: every variable has a type declared at compile time, and the compiler refuses to run a program whose types don't line up. That strictness catches bugs early and is exactly what the AP exam tests in code-trace questions. You will spend Unit 1 learning the type rules for primitives and how expressions evaluate, which sets up objects in Unit 2.",
      keyIdeas: [
        "Java source compiles to bytecode that runs on the JVM.",
        "Execution begins in public static void main(String[] args).",
        "Java is case-sensitive; every statement ends with a semicolon.",
        "Java is statically typed — variables commit to a type at declaration.",
        "System.out.println prints with a newline; System.out.print does not.",
      ],
      commonMistakes: [
        "Writing Main instead of main or forgetting String[] args in the main signature.",
        "Missing a semicolon at the end of a statement.",
        "Using single quotes for strings; \"hello\" is a String, 'h' is a char.",
      ],
      codeInteractives: [
        {
          id: "1.1.a",
          title: "Hello, World — your first program",
          description:
            "Run this unchanged first, then try the variations. Every modification teaches one Java syntax rule.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, AP CSA!\");\n    }\n}",
          expectedOutput: "Hello, AP CSA!",
          variations: [
            {
              prompt: "Print your name on a second line.",
              hint: "Add another System.out.println below the first.",
            },
            {
              prompt: "Change println to print and rerun — what changes?",
              hint: "print does not add a newline, so follow-up output appears on the same line.",
            },
            {
              prompt: "Remove the semicolon and observe the compile error.",
              hint: "The compiler points at the end of the statement — semicolons are required.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "What does the JVM run?", back: "Java bytecode produced by javac from .java source files." },
        { front: "Entry-point signature?", back: "public static void main(String[] args)" },
        { front: "println vs print?", back: "println adds a trailing newline; print does not." },
        { front: "Is Java case-sensitive?", back: "Yes — Main and main are different identifiers." },
      ],
      practiceProblems: [
        {
          id: "1.1.p1",
          difficulty: "easy",
          prompt:
            "Which line is the valid entry point for a Java program?",
          choices: [
            "public void main(String args)",
            "public static void Main(String[] args)",
            "public static void main(String[] args)",
            "static public main(String[] args)",
          ],
          answer: "public static void main(String[] args)",
          explanation:
            "The JVM looks for the exact signature `public static void main`(`String[] args`). Wrong case (Main), wrong return type, or missing `String[]` all prevent the program from starting.",
        },
        {
          id: "1.1.p2",
          difficulty: "easy",
          prompt:
            "What is printed?\n```java\nSystem.out.print(\"AP\");\nSystem.out.println(\"CSA\");\nSystem.out.println(\"2026\");\n```",
          answer: "APCSA\n2026",
          explanation:
            "print leaves the cursor on the same line, so AP and CSA join into APCSA. The first println then finishes that line; the second prints 2026 on a new line.",
        },
      ],
    },
    {
      id: "1.2",
      title: "Variables and Data Types",
      summary:
        "Primitive types (int, double, boolean) store single values; reference types store objects. Each variable must be declared with a type before use.",
      explanation:
        "A variable is a named storage location with a fixed type. AP CSA tests three primitive types: int (32-bit signed integer, roughly ±2.1 billion), double (64-bit IEEE-754 floating-point, about 15 significant digits), and boolean (`true` or `false`). Everything else in the course — String, arrays, ArrayList, your own classes — is a reference type that stores the address of an object rather than the object itself.\n\nDeclaring a variable takes the form type name; or type name = value;. Once declared, a variable cannot change its type. You can declare multiple variables of the same type on one line: int a = 1, b = 2;. Identifier rules: start with a letter, $, or _; then letters, digits, $, or _; no reserved words (int, class, return, etc.); convention is camelCase. The final keyword makes a variable a named constant (final double PI = 3.14;) and blocks any reassignment.\n\nLiterals carry a type: 7 is an int, 7.0 is a double, 'a' is a char, \"a\" is a String, `true` is a boolean. Mixing them in one expression forces type promotion, which is the rule you will trace over and over. The most important AP CSA corollary is that int / int uses integer division — the fractional part is truncated toward zero. If either operand is a double, the division is floating-point.",
      keyIdeas: [
        "Primitive types: int (whole), double (decimal), boolean (true/false).",
        "Every variable has a type fixed at declaration time.",
        "final declares a constant that cannot be reassigned.",
        "Identifiers are case-sensitive, start with letter/$/_, no reserved words.",
      ],
      commonMistakes: [
        "Assuming 5 / 2 yields 2.5 — it yields 2 because both operands are int.",
        "Reassigning a final variable and expecting it to compile.",
        "Declaring two variables with different types on one line (you can't).",
      ],
      codeInteractives: [
        {
          id: "1.2.a",
          title: "Declare and print primitives",
          description:
            "Edit each variable and rerun. Notice how the type restricts what literal you may assign.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        int count = 12;\n        double gpa = 3.87;\n        boolean passing = true;\n        final int MAX = 100;\n\n        System.out.println(\"count = \" + count);\n        System.out.println(\"gpa = \" + gpa);\n        System.out.println(\"passing = \" + passing);\n        System.out.println(\"MAX = \" + MAX);\n    }\n}",
          expectedOutput: "count = 12\ngpa = 3.87\npassing = true\nMAX = 100",
          variations: [
            {
              prompt: "Try assigning gpa = 4; — why does this still compile?",
              hint: "int literals are implicitly widened to double when assigned to a double variable.",
            },
            {
              prompt: "Try MAX = 200; after the declaration. What error appears?",
              hint: "final variables cannot be reassigned — the compiler flags that line.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Size of int?", back: "32-bit signed — roughly −2.1×10⁹ to 2.1×10⁹." },
        { front: "Size of double?", back: "64-bit IEEE-754 — ~15 significant digits." },
        { front: "Purpose of final?", back: "Marks a variable as a constant that cannot be reassigned." },
        { front: "Legal identifiers?", back: "Start with letter, $, or _; no reserved words; case-sensitive." },
      ],
      practiceProblems: [
        {
          id: "1.2.p1",
          difficulty: "easy",
          prompt: "Which declaration is illegal?",
          choices: [
            "int _score = 0;",
            "double $pi = 3.14;",
            "boolean 1st = true;",
            "final int MAX = 50;",
          ],
          answer: "boolean 1st = true;",
          explanation:
            "Identifiers cannot start with a digit. _score, $pi, and MAX all begin with a letter, underscore, or dollar sign and are legal.",
        },
        {
          id: "1.2.p2",
          difficulty: "medium",
          prompt:
            "Trace:\n```java\nint a = 9, b = 4;\nSystem.out.println(a / b);\nSystem.out.println(a % b);\n```",
          answer: "2\n1",
          explanation:
            "Both a and b are int, so a / b is integer division: 9 / 4 = 2 (truncated). a % b is the remainder: 9 − 2×4 = 1.",
        },
      ],
    },
    {
      id: "1.3",
      title: "Expressions and Assignment Statements",
      summary:
        "Expressions evaluate to a value using arithmetic operators and precedence; assignment (=) stores the right-hand value in the left-hand variable.",
      explanation:
        "Java's arithmetic operators are +, −, *, /, and %. They follow standard precedence: * / % before + −, left-to-right otherwise, and parentheses override. The pivotal AP CSA rule is operand-driven arithmetic: the result type of a binary operation is the \"wider\" of the two operand types. If both operands are int, the result is int; if either operand is double, the result is double. This controls when you get truncation and when you get a `true` decimal.\n\nThe modulus operator (%) returns the remainder with the sign of the dividend in Java: 17 % 5 is 2, and −17 % 5 is −2. It is the workhorse for \"every Nth iteration,\" testing even/odd, and extracting digits. Integer division plus modulus (a / 10, a % 10) let you peel digits off a number one at a time.\n\nAn assignment statement looks like variable = expression;. The right side is evaluated fully (respecting precedence and type rules) and then stored. The type of the expression must be assignable to the variable: an int expression can go into a double (widening), but a double cannot fit into an int without a cast. Assignment is itself an expression that yields the stored value, but AP CSA will not lean on that; it will lean on you correctly predicting the stored value.",
      keyIdeas: [
        "Arithmetic precedence: * / % before + −; parentheses override.",
        "Result type is int only if both operands are int; otherwise double.",
        "Modulus (%) returns remainder with the sign of the dividend.",
        "An int value auto-widens to double; double → int requires a cast.",
      ],
      commonMistakes: [
        "Writing 1/3 expecting 0.333 — it is 0 because both operands are int.",
        "Forgetting parentheses in an average: (a + b) / 2 not a + b / 2.",
        "Assuming % works on doubles the way it works on ints — it does on AP, but the answers tend to be fractional.",
      ],
      codeInteractives: [
        {
          id: "1.3.a",
          title: "Operand-driven arithmetic",
          description:
            "Predict each output before running. Edit an operand to a double and re-run to see the rule in action.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        System.out.println(7 / 2);\n        System.out.println(7 / 2.0);\n        System.out.println(7 % 2);\n        System.out.println(1 + 2 * 3);\n        System.out.println((1 + 2) * 3);\n    }\n}",
          expectedOutput: "3\n3.5\n1\n7\n9",
          variations: [
            {
              prompt: "Replace 7 with 7.0 in the first println. What changes?",
              hint: "Making either operand a double promotes the whole expression to double division.",
            },
            {
              prompt: "Compute the average of 85 and 92 as a double.",
              hint: "Divide by 2.0 (or cast the sum) so integer truncation doesn't drop the 0.5.",
            },
          ],
        },
        {
          id: "1.3.b",
          title: "Peel digits with / and %",
          description:
            "Use integer division and modulus to extract the last digit of a number and drop it.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        int n = 3142;\n        int lastDigit = n % 10;\n        int rest = n / 10;\n        System.out.println(\"last digit: \" + lastDigit);\n        System.out.println(\"remaining: \" + rest);\n    }\n}",
          expectedOutput: "last digit: 2\nremaining: 314",
          variations: [
            {
              prompt: "Print all four digits of n one per line (no loops yet — repeat the pattern).",
              hint: "After extracting the last digit, reassign n = n / 10 and repeat.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Result type of int + double?", back: "double — the wider operand wins." },
        { front: "17 % 5?", back: "2 (remainder)." },
        { front: "−17 % 5?", back: "−2 (Java uses the sign of the dividend)." },
        { front: "Precedence of % vs +?", back: "% binds tighter than + (same tier as * and /)." },
      ],
      practiceProblems: [
        {
          id: "1.3.p1",
          difficulty: "easy",
          prompt: "What is printed?\n```java\nSystem.out.println(2 + 3 * 4);\n```",
          answer: "14",
          explanation:
            "Multiplication binds tighter than addition: 3 * 4 is 12, then 2 + 12 is 14.",
        },
        {
          id: "1.3.p2",
          difficulty: "medium",
          prompt:
            "Fix the bug so avg holds the true mean:\n```java\nint a = 4, b = 7;\ndouble avg = (a + b) / 2;\n```",
          answer: "double avg = (a + b) / 2.0;",
          explanation:
            "a + b is an int (11). 11 / 2 with int operands is 5, losing 0.5. Dividing by 2.0 (or casting) forces double division and yields 5.5.",
        },
        {
          id: "1.3.p3",
          difficulty: "medium",
          prompt: "What is the output?\n```java\nint n = 246;\nSystem.out.println(n / 100 + n % 10);\n```",
          answer: "8",
          explanation:
            "n / 100 is 2 (integer division). n % 10 is 6. 2 + 6 is 8.",
        },
      ],
    },
    {
      id: "1.4",
      title: "Compound Assignment Operators",
      summary:
        "Compound operators (+=, −=, *=, /=, %=) combine an arithmetic op with assignment. ++ and −− increment and decrement by 1.",
      explanation:
        "A compound assignment like x += 5 is equivalent to x = x + 5 — it reads the current value of x, adds 5, and stores the result back. The same pattern holds for −=, *=, /=, and %=. These operators are valuable because they express the update pattern clearly and (subtly) only evaluate the left-hand variable once, which matters when the left side is an array element with a costly index expression.\n\nThe unary operators ++ and −− increment or decrement a variable by 1. Prefix (++x) updates the variable and then produces the new value; postfix (x++) produces the old value and then updates. The AP exam uses them almost exclusively in isolation (x++; on its own line), where the difference doesn't matter. But you will see trace questions like `System.out.println`(x++) where it does — the printed value is the old x.\n\nType behavior is the same as regular arithmetic: int += int stays int, int += double promotes on the right but the final storage is still int, and Java silently truncates the double back to int. That silent narrowing is the most common trap on this topic. If you write int x = 5; x += 1.7; you get x == 6, not a compile error, because the operator implicitly casts.",
      keyIdeas: [
        "x += k is shorthand for x = x + k (same for −= *= /= %=).",
        "Prefix ++x updates first then returns; postfix x++ returns old value then updates.",
        "Compound assignment on an int silently truncates a double right-hand side.",
        "In isolation (x++;), prefix and postfix are interchangeable on AP.",
      ],
      commonMistakes: [
        "Writing =+ instead of += (compiles but assigns +k, not adds k).",
        "Expecting int x += 1.5 to error; it silently truncates.",
        "Confusing prefix and postfix inside a println — trace carefully.",
      ],
      codeInteractives: [
        {
          id: "1.4.a",
          title: "Compound and increment operators",
          description:
            "Each statement modifies x. Trace the value by hand first, then run to check.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        int x = 10;\n        x += 4;   // 14\n        x -= 3;   // 11\n        x *= 2;   // 22\n        x /= 5;   // 4 (integer division)\n        x %= 3;   // 1\n        System.out.println(\"final x = \" + x);\n\n        int y = 5;\n        System.out.println(y++);   // prints 5, then y becomes 6\n        System.out.println(++y);   // y becomes 7, prints 7\n    }\n}",
          expectedOutput: "final x = 1\n5\n7",
          variations: [
            {
              prompt: "Change x /= 5 to x /= 5.0 and observe the compile error.",
              hint: "x is an int — the divide produces a double that cannot be assigned back without a cast.",
            },
            {
              prompt: "Swap the order of the y++ and ++y prints. What changes?",
              hint: "Starting y is still 5; work through each statement in order.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "x *= 3 expands to?", back: "x = x * 3;" },
        { front: "Prefix vs postfix in a println?", back: "++x prints the new value; x++ prints the old value." },
        { front: "Does int x; x += 1.9; compile?", back: "Yes — it silently truncates 1.9 and stores x + 1 (int)." },
      ],
      practiceProblems: [
        {
          id: "1.4.p1",
          difficulty: "easy",
          prompt: "What is x after?\n```java\nint x = 7;\nx += 3;\nx *= 2;\nx %= 5;\n```",
          answer: "0",
          explanation:
            "x += 3 → 10. x *= 2 → 20. x %= 5 → 20 % 5 = 0.",
        },
        {
          id: "1.4.p2",
          difficulty: "medium",
          prompt:
            "What is printed?\n```java\nint y = 4;\nSystem.out.println(y++ + ++y);\n```",
          answer: "10",
          explanation:
            "y++ yields 4 (y becomes 5). ++y makes y 6 and yields 6. 4 + 6 = 10.",
        },
      ],
    },
    {
      id: "1.5",
      title: "Casting and Ranges of Variables",
      summary:
        "Casting forces a value from one type to another. int overflow wraps around; double → int truncates toward zero.",
      explanation:
        "A cast looks like (type)expression and tells the compiler \"treat this value as this type.\" Widening casts (int → double) happen automatically and are lossless. Narrowing casts (double → int) require an explicit cast and truncate toward zero — not round. So (int) 3.9 is 3 and (int) −3.9 is −3. If you want rounding, add 0.5 before casting for positive numbers, or use `Math.round` (which returns a long).\n\nThe cast applies only to the single operand it is attached to, which is the source of many trace errors. Consider (double) 7 / 2: the cast turns 7 into 7.0, then 7.0 / 2 promotes to 7.0 / 2.0, giving 3.5. But (double) (7 / 2) performs the integer division first (yielding 3), then casts to 3.0. Parentheses change everything.\n\nRanges: int can hold values from −2,147,483,648 to 2,147,483,647. Going past the max wraps to the minimum (integer overflow). Java does not throw — it silently produces wrong answers. Double has a huge range but is inexact: 0.1 + 0.2 is 0.30000000000000004 because binary floating-point cannot represent 0.1 exactly. AP CSA won't ask about overflow numerically, but it may ask conceptually whether an operation might overflow or lose precision.",
      keyIdeas: [
        "(type)value forces a cast; widening is implicit, narrowing is explicit.",
        "double → int truncates toward zero; it does not round.",
        "Cast binds only to the next operand; use parentheses for whole expressions.",
        "int overflow wraps silently; double is range-large but inexact.",
      ],
      commonMistakes: [
        "Expecting (int) 4.9 to be 5 — it's 4.",
        "Writing (double) 7 / 2 and (double) (7 / 2) as if they are the same.",
        "Storing a double result back into an int without casting.",
      ],
      codeInteractives: [
        {
          id: "1.5.a",
          title: "Cast placement matters",
          description: "See how the parentheses change which operation happens first.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        System.out.println((double) 7 / 2);     // 3.5\n        System.out.println((double) (7 / 2));   // 3.0\n        System.out.println((int) 3.9);          // 3 (truncates)\n        System.out.println((int) -3.9);         // -3 (truncates toward zero)\n\n        int sum = 85 + 92;\n        double avg = (double) sum / 2;\n        System.out.println(\"avg = \" + avg);\n    }\n}",
          expectedOutput: "3.5\n3.0\n3\n-3\navg = 88.5",
          variations: [
            {
              prompt: "Round 3.6 to the nearest int using a cast.",
              hint: "Add 0.5 first — (int)(3.6 + 0.5) gives 4.",
            },
            {
              prompt: "Overflow int: print Integer.MAX_VALUE + 1.",
              hint: "You should see −2147483648 — the wrap-around.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "(int) 7.8?", back: "7 — truncation toward zero." },
        { front: "(int) −7.8?", back: "−7 — toward zero, not down." },
        { front: "Widening cast example?", back: "int → double happens automatically." },
        { front: "Rounding trick?", back: "(int)(value + 0.5) for positive numbers." },
      ],
      practiceProblems: [
        {
          id: "1.5.p1",
          difficulty: "easy",
          prompt: "What is printed?\n```java\nSystem.out.println((int) 4.7);\n```",
          answer: "4",
          explanation: "Casting a double to int truncates toward zero. 4.7 → 4.",
        },
        {
          id: "1.5.p2",
          difficulty: "medium",
          prompt: "What is the difference?\n```java\nSystem.out.println((double) 9 / 4);\nSystem.out.println((double) (9 / 4));\n```",
          answer: "2.25 on the first line, 2.0 on the second",
          explanation:
            "(double) 9 / 4 casts 9 to 9.0 then does double division → 2.25. (double) (9 / 4) performs 9 / 4 as int division (2) then casts to 2.0.",
        },
        {
          id: "1.5.p3",
          difficulty: "hard",
          prompt:
            "Write one expression that rounds the double d to the nearest int and stores it in int r (assume d ≥ 0).",
          answer: "int r = (int)(d + 0.5);",
          explanation:
            "Adding 0.5 before truncation shifts the boundary so any fractional part of 0.5 or more bumps up to the next whole number.",
        },
      ],
    },
  ],
});

// =============================================================================
// UNIT 2 — USING OBJECTS (5–7.5% of exam)
// =============================================================================
AP_COMPUTER_SCIENCE_A.units.push({
  number: 2,
  title: "Using Objects",
  examWeight: "5–7.5% of exam",
  overview:
    "Unit 2 shifts from primitives to reference types. You learn how to create objects with new, call methods (void and value-returning), pass arguments, and work with two workhorse classes — String and Math. Understanding objects sets up everything else in the course.",
  topics: [
    {
      id: "2.1",
      title: "Objects: Instances of Classes",
      summary:
        "A class is a blueprint; an object is a concrete instance built from that blueprint with its own state and behaviors.",
      explanation:
        "A class defines the attributes (state) and methods (behaviors) that every object of that type will have. You have been using classes already — String, Math, System — but you can also write your own (Unit 5). Creating an actual object means allocating memory on the heap and obtaining a reference (address) to it. A reference variable holds that address; dereferencing it (`obj.method()`) sends a message to the object.\n\nThis is fundamentally different from primitives. An int variable stores a value directly. A String variable stores a pointer to a String object elsewhere. Two references can point to the same object, in which case a change via one reference is visible through the other (aliasing). A reference can also be `null`, meaning it points to no object — calling a method on a `null` reference throws `NullPointerException` at runtime.\n\nA well-designed class gives you an abstraction: you use the object through its public methods without knowing the internal storage. String is a perfect example — you call `s.length()` and `s.substring`(0, 3) without caring how Java stores the characters. In AP CSA, you will constantly ask: is this a primitive or a reference? The answer changes how assignment, comparison, and parameter passing behave.",
      keyIdeas: [
        "Class = blueprint; object = instance with its own state.",
        "Reference variables store addresses, not values.",
        "Two references can alias the same object.",
        "A null reference + a method call → NullPointerException.",
      ],
      commonMistakes: [
        "Treating String like a primitive and using == instead of .equals().",
        "Forgetting that uninitialized reference fields default to null.",
        "Assuming obj.method() magically creates an object — you must new first.",
      ],
      codeInteractives: [
        {
          id: "2.1.a",
          title: "References and aliasing",
          description:
            "Two variables can refer to the same object. Watch what happens when you change through one alias.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        int[] a = {1, 2, 3};\n        int[] b = a;          // b aliases the same array\n        b[0] = 99;\n        System.out.println(a[0]);   // prints 99 — same object\n        System.out.println(b[0]);   // prints 99\n\n        int[] c = {1, 2, 3};        // different object with same values\n        System.out.println(a == c); // false — different references\n    }\n}",
          expectedOutput: "99\n99\nfalse",
          variations: [
            {
              prompt: "Set b = null and call b.length — what runtime error appears?",
              hint: "Any method/field access on a null reference throws NullPointerException.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Class vs object?", back: "Class is the blueprint; object is a concrete instance." },
        { front: "What does a reference variable store?", back: "The address of an object on the heap." },
        { front: "What is aliasing?", back: "Two references pointing to the same object." },
        { front: "Calling a method on null?", back: "Throws NullPointerException at runtime." },
      ],
      practiceProblems: [
        {
          id: "2.1.p1",
          difficulty: "easy",
          prompt: "True or false: a reference variable stores the object itself.",
          choices: ["True", "False"],
          answer: "False",
          explanation:
            "A reference stores only the address of the object. The object itself lives on the heap.",
        },
        {
          id: "2.1.p2",
          difficulty: "medium",
          prompt: "What prints?\n```java\nint[] x = {1, 2};\nint[] y = x;\ny[0] = 7;\nSystem.out.println(x[0]);\n```",
          answer: "7",
          explanation:
            "y is an alias for x — both reference the same array object. Mutating through y is visible through x.",
        },
      ],
    },
    {
      id: "2.2",
      title: "Creating and Storing Objects (Instantiation)",
      summary:
        "Use the new operator with a constructor call to allocate an object and initialize its state; save the returned reference in a variable.",
      explanation:
        "The general form is ClassName var = new ClassName(args);. The new operator allocates memory, runs the matching constructor to initialize fields, and returns a reference. Classes can have multiple constructors (overloading) differing by parameter list. A no-argument (default) constructor is provided automatically only if you write no constructors at all — once you declare one, you must write a no-arg constructor explicitly if you want it.\n\nString is special: literals like \"hello\" implicitly construct a String object via the string pool, so new String(\"hello\") is rarely necessary (and actually creates a duplicate object). For most classes, you will explicitly write new ClassName(...). The constructor's job is to leave the object in a valid starting state — every field either initialized explicitly or left at its default (0, 0.0, `false`, or `null`).\n\nOnce constructed, the reference can be assigned, passed to methods, returned, or stored in an array/ArrayList. Reassigning the variable simply changes which object it points to; the old object becomes eligible for garbage collection if no references remain. AP CSA will test your ability to read a constructor call and predict what the resulting object's state looks like.",
      keyIdeas: [
        "new ClassName(args) allocates + initializes + returns a reference.",
        "String literals create String objects without explicit new.",
        "Overloaded constructors have different parameter lists.",
        "Default field values: 0, 0.0, false, null.",
      ],
      commonMistakes: [
        "Forgetting new — ClassName(args) alone is just a constructor call with no target, a compile error outside certain contexts.",
        "Believing there is always a no-arg constructor — once you declare one that takes args, the default disappears.",
        "Calling new String(\"x\") when \"x\" alone suffices.",
      ],
      codeInteractives: [
        {
          id: "2.2.a",
          title: "new vs literal",
          description:
            "Observe the difference between implicit String construction via a literal and explicit construction with new.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        String a = \"APCSA\";\n        String b = new String(\"APCSA\");\n        System.out.println(a);\n        System.out.println(b);\n        System.out.println(a == b);        // false — different objects\n        System.out.println(a.equals(b));   // true  — same contents\n    }\n}",
          expectedOutput: "APCSA\nAPCSA\nfalse\ntrue",
          variations: [
            {
              prompt: "Change both lines to use literals. What does a == b print?",
              hint: "Both literals share the string pool, so == is true. Still use .equals() on the exam.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Purpose of new?", back: "Allocate memory, run the constructor, return a reference." },
        { front: "Default int field?", back: "0" },
        { front: "Default boolean field?", back: "false" },
        { front: "Default reference field?", back: "null" },
      ],
      practiceProblems: [
        {
          id: "2.2.p1",
          difficulty: "easy",
          prompt:
            "Which line correctly creates a new Rectangle with length 4 and width 3 (assume such a constructor exists)?",
          choices: [
            "Rectangle r = Rectangle(4, 3);",
            "Rectangle r = new Rectangle(4, 3);",
            "new Rectangle r = (4, 3);",
            "Rectangle r = 4, 3;",
          ],
          answer: "Rectangle r = new Rectangle(4, 3);",
          explanation:
            "Object creation always uses new ClassName(args) on the right and a type-matched reference variable on the left.",
        },
      ],
    },
    {
      id: "2.3",
      title: "Calling a Void Method",
      summary:
        "A void method performs an action without returning a value. Call it with `object.methodName()`; on its own line.",
      explanation:
        "Methods are the verbs of OOP. A void method does something — prints, mutates state, triggers an I/O action — but does not produce a value you can store. Because there is no returned value, a void call sits on its own line as a statement; you cannot write String s = `obj.voidMethod()`;.\n\nStatic (class) methods are called on the class (`ClassName.methodName()`); instance methods are called on a specific object (`obj.methodName()`). AP CSA frequently asks you to pick the right form. `Math.random()` is static because randomness is not tied to an object; `myString.length()` is an instance method because every String has its own length.\n\nThe method signature — the combination of name and parameter list — determines which overloaded method runs. Return type is not part of the signature. When you invoke a method, Java matches arguments to parameters in order, performing implicit widening if needed (int → double). If no matching signature exists, the compiler reports an error.",
      keyIdeas: [
        "A void method returns nothing; the call is a standalone statement.",
        "Static method: ClassName.method(); instance method: obj.method().",
        "Signature = name + parameter types (not return type).",
        "Arguments must match parameters in number and (compatible) type.",
      ],
      commonMistakes: [
        "Assigning a void call: int x = obj.doSomething(); (compile error if doSomething is void).",
        "Calling an instance method on the class name (or vice versa).",
        "Passing a double to an int parameter without casting.",
      ],
      codeInteractives: [
        {
          id: "2.3.a",
          title: "Void call basics",
          description:
            "Calls that just do something. Notice they cannot appear on the right of =.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello\");     // void method\n        System.out.print(\"same line \");\n        System.out.println(\"end\");\n    }\n}",
          expectedOutput: "Hello\nsame line end",
          variations: [
            {
              prompt: "Try String s = System.out.println(\"oops\"); — describe the compile error.",
              hint: "println is void; you cannot assign nothing to a String variable.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Void return type means?", back: "The method returns no value." },
        { front: "Can you assign a void call?", back: "No — it is used as a statement." },
        { front: "Signature is?", back: "Method name + parameter types (not return type)." },
      ],
      practiceProblems: [
        {
          id: "2.3.p1",
          difficulty: "easy",
          prompt:
            "Which statement is legal (assume greet is declared as public void greet(String name))?",
          choices: [
            "String g = greet(\"Sam\");",
            "greet(\"Sam\");",
            "greet = \"Sam\";",
            "return greet(\"Sam\");",
          ],
          answer: "greet(\"Sam\");",
          explanation:
            "greet is void, so the call stands alone as a statement. You cannot assign its \"return value\" or treat it as a value-producing expression.",
        },
      ],
    },
    {
      id: "2.4",
      title: "Calling a Void Method with Parameters",
      summary:
        "Parameters are the inputs a method accepts. Pass arguments in order; Java uses pass-by-value, even for references.",
      explanation:
        "A parameter is a local variable inside the method, initialized by copying the argument from the call site. This is pass-by-value, and it has two faces in Java. For primitives, the method gets a copy of the value — modifying the parameter does not affect the caller's variable. For references, the method gets a copy of the reference — both the caller and the method now point at the same object. The method can therefore mutate the object (e.g., `arr[0]` = 5 inside a void method changes the caller's array), but reassigning the parameter (arr = new `int[10]`) does not change what the caller refers to.\n\nArguments are matched by position, and Java performs implicit widening if a wider parameter accepts a narrower argument (int passed to double is fine; double passed to int fails). Overloading lets you define multiple methods with the same name but different parameter lists; Java picks the best match at compile time.\n\nOn the AP exam, the pass-by-value rule is tested constantly. Classic trap: a swap method that reassigns its two parameters does nothing to the caller's variables, because the reassignment only affects the local copies.",
      keyIdeas: [
        "Parameters are local variables initialized with the argument's value.",
        "Java is pass-by-value for both primitives and references.",
        "You can mutate an object through a reference parameter; you cannot reassign the caller's variable.",
        "Overloading differs only by parameter list.",
      ],
      commonMistakes: [
        "Believing Java passes primitives \"by reference.\"",
        "Expecting reassigning a reference parameter to update the caller.",
        "Passing arguments in the wrong order and getting silent wrong answers.",
      ],
      codeInteractives: [
        {
          id: "2.4.a",
          title: "Pass-by-value in action",
          description:
            "Mutations through a reference stick; reassignments do not. Try each variation to see why.",
          starterCode:
            "public class Main {\n    public static void bump(int n) {\n        n = n + 100;  // only the local copy changes\n    }\n    public static void fill(int[] arr) {\n        arr[0] = 99;  // mutates the shared array\n    }\n    public static void reassign(int[] arr) {\n        arr = new int[]{0, 0, 0};  // local reference only\n    }\n    public static void main(String[] args) {\n        int x = 5;\n        bump(x);\n        System.out.println(\"x = \" + x);  // 5, not 105\n\n        int[] a = {1, 2, 3};\n        fill(a);\n        System.out.println(\"a[0] = \" + a[0]);  // 99 — mutation visible\n\n        reassign(a);\n        System.out.println(\"a[0] = \" + a[0]);  // still 99 — reassignment isn't visible\n    }\n}",
          expectedOutput: "x = 5\na[0] = 99\na[0] = 99",
          variations: [
            {
              prompt: "Add a method swap(int a, int b) that tries to swap two ints. Show it does nothing.",
              hint: "Print the originals after calling swap — pass-by-value defeats the attempt.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Java parameter passing?", back: "Pass-by-value for everything (including references)." },
        { front: "Can a method mutate the caller's array?", back: "Yes, via the shared reference." },
        { front: "Can a method reassign the caller's variable?", back: "No — reassignment only affects the local copy." },
      ],
      practiceProblems: [
        {
          id: "2.4.p1",
          difficulty: "medium",
          prompt:
            "What prints?\n```java\npublic static void clobber(int[] a) { a[0] = -1; }\n// in main:\nint[] nums = {10, 20, 30};\nclobber(nums);\nSystem.out.println(nums[0]);\n```",
          answer: "-1",
          explanation:
            "clobber receives a copy of the reference but points at the same array, so setting `a[0]` mutates the caller's array.",
        },
      ],
    },
    {
      id: "2.5",
      title: "Calling a Non-void Method",
      summary:
        "A non-void method returns a value you must use — store it, pass it, print it, or ignore it explicitly.",
      explanation:
        "A non-void method is declared with a return type other than void (int, double, boolean, or a reference type). Every possible execution path inside the method must end in a return statement of a compatible type. The caller invokes the method and uses the returned value in an expression: int n = `s.length()`; or `System.out.println`(`Math.sqrt`(9));.\n\nReturn is immediate — it exits the method and hands the value back to the caller. Any code after an unconditional return is unreachable and is a compile error. In conditional branches, the compiler demands that every path returns; if you return inside an if but the else falls through with no return, the code won't compile.\n\nReturn type must be assignable to where the call is used. If `s.length()` returns int, you can assign it to an int or a double (widened), but not a String. If a method returns a reference, the caller gets a reference to the same object (no copy). AP CSA trace questions love deeply nested non-void calls like (`s.substring`(0, 3) + \"...\").length(); you read them inside-out.",
      keyIdeas: [
        "A non-void method must return a compatible value on every path.",
        "return ends the method immediately.",
        "Dead code after return is a compile error.",
        "Returned references point to the same object the method returned.",
      ],
      commonMistakes: [
        "Forgetting a return on some branches of an if/else.",
        "Calling a non-void method and discarding the result when you needed it.",
        "Treating the returned reference as a copy.",
      ],
      codeInteractives: [
        {
          id: "2.5.a",
          title: "Return values in expressions",
          description:
            "Watch how non-void calls slot into larger expressions.",
          starterCode:
            "public class Main {\n    public static int square(int n) {\n        return n * n;\n    }\n    public static double hypot(double a, double b) {\n        return Math.sqrt(a * a + b * b);\n    }\n    public static void main(String[] args) {\n        int s = square(5);\n        System.out.println(\"square(5) = \" + s);\n        System.out.println(\"hypot(3,4) = \" + hypot(3, 4));\n        System.out.println(square(square(2)));  // nested: square(4) = 16\n    }\n}",
          expectedOutput: "square(5) = 25\nhypot(3,4) = 5.0\n16",
          variations: [
            {
              prompt: "Add a method cube(int n) and use it to compute 2⁶.",
              hint: "Return n * n * n, then compute cube(square(2)) or square(cube(2)).",
            },
          ],
        },
      ],
      flashcards: [
        { front: "return statement does what?", back: "Hands a value back to the caller and exits the method." },
        { front: "Must every path return?", back: "Yes — otherwise the compiler rejects a non-void method." },
        { front: "Is the returned object copied?", back: "No — the reference is handed back as-is." },
      ],
      practiceProblems: [
        {
          id: "2.5.p1",
          difficulty: "medium",
          prompt:
            "What is printed?\n```java\npublic static int f(int n) { return n + 3; }\n// in main:\nSystem.out.println(f(f(2)));\n```",
          answer: "8",
          explanation:
            "Inner `f(2)` = 5. Outer `f(5)` = 8.",
        },
      ],
    },
    {
      id: "2.6",
      title: "String Objects: Concatenation, Literals, and More",
      summary:
        "Strings are immutable sequences of characters. + concatenates; concat with a non-String promotes both to Strings.",
      explanation:
        "String is a class, but literals create instances without explicit new. Strings are immutable: every \"modification\" actually creates a new String object. That's why `s.substring`(1) doesn't change s — it returns a new String. Writing s = `s.substring`(1) reassigns the local reference.\n\nThe + operator is overloaded for Strings: if at least one operand is a String, + concatenates by converting the other operand via its toString method (or a primitive's textual form). This produces two classic AP traps. First, \"a\" + 1 + 2 evaluates left to right: \"a\" + 1 is \"a1\" (String), then \"a1\" + 2 is \"a12\". Second, 1 + 2 + \"a\" does addition first: 3 + \"a\" gives \"3a\". The evaluator pays attention to types as it walks.\n\nEscape sequences matter: \\n is newline, \\t is tab, \\\" embeds a quote, \\\\ is a literal backslash. A char ('x') and a String (\"x\") are different types — 'x' + 1 uses int arithmetic on the char's ASCII code (120), while \"x\" + 1 concatenates to \"x1\".",
      keyIdeas: [
        "Strings are immutable — methods return new Strings.",
        "+ with a String converts the other operand to a String.",
        "Concatenation is left-to-right, so 1 + 2 + \"a\" ≠ \"a\" + 1 + 2.",
        "\\n, \\t, \\\", \\\\ are the escapes you must know.",
      ],
      commonMistakes: [
        "Writing s.substring(1) and expecting s to change.",
        "Forgetting left-to-right evaluation with mixed int and String.",
        "Confusing char 'x' with String \"x\".",
      ],
      codeInteractives: [
        {
          id: "2.6.a",
          title: "Concatenation order",
          description:
            "Change the order of operands and observe the promoted types.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"a\" + 1 + 2);   // a12\n        System.out.println(1 + 2 + \"a\");    // 3a\n        System.out.println(\"sum = \" + (1 + 2));  // sum = 3\n        System.out.println('x' + 1);           // 121 (char + int = int)\n    }\n}",
          expectedOutput: "a12\n3a\nsum = 3\n121",
          variations: [
            {
              prompt: "Force the first line to print \"a3\" without removing any operand.",
              hint: "Wrap 1 + 2 in parentheses so addition happens before concatenation.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Is String mutable?", back: "No — every mutation returns a new object." },
        { front: "1 + 2 + \"a\"?", back: "\"3a\" — addition before concat, left to right." },
        { front: "\"a\" + 1 + 2?", back: "\"a12\" — first + makes it a String, rest concatenates." },
        { front: "'x' + 1?", back: "121 — char 'x' is 120, arithmetic uses its ASCII value." },
      ],
      practiceProblems: [
        {
          id: "2.6.p1",
          difficulty: "medium",
          prompt:
            "What is printed?\n```java\nSystem.out.println(3 + 4 + \" cats \" + 2 + 2);\n```",
          answer: "7 cats 22",
          explanation:
            "3 + 4 is int 7. 7 + \" cats \" produces \"7 cats \". Then + 2 and + 2 concatenate as Strings: \"7 cats 22\".",
        },
      ],
    },
    {
      id: "2.7",
      title: "String Methods",
      summary:
        "length, substring, indexOf, charAt, equals, compareTo — the six String methods AP CSA tests.",
      explanation:
        "Memorize these signatures verbatim. `s.length()` returns the number of chars. `s.substring`(start) returns chars from index start to the end; `s.substring`(start, end) returns chars from start (inclusive) to end (exclusive). If end < start, or either index is out of range, Java throws `StringIndexOutOfBoundsException`.\n\n`s.indexOf`(target) returns the first index where target appears, or −1 if not found. `s.charAt`(i) returns the char at index i. equals compares contents (`s1.equals(s2)`), while == compares references; you must always use equals for correctness.\n\ncompareTo returns 0 if equal, a negative value if s1 < s2 lexicographically, a positive value otherwise. You only need the sign — the exam will not ask for the exact magnitude. Lexicographic ordering is character-by-character using Unicode values; uppercase letters (65-90) come before lowercase (97-122). Know the half-open interval of substring: it trips up even careful students.",
      keyIdeas: [
        "length returns char count; indices are 0-based.",
        "substring(a, b) is [a, b) — b is exclusive.",
        "indexOf returns −1 when not found.",
        "equals compares contents; == compares references.",
        "compareTo: only the sign matters on the exam.",
      ],
      commonMistakes: [
        "Using == to compare Strings.",
        "Off-by-one in substring because b is exclusive.",
        "Treating charAt as returning a String — it returns a char.",
      ],
      codeInteractives: [
        {
          id: "2.7.a",
          title: "String method sampler",
          description:
            "Change start/end arguments and predict the slice.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        String s = \"computer science\";\n        System.out.println(s.length());           // 16\n        System.out.println(s.substring(0, 8));    // computer\n        System.out.println(s.substring(9));       // science\n        System.out.println(s.indexOf(\"sci\"));     // 9\n        System.out.println(s.indexOf(\"z\"));       // -1\n        System.out.println(s.charAt(4));          // u\n        System.out.println(\"apcsa\".equals(\"APCSA\"));   // false — case-sensitive\n        System.out.println(\"apple\".compareTo(\"banana\") < 0);  // true\n    }\n}",
          expectedOutput: "16\ncomputer\nscience\n9\n-1\nu\nfalse\ntrue",
          variations: [
            {
              prompt: "Return the last 3 characters of s using substring + length.",
              hint: "Start at s.length() − 3.",
            },
            {
              prompt: "Count vowels in s by iterating and using indexOf on \"aeiou\".",
              hint: "Loop over indices and test each charAt against a vowel String.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "substring(a, b) interval?", back: "Half-open: a inclusive, b exclusive." },
        { front: "indexOf when not found?", back: "Returns −1." },
        { front: "charAt return type?", back: "char, not String." },
        { front: "String equality?", back: "s1.equals(s2); never ==." },
      ],
      practiceProblems: [
        {
          id: "2.7.p1",
          difficulty: "medium",
          prompt:
            "What is printed?\n```java\nString s = \"abcdef\";\nSystem.out.println(s.substring(1, 4));\n```",
          answer: "bcd",
          explanation:
            "Indices 1, 2, 3 are included; index 4 is the exclusive end. Result: \"bcd\".",
        },
        {
          id: "2.7.p2",
          difficulty: "hard",
          prompt:
            "Write one line that returns true iff the String s begins with the String p.",
          answer: "s.indexOf(p) == 0  // or s.substring(0, p.length()).equals(p)",
          explanation:
            "Prefix check via indexOf: if p first appears at index 0, s begins with p. Alternatively, slice the first `p.length()` chars and compare with equals.",
        },
      ],
    },
    {
      id: "2.8",
      title: "Wrapper Classes: Integer and Double",
      summary:
        "Integer and Double wrap int and double in objects so primitives can be stored in ArrayList and other generic containers.",
      explanation:
        "Generics in Java (like `ArrayList<Integer>`) require reference types. You cannot write ArrayList<int>. Wrapper classes bridge the gap: Integer is an object that holds a single int, Double holds a single double. Java performs autoboxing (int → Integer) and unboxing (Integer → int) automatically in assignments and method calls. So `list.add(5)` on an `ArrayList<Integer>` silently wraps 5 into an Integer, and int x = `list.get(0)` silently unwraps.\n\nWrappers are immutable. Integer has constants `Integer.MAX_VALUE` and `Integer.MIN_VALUE` that give the range of int. `Integer.parseInt`(String s) turns a numeric String into an int; `Double.parseDouble` is its double counterpart. Use equals for comparison: Integer a = 1000; Integer b = 1000; a == b may be `false` because a and b are separate objects, even though `a.equals(b)` is `true`.\n\nOn AP CSA, you mostly see wrappers in ArrayList-heavy Unit 7 questions. You just need to know that autoboxing happens, that the wrappers are immutable, and that equals compares the underlying value.",
      keyIdeas: [
        "Integer and Double wrap primitives so they can live in ArrayList.",
        "Autoboxing/unboxing is implicit in assignments and method calls.",
        "Integer.MAX_VALUE is 2147483647.",
        "Use equals (not ==) to compare two wrapper objects.",
      ],
      commonMistakes: [
        "Trying ArrayList<int> — not allowed.",
        "Using == on two Integer objects and seeing false for equal values.",
        "Forgetting Integer.parseInt for String-to-int conversion.",
      ],
      codeInteractives: [
        {
          id: "2.8.a",
          title: "Autoboxing and parseInt",
          description:
            "Wrappers hide most conversions. Try to spot where boxing happens.",
          starterCode:
            "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> nums = new ArrayList<>();\n        nums.add(5);       // autobox 5 -> Integer\n        nums.add(10);\n        int first = nums.get(0);  // unbox Integer -> int\n        System.out.println(first);\n\n        int parsed = Integer.parseInt(\"42\");\n        double d = Double.parseDouble(\"3.14\");\n        System.out.println(parsed + d);  // 45.14 (double)\n    }\n}",
          expectedOutput: "5\n45.14",
          variations: [
            {
              prompt: "Try Integer.parseInt(\"12a\") — what exception is thrown?",
              hint: "NumberFormatException — parseInt rejects non-numeric characters.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Purpose of Integer?", back: "Wraps an int in an object for use with generics." },
        { front: "Autoboxing?", back: "Implicit int → Integer conversion." },
        { front: "Integer.MAX_VALUE?", back: "2,147,483,647 — the largest int." },
        { front: "String to int?", back: "Integer.parseInt(s)." },
      ],
      practiceProblems: [
        {
          id: "2.8.p1",
          difficulty: "easy",
          prompt:
            "Which ArrayList declaration is legal?",
          choices: [
            "ArrayList<int> list = new ArrayList<int>();",
            "ArrayList<Integer> list = new ArrayList<>();",
            "ArrayList<Int> list = new ArrayList<>();",
            "ArrayList(Integer) list = new ArrayList<>();",
          ],
          answer: "ArrayList<Integer> list = new ArrayList<>();",
          explanation:
            "Generic type arguments must be reference types. Use Integer, not int. The diamond <> infers the type on the right.",
        },
      ],
    },
    {
      id: "2.9",
      title: "Using the Math Class",
      summary:
        "Math is a utility class of static methods: abs, pow, sqrt, random, plus constants like `Math.PI`.",
      explanation:
        "Math is a toolbox of static methods — you invoke them as `Math.methodName()`. Memorize these six for AP CSA: `Math.abs`(x), `Math.pow`(base, exp) (returns a double), `Math.sqrt`(x) (returns a double), `Math.random()` (returns a double in [0, 1)), `Math.round`(x) (returns a long), and `Math.min`/max. Know that pow and sqrt always return double even if the arguments are int.\n\n`Math.random` is the standard way to generate a uniform random double in [0.0, 1.0). To get a random int in a range [low, high], the idiom is (int)(`Math.random()` * (high − low + 1)) + low. Memorize that formula — the exam will ask for a random die roll or card draw. Note that `Math.random` returns 0 inclusive, 1 exclusive, so multiplying and casting to int gives values in [0, N − 1] when multiplying by N.\n\n`Math.PI` and `Math.E` are static double constants. The Math class has no instances; you cannot do new Math(). It is a pure utility.",
      keyIdeas: [
        "All Math methods are static — call as Math.method(...).",
        "Math.random() returns a double in [0.0, 1.0).",
        "Math.pow and Math.sqrt return double.",
        "Random int in [low, high]: (int)(Math.random() * (high − low + 1)) + low.",
      ],
      commonMistakes: [
        "Forgetting to cast Math.pow's result when you want an int.",
        "Off-by-one in the random-integer idiom — high − low + 1, not high − low.",
        "Trying to instantiate Math with new Math().",
      ],
      codeInteractives: [
        {
          id: "2.9.a",
          title: "Math toolbox",
          description:
            "Try each Math method and confirm the return type.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        System.out.println(Math.abs(-7));            // 7\n        System.out.println(Math.pow(2, 10));          // 1024.0 (double)\n        System.out.println(Math.sqrt(49));            // 7.0\n        System.out.println(Math.round(3.7));          // 4 (long)\n        System.out.println(Math.min(3, 8));           // 3\n\n        // Random int in [1, 6] — a die roll\n        int die = (int)(Math.random() * 6) + 1;\n        System.out.println(\"die = \" + die);\n    }\n}",
          expectedOutput: "7\n1024.0\n7.0\n4\n3\ndie = 1",
          hints: [
            "Running multiple times will change the die roll; the first five lines are deterministic.",
          ],
          variations: [
            {
              prompt: "Generate a random int between 10 and 20 inclusive.",
              hint: "(int)(Math.random() * 11) + 10.",
            },
            {
              prompt: "Cast Math.pow(2, 10) back to an int and store it.",
              hint: "int p = (int) Math.pow(2, 10); the cast is mandatory.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Return type of Math.pow?", back: "double" },
        { front: "Math.random() range?", back: "[0.0, 1.0) — 1.0 is excluded." },
        { front: "Random int in [a, b]?", back: "(int)(Math.random() * (b − a + 1)) + a" },
        { front: "Math.round return type?", back: "long" },
      ],
      practiceProblems: [
        {
          id: "2.9.p1",
          difficulty: "medium",
          prompt:
            "Write an expression that returns a random int in [1, 100].",
          answer: "(int)(Math.random() * 100) + 1",
          explanation:
            "`Math.random()` * 100 produces [0.0, 100.0). Casting to int truncates to {0, 1, ..., 99}. Adding 1 shifts to {1, 2, ..., 100}.",
        },
        {
          id: "2.9.p2",
          difficulty: "easy",
          prompt:
            "What is printed?\n```java\nSystem.out.println(Math.abs(-5) + (int) Math.pow(2, 3));\n```",
          answer: "13",
          explanation:
            "`Math.abs`(-5) is 5. `Math.pow`(2, 3) is 8.0; cast to int is 8. 5 + 8 = 13.",
        },
      ],
    },
  ],
});

// =============================================================================
// UNIT 3 — BOOLEAN EXPRESSIONS AND if STATEMENTS (15–17.5% of exam)
// =============================================================================
AP_COMPUTER_SCIENCE_A.units.push({
  number: 3,
  title: "Boolean Expressions and if Statements",
  examWeight: "15–17.5% of exam",
  overview:
    "Unit 3 is about decisions. You learn the relational and logical operators, if/else-if/else control flow, compound boolean expressions with short-circuit evaluation, De Morgan's laws for equivalent expressions, and how to compare objects correctly. This is one of the two largest units on the exam.",
  topics: [
    {
      id: "3.1",
      title: "Boolean Expressions",
      summary:
        "Relational operators (<, <=, >, >=, ==, !=) produce boolean values. Comparing doubles for equality is unreliable.",
      explanation:
        "A boolean expression is anything that evaluates to `true` or `false`. Java's six relational operators are <, <=, >, >=, ==, and !=. They work on any two comparable primitives and on references (for == and != only — those compare identity). Expressions can be combined with && (and), || (or), and ! (not) into compound booleans.\n\nEquality testing on doubles is problematic: binary floating-point cannot represent many decimals exactly, so 0.1 + 0.2 != 0.3 in Java. The cure is to compare magnitudes: `Math.abs`(a − b) < 1e-9. AP CSA won't make you derive this, but it may ask why an equality check on doubles is risky.\n\nSimple boolean variables are declared as boolean flag = `true`; and assigned like any other variable. Using them as conditions directly is cleaner than comparing to `true` — write if (flag), not if (flag == `true`). A boolean expression can be stored in a variable for reuse: boolean adult = age >= 18;.",
      keyIdeas: [
        "Relational operators yield boolean.",
        "== on doubles is unreliable due to floating-point rounding.",
        "Prefer if (flag) over if (flag == true).",
        "Boolean values can be stored in boolean variables.",
      ],
      commonMistakes: [
        "Using = (assignment) instead of == (comparison) in a condition.",
        "Writing if (flag == true) — redundant but functional.",
        "Comparing doubles with == and getting surprising false results.",
      ],
      codeInteractives: [
        {
          id: "3.1.a",
          title: "Relational operators",
          description:
            "Each line produces a boolean. Alter the operands and predict the result.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        int a = 7, b = 10;\n        System.out.println(a < b);     // true\n        System.out.println(a == b);    // false\n        System.out.println(a != b);    // true\n        System.out.println(a + 3 == b);  // true (7+3 == 10)\n\n        double x = 0.1 + 0.2;\n        System.out.println(x == 0.3);  // false — floating-point trap\n        System.out.println(Math.abs(x - 0.3) < 1e-9);  // true\n    }\n}",
          expectedOutput: "true\nfalse\ntrue\ntrue\nfalse\ntrue",
        },
      ],
      flashcards: [
        { front: "Result type of a < b?", back: "boolean" },
        { front: "Why not == on doubles?", back: "Floating-point rounding makes exact comparison unreliable." },
        { front: "Is if (flag == true) good?", back: "It works but if (flag) is preferred." },
      ],
      practiceProblems: [
        {
          id: "3.1.p1",
          difficulty: "easy",
          prompt: "What is printed?\n```java\nint a = 4, b = 9;\nSystem.out.println(a * 2 == b - 1);\n```",
          answer: "true",
          explanation:
            "Left side: 4 * 2 = 8. Right side: 9 − 1 = 8. 8 == 8 is `true`.",
        },
      ],
    },
    {
      id: "3.2",
      title: "if Statements and Control Flow",
      summary:
        "An if statement executes its body only when the condition is `true`. Without braces, only the next single statement is governed by if.",
      explanation:
        "The syntax is if (booleanExpr) { body }. The braces form a block that is skipped when the condition is `false`. If you omit the braces, only the immediately following statement is conditional — a dangling-else bug magnet. Always use braces on AP FRQs.\n\nControl flow is strict top-down. The condition is evaluated once; if `true`, the block runs; then execution continues with whatever comes after. Nesting works: an if inside another if creates cascading conditions. You can also place method calls, assignments, and any statements inside the block.\n\nSide effects in conditions are allowed (if (counter++ < 10)), but they hurt readability. AP exam trace problems use them sparingly. Focus on reading the condition as-is and tracing both branches mentally before committing.",
      keyIdeas: [
        "if (cond) { ... } runs the block only when cond is true.",
        "Without braces, only the next single statement is guarded.",
        "Always use braces in nontrivial code.",
        "After the if, execution falls through to whatever is next.",
      ],
      commonMistakes: [
        "Omitting braces and mis-indenting, creating a logic bug.",
        "Placing a semicolon after the condition (if (cond);) — the body becomes an empty statement.",
      ],
      codeInteractives: [
        {
          id: "3.2.a",
          title: "Braces matter",
          description:
            "See how removing braces changes which statements are conditional.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        int score = 72;\n        if (score >= 60) {\n            System.out.println(\"Pass\");\n            System.out.println(\"Nice work\");\n        }\n        System.out.println(\"Done\");\n    }\n}",
          expectedOutput: "Pass\nNice work\nDone",
          variations: [
            {
              prompt: "Change score to 40 and confirm only 'Done' prints.",
              hint: "The entire block is skipped when the condition is false.",
            },
            {
              prompt: "Remove braces and note how only the first println is conditional.",
              hint: "Without braces, 'Nice work' prints unconditionally.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Without braces, what does if govern?", back: "Only the next single statement." },
        { front: "if (cond); — what happens?", back: "The semicolon is the (empty) body; the next line always runs." },
      ],
      practiceProblems: [
        {
          id: "3.2.p1",
          difficulty: "easy",
          prompt:
            "What prints?\n```java\nint n = 5;\nif (n > 0)\n    System.out.println(\"pos\");\n    System.out.println(\"always\");\n```",
          answer: "pos\nalways",
          explanation:
            "Only 'pos' is conditional; indentation is cosmetic. 'always' runs regardless.",
        },
      ],
    },
    {
      id: "3.3",
      title: "if-else Statements",
      summary:
        "if-else picks exactly one of two mutually exclusive branches based on the condition.",
      explanation:
        "if (cond) { A } else { B } runs block A when cond is `true` and block B otherwise. The two branches are mutually exclusive — exactly one runs. This pattern is the canonical way to express \"choose one of two options.\"\n\nThe else is optional; if omitted, the if stands alone and falling through after a `false` condition is the default. A common bug is dangling else: in if (a) if (b) { ... } else { ... }, the else binds to the nearest if (the inner one), not the outer one. Use braces to make the structure unambiguous.\n\nBoolean conditions can be any expression of type boolean, including method calls (`isEmpty()`, `equals()`, etc.). You can chain complex logic, but prefer simple, readable conditions with clearly named boolean variables when the expression grows long.",
      keyIdeas: [
        "if-else picks exactly one branch.",
        "Dangling else binds to the nearest unmatched if — brace to avoid it.",
        "Assign complex booleans to named variables for clarity.",
      ],
      commonMistakes: [
        "Forgetting that exactly one branch runs (not both, not neither).",
        "Dangling-else bugs when braces are omitted.",
      ],
      codeInteractives: [
        {
          id: "3.3.a",
          title: "Two-way branch",
          description:
            "Even / odd picker using if-else.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        int n = 13;\n        if (n % 2 == 0) {\n            System.out.println(\"even\");\n        } else {\n            System.out.println(\"odd\");\n        }\n    }\n}",
          expectedOutput: "odd",
          variations: [
            {
              prompt: "Change n to a large negative number — does the logic still work?",
              hint: "Java's % returns the sign of the dividend, but 0 is still 0, so even/odd logic holds.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Branches in if-else?", back: "Exactly one runs — they are mutually exclusive." },
        { front: "Dangling else rule?", back: "else binds to the nearest unmatched if." },
      ],
      practiceProblems: [
        {
          id: "3.3.p1",
          difficulty: "medium",
          prompt:
            "What prints when x is 10?\n```java\nif (x > 5)\n    if (x > 20)\n        System.out.println(\"big\");\n    else\n        System.out.println(\"mid\");\n```",
          answer: "mid",
          explanation:
            "The else binds to the inner if (x > 20). Since 10 > 5 and 10 ≤ 20, the else runs → 'mid'.",
        },
      ],
    },
    {
      id: "3.4",
      title: "else if Statements",
      summary:
        "else if chains form a mutually exclusive ladder of conditions. At most one branch executes.",
      explanation:
        "An else if chain tests conditions top-down and stops at the first `true` one. Only that branch runs; subsequent else-if conditions are not evaluated. A final else catches everything that fell through.\n\nThe order of conditions matters. If you write if (score >= 60) ... else if (score >= 90) ..., the second branch is unreachable: any score ≥ 90 is also ≥ 60, so the first branch always captures it. Always order your conditions from most restrictive to least restrictive when they overlap.\n\nElse-if is syntactically just an else followed by another if. You can achieve the same behavior with nested if-else, but the ladder form reads as a single decision. The exam tests reordering bugs, missing else branches, and boundary values (is 90 an A or A−?).",
      keyIdeas: [
        "else if chains test conditions top-down; the first true branch wins.",
        "Order matters — put the most restrictive condition first.",
        "A final else is optional but handy for a default.",
        "Only one branch executes per trip through the chain.",
      ],
      commonMistakes: [
        "Ordering conditions so later branches are unreachable.",
        "Off-by-one at grade boundaries (>=90 vs >90).",
      ],
      codeInteractives: [
        {
          id: "3.4.a",
          title: "Grade ladder",
          description:
            "Reorder the branches and see what breaks.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        int score = 84;\n        String grade;\n        if (score >= 90)      grade = \"A\";\n        else if (score >= 80) grade = \"B\";\n        else if (score >= 70) grade = \"C\";\n        else if (score >= 60) grade = \"D\";\n        else                  grade = \"F\";\n        System.out.println(grade);\n    }\n}",
          expectedOutput: "B",
          variations: [
            {
              prompt: "Swap the A and B branches. What grade does score=95 get?",
              hint: "Now anything >=80 captures 95 before the A branch can.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "How many branches run in an else-if chain?", back: "At most one (zero if no condition matches and there's no final else)." },
        { front: "What happens after the matching branch?", back: "Execution leaves the chain entirely." },
      ],
      practiceProblems: [
        {
          id: "3.4.p1",
          difficulty: "medium",
          prompt:
            "Identify the bug:\n```java\nif (n > 0) System.out.println(\"pos\");\nelse if (n > 100) System.out.println(\"big\");\nelse System.out.println(\"non-pos\");\n```",
          answer:
            "The 'big' branch is unreachable because any n > 100 is also > 0 and is captured by the first branch.",
          explanation:
            "Order matters. Swap the first two conditions (check > 100 first) or merge them: if (n > 100) ... else if (n > 0) ....",
        },
      ],
    },
    {
      id: "3.5",
      title: "Compound Boolean Expressions",
      summary:
        "&& (and), || (or), ! (not) combine booleans. Both && and || short-circuit.",
      explanation:
        "&& is `true` iff both operands are `true`. || is `true` iff at least one operand is `true`. ! flips a boolean. Precedence (high to low): !, &&, ||. Use parentheses for clarity even when they're technically redundant.\n\nShort-circuit evaluation is the key AP topic. a && b evaluates a first; if a is `false`, b is never evaluated. a || b evaluates a first; if a is `true`, b is never evaluated. This lets you guard against a `null` or out-of-range access: if (arr != `null` && `arr.length` > 0) is safe because `arr.length` is only touched when arr is non-`null`. Swap the order and you get a `NullPointerException` when arr is `null`.\n\nWriting range tests in a single condition is standard: if (x >= 0 && x <= 10). Novices sometimes write 0 <= x <= 10, which is a compile error — Java does not chain comparisons.",
      keyIdeas: [
        "Precedence: ! > && > ||.",
        "&& short-circuits on false; || short-circuits on true.",
        "Use short-circuit to guard against null or out-of-range access.",
        "Range tests need both bounds: x >= 0 && x <= 10.",
      ],
      commonMistakes: [
        "Writing 0 <= x <= 10 (invalid).",
        "Ordering a null check after the dereference and crashing.",
        "Forgetting precedence: !a || b is (!a) || b, not !(a || b).",
      ],
      codeInteractives: [
        {
          id: "3.5.a",
          title: "Short-circuit safety",
          description:
            "Comment out the null check and see the crash.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        String s = null;\n        if (s != null && s.length() > 0) {\n            System.out.println(\"non-empty: \" + s);\n        } else {\n            System.out.println(\"null or empty\");\n        }\n    }\n}",
          expectedOutput: "null or empty",
          variations: [
            {
              prompt: "Swap the operands of &&: (s.length() > 0 && s != null). What happens?",
              hint: "s.length() is evaluated first, throws NullPointerException.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Precedence of && and ||?", back: "&& binds tighter than ||." },
        { front: "Does && evaluate both sides?", back: "Only if the left is true (short-circuit)." },
        { front: "Can Java chain 0 < x < 10?", back: "No — write x > 0 && x < 10." },
      ],
      practiceProblems: [
        {
          id: "3.5.p1",
          difficulty: "medium",
          prompt:
            "What prints?\n```java\nint x = 5;\nif (x > 0 || x++ > 10) {}\nSystem.out.println(x);\n```",
          answer: "5",
          explanation:
            "Left of || is `true` (5 > 0), so the right side x++ is never evaluated — x stays 5.",
        },
        {
          id: "3.5.p2",
          difficulty: "hard",
          prompt:
            "Write a single boolean expression that is true iff x is in the half-open interval [a, b).",
          answer: "x >= a && x < b",
          explanation:
            "Half-open means a is included and b is excluded. The combined range test checks both ends.",
        },
      ],
    },
    {
      id: "3.6",
      title: "Equivalent Boolean Expressions",
      summary:
        "De Morgan's laws: !(a && b) ≡ !a || !b, and !(a || b) ≡ !a && !b. Use to simplify conditions.",
      explanation:
        "De Morgan's laws state that the negation of an AND is the OR of negations, and the negation of an OR is the AND of negations. In Java: !(a && b) is equivalent to !a || !b, and !(a || b) is equivalent to !a && !b. You will use this to simplify ugly conditions and to invert a loop's stopping condition into a continuing condition.\n\nTwo other equivalences to know: !(x < y) is x >= y, and !(x == y) is x != y. The exam frequently gives you a condition and asks which of four alternatives is equivalent, expecting you to apply De Morgan plus the flip rules.\n\nFinally, truth tables: given two boolean variables, there are four input combinations. Verifying equivalence by comparing truth tables works, though it's overkill on most AP questions. The shortcut is to negate and distribute carefully.",
      keyIdeas: [
        "!(a && b) ≡ !a || !b.",
        "!(a || b) ≡ !a && !b.",
        "!(x < y) ≡ x >= y; !(x == y) ≡ x != y.",
        "Truth tables settle equivalence when logic gets tangled.",
      ],
      commonMistakes: [
        "Negating only the relational operator and forgetting to flip the connector.",
        "Thinking !(a && b) is !a && !b (wrong — it's ||).",
      ],
      codeInteractives: [
        {
          id: "3.6.a",
          title: "Truth-table check",
          description:
            "Confirm De Morgan by brute force over both booleans.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        boolean[] vals = {true, false};\n        for (boolean a : vals) {\n            for (boolean b : vals) {\n                boolean left  = !(a && b);\n                boolean right = !a || !b;\n                System.out.println(a + \" \" + b + \" | \" + left + \" == \" + right);\n            }\n        }\n    }\n}",
          expectedOutput:
            "true true | false == false\ntrue false | true == true\nfalse true | true == true\nfalse false | true == true",
          variations: [
            {
              prompt: "Verify !(a || b) ≡ !a && !b with the same template.",
              hint: "Swap && ↔ || in the two expressions and rerun.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "!(a && b) equals?", back: "!a || !b" },
        { front: "!(a || b) equals?", back: "!a && !b" },
        { front: "!(x >= y) equals?", back: "x < y" },
      ],
      practiceProblems: [
        {
          id: "3.6.p1",
          difficulty: "medium",
          prompt:
            "Which expression is equivalent to !(x > 0 && y < 5)?",
          choices: [
            "x <= 0 && y >= 5",
            "x <= 0 || y >= 5",
            "x < 0 || y > 5",
            "x >= 0 && y <= 5",
          ],
          answer: "x <= 0 || y >= 5",
          explanation:
            "Apply De Morgan: !(A && B) = !A || !B. Negate each relation: !(x > 0) is x <= 0; !(y < 5) is y >= 5.",
        },
      ],
    },
    {
      id: "3.7",
      title: "Comparing Objects",
      summary:
        "Use `.equals()` for content equality and == only for reference identity. compareTo yields a signed int.",
      explanation:
        "For reference types, == checks whether two variables hold the same address (point to the same object). `.equals()` is a method that classes override to define content equality. String, Integer, Double, ArrayList, and most standard classes override equals sensibly. For your own classes you will usually rely on the default (Object.equals uses ==) unless you override it (Unit 9).\n\n`str1.compareTo(str2)` returns a negative value, 0, or a positive value depending on the lexicographic ordering of the two Strings. You only care about the sign. The Integer and Double wrappers have compareTo too; for primitives, just use <, <=, etc.\n\nThe classic AP trap: comparing two Strings created via new with == returns `false` because they are different objects even with identical contents. Even two literals can sometimes yield `true` via the string pool, but you must not rely on it — always use `.equals()` for string content.",
      keyIdeas: [
        "== compares references; .equals() compares contents.",
        "String, Integer, Double override equals to compare values.",
        "compareTo returns signed int — only the sign matters.",
        "Use equals for any reference comparison unless you truly want identity.",
      ],
      commonMistakes: [
        "Comparing Strings with == and occasionally seeing true due to the string pool.",
        "Forgetting that the default equals on your own class is just ==.",
      ],
      codeInteractives: [
        {
          id: "3.7.a",
          title: "Equality vs identity",
          description:
            "Check both == and equals on several String objects.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        String a = \"apcsa\";\n        String b = \"apcsa\";\n        String c = new String(\"apcsa\");\n\n        System.out.println(a == b);       // true (pool)\n        System.out.println(a == c);       // false (new object)\n        System.out.println(a.equals(c));  // true (content)\n        System.out.println(a.compareTo(\"apcsb\") < 0);  // true\n    }\n}",
          expectedOutput: "true\nfalse\ntrue\ntrue",
        },
      ],
      flashcards: [
        { front: "== on references?", back: "Checks if both point to the same object." },
        { front: "equals?", back: "Class-defined content equality." },
        { front: "compareTo returns?", back: "Signed int: neg if less, 0 equal, pos if greater." },
      ],
      practiceProblems: [
        {
          id: "3.7.p1",
          difficulty: "medium",
          prompt:
            "Which comparison is safest for checking if Strings s1 and s2 have the same characters?",
          choices: [
            "s1 == s2",
            "s1.equals(s2)",
            "s1.compareTo(s2)",
            "s1 >= s2",
          ],
          answer: "s1.equals(s2)",
          explanation:
            "equals compares contents regardless of whether the Strings are the same object. compareTo works too but returns an int.",
        },
      ],
    },
  ],
});

// =============================================================================
// UNIT 4 — ITERATION (17.5–22.5% of exam)
// =============================================================================
AP_COMPUTER_SCIENCE_A.units.push({
  number: 4,
  title: "Iteration",
  examWeight: "17.5–22.5% of exam",
  overview:
    "Unit 4 is the single largest unit on the AP CSA exam. You learn while and for loops, nested iteration, standard String algorithms, and informal big-O style analysis of how work grows with input size. Loop correctness (off-by-one errors, termination) is heavily tested.",
  topics: [
    {
      id: "4.1",
      title: "while Loops",
      summary:
        "while (cond) { body } runs the body repeatedly as long as cond is `true`. Evaluate the condition before each iteration.",
      explanation:
        "A while loop is the basic indefinite loop. Java evaluates the condition; if `true`, the body runs, then the condition is evaluated again. If the condition is `false` on first check, the body never runs. If the body never modifies the condition's variables, the loop runs forever (infinite loop). The three things every while loop must do: initialize the loop variable before the loop, check the condition at the top, and update the variable inside the body.\n\nUse while when the number of iterations is not known in advance — reading input until end-of-file, searching until a match, iterating until convergence. break exits the loop early; continue jumps to the next iteration. Both are fair game on AP but are used sparingly in exam code; prefer restructuring the condition over adding a break when you can.\n\nTrace problems are the main assessment style. Given a short loop, predict the final values of variables and the printed output. The technique is always the same: make a variable table, update one row per iteration, and stop when the condition fails.",
      keyIdeas: [
        "while checks the condition before each iteration.",
        "Initialize, test, update — every loop needs all three.",
        "Body runs zero or more times.",
        "break exits; continue skips to the next test.",
      ],
      commonMistakes: [
        "Infinite loops from forgetting to update the loop variable.",
        "Off-by-one from wrong initial value or wrong condition.",
        "Writing while (cond); — the semicolon makes the body empty.",
      ],
      codeInteractives: [
        {
          id: "4.1.a",
          title: "Classic while trace",
          description:
            "Trace it by hand, then run to verify.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        int n = 1;\n        int sum = 0;\n        while (n <= 5) {\n            sum += n;\n            n++;\n        }\n        System.out.println(\"sum = \" + sum);\n    }\n}",
          expectedOutput: "sum = 15",
          variations: [
            {
              prompt: "Change n <= 5 to n < 5 and recompute.",
              hint: "You lose the n=5 iteration — sum becomes 10.",
            },
            {
              prompt: "Remove n++ and run for 3 seconds.",
              hint: "Infinite loop — kill the process and add the update back.",
            },
          ],
        },
        {
          id: "4.1.b",
          title: "Search until found",
          description:
            "A while loop is ideal when you don't know how many iterations you'll need.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {7, 3, 9, 1, 8, 4};\n        int target = 8;\n        int i = 0;\n        boolean found = false;\n        while (i < arr.length && !found) {\n            if (arr[i] == target) {\n                found = true;\n            } else {\n                i++;\n            }\n        }\n        System.out.println(found ? \"found at index \" + i : \"not found\");\n    }\n}",
          expectedOutput: "found at index 4",
        },
      ],
      flashcards: [
        { front: "When does a while body run zero times?", back: "When the condition is already false on first evaluation." },
        { front: "Purpose of break?", back: "Exit the innermost loop immediately." },
        { front: "Purpose of continue?", back: "Skip to the next condition test of the innermost loop." },
      ],
      practiceProblems: [
        {
          id: "4.1.p1",
          difficulty: "medium",
          prompt:
            "What is printed?\n```java\nint x = 10;\nwhile (x > 3) {\n    x /= 2;\n    System.out.print(x + \" \");\n}\n```",
          answer: "5 2 ",
          explanation:
            "x=10 → 5 (print 5). x=5 > 3 → 2 (print 2). x=2 fails condition, loop ends.",
        },
      ],
    },
    {
      id: "4.2",
      title: "for Loops",
      summary:
        "for (init; cond; update) { body } packages the three loop parts into one header. Prefer for when the iteration count is known.",
      explanation:
        "A for loop condenses the init-test-update pattern into one line. init runs once before the loop starts (typically int i = 0). cond is checked before each iteration. update runs after each body execution. A for loop with empty parts — for (;;) — is an infinite loop.\n\nThe scope of a variable declared in the init is the loop itself. Outside the loop, i is not accessible if declared with int i = 0 inside the header. If you need the final value, declare i before the loop.\n\nFor loops are the idiomatic way to traverse a structure by index: for (int i = 0; i < `arr.length`; i++). For Strings: for (int i = 0; i < `s.length()`; i++). Enhanced for loops (for (int x : arr)) are covered in Unit 6. Regular for loops are what the exam mostly asks you to trace.",
      keyIdeas: [
        "for (init; cond; update) { body }.",
        "init runs once; cond before each iteration; update after each body run.",
        "Loop variable scoped to the loop when declared in init.",
        "The idiomatic index traversal: for (int i = 0; i < N; i++).",
      ],
      commonMistakes: [
        "Using length instead of length() (array has length field; String has length() method).",
        "Modifying i inside the body and getting wrong iteration count.",
        "Off-by-one: i <= arr.length goes one past the last valid index.",
      ],
      codeInteractives: [
        {
          id: "4.2.a",
          title: "Index traversal",
          description:
            "Classic for loop over an array.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {10, 20, 30, 40};\n        int total = 0;\n        for (int i = 0; i < arr.length; i++) {\n            total += arr[i];\n        }\n        System.out.println(\"total = \" + total);\n    }\n}",
          expectedOutput: "total = 100",
          variations: [
            {
              prompt: "Change i < arr.length to i <= arr.length and observe the crash.",
              hint: "Arrays are 0-indexed; last valid index is length − 1. Out-of-bounds → ArrayIndexOutOfBoundsException.",
            },
            {
              prompt: "Run the loop in reverse.",
              hint: "for (int i = arr.length - 1; i >= 0; i--).",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Order of for-loop evaluation?", back: "init once, then cond → body → update, then cond again." },
        { front: "Scope of int i = 0 in a for header?", back: "Only inside the loop body." },
        { front: "Idiom for traversing arr?", back: "for (int i = 0; i < arr.length; i++)." },
      ],
      practiceProblems: [
        {
          id: "4.2.p1",
          difficulty: "easy",
          prompt:
            "What prints?\n```java\nfor (int i = 3; i < 7; i++) System.out.print(i + \" \");\n```",
          answer: "3 4 5 6 ",
          explanation:
            "i starts at 3 and increments until the condition fails; i=7 exits before printing.",
        },
        {
          id: "4.2.p2",
          difficulty: "medium",
          prompt:
            "Rewrite as a while loop:\n```java\nfor (int i = 10; i >= 0; i -= 2) sum += i;\n```",
          answer:
            "int i = 10;\nwhile (i >= 0) { sum += i; i -= 2; }",
          explanation:
            "The init becomes a declaration before the loop; the update moves inside the body at the end.",
        },
      ],
    },
    {
      id: "4.3",
      title: "Developing Algorithms Using Strings",
      summary:
        "Iterate over String indices with charAt to count, search, reverse, or transform. Strings are immutable, so build with concatenation.",
      explanation:
        "Common String algorithms on the exam: counting a character (\"count the number of 'a's\"), reversing a String (build a new one by concatenating in reverse), counting substrings, and testing palindromes. The base pattern is a for loop from 0 to `s.length()` − 1 that calls `s.charAt`(i).\n\nBecause Strings are immutable, you cannot modify one in place. Build a result String with concatenation: String result = \"\"; for (int i = ...) result += `s.charAt`(i);. Be aware concatenation in a loop is O(n²) in the worst case — fine for AP but real-world code uses StringBuilder.\n\nSubstring queries use `s.substring`(start, end) — remember the end is exclusive. Palindrome detection: compare `s.charAt`(i) with `s.charAt`(`s.length()` − 1 − i) for i from 0 to `s.length()` / 2. The exam loves palindromes, vowel-counting, and reversal as FRQs.",
      keyIdeas: [
        "Iterate with charAt(i) and a for loop from 0 to s.length() − 1.",
        "Strings are immutable — build a new one.",
        "substring(a, b) is [a, b).",
        "Palindrome check: compare i and length−1−i for i < length/2.",
      ],
      commonMistakes: [
        "Off-by-one: going to s.length() (inclusive) instead of s.length() − 1.",
        "Trying to assign s.charAt(i) = 'x' (not allowed).",
        "Using + on chars and expecting String concat (int arithmetic instead).",
      ],
      codeInteractives: [
        {
          id: "4.3.a",
          title: "Count vowels",
          description:
            "A canonical AP-style String algorithm.",
          starterCode:
            "public class Main {\n    public static int countVowels(String s) {\n        int count = 0;\n        String vowels = \"aeiouAEIOU\";\n        for (int i = 0; i < s.length(); i++) {\n            if (vowels.indexOf(s.charAt(i)) >= 0) {\n                count++;\n            }\n        }\n        return count;\n    }\n    public static void main(String[] args) {\n        System.out.println(countVowels(\"Advanced Placement\"));  // 6\n    }\n}",
          expectedOutput: "6",
          variations: [
            {
              prompt: "Add a method reverse(String s) that returns s reversed.",
              hint: "Loop i from s.length()-1 down to 0, concat charAt(i) to a result String.",
            },
            {
              prompt: "Check whether a String is a palindrome (ignoring case).",
              hint: "Lowercase first with toLowerCase, then compare from both ends.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Palindrome loop bound?", back: "i from 0 to length/2 − 1." },
        { front: "String char access?", back: "s.charAt(i)" },
        { front: "Can you mutate a String in place?", back: "No — build a new one." },
      ],
      practiceProblems: [
        {
          id: "4.3.p1",
          difficulty: "hard",
          prompt:
            "Write a method that returns true iff the String s is a palindrome (ignoring case).",
          answer:
            "public static boolean isPalindrome(String s) {\n    s = s.toLowerCase();\n    for (int i = 0; i < s.length() / 2; i++) {\n        if (s.charAt(i) != s.charAt(s.length() - 1 - i)) return false;\n    }\n    return true;\n}",
          explanation:
            "Compare mirrored pairs; return `false` on any mismatch. Only need to go halfway because each iteration tests two positions.",
        },
      ],
    },
    {
      id: "4.4",
      title: "Nested Iteration",
      summary:
        "A loop inside a loop. The inner loop runs completely for each iteration of the outer loop.",
      explanation:
        "Nesting lets you enumerate pairs, traverse 2-D structures, or build tables. Total iterations equal outer count × inner count when the inner bounds don't depend on the outer. The canonical example is printing a multiplication table or generating all (i, j) pairs.\n\nBe deliberate with variable names — int i for outer and int j for inner is convention. If the inner loop depends on the outer (for (int j = i; j < n; j++)), iterations total roughly `n(n+1)`/2. AP will occasionally ask how many times a println executes; just multiply the outer count by the inner count.\n\nBreaking out of only the inner loop uses break. There is no clean syntax to break out of both; use a boolean flag or refactor into a method. That pattern is fair game on FRQs.",
      keyIdeas: [
        "Inner loop completes every time the outer advances.",
        "Total iterations = outer × inner (if independent).",
        "break exits only the innermost loop.",
        "Nest with distinct variable names (i, j, not both i).",
      ],
      commonMistakes: [
        "Reusing i for both loops and clobbering the outer.",
        "Miscounting total iterations when the inner bound depends on i.",
      ],
      codeInteractives: [
        {
          id: "4.4.a",
          title: "Multiplication table",
          description:
            "A rectangular nested loop.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 3; i++) {\n            for (int j = 1; j <= 3; j++) {\n                System.out.print(i * j + \"\\t\");\n            }\n            System.out.println();\n        }\n    }\n}",
          expectedOutput: "1\t2\t3\t\n2\t4\t6\t\n3\t6\t9\t",
          variations: [
            {
              prompt: "Print only the upper triangle (j ≥ i).",
              hint: "Start the inner loop at j = i.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Total prints in 3×3 nested loop?", back: "9 — outer × inner." },
        { front: "break inside a nested loop?", back: "Exits the innermost loop only." },
      ],
      practiceProblems: [
        {
          id: "4.4.p1",
          difficulty: "medium",
          prompt:
            "How many times does X print?\n```java\nfor (int i = 0; i < 4; i++)\n    for (int j = i; j < 4; j++)\n        System.out.print(\"X\");\n```",
          answer: "10",
          explanation:
            "Inner loop runs 4, 3, 2, 1 times as i goes 0..3. Total = 4+3+2+1 = 10.",
        },
      ],
    },
    {
      id: "4.5",
      title: "Informal Code Analysis",
      summary:
        "Count loop iterations to compare algorithms. Linear (O(n)) vs. quadratic (O(n²)) is the line the AP exam cares about.",
      explanation:
        "You are not asked to write formal big-O proofs on AP CSA. You are asked to count: how many times does a particular statement execute as a function of the input size n? A single for loop to n runs n times (linear). Two nested for loops to n run n² times (quadratic). A loop that halves n each iteration runs log₂(n) times (logarithmic — the shape of binary search).\n\nThe exam frames it as \"which of the following runs in time proportional to n²?\" or \"how many comparisons does this selection sort make on a 10-element array?\" Your job is to count carefully. Linear search: up to n comparisons. Binary search: about log₂(n). Insertion/selection sort: about n²/2.\n\nThe informal reasoning: if the input size doubles, how does runtime change? Linear doubles. Quadratic quadruples. Logarithmic gains one step. This mental model is all the exam demands.",
      keyIdeas: [
        "Single loop to n → O(n) (linear).",
        "Doubly nested to n → O(n²) (quadratic).",
        "Halving each step → O(log n).",
        "Double the input: linear 2×, quadratic 4×, log +1.",
      ],
      commonMistakes: [
        "Confusing n² with 2n when counting nested iterations.",
        "Ignoring constant work inside the innermost loop.",
      ],
      codeInteractives: [
        {
          id: "4.5.a",
          title: "Iteration counter",
          description:
            "A counter increment lets you measure work empirically.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        int n = 10;\n        int ops = 0;\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) {\n                ops++;\n            }\n        }\n        System.out.println(\"n=\" + n + \", ops=\" + ops);  // 100\n    }\n}",
          expectedOutput: "n=10, ops=100",
          variations: [
            {
              prompt: "Set n = 20 — how many ops now? Does it quadruple?",
              hint: "You should see 400, confirming O(n²).",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Nested loop to n?", back: "O(n²) — runs n × n times." },
        { front: "Halve each step?", back: "O(log n) — think binary search." },
        { front: "Double input, quadratic grows?", back: "4×" },
      ],
      practiceProblems: [
        {
          id: "4.5.p1",
          difficulty: "medium",
          prompt:
            "If an algorithm runs in 1 second for n = 100 and is O(n²), about how long for n = 400?",
          answer: "16 seconds",
          explanation:
            "n quadruples (100 → 400). Quadratic time grows as the square, so runtime grows 16×.",
        },
      ],
    },
  ],
});

// =============================================================================
// UNIT 5 — WRITING CLASSES (5–7.5% of exam)
// =============================================================================
AP_COMPUTER_SCIENCE_A.units.push({
  number: 5,
  title: "Writing Classes",
  examWeight: "5–7.5% of exam",
  overview:
    "Unit 5 switches from using classes to writing them. You design instance variables, constructors, accessors, mutators, static members, and enforce encapsulation. The unit also covers variable scope, the this keyword, and the ethics of computing systems.",
  topics: [
    {
      id: "5.1",
      title: "Anatomy of a Class",
      summary:
        "A class declares instance variables (state) and methods (behavior). Keep state private and expose a minimal public API.",
      explanation:
        "A class file has three conceptual parts: instance variables (fields), constructors, and methods. Instance variables hold the per-object state. By convention they are private — no outside code can touch them directly — which is the encapsulation principle. Access is mediated through methods.\n\nMethods come in two flavors in Unit 5. Instance methods operate on a specific object's state and are called via an object reference. Static methods belong to the class and are called via the class name (`Math.sqrt`). The choice is design: if the work requires an object's state, make it an instance method; otherwise consider static.\n\nMinimal class template: `public class` Name { private Type field; public Name(args) { ... } public Type `someMethod()` { ... } }. Note that fields declared without = default to 0 / 0.0 / `false` / `null`. A class without an explicit constructor gets a default no-arg constructor; defining any constructor disables that default.",
      keyIdeas: [
        "A class = private fields + public methods.",
        "Fields default to 0/0.0/false/null if uninitialized.",
        "Constructors initialize state to a valid starting point.",
        "Declaring one constructor removes the automatic no-arg default.",
      ],
      commonMistakes: [
        "Making fields public and breaking encapsulation.",
        "Assuming a no-arg constructor exists after you wrote a parameterized one.",
      ],
      codeInteractives: [
        {
          id: "5.1.a",
          title: "A minimal class",
          description:
            "A Student class with one field and a getter.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        Student s = new Student(\"Avery\");\n        System.out.println(s.getName());\n    }\n}\n\nclass Student {\n    private String name;\n    public Student(String n) {\n        name = n;\n    }\n    public String getName() {\n        return name;\n    }\n}",
          expectedOutput: "Avery",
          variations: [
            {
              prompt: "Add a private int gradeLevel field, a constructor parameter for it, and a getter.",
              hint: "Initialize in the constructor, return via getGradeLevel().",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Default visibility convention for fields?", back: "private — encapsulation." },
        { front: "Default int field value?", back: "0" },
        { front: "What happens to the default constructor once you write one?", back: "It disappears — only your explicit constructors exist." },
      ],
      practiceProblems: [
        {
          id: "5.1.p1",
          difficulty: "easy",
          prompt:
            "Which field declaration enforces encapsulation?",
          choices: [
            "public int count;",
            "int count;",
            "private int count;",
            "static int count;",
          ],
          answer: "private int count;",
          explanation:
            "private restricts access to within the class, requiring methods to read/write — exactly what encapsulation demands.",
        },
      ],
    },
    {
      id: "5.2",
      title: "Constructors",
      summary:
        "A constructor initializes a new object. Its name matches the class; it has no return type. Overloading provides multiple creation paths.",
      explanation:
        "A constructor is a special method invoked by new. It has the exact name of the class and no return type (not even void). Inside, you assign initial values to fields, possibly using parameters passed in by the caller. A constructor can delegate to another constructor via `this(args)`, which is useful when you want a convenience no-arg constructor that fills in defaults.\n\nOverloading lets you offer multiple constructors for different use cases: Point(), Point(int x, int y), Point(Point other). Java picks the best match at compile time by parameter types.\n\nIf you do not write any constructor, Java inserts a no-arg constructor that takes no arguments and sets all fields to their defaults. Once you declare even one constructor, that default disappears. Code that relied on new Point() will no longer compile until you add a no-arg constructor back.",
      keyIdeas: [
        "Constructor name == class name; no return type.",
        "Multiple constructors (overloading) pick by parameter list.",
        "this(args) delegates to another constructor on the first line.",
        "Writing any constructor removes the compiler-inserted default.",
      ],
      commonMistakes: [
        "Giving the constructor a return type (turns it into a regular method).",
        "Calling this(args) anywhere but the first line of a constructor.",
      ],
      codeInteractives: [
        {
          id: "5.2.a",
          title: "Overloaded constructors",
          description:
            "Two ways to build a Point.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        Point a = new Point();\n        Point b = new Point(3, 4);\n        System.out.println(a.describe());\n        System.out.println(b.describe());\n    }\n}\n\nclass Point {\n    private int x;\n    private int y;\n    public Point() { this(0, 0); }\n    public Point(int x, int y) { this.x = x; this.y = y; }\n    public String describe() { return \"(\" + x + \", \" + y + \")\"; }\n}",
          expectedOutput: "(0, 0)\n(3, 4)",
          variations: [
            {
              prompt: "Add a copy constructor Point(Point other).",
              hint: "Initialize this.x and this.y from other.x and other.y.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Constructor return type?", back: "None — not even void." },
        { front: "this(args) position?", back: "First line of a constructor body." },
        { front: "Default constructor vanishes when?", back: "As soon as you declare any other constructor." },
      ],
      practiceProblems: [
        {
          id: "5.2.p1",
          difficulty: "medium",
          prompt:
            "Write a constructor that initializes a Book's title to a passed String and year to the current year default of 2024 (no parameter).",
          answer:
            "public Book(String title) { this.title = title; this.year = 2024; }",
          explanation:
            "One parameter for title, the year is hard-coded default. Add more overloads if you also want to pass year.",
        },
      ],
    },
    {
      id: "5.3",
      title: "Documentation with Comments",
      summary:
        "Java has three comment styles: // (line), /* ... */ (block), and /** ... */ (Javadoc). AP CSA tests reading intent, not writing Javadoc.",
      explanation:
        "Single-line comments start with // and run to end of line. Block comments /* ... */ span multiple lines. Javadoc comments /** ... */ precede classes and methods and support tags like @param, @return; they are extracted into generated HTML docs but that's outside AP scope.\n\nThe AP exam uses comments as hints inside code: \"// precondition: arr is sorted\" or \"// postcondition: returns the sum.\" You are expected to trust them and use them to frame your answer. Writing clear comments in FRQs is not required but poorly named variables can lose you rubric points.\n\nPreconditions state assumptions on the input (e.g., n ≥ 0). Postconditions state guarantees on the output (returns sorted array, mutates no input). Reading these correctly avoids the most common FRQ misreadings.",
      keyIdeas: [
        "//, /* */, /** */ are the three comment styles.",
        "AP uses // preconditions and postconditions in problem statements.",
        "Trust preconditions — do not re-validate them in the method.",
      ],
      commonMistakes: [
        "Nested /* */ comments (Java doesn't allow them).",
        "Treating a // as ending the block comment it is inside.",
      ],
      codeInteractives: [
        {
          id: "5.3.a",
          title: "Reading a precondition",
          description:
            "A sum method with a documented contract.",
          starterCode:
            "public class Main {\n    /** Returns the sum of the values in arr.\n     * @param arr array of ints, not null\n     * @return sum of arr's elements (0 if empty)\n     */\n    public static int sum(int[] arr) {\n        int s = 0;\n        for (int v : arr) s += v;\n        return s;\n    }\n    public static void main(String[] args) {\n        System.out.println(sum(new int[] {1, 2, 3, 4}));  // 10\n    }\n}",
          expectedOutput: "10",
        },
      ],
      flashcards: [
        { front: "Javadoc comment start?", back: "/**" },
        { front: "Can /* */ nest?", back: "No." },
        { front: "Purpose of a precondition?", back: "State an input assumption the method relies on." },
      ],
      practiceProblems: [
        {
          id: "5.3.p1",
          difficulty: "easy",
          prompt:
            "Which comment form runs to the end of the line?",
          choices: ["/* */", "//", "/** */", "#"],
          answer: "//",
          explanation: "Single-line comments start with //; the # character is not a comment in Java.",
        },
      ],
    },
    {
      id: "5.4",
      title: "Accessor Methods",
      summary:
        "An accessor (getter) returns a copy of a private field. Naming convention: `getField()`.",
      explanation:
        "Accessors provide read-only access to private state. A standard getter looks like `public int` `getAge()` { return age; }. For primitive fields this returns a copy; for reference fields, it returns the reference — so the caller can mutate the underlying object.\n\nReturning mutable references (arrays, ArrayList) leaks internal state. Best practice is to return a copy or an unmodifiable view. AP CSA may ask you to reason about whether a getter \"breaks encapsulation\" when it returns a reference.\n\nConsistency matters. A toString method (`public String` `toString()` { return ...; }) is an accessor of sorts — it builds a String representation for printing. Overriding toString is idiomatic and is tested on FRQs.",
      keyIdeas: [
        "Getter = public read-only view of a private field.",
        "Returning a primitive is safe; returning a reference to a mutable object leaks state.",
        "toString() returns a String representation for printing.",
      ],
      commonMistakes: [
        "Returning the internal array and being surprised when the caller mutates it.",
        "Forgetting to override toString — default Object.toString is a memory-address-ish string.",
      ],
      codeInteractives: [
        {
          id: "5.4.a",
          title: "Getter + toString",
          description:
            "A simple immutable-ish class with accessors.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        Coord c = new Coord(3, 4);\n        System.out.println(c.getX());\n        System.out.println(c.getY());\n        System.out.println(c);   // println calls toString\n    }\n}\n\nclass Coord {\n    private int x, y;\n    public Coord(int x, int y) { this.x = x; this.y = y; }\n    public int getX() { return x; }\n    public int getY() { return y; }\n    public String toString() { return \"(\" + x + \", \" + y + \")\"; }\n}",
          expectedOutput: "3\n4\n(3, 4)",
          variations: [
            {
              prompt: "Add an accessor that returns a defensive copy of an int[] field.",
              hint: "Arrays.copyOf(arr, arr.length) or loop + new int[].",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Standard getter name?", back: "getFieldName()" },
        { front: "Does toString have a standard signature?", back: "public String toString() { ... }" },
        { front: "Risk of returning a mutable internal field?", back: "Caller can modify internal state." },
      ],
      practiceProblems: [
        {
          id: "5.4.p1",
          difficulty: "easy",
          prompt:
            "Write a getter for a private double field named balance.",
          answer: "public double getBalance() { return balance; }",
          explanation:
            "A standard getter has public visibility, returns the field's type, and is named getFieldName.",
        },
      ],
    },
    {
      id: "5.5",
      title: "Mutator Methods",
      summary:
        "A mutator (setter) changes a field's value. Validate inputs to maintain class invariants.",
      explanation:
        "Mutators, or setters, are `public void` methods that update a private field. The standard signature is `public void` `setAge(int age)` { this.age = age; }. Using this.age clarifies which age is the field vs. the parameter when they share a name.\n\nGood mutators enforce invariants. A setAge method that refuses negatives, or clamps into a legal range, protects the object's state from invalid data. Some mutators return the new value or a boolean indicating success, though AP problems usually use void setters.\n\nNot every field needs a setter. Immutable classes (Unit 9-ish) expose only getters. Conversely, a mutator might update multiple derived fields together (e.g., setting a rectangle's width recomputes its area). Decide based on what invariants you want to guarantee.",
      keyIdeas: [
        "Setter = public method that updates a private field.",
        "Use this.field = parameter to disambiguate names.",
        "Validate inputs inside the setter to protect invariants.",
        "Immutable classes omit setters entirely.",
      ],
      commonMistakes: [
        "Forgetting this. and assigning parameter to itself (age = age does nothing).",
        "Skipping validation and letting invalid state sneak in.",
      ],
      codeInteractives: [
        {
          id: "5.5.a",
          title: "Validated setter",
          description:
            "Reject negative ages.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        Person p = new Person(\"Taylor\", 21);\n        p.setAge(25);\n        System.out.println(p.getAge());\n        p.setAge(-1);    // rejected\n        System.out.println(p.getAge());\n    }\n}\n\nclass Person {\n    private String name;\n    private int age;\n    public Person(String n, int a) { this.name = n; this.age = a; }\n    public int getAge() { return age; }\n    public void setAge(int age) {\n        if (age >= 0) this.age = age;\n    }\n}",
          expectedOutput: "25\n25",
          variations: [
            {
              prompt: "Return a boolean from setAge indicating whether the change was accepted.",
              hint: "Change return type to boolean and return true/false based on validity.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Standard setter signature?", back: "public void setFieldName(Type value) { ... }" },
        { front: "Why this.field = value?", back: "Disambiguates parameter from field when names match." },
        { front: "Does immutable class have setters?", back: "No — only getters and a constructor." },
      ],
      practiceProblems: [
        {
          id: "5.5.p1",
          difficulty: "medium",
          prompt:
            "Write a setter for a private double balance field that refuses negative values.",
          answer:
            "public void setBalance(double balance) { if (balance >= 0) this.balance = balance; }",
          explanation:
            "Enforcing the invariant (no negatives) in the setter keeps the object state valid regardless of caller.",
        },
      ],
    },
    {
      id: "5.6",
      title: "Writing Methods",
      summary:
        "Design each method around a single responsibility. Choose return type, parameters, and body to satisfy the postcondition.",
      explanation:
        "Writing methods well boils down to three questions: what does the method compute (return type + postcondition), what inputs does it need (parameters), and what side effects does it have (mutates an object? prints?). Answering in that order forces you to pick the right signature first and avoid the messy refactor later.\n\nNaming: camelCase starting with a verb for methods that do something (compute, update, add), a noun or getProperty for methods that return a property. Keep the body focused. If a method handles several unrelated responsibilities, break it into helpers.\n\nReturn types drive the design. Void methods do, value-returning methods answer. If the caller needs both — mutate and report — prefer two separate methods or a return value that includes the info. The AP exam will always tell you what the method should return; read carefully.",
      keyIdeas: [
        "Pick return type and parameters before writing the body.",
        "One responsibility per method.",
        "Name methods with verbs (actions) or get/is prefixes (queries).",
      ],
      commonMistakes: [
        "Not returning on every path in a value-returning method.",
        "Stuffing multiple responsibilities into one method and failing partial tests.",
      ],
      codeInteractives: [
        {
          id: "5.6.a",
          title: "Method design",
          description:
            "A method that returns the average of an int array.",
          starterCode:
            "public class Main {\n    // precondition: arr is non-null and non-empty\n    public static double average(int[] arr) {\n        int sum = 0;\n        for (int v : arr) sum += v;\n        return (double) sum / arr.length;\n    }\n    public static void main(String[] args) {\n        System.out.println(average(new int[] {70, 80, 90, 100}));  // 85.0\n    }\n}",
          expectedOutput: "85.0",
          variations: [
            {
              prompt: "Add a helper that returns the max of an int array.",
              hint: "Initialize the max to arr[0] and scan from index 1 upward.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Naming a query method?", back: "Use get- or is- prefix; return non-void." },
        { front: "Naming an action method?", back: "Start with a verb; often void." },
        { front: "Does return type affect overload resolution?", back: "No — only parameter types matter." },
      ],
      practiceProblems: [
        {
          id: "5.6.p1",
          difficulty: "medium",
          prompt:
            "Write a public static method isEven(int n) that returns true iff n is even.",
          answer: "public static boolean isEven(int n) { return n % 2 == 0; }",
          explanation: "n % 2 is 0 for even numbers. Return the boolean directly.",
        },
      ],
    },
    {
      id: "5.7",
      title: "Static Variables and Methods",
      summary:
        "Static members belong to the class, not an instance. Use them for constants, counters, or utility functions.",
      explanation:
        "A static variable is shared across all instances of the class. `public static` int count; has one storage location; every object sees the same value. A static method does not have access to this (no instance context) — it can only touch static fields and its parameters.\n\nConstants are usually static final: `public static` final double PI = 3.14159;. All caps names are convention. Utility classes (Math) have only static methods and no instance state — you never new Math().\n\nAPI: call static members via ClassName.member from outside, or unqualified from inside. Instance methods can access static fields freely; static methods cannot access instance fields without an explicit object reference. AP exam questions often test whether a given method should be static.",
      keyIdeas: [
        "Static = belongs to the class, not the object.",
        "static final creates a class constant.",
        "Static methods cannot use this or access instance fields.",
        "Call as ClassName.member from outside the class.",
      ],
      commonMistakes: [
        "Trying to use this in a static method.",
        "Declaring a field static by mistake and sharing state across objects.",
      ],
      codeInteractives: [
        {
          id: "5.7.a",
          title: "Static counter",
          description:
            "Count how many objects have been created.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        Widget a = new Widget();\n        Widget b = new Widget();\n        Widget c = new Widget();\n        System.out.println(\"count = \" + Widget.getCount());\n    }\n}\n\nclass Widget {\n    private static int count = 0;\n    public Widget() { count++; }\n    public static int getCount() { return count; }\n}",
          expectedOutput: "count = 3",
          variations: [
            {
              prompt: "Add a static final double TAX_RATE = 0.0625 and use it in an instance method.",
              hint: "Instance methods can read static finals freely.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "static variable is shared...?", back: "Across all instances of the class." },
        { front: "Does a static method have this?", back: "No — there is no instance." },
        { front: "Convention for constants?", back: "UPPER_SNAKE_CASE, static final." },
      ],
      practiceProblems: [
        {
          id: "5.7.p1",
          difficulty: "medium",
          prompt:
            "Why can't a static method use a non-static field directly?",
          answer:
            "A static method is not associated with any specific instance, so there is no this to take the field from.",
          explanation:
            "Instance fields live on objects. Without an object reference, the method has nothing to read the field from.",
        },
      ],
    },
    {
      id: "5.8",
      title: "Scope and Access",
      summary:
        "Scope is the region where a variable is visible. Local > parameter > field. Shadowing lets an inner declaration hide an outer one.",
      explanation:
        "Local variables are visible within the block they are declared in (usually a method or a for-loop body). Parameters are visible throughout the method body. Instance fields are visible everywhere in the class. Static fields are visible everywhere in the class (and via the class name from outside).\n\nWhen a local variable or parameter shares a name with a field, it shadows the field inside that block. Use this.field to reach the shadowed instance field. This is why constructors often write this.x = x — the parameter shadows the field.\n\nBlocks nest: if you declare int i inside a for, it is invisible outside. If you declare it outside, the loop can see it and modify it. Scope errors are extremely common — a helpful mental test is \"can I see this variable from this line?\"",
      keyIdeas: [
        "Local variable scope = the enclosing block.",
        "Parameter scope = the entire method body.",
        "Instance field scope = entire class.",
        "Shadowing hides outer variable; use this.field to reach it.",
      ],
      commonMistakes: [
        "Using a loop variable outside the loop.",
        "Forgetting this. when parameter shadows field in a setter/constructor.",
      ],
      codeInteractives: [
        {
          id: "5.8.a",
          title: "Shadowing fix",
          description:
            "Without this., the parameter shadows the field and nothing happens.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        Box b = new Box();\n        b.setSize(10);\n        System.out.println(b.getSize());\n    }\n}\n\nclass Box {\n    private int size = 1;\n    public int getSize() { return size; }\n    public void setSize(int size) {\n        this.size = size;   // remove 'this.' to see the bug\n    }\n}",
          expectedOutput: "10",
          variations: [
            {
              prompt: "Remove this. in setSize and observe getSize still returns 1.",
              hint: "Without this., the assignment writes the parameter to itself.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Scope of a loop variable int i declared in the for header?", back: "Only the loop body." },
        { front: "How to access a shadowed field?", back: "Qualify with this.fieldName." },
      ],
      practiceProblems: [
        {
          id: "5.8.p1",
          difficulty: "medium",
          prompt:
            "Identify the bug:\n```java\npublic void setName(String name) { name = name; }\n```",
          answer:
            "The parameter shadows the field; the assignment copies the parameter into itself. Use this.name = name.",
          explanation:
            "Both sides refer to the parameter. To reach the instance field, qualify with this.",
        },
      ],
    },
    {
      id: "5.9",
      title: "this Keyword",
      summary:
        "this is a reference to the current object inside an instance method. Used to disambiguate fields, pass the object, or call another constructor.",
      explanation:
        "Inside an instance method, this refers to the object the method was called on. Its most common uses: this.field = field to store a parameter into a field when names match, return this so method calls can chain, and `this(args)` as the first line of a constructor to delegate to another constructor.\n\nStatic methods have no this — they aren't tied to an object. Attempting to use this inside a static method is a compile error.\n\nPassing this to another method hands over the current object as an argument. This is how a container can say add me to a list, or how observer patterns work. AP CSA mostly tests this for parameter/field disambiguation and constructor delegation.",
      keyIdeas: [
        "this = the object the method is called on.",
        "Use this.field when parameter shadows field.",
        "this(args) delegates to another constructor (first line only).",
        "Static methods cannot use this.",
      ],
      commonMistakes: [
        "Using this inside a static method.",
        "Placing this(args) on a line other than the first line of a constructor.",
      ],
      codeInteractives: [
        {
          id: "5.9.a",
          title: "Constructor chaining with this(...)",
          description:
            "Avoid duplicated initialization by delegating.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        Line a = new Line();\n        Line b = new Line(2, 5);\n        System.out.println(a);\n        System.out.println(b);\n    }\n}\n\nclass Line {\n    private int start, end;\n    public Line() { this(0, 1); }\n    public Line(int s, int e) { this.start = s; this.end = e; }\n    public String toString() { return \"[\" + start + \", \" + end + \"]\"; }\n}",
          expectedOutput: "[0, 1]\n[2, 5]",
        },
      ],
      flashcards: [
        { front: "Meaning of this?", back: "Reference to the current object (inside an instance method)." },
        { front: "Calling another constructor?", back: "this(args) on the first line." },
        { front: "Can static methods use this?", back: "No." },
      ],
      practiceProblems: [
        {
          id: "5.9.p1",
          difficulty: "medium",
          prompt:
            "Rewrite without duplication:\n```java\npublic Rect() { width = 1; height = 1; }\npublic Rect(int w, int h) { width = w; height = h; }\n```",
          answer: "public Rect() { this(1, 1); }\npublic Rect(int w, int h) { this.width = w; this.height = h; }",
          explanation:
            "Delegate the no-arg constructor to the parameterized one using `this(1, 1)`.",
        },
      ],
    },
    {
      id: "5.10",
      title: "Ethical and Social Implications of Computing Systems",
      summary:
        "Programs have real-world consequences — privacy, bias, intellectual property. AP CSA expects you to recognize these issues, not to write code for them.",
      explanation:
        "AP CSA briefly covers the ethical dimension of software. You should be able to identify issues like data privacy (who controls a user's information), algorithmic bias (when training data reflects existing inequalities), and intellectual property (copyright on code, open-source licenses, proper attribution).\n\nThe exam occasionally asks conceptual MCQs: which of the following is an example of software bias? Which represents a privacy concern? Answers typically match obvious definitions — facial recognition that misidentifies certain groups is bias; storing and selling user location data is a privacy concern.\n\nYou are also expected to understand that programmers have responsibilities: write accurate code, test it, consider edge cases, respect licenses. This topic is rarely more than 1-2 MCQs on the exam, but it does appear.",
      keyIdeas: [
        "Privacy: data collection, consent, and user control.",
        "Bias: algorithms can inherit bias from training data or design.",
        "Intellectual property: copyright, open-source licenses, attribution.",
        "Programmers are responsible for testing and considering consequences.",
      ],
      commonMistakes: [
        "Dismissing ethics questions; they can be MCQs worth points.",
        "Confusing privacy (data control) with bias (unfair outcomes).",
      ],
      codeInteractives: [
        {
          id: "5.10.a",
          title: "Attribution in code",
          description:
            "A tiny demonstration that uses a Javadoc @author tag — the kind of metadata that preserves IP.",
          starterCode:
            "public class Main {\n    /**\n     * Demo class.\n     * @author Finals Prep\n     */\n    public static void main(String[] args) {\n        System.out.println(\"Respect the license on any code you reuse.\");\n    }\n}",
          expectedOutput: "Respect the license on any code you reuse.",
        },
      ],
      flashcards: [
        { front: "Bias in software?", back: "Systematic unfair outcomes rooted in data or design." },
        { front: "Copyright scope for code?", back: "The code is copyrighted the moment it's written; licenses govern reuse." },
        { front: "Privacy concern example?", back: "Collecting user data without consent or selling it to third parties." },
      ],
      practiceProblems: [
        {
          id: "5.10.p1",
          difficulty: "easy",
          prompt:
            "Which scenario best illustrates algorithmic bias?",
          choices: [
            "A sorting algorithm runs slowly on large inputs.",
            "A face-recognition model is less accurate on some demographics.",
            "A program crashes on invalid input.",
            "A library is distributed without attribution.",
          ],
          answer: "A face-recognition model is less accurate on some demographics.",
          explanation:
            "Bias refers to systematically unfair outcomes across groups. The other options describe performance, robustness, and licensing issues, respectively.",
        },
      ],
    },
  ],
});

// =============================================================================
// UNIT 6 — ARRAY (10–15% of exam)
// =============================================================================
AP_COMPUTER_SCIENCE_A.units.push({
  number: 6,
  title: "Array",
  examWeight: "10–15% of exam",
  overview:
    "Unit 6 covers fixed-size arrays — the lowest-level collection in Java. Create arrays, traverse them with index-based and enhanced for loops, and apply standard algorithms (sum, min, count, reverse, shift). Careful index bookkeeping is the central skill.",
  topics: [
    {
      id: "6.1",
      title: "Array Creation and Access",
      summary:
        "An array is a fixed-size, indexed sequence of same-typed values. Create with new `T[size]` or initializer braces.",
      explanation:
        "Two creation forms: `int[]` a = new `int[5]`; allocates 5 ints (all 0) and `int[]` a = {1, 2, 3}; both allocates and initializes. The length is fixed at creation; arrays do not grow. Access is zero-indexed: `a[0]` is the first element, `a[a.length − 1]` is the last. length is a field, not a method (no parentheses).\n\nAssigning to an index (`a[i]` = x) writes; reading (int v = `a[i]`) reads. Out-of-bounds access throws `ArrayIndexOutOfBoundsException` at runtime. The compiler can catch obvious cases (negative literal), but most bounds errors are runtime-only.\n\nArrays are reference types. Declaring `int[]` b = a; aliases — both refer to the same array. To make a copy, loop and assign or use Arrays.copyOf. AP CSA mostly requires the loop approach.",
      keyIdeas: [
        "new T[n] allocates n default-valued slots.",
        "{a, b, c} initializer allocates + fills.",
        "Zero-indexed; last valid index = length − 1.",
        "length is a field (no parentheses).",
      ],
      commonMistakes: [
        "Writing arr.length() — arrays use a field, not a method.",
        "Going to arr.length instead of arr.length − 1.",
        "Aliasing with = when you meant to copy.",
      ],
      codeInteractives: [
        {
          id: "6.1.a",
          title: "Create and access",
          description:
            "Both declaration forms at work.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        int[] a = new int[4];       // [0, 0, 0, 0]\n        a[0] = 7;\n        a[3] = 9;\n        int[] b = {10, 20, 30};\n        System.out.println(a[0] + \" \" + a[3]);\n        System.out.println(\"b.length = \" + b.length);\n        System.out.println(\"last in b = \" + b[b.length - 1]);\n    }\n}",
          expectedOutput: "7 9\nb.length = 3\nlast in b = 30",
          variations: [
            {
              prompt: "Try a[4] = 99; and observe the runtime exception.",
              hint: "Valid indices are 0..length-1. a[4] on a length-4 array is out of bounds.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Size fixed?", back: "Yes — arrays cannot grow." },
        { front: "length field or method?", back: "Field — no parentheses." },
        { front: "Out-of-bounds access?", back: "ArrayIndexOutOfBoundsException at runtime." },
      ],
      practiceProblems: [
        {
          id: "6.1.p1",
          difficulty: "easy",
          prompt:
            "Which declaration creates an int array of length 5 with every element defaulting to 0?",
          choices: [
            "int[] a = {0};",
            "int[] a = new int[5];",
            "int a[5] = new int[]{};",
            "int[5] a;",
          ],
          answer: "int[] a = new int[5];",
          explanation:
            "new `int[5]` allocates 5 slots and defaults them to 0. The other options either initialize wrong or have invalid syntax.",
        },
      ],
    },
    {
      id: "6.2",
      title: "Traversing Arrays",
      summary:
        "An index-based for loop lets you read or mutate each element. Use i < `arr.length` (not <=).",
      explanation:
        "The canonical traversal is for (int i = 0; i < `arr.length`; i++) { ... `arr[i]` ... }. This is the version you use when you need the index — for instance, to update each element (`arr[i]` = `arr[i]` * 2), compare adjacent elements (`arr[i]` vs `arr[i+1]`), or track position.\n\nReverse traversal flips the header: for (int i = `arr.length` − 1; i >= 0; i--). Partial traversals narrow the bounds. The two ends — starting too low or going too high — are the perennial bug source.\n\nAccumulator patterns extend traversal: running sum, running max, count of matches. Each maintains one or two variables initialized before the loop and updated during the body.",
      keyIdeas: [
        "Index traversal: for (int i = 0; i < arr.length; i++).",
        "Use indexed loop when you need index or are modifying elements.",
        "Common patterns: sum, max, count, reverse build.",
      ],
      commonMistakes: [
        "Using i <= arr.length and walking off the end.",
        "Forgetting to initialize the accumulator (sum = 0).",
      ],
      codeInteractives: [
        {
          id: "6.2.a",
          title: "Indexed traversal sampler",
          description:
            "Sum, max, and double-in-place in one program.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {4, 1, 9, 2, 7};\n        int sum = 0;\n        int max = arr[0];\n        for (int i = 0; i < arr.length; i++) {\n            sum += arr[i];\n            if (arr[i] > max) max = arr[i];\n        }\n        for (int i = 0; i < arr.length; i++) arr[i] *= 2;  // mutate in place\n        System.out.println(\"sum=\" + sum + \" max=\" + max);\n        for (int v : arr) System.out.print(v + \" \");\n    }\n}",
          expectedOutput: "sum=23 max=9\n8 2 18 4 14 ",
          variations: [
            {
              prompt: "Reverse the array in place using two indices moving toward the center.",
              hint: "Swap arr[i] with arr[arr.length - 1 - i] while i < arr.length / 2.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Why i < length (not <=)?", back: "Because the last valid index is length − 1." },
        { front: "Accumulator pattern?", back: "Initialize before loop, update inside loop." },
      ],
      practiceProblems: [
        {
          id: "6.2.p1",
          difficulty: "medium",
          prompt:
            "Write a method that returns the index of the smallest value in an int array (assume non-empty).",
          answer:
            "public static int minIndex(int[] a) {\n    int m = 0;\n    for (int i = 1; i < a.length; i++)\n        if (a[i] < a[m]) m = i;\n    return m;\n}",
          explanation:
            "Track the index of the running minimum. Start at 0 and update when a strictly smaller value appears.",
        },
      ],
    },
    {
      id: "6.3",
      title: "Enhanced for Loop for Arrays",
      summary:
        "for (T x : arr) gives one element at a time. Cannot reassign `arr[i]` — use indexed for to mutate.",
      explanation:
        "The enhanced for loop (sometimes called for-each) iterates over every element in order. Syntax: for (Type x : arr) { ... x ... }. The variable x is a local copy (for primitives) or a reference (for objects) to each successive element. It is perfect for read-only scans: summing, finding a match, printing.\n\nThe key limitation is that x = newValue inside the loop does not modify the array. For primitives this is obvious — x is a copy. For objects, x points to the same object as `arr[i]`, so you can mutate the object (`x.setName(\"foo\")`), but reassigning x doesn't update `arr[i]`. If you need to replace elements, use an indexed for loop.\n\nYou also cannot access the index directly from an enhanced for loop. If you need i, use the indexed version. AP CSA tests both forms; choose based on whether you need the index or the element.",
      keyIdeas: [
        "for (T x : arr) visits each element.",
        "Cannot reassign arr[i] through the enhanced for variable.",
        "No index access; use indexed for if you need one.",
        "Great for read-only summaries (sum, max, count).",
      ],
      commonMistakes: [
        "Trying to modify the array by reassigning the loop variable.",
        "Reaching for the index inside an enhanced for loop.",
      ],
      codeInteractives: [
        {
          id: "6.3.a",
          title: "Enhanced for + indexed for",
          description:
            "Same problem, two forms.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {2, 4, 6, 8};\n        int sum = 0;\n        for (int x : arr) sum += x;\n        System.out.println(\"sum = \" + sum);\n\n        // mutate: must use indexed\n        for (int i = 0; i < arr.length; i++) arr[i] += 1;\n        for (int x : arr) System.out.print(x + \" \");\n    }\n}",
          expectedOutput: "sum = 20\n3 5 7 9 ",
          variations: [
            {
              prompt: "Try to change an element with x = 0 inside the enhanced for. Verify it doesn't persist.",
              hint: "x is a local copy — the array is unchanged.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Enhanced for syntax?", back: "for (Type x : arr) { ... }" },
        { front: "Can it mutate the array in place?", back: "No — reassigning x doesn't affect arr[i]." },
        { front: "Can it access the index?", back: "No." },
      ],
      practiceProblems: [
        {
          id: "6.3.p1",
          difficulty: "easy",
          prompt:
            "Which task requires an indexed (not enhanced) for loop?",
          choices: [
            "Summing all elements.",
            "Printing each element.",
            "Replacing every element with its square.",
            "Counting elements greater than 10.",
          ],
          answer: "Replacing every element with its square.",
          explanation:
            "Mutation of array slots requires the index. Enhanced for only exposes the value (or reference), not the slot.",
        },
      ],
    },
    {
      id: "6.4",
      title: "Developing Algorithms Using Arrays",
      summary:
        "Min/max, count, shift, reverse, standard swap. Master these patterns — FRQs recombine them.",
      explanation:
        "The canonical AP array algorithms are: find min or max (initialize to `arr[0]`, scan rest), count occurrences (counter that increments on match), linear search (return first index of match, or −1), reverse in place (two indices moving inward with swap), and shift (move element at position k to position 0, shifting others right).\n\nSwap is a three-line idiom: int temp = `a[i]`; `a[i]` = `a[j]`; `a[j]` = temp;. Shift is a loop that walks indices backward or forward depending on direction. Reverse is n/2 swaps.\n\nFRQ prompts combine these. A typical problem: \"write a method that returns a new array containing only the even elements of the input in reverse order.\" You filter (copy matches to a new array), then reverse. Break the problem into standard patterns, code each, compose.",
      keyIdeas: [
        "Min/max: initialize to arr[0], scan from 1.",
        "Count: increment on each match.",
        "Swap: use a temp variable.",
        "Reverse: swap i with length − 1 − i while i < length/2.",
      ],
      commonMistakes: [
        "Initializing max to 0 (fails if all elements are negative).",
        "Forgetting the temp variable in a swap (both slots end up equal).",
        "Off-by-one in a shift when elements move over existing positions.",
      ],
      codeInteractives: [
        {
          id: "6.4.a",
          title: "Reverse in place",
          description:
            "Two pointers move from the ends to the middle.",
          starterCode:
            "public class Main {\n    public static void reverse(int[] a) {\n        int i = 0;\n        int j = a.length - 1;\n        while (i < j) {\n            int t = a[i];\n            a[i] = a[j];\n            a[j] = t;\n            i++;\n            j--;\n        }\n    }\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n        reverse(arr);\n        for (int v : arr) System.out.print(v + \" \");\n    }\n}",
          expectedOutput: "5 4 3 2 1 ",
          variations: [
            {
              prompt: "Count how many times a target value appears in an int[].",
              hint: "Loop and increment a counter on each match.",
            },
            {
              prompt: "Return a new int[] with only even values from the input.",
              hint: "First pass: count evens. Second pass: fill the new array.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Idiomatic swap?", back: "int t = a[i]; a[i] = a[j]; a[j] = t;" },
        { front: "Init value for max search?", back: "arr[0] — not 0 or Integer.MIN_VALUE by necessity, but arr[0] always works." },
        { front: "Reverse loop bound?", back: "i < length / 2 with j = length − 1 − i." },
      ],
      practiceProblems: [
        {
          id: "6.4.p1",
          difficulty: "hard",
          prompt:
            "Write a method that returns the number of times target appears in int[] a.",
          answer:
            "public static int count(int[] a, int target) {\n    int c = 0;\n    for (int v : a) if (v == target) c++;\n    return c;\n}",
          explanation:
            "A single pass with a counter. Enhanced for is fine here since no mutation or index is needed.",
        },
      ],
    },
  ],
});

// =============================================================================
// UNIT 7 — ARRAYLIST (2.5–7.5% of exam)
// =============================================================================
AP_COMPUTER_SCIENCE_A.units.push({
  number: 7,
  title: "ArrayList",
  examWeight: "2.5–7.5% of exam",
  overview:
    "Unit 7 introduces ArrayList — a resizable, generic collection backed by an array. You learn the core methods (add, get, set, remove, size), safe traversal patterns for removal, and basic search/sort algorithms. Ethical issues around data collection round out the unit.",
  topics: [
    {
      id: "7.1",
      title: "Introduction to ArrayList",
      summary:
        "`ArrayList<E>` is a resizable list backed by an array. Generic type parameter E is a reference type.",
      explanation:
        "Import with import java.util.ArrayList;. Declare as `ArrayList<String>` names = new ArrayList<>(); (the diamond <> infers the type). The generic type parameter E must be a reference type — Integer not int, Double not double. Autoboxing makes this mostly invisible.\n\nAn ArrayList grows automatically when you add beyond its current capacity. The `size()` method returns the number of elements currently stored (not capacity). New lists start empty. Accessing an out-of-range index throws `IndexOutOfBoundsException`.\n\nCompared to arrays: arrays are faster and lower overhead but fixed size; ArrayList trades overhead for resizing and convenience methods. The AP exam uses ArrayList whenever it needs dynamic size.",
      keyIdeas: [
        "ArrayList<E> takes a reference type parameter.",
        "import java.util.ArrayList; required.",
        "size() returns current element count; not capacity.",
        "Grows dynamically as you add.",
      ],
      commonMistakes: [
        "Trying ArrayList<int>; must be Integer.",
        "Forgetting the import.",
        "Confusing length (arrays) with size() (ArrayList).",
      ],
      codeInteractives: [
        {
          id: "7.1.a",
          title: "Create and populate",
          description:
            "A baseline ArrayList example.",
          starterCode:
            "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> names = new ArrayList<>();\n        names.add(\"Avery\");\n        names.add(\"Jordan\");\n        names.add(\"Sam\");\n        System.out.println(\"size = \" + names.size());\n        System.out.println(names);\n    }\n}",
          expectedOutput: "size = 3\n[Avery, Jordan, Sam]",
        },
      ],
      flashcards: [
        { front: "Import path?", back: "java.util.ArrayList" },
        { front: "Element count method?", back: "size() — parentheses required." },
        { front: "Can you store primitives?", back: "Not directly; use wrapper types (Integer, Double)." },
      ],
      practiceProblems: [
        {
          id: "7.1.p1",
          difficulty: "easy",
          prompt:
            "Which declares an empty list of Integers?",
          choices: [
            "ArrayList<int> a = new ArrayList<>();",
            "ArrayList<Integer> a = new ArrayList<>();",
            "ArrayList a = new ArrayList<Integer>(0);",
            "List<Integer> a = ArrayList.empty();",
          ],
          answer: "ArrayList<Integer> a = new ArrayList<>();",
          explanation:
            "Generics require a reference type. The diamond operator infers the type from the left side.",
        },
      ],
    },
    {
      id: "7.2",
      title: "ArrayList Methods",
      summary:
        "add, `add(i, x)`, get, set, remove, size, contains, indexOf — the method menu AP tests.",
      explanation:
        "The AP subset: `add(E x)` appends at the end; `add(int i, E x)` inserts at index i, shifting later elements right; E `get(int i)` reads; E `set(int i, E x)` replaces and returns the old value; E `remove(int i)` removes and returns the element, shifting later elements left; boolean `remove(Object x)` removes the first occurrence and returns whether removed; int `size()` returns count; boolean `contains(Object x)` tests for presence; int `indexOf(Object x)` returns first index or −1.\n\nContains and indexOf use `.equals()` internally, so they work correctly for Strings and Integers. For your own classes, you must override equals (Unit 9) or these methods fall back to reference identity.\n\nInserts and removes in the middle are O(n) because of shifting. Adds at the end are amortized O(1). AP doesn't formally test complexity but you should know that repeated middle-removes in a loop must be handled carefully.",
      keyIdeas: [
        "add appends; add(i, x) inserts and shifts right.",
        "remove(i) removes and shifts left.",
        "set replaces; get reads.",
        "contains and indexOf use equals.",
      ],
      commonMistakes: [
        "Calling list[i] — use get(i) and set(i, x).",
        "Using remove(Object) on Integer and being surprised by overload (remove(int) is treated as remove-by-index).",
      ],
      codeInteractives: [
        {
          id: "7.2.a",
          title: "Method sampler",
          description:
            "Every core method on one list.",
          starterCode:
            "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> list = new ArrayList<>();\n        list.add(\"a\");\n        list.add(\"b\");\n        list.add(\"c\");\n        list.add(1, \"X\");          // insert at index 1\n        System.out.println(list);  // [a, X, b, c]\n        System.out.println(list.get(2));       // b\n        System.out.println(list.set(2, \"B\")); // old value \"b\"\n        System.out.println(list);              // [a, X, B, c]\n        System.out.println(list.indexOf(\"c\")); // 3\n        System.out.println(list.contains(\"z\")); // false\n        list.remove(0);            // removes \"a\"\n        System.out.println(list);  // [X, B, c]\n    }\n}",
          expectedOutput: "[a, X, b, c]\nb\nb\n[a, X, B, c]\n3\nfalse\n[X, B, c]",
          variations: [
            {
              prompt: "Store Integers and observe that list.remove(1) removes by index, not by value.",
              hint: "Cast to Integer to force remove(Object): list.remove(Integer.valueOf(1)).",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Append to the end?", back: "add(element)" },
        { front: "Insert at index i?", back: "add(i, element) — shifts right." },
        { front: "Replace element at i?", back: "set(i, element); returns the old value." },
        { front: "Check presence?", back: "contains(element) — uses equals." },
      ],
      practiceProblems: [
        {
          id: "7.2.p1",
          difficulty: "medium",
          prompt:
            "What is the list after:\n```java\nArrayList<Integer> a = new ArrayList<>();\na.add(10); a.add(20); a.add(30);\na.add(1, 15);\na.set(3, 40);\na.remove(0);\n```",
          answer: "[15, 20, 40]",
          explanation:
            "After adds: [10, 20, 30]. Insert 15 at 1 → [10, 15, 20, 30]. Set index 3 to 40 → [10, 15, 20, 40]. Remove index 0 → [15, 20, 40].",
        },
      ],
    },
    {
      id: "7.3",
      title: "Traversing ArrayLists",
      summary:
        "Indexed for or enhanced for. Same rules as arrays — enhanced for can't modify the list.",
      explanation:
        "Two traversal forms work on ArrayList. Indexed: for (int i = 0; i < `list.size()`; i++) { ... `list.get(i)` ... }. Enhanced: for (E x : list) { ... }. Same tradeoff as arrays — enhanced for is read-only from the list's perspective.\n\nA critical gotcha: removing elements during an enhanced for throws `ConcurrentModificationException` at runtime. Even indexed for has a subtler bug — if you remove at index i, the next element slides to i, and i++ skips it. The fix is to decrement i after a remove, or iterate backwards: for (int i = `list.size()` − 1; i >= 0; i--).\n\nAdding during traversal is similarly dangerous. When in doubt, build a new list and assign, or collect the indices to remove and process after the loop.",
      keyIdeas: [
        "Indexed for: for (int i = 0; i < size(); i++) list.get(i).",
        "Enhanced for: for (E x : list) — read-only.",
        "Never modify the list during enhanced for (CME).",
        "Backward indexed loop is safe for removals.",
      ],
      commonMistakes: [
        "Removing during enhanced for.",
        "Forgetting to adjust i after a remove in a forward indexed loop.",
      ],
      codeInteractives: [
        {
          id: "7.3.a",
          title: "Safe removal loop",
          description:
            "Remove all negatives using a backward indexed loop.",
          starterCode:
            "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> nums = new ArrayList<>();\n        for (int v : new int[] {3, -1, 4, -2, -5, 6}) nums.add(v);\n\n        for (int i = nums.size() - 1; i >= 0; i--) {\n            if (nums.get(i) < 0) nums.remove(i);\n        }\n        System.out.println(nums);\n    }\n}",
          expectedOutput: "[3, 4, 6]",
          variations: [
            {
              prompt: "Rewrite forward, adjusting i after each remove.",
              hint: "if (nums.get(i) < 0) { nums.remove(i); i--; }",
            },
          ],
        },
      ],
      flashcards: [
        { front: "ConcurrentModificationException source?", back: "Modifying a list during an enhanced for loop." },
        { front: "Safer removal loop direction?", back: "Backward — indices don't shift for already-visited elements." },
      ],
      practiceProblems: [
        {
          id: "7.3.p1",
          difficulty: "hard",
          prompt:
            "What's wrong with this loop that removes zeros?\n```java\nfor (int i = 0; i < list.size(); i++) {\n    if (list.get(i) == 0) list.remove(i);\n}\n```",
          answer:
            "After remove(i), the next element slides to i; i++ then skips it. Adjacent zeros will survive. Fix: decrement i or iterate backward.",
          explanation:
            "This is the classic forward-remove bug. Either add i-- inside the branch or loop backward.",
        },
      ],
    },
    {
      id: "7.4",
      title: "Developing Algorithms Using ArrayLists",
      summary:
        "Compose size, get, set, remove, add into standard algorithms: filter, dedupe, shift-in-place.",
      explanation:
        "Most ArrayList algorithms mirror array algorithms with method calls instead of indexing syntax. Copy when transforming — do not mutate a list you're iterating over.\n\nFilter: build a new list; iterate the source; add matches. Dedupe: iterate, add to a new list if not already contains. Move first-to-last: store `list.get(0)`, `remove(0)`, `add(stored)`. Sorting is usually done with `Collections.sort`(list) when allowed, but AP FRQs often ask you to implement selection or insertion sort manually.\n\nThe AP exam's most popular FRQ pattern is: given a method signature and a precondition, write a correct implementation using ArrayList. Practice by writing small pure methods that take and return ArrayLists.",
      keyIdeas: [
        "When transforming, prefer building a new list.",
        "Filter = iterate source, add matches to new list.",
        "Dedupe = for each item, add only if !result.contains(item).",
        "Collections.sort when allowed; otherwise manual sort.",
      ],
      commonMistakes: [
        "Mutating a list you are iterating over.",
        "Forgetting to import java.util.ArrayList or java.util.Collections.",
      ],
      codeInteractives: [
        {
          id: "7.4.a",
          title: "Dedupe via a new list",
          description:
            "Classic non-mutating approach.",
          starterCode:
            "import java.util.ArrayList;\n\npublic class Main {\n    public static ArrayList<String> dedupe(ArrayList<String> in) {\n        ArrayList<String> out = new ArrayList<>();\n        for (String s : in) {\n            if (!out.contains(s)) out.add(s);\n        }\n        return out;\n    }\n    public static void main(String[] args) {\n        ArrayList<String> words = new ArrayList<>();\n        for (String w : new String[] {\"red\", \"blue\", \"red\", \"green\", \"blue\", \"red\"}) words.add(w);\n        System.out.println(dedupe(words));\n    }\n}",
          expectedOutput: "[red, blue, green]",
        },
      ],
      flashcards: [
        { front: "Typical filter pattern?", back: "for each → if match → add to new list." },
        { front: "When to iterate backward on a list?", back: "When removing elements in-place." },
      ],
      practiceProblems: [
        {
          id: "7.4.p1",
          difficulty: "hard",
          prompt:
            "Write a method that returns a new ArrayList<Integer> containing only the elements of the given list that are greater than threshold.",
          answer:
            "public static ArrayList<Integer> above(ArrayList<Integer> list, int threshold) {\n    ArrayList<Integer> out = new ArrayList<>();\n    for (Integer v : list) if (v > threshold) out.add(v);\n    return out;\n}",
          explanation:
            "Build a new list so the input stays untouched. Enhanced for is fine since we don't mutate the source.",
        },
      ],
    },
    {
      id: "7.5",
      title: "Searching",
      summary:
        "Linear search: scan every element until found. Binary search: on a sorted list, halve each step. Know both.",
      explanation:
        "Linear search is the default. Loop through every element, return the index of the first match, return −1 if not found. Works on any list, sorted or not. Worst case is O(n) comparisons.\n\nBinary search requires a sorted list and uses a divide-and-conquer strategy. Compare the target with the middle element; if equal, done; if less, search the left half; if greater, search the right half. Each step halves the remaining range, so complexity is O(log n). Hand-trace a small example on the exam to verify.\n\nThe AP exam shows pseudocode or Java for both and asks you to count comparisons or identify bugs. Remember that binary search on an unsorted list gives wrong answers silently.",
      keyIdeas: [
        "Linear search: O(n), works on any list.",
        "Binary search: O(log n), requires sorted list.",
        "Binary search halves the range each step.",
        "Binary search on unsorted data produces wrong answers.",
      ],
      commonMistakes: [
        "Using binary search on unsorted data.",
        "Off-by-one in binary search mid or bounds updates.",
      ],
      codeInteractives: [
        {
          id: "7.5.a",
          title: "Iterative binary search",
          description:
            "Assumes sorted ascending.",
          starterCode:
            "import java.util.ArrayList;\n\npublic class Main {\n    public static int binarySearch(ArrayList<Integer> sorted, int target) {\n        int lo = 0, hi = sorted.size() - 1;\n        while (lo <= hi) {\n            int mid = (lo + hi) / 2;\n            int midVal = sorted.get(mid);\n            if (midVal == target) return mid;\n            if (midVal < target) lo = mid + 1;\n            else hi = mid - 1;\n        }\n        return -1;\n    }\n    public static void main(String[] args) {\n        ArrayList<Integer> a = new ArrayList<>();\n        for (int v : new int[] {1, 3, 5, 7, 9, 11}) a.add(v);\n        System.out.println(binarySearch(a, 7));   // 3\n        System.out.println(binarySearch(a, 4));   // -1\n    }\n}",
          expectedOutput: "3\n-1",
          variations: [
            {
              prompt: "Remove the sort assumption by calling binary search on an unsorted list and observe a wrong answer.",
              hint: "Binary search assumes order; without it, the halving decisions are wrong.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Linear vs binary worst case?", back: "Linear O(n); binary O(log n)." },
        { front: "Binary prerequisite?", back: "List must be sorted." },
        { front: "Not-found return?", back: "−1 by convention." },
      ],
      practiceProblems: [
        {
          id: "7.5.p1",
          difficulty: "medium",
          prompt:
            "How many comparisons does binary search make in the worst case on a 16-element sorted list?",
          answer: "5",
          explanation:
            "After each comparison, half the range is discarded. 16 → 8 → 4 → 2 → 1 → 0 = 5 halving steps, so up to 5 comparisons (roughly log₂(16) + 1).",
        },
      ],
    },
    {
      id: "7.6",
      title: "Sorting",
      summary:
        "Selection sort and insertion sort are the two O(n²) sorts you must be able to trace and implement.",
      explanation:
        "Selection sort: for each position i, find the minimum of the remaining unsorted region and swap it into position i. Always performs about n²/2 comparisons, few swaps. Easy to trace: the sorted prefix grows by one each pass.\n\nInsertion sort: treat the first element as sorted; for each subsequent element, shift it leftward past larger elements until it slots into the right place. Efficient on nearly-sorted data — O(n) in the best case.\n\nYou are expected to read, trace, and write both. For AP FRQs on sorting, the rubric examines whether the outer loop, the inner comparison, and the swap or shift are correct. Write pseudocode first, then fill in Java.",
      keyIdeas: [
        "Selection sort: n²/2 comparisons, one swap per outer iteration.",
        "Insertion sort: O(n²) worst, O(n) best (already sorted).",
        "Both are in-place and stable.",
        "Know how to trace a pass by pass.",
      ],
      commonMistakes: [
        "Confusing selection and insertion.",
        "Off-by-one in inner loop of insertion sort.",
      ],
      codeInteractives: [
        {
          id: "7.6.a",
          title: "Selection sort on ArrayList",
          description:
            "Swap the minimum into each position.",
          starterCode:
            "import java.util.ArrayList;\n\npublic class Main {\n    public static void selectionSort(ArrayList<Integer> a) {\n        for (int i = 0; i < a.size() - 1; i++) {\n            int minIdx = i;\n            for (int j = i + 1; j < a.size(); j++) {\n                if (a.get(j) < a.get(minIdx)) minIdx = j;\n            }\n            int temp = a.get(i);\n            a.set(i, a.get(minIdx));\n            a.set(minIdx, temp);\n        }\n    }\n    public static void main(String[] args) {\n        ArrayList<Integer> nums = new ArrayList<>();\n        for (int v : new int[] {5, 2, 9, 1, 7, 3}) nums.add(v);\n        selectionSort(nums);\n        System.out.println(nums);\n    }\n}",
          expectedOutput: "[1, 2, 3, 5, 7, 9]",
          variations: [
            {
              prompt: "Implement insertion sort on the same ArrayList.",
              hint: "For each i from 1 to size()-1, shift the element at i left past larger elements.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Selection sort main idea?", back: "Find min of unsorted region, swap into next position." },
        { front: "Insertion sort main idea?", back: "Take next element, shift into its sorted place among the earlier elements." },
        { front: "Both sorts' time complexity?", back: "O(n²) worst case." },
      ],
      practiceProblems: [
        {
          id: "7.6.p1",
          difficulty: "hard",
          prompt:
            "After the first two passes of selection sort on [4, 2, 5, 1, 3], what is the list?",
          answer: "[1, 2, 5, 4, 3]",
          explanation:
            "Pass 1: find min (1 at index 3), swap with index 0 → [1, 2, 5, 4, 3]. Pass 2: find min from index 1 (which is 2, already in place), no meaningful swap → [1, 2, 5, 4, 3].",
        },
      ],
    },
    {
      id: "7.7",
      title: "Ethical Issues Around Data Collection",
      summary:
        "Who owns collected data? What harms arise when data is aggregated, biased, or leaked?",
      explanation:
        "Modern apps collect massive amounts of user data — location, browsing history, social graphs, biometrics. Ethical concerns mirror those in Unit 5.10 but are more specific to data. Aggregation: individually harmless fields can identify a person when combined. Consent: did users understand and agree to the collection? Bias: data that over-represents one group skews any model trained on it. Security: stored data is a liability if breached.\n\nLegal frameworks (GDPR in Europe, COPPA for children in the US) impose rules. AP CSA does not require memorizing specific laws but expects you to identify scenarios as ethical issues. On MCQs, look for keywords like consent, aggregation, bias, breach.\n\nAs a programmer your responsibility includes minimizing data collected, securing what you store, and checking your data for representational bias before using it to train models or drive decisions.",
      keyIdeas: [
        "Aggregation can reveal identity from innocuous fields.",
        "Consent means users understood and agreed.",
        "Bias in data propagates to models trained on it.",
        "Breaches turn stored data into harm.",
      ],
      commonMistakes: [
        "Assuming anonymization is foolproof (re-identification via aggregation is easy).",
        "Confusing data breach (security issue) with data bias (fairness issue).",
      ],
      codeInteractives: [
        {
          id: "7.7.a",
          title: "Minimal-collection demo",
          description:
            "Show how storing less is a safer default.",
          starterCode:
            "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Bad: store raw identifying info\n        ArrayList<String> names = new ArrayList<>();\n        names.add(\"Avery Smith\");\n        names.add(\"Jordan Lee\");\n\n        // Better: store only what the feature needs — e.g., anonymous counter\n        int signups = names.size();\n        System.out.println(\"Signup count (anonymous): \" + signups);\n    }\n}",
          expectedOutput: "Signup count (anonymous): 2",
        },
      ],
      flashcards: [
        { front: "Aggregation risk?", back: "Combining fields can re-identify individuals." },
        { front: "What does consent require?", back: "Users understanding and agreeing to the collection." },
        { front: "Example of biased data?", back: "Training set that under-represents a demographic, leading to worse performance for that group." },
      ],
      practiceProblems: [
        {
          id: "7.7.p1",
          difficulty: "easy",
          prompt:
            "Which is primarily a privacy concern rather than a bias concern?",
          choices: [
            "A fitness app shares user heart-rate data with advertisers.",
            "A hiring model prefers candidates with prestigious schools.",
            "A face detector misidentifies darker-skinned subjects.",
            "A recommendation system reinforces a user's existing preferences.",
          ],
          answer: "A fitness app shares user heart-rate data with advertisers.",
          explanation:
            "Sharing personal health data without consent is a privacy concern. The other options describe biased outcomes.",
        },
      ],
    },
  ],
});

// =============================================================================
// UNIT 8 — 2D ARRAY (7.5–10% of exam)
// =============================================================================
AP_COMPUTER_SCIENCE_A.units.push({
  number: 8,
  title: "2D Array",
  examWeight: "7.5–10% of exam",
  overview:
    "Unit 8 generalizes arrays to two dimensions. You allocate rectangular arrays, traverse them in row-major or column-major order, and apply algorithms like sum-per-row, sum-per-column, and 2D search. Every double-nested loop pattern from Unit 4 shows up here.",
  topics: [
    {
      id: "8.1",
      title: "2D Arrays",
      summary:
        "A 2D array is an array of arrays. Declare T[][], access with `arr[row]`[col]. length gives rows; `arr[i]`.length gives columns.",
      explanation:
        "Declaration forms: `int[][]` grid = new `int[3]`[4]; allocates 3 rows × 4 columns, all zeroed. Initializer: `int[][]` g = { {1,2,3}, {4,5,6} };. Java technically allows ragged arrays (rows of different lengths), but the AP exam assumes rectangular.\n\nAccess with two indices: `grid[r]`[c]. Assignment: `grid[r]`[c] = value. Bounds: 0 ≤ r < grid.length and 0 ≤ c < `grid[r]`.length. Exceeding either throws `ArrayIndexOutOfBoundsException`.\n\nThink of a 2D array as a rectangle of values. Rows are the outer index; columns the inner. The AP exam uses grids to represent game boards, pixel images, matrices — anywhere a rectangular structure fits.",
      keyIdeas: [
        "int[][] arr = new int[rows][cols] allocates rectangular.",
        "Access: arr[row][col].",
        "arr.length = number of rows; arr[i].length = number of cols in row i.",
        "Rectangular by AP convention.",
      ],
      commonMistakes: [
        "Swapping row and column indices.",
        "Using arr.length where arr[0].length was meant.",
      ],
      codeInteractives: [
        {
          id: "8.1.a",
          title: "Create and access a 2D array",
          description:
            "Two ways to build; same addressing.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        int[][] grid = new int[2][3];\n        grid[0][0] = 1;\n        grid[1][2] = 9;\n        System.out.println(grid[0][0] + \" \" + grid[1][2]);\n\n        int[][] table = { {10, 20}, {30, 40}, {50, 60} };\n        System.out.println(\"rows = \" + table.length);\n        System.out.println(\"cols = \" + table[0].length);\n        System.out.println(\"table[1][0] = \" + table[1][0]);\n    }\n}",
          expectedOutput: "1 9\nrows = 3\ncols = 2\ntable[1][0] = 30",
        },
      ],
      flashcards: [
        { front: "Row count?", back: "arr.length" },
        { front: "Column count (rectangular)?", back: "arr[0].length" },
        { front: "Access syntax?", back: "arr[row][col]" },
      ],
      practiceProblems: [
        {
          id: "8.1.p1",
          difficulty: "easy",
          prompt:
            "What is printed?\n```java\nint[][] g = { {1,2,3}, {4,5,6} };\nSystem.out.println(g.length + \" \" + g[0].length);\n```",
          answer: "2 3",
          explanation:
            "g has 2 rows and each row has 3 columns. g.length = 2, `g[0]`.length = 3.",
        },
      ],
    },
    {
      id: "8.2",
      title: "Traversing 2D Arrays",
      summary:
        "Row-major: outer loop over rows, inner over columns. Column-major swaps the loops. Use the one that matches your task.",
      explanation:
        "Row-major traversal is the default: for (int r = 0; r < `arr.length`; r++) for (int c = 0; c < `arr[r]`.length; c++) `arr[r]`[c] ...;. Columns advance fastest, rows slowest. Perfect when you work one row at a time — sum each row, print each row.\n\nColumn-major swaps the loops: for (int c = 0; c < `arr[0]`.length; c++) for (int r = 0; r < `arr.length`; r++) `arr[r]`[c] ...;. Use when you need to process each column as a unit (column sums, column searches, transposing).\n\nEnhanced for works too: for (`int[]` row : arr) for (int v : row) ...;. Clean for read-only scans. As with 1D, you can't use it to reassign `arr[r]`[c]. Count operations carefully on AP exam problems — a double loop over rows × cols runs rows × cols times.",
      keyIdeas: [
        "Row-major: outer r, inner c.",
        "Column-major: outer c, inner r.",
        "Enhanced for (int[] row : arr) { for (int v : row) ... } reads every cell.",
        "Total iterations = rows × cols for a rectangular grid.",
      ],
      commonMistakes: [
        "Writing arr[r].length but iterating outer on arr[0].length for a non-zero row.",
        "Confusing which index moves faster.",
      ],
      codeInteractives: [
        {
          id: "8.2.a",
          title: "Row vs column sums",
          description:
            "Compute both to drill the traversal orders.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        int[][] grid = {\n            {1, 2, 3},\n            {4, 5, 6},\n            {7, 8, 9}\n        };\n        // Row sums (row-major)\n        for (int r = 0; r < grid.length; r++) {\n            int sum = 0;\n            for (int c = 0; c < grid[r].length; c++) sum += grid[r][c];\n            System.out.println(\"row \" + r + \" sum = \" + sum);\n        }\n        // Column sums (column-major)\n        for (int c = 0; c < grid[0].length; c++) {\n            int sum = 0;\n            for (int r = 0; r < grid.length; r++) sum += grid[r][c];\n            System.out.println(\"col \" + c + \" sum = \" + sum);\n        }\n    }\n}",
          expectedOutput:
            "row 0 sum = 6\nrow 1 sum = 15\nrow 2 sum = 24\ncol 0 sum = 12\ncol 1 sum = 15\ncol 2 sum = 18",
          variations: [
            {
              prompt: "Compute the grid's trace (sum of main-diagonal entries, grid[i][i]).",
              hint: "Only one loop needed; index both dimensions by the same variable.",
            },
            {
              prompt: "Transpose into a new 2D array where new[c][r] = old[r][c].",
              hint: "Allocate new int[cols][rows] and copy in a nested loop.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Row-major loop order?", back: "Outer r, inner c." },
        { front: "Total iterations of double loop?", back: "rows × cols." },
        { front: "Enhanced for 2D pattern?", back: "for (int[] row : arr) for (int v : row) ..." },
      ],
      practiceProblems: [
        {
          id: "8.2.p1",
          difficulty: "medium",
          prompt:
            "How many times does System.out.print execute?\n```java\nint[][] g = new int[3][5];\nfor (int r = 0; r < g.length; r++)\n    for (int c = 0; c < g[r].length; c++)\n        System.out.print(\"*\");\n```",
          answer: "15",
          explanation:
            "Outer runs 3 times; inner runs 5 times per outer iteration. 3 × 5 = 15.",
        },
        {
          id: "8.2.p2",
          difficulty: "hard",
          prompt:
            "Write a method that returns the max value in a 2D int array (assume at least one row and column).",
          answer:
            "public static int max2D(int[][] a) {\n    int m = a[0][0];\n    for (int r = 0; r < a.length; r++)\n        for (int c = 0; c < a[r].length; c++)\n            if (a[r][c] > m) m = a[r][c];\n    return m;\n}",
          explanation:
            "Initialize the running max to the top-left cell, then scan in row-major order updating on anything strictly larger.",
        },
      ],
    },
  ],
});

// =============================================================================
// UNIT 9 — INHERITANCE (5–10% of exam)
// =============================================================================
AP_COMPUTER_SCIENCE_A.units.push({
  number: 9,
  title: "Inheritance",
  examWeight: "5–10% of exam",
  overview:
    "Unit 9 introduces inheritance: a subclass extends a superclass, inheriting fields and methods and optionally overriding or extending them. You learn polymorphism — treating a subclass reference as its superclass type — and the Object class that sits at the top of every hierarchy.",
  topics: [
    {
      id: "9.1",
      title: "Creating Superclasses and Subclasses",
      summary:
        "extends declares a subclass. A subclass inherits all non-private fields and methods of the superclass.",
      explanation:
        "class Subclass extends Superclass creates an is-a relationship — a Subclass object is also a Superclass object. The subclass inherits all public and protected members. private members exist in the superclass but cannot be accessed directly by the subclass — the subclass must use getters and setters.\n\nAn inheritance hierarchy is a tree rooted (in Java) at Object. Every class implicitly `extends Object` if it does not explicitly extend another class. A subclass can add new fields and methods. A well-designed superclass factors out what is common to many related types.\n\nThe compiler verifies that the subclass does not try to reach private superclass members directly. You will see \"has private access\" errors if you misuse inheritance. Always design superclass fields as private with accessors/mutators if subclasses need access.",
      keyIdeas: [
        "class Sub extends Super creates an is-a relationship.",
        "Subclass inherits non-private fields and methods.",
        "Object is the implicit superclass if none specified.",
        "Single inheritance: a class extends at most one superclass.",
      ],
      commonMistakes: [
        "Trying to access a private superclass field directly from a subclass.",
        "Assuming Java supports multiple inheritance.",
      ],
      codeInteractives: [
        {
          id: "9.1.a",
          title: "Subclass inherits methods",
          description:
            "Cat extends Animal and gets speak() + name for free.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        Cat c = new Cat(\"Mittens\");\n        c.speak();\n        System.out.println(c.getName());\n    }\n}\n\nclass Animal {\n    private String name;\n    public Animal(String n) { name = n; }\n    public String getName() { return name; }\n    public void speak() { System.out.println(name + \" makes a sound\"); }\n}\n\nclass Cat extends Animal {\n    public Cat(String n) { super(n); }\n}",
          expectedOutput: "Mittens makes a sound\nMittens",
          variations: [
            {
              prompt: "Add a Dog extends Animal with its own bark() method.",
              hint: "Add public void bark() { System.out.println(getName() + \" barks\"); } — getName works since it's inherited.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "Inheritance keyword?", back: "extends" },
        { front: "Root of every hierarchy?", back: "Object" },
        { front: "Does Java support multiple inheritance?", back: "No (for classes)." },
      ],
      practiceProblems: [
        {
          id: "9.1.p1",
          difficulty: "easy",
          prompt:
            "Which statement is true if Dog extends Animal?",
          choices: [
            "Animal is a Dog.",
            "Dog is an Animal.",
            "Animal inherits Dog's methods.",
            "Dog cannot have its own methods.",
          ],
          answer: "Dog is an Animal.",
          explanation:
            "Inheritance models an is-a relationship. Every Dog is an Animal, but not every Animal is a Dog.",
        },
      ],
    },
    {
      id: "9.2",
      title: "Writing Constructors for Subclasses",
      summary:
        "`super(args)` calls a superclass constructor. If omitted, the compiler inserts `super()` — which must exist.",
      explanation:
        "A subclass constructor starts by building the superclass part of the object. If you do not explicitly call `super(args)`, the compiler inserts a zero-arg `super()` as the first statement. That only works if the superclass has a no-arg constructor. If not — for instance, the superclass requires name in its only constructor — you must write `super(name)`; on the first line of your subclass constructor.\n\n`super(args)` resembles `this(args)`: both must be the first statement of a constructor, and they are mutually exclusive. A constructor can delegate to either the superclass or another constructor of its own class, but not both.\n\nOn FRQ constructor questions, the rubric usually requires you to call super with the correct arguments. Forgetting to do so costs points.",
      keyIdeas: [
        "super(args) calls a specific superclass constructor.",
        "If omitted, compiler inserts super() implicitly.",
        "super(...) must be the first statement.",
        "A constructor can delegate via super(...) XOR this(...), not both.",
      ],
      commonMistakes: [
        "Relying on implicit super() when the superclass has no no-arg constructor.",
        "Placing super(...) below other statements.",
      ],
      codeInteractives: [
        {
          id: "9.2.a",
          title: "super(args) in action",
          description:
            "Subclass must pass the name up.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        Cat c = new Cat(\"Mittens\", 3);\n        System.out.println(c.getName() + \" age \" + c.getAge());\n    }\n}\n\nclass Animal {\n    private String name;\n    public Animal(String n) { name = n; }\n    public String getName() { return name; }\n}\n\nclass Cat extends Animal {\n    private int age;\n    public Cat(String n, int a) {\n        super(n);      // must be first\n        age = a;\n    }\n    public int getAge() { return age; }\n}",
          expectedOutput: "Mittens age 3",
          variations: [
            {
              prompt: "Delete super(n) and watch the compile error.",
              hint: "Animal has no no-arg constructor, so the compiler has nothing to call implicitly.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "How to call a superclass constructor?", back: "super(args); on the first line." },
        { front: "When is super() inserted?", back: "When you don't write super(...) or this(...) as the first line — and it only works if the superclass has a no-arg constructor." },
        { front: "Can super and this both appear?", back: "No — one or the other, not both." },
      ],
      practiceProblems: [
        {
          id: "9.2.p1",
          difficulty: "medium",
          prompt:
            "Which fix makes this compile if Animal has only Animal(String n)?\n```java\nclass Cat extends Animal {\n    public Cat() { }\n}\n```",
          answer: "public Cat() { super(\"unknown\"); }",
          explanation:
            "Without an explicit super call, the compiler tries `super()` which doesn't exist. Call super with a valid String argument.",
        },
      ],
    },
    {
      id: "9.3",
      title: "Overriding Methods",
      summary:
        "A subclass can redefine a superclass method with the same signature. Return type must match or be narrower (covariant).",
      explanation:
        "To override, declare a method in the subclass with the exact same name and parameter list as the superclass method. The return type must be the same or a subtype (covariant return). The overriding method cannot be more private than the superclass method — if the superclass method is public, the override must also be public.\n\nWhen you call the method on a subclass object, Java uses dynamic dispatch: the actual class of the object determines which version runs, not the type of the reference. That is polymorphism in action (Topic 9.6). Marking the method `@Override` is optional but recommended — the compiler will flag a signature mismatch that would otherwise silently become a different method.\n\nCommon overrides: toString (return a String representation), equals (content equality), and class-specific behavior like `speak()` on Animal vs Cat. On AP FRQs, the rubric often tests whether you correctly override with the right signature.",
      keyIdeas: [
        "Override = same name + same parameters.",
        "Return type must be equal or narrower (covariant).",
        "@Override annotation helps catch mistakes.",
        "Dynamic dispatch picks the runtime-type's version.",
      ],
      commonMistakes: [
        "Slightly different parameter list → overloads, not overrides.",
        "Changing visibility to more restrictive (compile error).",
      ],
      codeInteractives: [
        {
          id: "9.3.a",
          title: "Override speak()",
          description:
            "Each subclass says its own thing.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        Animal[] zoo = { new Cat(\"Mittens\"), new Dog(\"Rex\") };\n        for (Animal a : zoo) a.speak();   // dynamic dispatch\n    }\n}\n\nclass Animal {\n    private String name;\n    public Animal(String n) { name = n; }\n    public String getName() { return name; }\n    public void speak() { System.out.println(name + \" makes a sound\"); }\n}\n\nclass Cat extends Animal {\n    public Cat(String n) { super(n); }\n    @Override public void speak() { System.out.println(getName() + \" meows\"); }\n}\n\nclass Dog extends Animal {\n    public Dog(String n) { super(n); }\n    @Override public void speak() { System.out.println(getName() + \" barks\"); }\n}",
          expectedOutput: "Mittens meows\nRex barks",
          variations: [
            {
              prompt: "Add a public String toString() override to Cat that returns a formatted String.",
              hint: "Override toString to return \"Cat(\" + getName() + \")\"; println will pick it up.",
            },
          ],
        },
      ],
      flashcards: [
        { front: "What makes two methods override vs overload?", back: "Override: exact same name and parameters. Overload: same name, different parameters." },
        { front: "Covariant return?", back: "Override may return a subtype of the superclass method's return type." },
        { front: "Purpose of @Override?", back: "Tell the compiler you intend to override; catches signature typos." },
      ],
      practiceProblems: [
        {
          id: "9.3.p1",
          difficulty: "medium",
          prompt:
            "Does this override (superclass: public void foo(int x))?\n```java\npublic void foo(double x) { ... }\n```",
          answer: "No — the parameter type differs, so it's an overload.",
          explanation:
            "Override requires exactly the same parameter types. A different type makes it a separate (overloaded) method.",
        },
      ],
    },
    {
      id: "9.4",
      title: "super Keyword",
      summary:
        "`super.method(...)` calls the superclass version. `super(args)` (first line of constructor) calls a superclass constructor.",
      explanation:
        "Two uses of super. As a constructor call: `super(args)` invokes a superclass constructor; only legal as the first line of a constructor body. As a method prefix: `super.method(args)` calls the superclass's implementation of the method, useful inside an override to reuse the parent's logic.\n\nUse `super.method()` when you override but want to extend rather than replace. For example, in Dog.speak you might call `super.speak()` to reuse the generic Animal behavior and then add the bark. You can also write super.field when you want to reach a superclass field of the same name as a subclass field, though this is rare on AP.\n\nThe common AP pattern: a subclass's toString calls `super.toString()` plus additional info. You don't duplicate the parent's code; you wrap it.",
      keyIdeas: [
        "super(args) — superclass constructor call (first statement).",
        "super.method() — superclass method call.",
        "super.field — access superclass field (if same name).",
        "Useful when extending an override rather than replacing.",
      ],
      commonMistakes: [
        "Putting super(...) anywhere but the first line.",
        "Using super.method() outside an override (legal, but usually pointless).",
      ],
      codeInteractives: [
        {
          id: "9.4.a",
          title: "Override that extends parent behavior",
          description:
            "Subclass reuses the parent's speak and adds its own.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        new VerboseDog(\"Rex\").speak();\n    }\n}\n\nclass Animal {\n    private String name;\n    public Animal(String n) { name = n; }\n    public String getName() { return name; }\n    public void speak() { System.out.println(name + \" makes a sound\"); }\n}\n\nclass VerboseDog extends Animal {\n    public VerboseDog(String n) { super(n); }\n    @Override public void speak() {\n        super.speak();\n        System.out.println(getName() + \" also barks loudly\");\n    }\n}",
          expectedOutput: "Rex makes a sound\nRex also barks loudly",
        },
      ],
      flashcards: [
        { front: "super as a method prefix?", back: "Calls the superclass's version of the method." },
        { front: "super as a constructor?", back: "Invokes a superclass constructor; must be the first statement." },
      ],
      practiceProblems: [
        {
          id: "9.4.p1",
          difficulty: "medium",
          prompt:
            "Write a toString override for class Fancy extends Plain that prepends \"Fancy: \" to Plain's toString.",
          answer:
            "public String toString() { return \"Fancy: \" + super.toString(); }",
          explanation:
            "`super.toString()` calls Plain's implementation; prepending adds context without duplicating logic.",
        },
      ],
    },
    {
      id: "9.5",
      title: "Creating References Using Inheritance Hierarchies",
      summary:
        "A superclass reference can hold a subclass object. You can only call methods declared at or above the reference's static type.",
      explanation:
        "Animal a = new Cat(\"Mittens\"); is legal — a Cat is an Animal. The reference variable a has compile-time (static) type Animal and runtime (dynamic) type Cat. You can call any Animal method through a (including `speak()` which dispatches to Cat's override). You cannot call a Cat-specific method through a without casting.\n\nCasting: Cat c = (Cat) a; downcast from Animal to Cat. Allowed when the object really is a Cat; otherwise a `ClassCastException` at runtime. instanceof checks before casting: if (a instanceof Cat) Cat c = (Cat) a;.\n\nStore mixed subclasses in a single array or ArrayList of the superclass type: Animal[] zoo. Iterate with a polymorphic method call — each object dispatches to its own override. This is the payoff of polymorphism.",
      keyIdeas: [
        "Superclass reference can hold subclass object.",
        "Static type restricts callable methods; dynamic type picks the override.",
        "Downcasting requires explicit cast; may throw ClassCastException.",
        "instanceof checks type safely.",
      ],
      commonMistakes: [
        "Calling a subclass-only method via a superclass reference without casting.",
        "Forgetting instanceof guard before a downcast.",
      ],
      codeInteractives: [
        {
          id: "9.5.a",
          title: "Polymorphic array",
          description:
            "Mixed subclass objects in a single Animal[] array.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        Animal[] zoo = { new Cat(\"Mittens\"), new Dog(\"Rex\"), new Animal(\"Generic\") };\n        for (Animal a : zoo) {\n            a.speak();\n            if (a instanceof Dog) {\n                Dog d = (Dog) a;\n                d.fetch();\n            }\n        }\n    }\n}\n\nclass Animal {\n    private String name;\n    public Animal(String n) { name = n; }\n    public String getName() { return name; }\n    public void speak() { System.out.println(name + \" makes a sound\"); }\n}\nclass Cat extends Animal {\n    public Cat(String n) { super(n); }\n    @Override public void speak() { System.out.println(getName() + \" meows\"); }\n}\nclass Dog extends Animal {\n    public Dog(String n) { super(n); }\n    @Override public void speak() { System.out.println(getName() + \" barks\"); }\n    public void fetch() { System.out.println(getName() + \" fetches the ball\"); }\n}",
          expectedOutput:
            "Mittens meows\nRex barks\nRex fetches the ball\nGeneric makes a sound",
        },
      ],
      flashcards: [
        { front: "Static vs dynamic type?", back: "Static = reference-variable's declared type. Dynamic = actual object's class." },
        { front: "Safe downcast pattern?", back: "Use instanceof before casting." },
        { front: "What does a ClassCastException indicate?", back: "You downcast to the wrong type at runtime." },
      ],
      practiceProblems: [
        {
          id: "9.5.p1",
          difficulty: "medium",
          prompt:
            "Why does this fail at runtime?\n```java\nAnimal a = new Cat(\"M\");\nDog d = (Dog) a;\n```",
          answer: "a refers to a Cat, not a Dog. The downcast is type-checked at runtime and throws ClassCastException.",
          explanation:
            "Casts are checked at runtime. Since the object is a Cat, casting to Dog fails.",
        },
      ],
    },
    {
      id: "9.6",
      title: "Polymorphism",
      summary:
        "One method call can execute different code based on the object's class. The foundation of OOP flexibility.",
      explanation:
        "Polymorphism means \"many forms.\" When you call `a.speak()` on an Animal reference, Java looks at the runtime type of the object and dispatches to the appropriate speak method. If a is a Cat, the Cat.speak override runs. If a is a Dog, Dog.speak runs. This is dynamic (or late) binding.\n\nWhy it matters: you can write one loop that processes a heterogeneous collection and automatically gets the right behavior for each element. The caller doesn't need to know each object's exact class — it just calls the method defined by the common superclass and trusts each subclass to do the right thing.\n\nStatic members (static methods, fields) do not dispatch dynamically — they are resolved at compile time using the declared type. That is a subtle exam trap. The vast majority of AP polymorphism questions are about instance methods, so focus your mental model on them.",
      keyIdeas: [
        "Overridden instance methods dispatch by runtime type.",
        "Fields and static methods are resolved statically.",
        "Polymorphism lets you loop over a superclass collection uniformly.",
        "Write code against the superclass contract.",
      ],
      commonMistakes: [
        "Expecting static methods to dispatch polymorphically (they don't).",
        "Expecting fields to dispatch polymorphically (they don't — subclass fields shadow).",
      ],
      codeInteractives: [
        {
          id: "9.6.a",
          title: "Polymorphic dispatch trace",
          description:
            "Compile-time type vs. runtime dispatch.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        Shape[] shapes = { new Circle(), new Square(), new Shape() };\n        for (Shape s : shapes) System.out.println(s.name());\n    }\n}\n\nclass Shape {\n    public String name() { return \"Shape\"; }\n}\nclass Circle extends Shape {\n    @Override public String name() { return \"Circle\"; }\n}\nclass Square extends Shape {\n    @Override public String name() { return \"Square\"; }\n}",
          expectedOutput: "Circle\nSquare\nShape",
        },
      ],
      flashcards: [
        { front: "Polymorphism definition?", back: "Same call resolves to different overrides based on runtime type." },
        { front: "Are fields polymorphic?", back: "No — fields resolve by declared type." },
        { front: "Are static methods polymorphic?", back: "No — static methods bind at compile time." },
      ],
      practiceProblems: [
        {
          id: "9.6.p1",
          difficulty: "medium",
          prompt:
            "What prints?\n```java\nAnimal a = new Cat(\"M\");\na.speak();\n```\n(Cat overrides speak.)",
          answer: "The Cat version of speak() runs.",
          explanation:
            "Even though the reference is typed Animal, the runtime type is Cat, so dynamic dispatch picks Cat.speak.",
        },
      ],
    },
    {
      id: "9.7",
      title: "Object Superclass",
      summary:
        "Every class implicitly `extends Object`. Methods to know: toString and equals. You frequently override both.",
      explanation:
        "Object is the root of every class hierarchy. The methods you care about on AP CSA are toString (returns a String representation of the object) and equals (tests equality with another object). Object's default toString returns something like ClassName@1a2b3c, which is almost never what you want. The default equals is just == (reference equality).\n\nOverride toString for any class whose objects get printed: `public String` `toString()` { return \"Point(\" + x + \", \" + y + \")\"; }. println and string concatenation call toString automatically, so your override pays off everywhere.\n\nOverride equals to define content equality. The standard pattern: `public boolean` `equals(Object other)` { if (!(other instanceof MyClass)) return `false`; MyClass o = (MyClass) other; return this.`field.equals(o.field)`; }. Don't forget the instanceof/`null` check. The AP exam occasionally asks you to write equals, though it is more common on FRQ.",
      keyIdeas: [
        "All classes inherit from Object.",
        "Object.toString defaults to a class@hash string.",
        "Object.equals defaults to ==.",
        "Override both for any class you print or compare.",
      ],
      commonMistakes: [
        "Forgetting the instanceof check in equals and getting a ClassCastException.",
        "Writing public boolean equals(MyClass other) (that's an overload, not an override).",
      ],
      codeInteractives: [
        {
          id: "9.7.a",
          title: "toString + equals",
          description:
            "A Coord with both overrides.",
          starterCode:
            "public class Main {\n    public static void main(String[] args) {\n        Coord a = new Coord(3, 4);\n        Coord b = new Coord(3, 4);\n        Coord c = new Coord(3, 5);\n        System.out.println(a);           // uses toString\n        System.out.println(a.equals(b)); // true\n        System.out.println(a.equals(c)); // false\n        System.out.println(a == b);      // false (different objects)\n    }\n}\n\nclass Coord {\n    private int x, y;\n    public Coord(int x, int y) { this.x = x; this.y = y; }\n    @Override public String toString() { return \"(\" + x + \", \" + y + \")\"; }\n    @Override public boolean equals(Object other) {\n        if (!(other instanceof Coord)) return false;\n        Coord o = (Coord) other;\n        return x == o.x && y == o.y;\n    }\n}",
          expectedOutput: "(3, 4)\ntrue\nfalse\nfalse",
        },
      ],
      flashcards: [
        { front: "Object's default toString?", back: "Something like ClassName@hex — not human-friendly." },
        { front: "Object's default equals?", back: "Reference equality (==)." },
        { front: "Signature for equals override?", back: "public boolean equals(Object other)" },
      ],
      practiceProblems: [
        {
          id: "9.7.p1",
          difficulty: "hard",
          prompt:
            "Why does public boolean equals(Coord other) NOT override Object.equals?",
          answer:
            "Object.equals takes an Object parameter. A method taking Coord has a different parameter type, making it an overload, not an override.",
          explanation:
            "Override requires the parameter types to match exactly. Taking a Coord instead of Object means collections and Object-typed code call the default Object.equals instead.",
        },
      ],
    },
  ],
});

// =============================================================================
// UNIT 10 — RECURSION (5–7.5% of exam)
// =============================================================================
AP_COMPUTER_SCIENCE_A.units.push({
  number: 10,
  title: "Recursion",
  examWeight: "5–7.5% of exam",
  overview:
    "Unit 10 wraps up the course with recursion: methods that call themselves. You trace recursive calls by building a call stack, write recursive methods with a base case and a reduction step, and compare recursion with iteration. Recursive binary search and merge sort round out the unit.",
  topics: [
    {
      id: "10.1",
      title: "Recursion",
      summary:
        "A recursive method calls itself on a smaller subproblem. Every recursion needs a base case and a progress step.",
      explanation:
        "A recursive method is structured as if (base case) return baseAnswer; else return something involving `method(smallerInput)`;. The base case terminates; the recursive step reduces the input toward the base. Without a base case, the recursion is infinite — you get `StackOverflowError` when the call stack fills up.\n\nClassic examples: factorial (n! = n × (n−1)!, with 0! = 1), Fibonacci, power (xⁿ = x × xⁿ⁻¹, with x⁰ = 1), and sum/search over arrays. Each call creates a new stack frame with its own local variables. When the base case returns, frames unwind and return values propagate up.\n\nTo trace a recursive call, write down the sequence of calls as they're made (descend), then the return values as they come back (ascend). This \"stack of sticky notes\" visualization is exactly what the exam wants you to do on MCQ trace questions.\n\nRecursion is equivalent in power to iteration; any problem solvable recursively is solvable iteratively (and vice versa). Choose based on readability — tree structures and divide-and-conquer are naturally recursive; counters and running totals are naturally iterative.",
      keyIdeas: [
        "Every recursion needs a base case + a smaller-subproblem call.",
        "Missing or wrong base case → StackOverflowError.",
        "Each call has its own frame of local variables.",
        "Trace by descending to base case, then ascending with returns.",
      ],
      commonMistakes: [
        "Forgetting the base case.",
        "Reducing the input in the wrong direction.",
        "Reusing the return value of the recursive call incorrectly (e.g., not multiplying by n).",
      ],
      codeInteractives: [
        {
          id: "10.1.a",
          title: "Factorial",
          description:
            "The canonical recursion. Trace 5! by hand.",
          starterCode:
            "public class Main {\n    public static int factorial(int n) {\n        if (n <= 1) return 1;\n        return n * factorial(n - 1);\n    }\n    public static void main(String[] args) {\n        System.out.println(factorial(5));   // 120\n        System.out.println(factorial(0));   // 1\n    }\n}",
          expectedOutput: "120\n1",
          variations: [
            {
              prompt: "Write power(int base, int exp) recursively.",
              hint: "Base case: exp == 0 return 1. Recursive step: base * power(base, exp - 1).",
            },
            {
              prompt: "Recursive sum of an int[] from index i to end.",
              hint: "Base: i == a.length return 0. Step: a[i] + sumFrom(a, i + 1).",
            },
          ],
        },
        {
          id: "10.1.b",
          title: "Recursive palindrome",
          description:
            "Reduce by trimming one char from each end.",
          starterCode:
            "public class Main {\n    public static boolean isPalin(String s) {\n        if (s.length() < 2) return true;\n        if (s.charAt(0) != s.charAt(s.length() - 1)) return false;\n        return isPalin(s.substring(1, s.length() - 1));\n    }\n    public static void main(String[] args) {\n        System.out.println(isPalin(\"racecar\"));   // true\n        System.out.println(isPalin(\"hello\"));     // false\n        System.out.println(isPalin(\"\"));          // true (empty)\n    }\n}",
          expectedOutput: "true\nfalse\ntrue",
        },
      ],
      flashcards: [
        { front: "Two required pieces of a recursion?", back: "Base case + recursive step that shrinks the input." },
        { front: "Missing base case result?", back: "StackOverflowError." },
        { front: "Factorial base case?", back: "0! = 1 (often written n <= 1 returns 1)." },
      ],
      practiceProblems: [
        {
          id: "10.1.p1",
          difficulty: "medium",
          prompt:
            "What does f(4) return?\n```java\npublic static int f(int n) {\n    if (n <= 0) return 0;\n    return n + f(n - 1);\n}\n```",
          answer: "10",
          explanation:
            "`f(4)` = 4 + `f(3)` = 4 + 3 + `f(2)` = 4+3+2+`f(1)` = 4+3+2+1+`f(0)` = 4+3+2+1+0 = 10.",
        },
        {
          id: "10.1.p2",
          difficulty: "hard",
          prompt:
            "Write recursive countDown(int n) that prints n, n-1, ..., 1 each on its own line. Do nothing if n ≤ 0.",
          answer:
            "public static void countDown(int n) {\n    if (n <= 0) return;\n    System.out.println(n);\n    countDown(n - 1);\n}",
          explanation:
            "Base case returns on non-positive n. Print first, then recurse with n-1 so the calls print in descending order.",
        },
      ],
    },
    {
      id: "10.2",
      title: "Recursive Searching and Sorting",
      summary:
        "Recursive binary search halves the range each call. Merge sort recursively divides and merges.",
      explanation:
        "Recursive binary search mirrors the iterative form: base case is lo > hi (return −1). Otherwise, compute mid, compare with target, and either return mid, recurse on [lo, mid−1], or recurse on [mid+1, hi]. The recursive form reads cleaner than the iterative version for many students.\n\nMerge sort is the headline recursive sort. Base case: an array of length ≤ 1 is already sorted. Recursive step: split in half, sort each half, merge the two sorted halves. Merging runs in O(n); the recursion depth is O(log n); total time is O(n log n) — strictly better than selection / insertion sort's O(n²) on large inputs. You are not asked to implement full merge sort on the multiple choice, but you are expected to recognize its structure and recurrence.\n\nThe AP MCQ often shows a recursive method and asks for the output, the return value, or a trace. Draw the call tree for small inputs to avoid mistakes.",
      keyIdeas: [
        "Recursive binary search halves the interval and recurses.",
        "Merge sort: split, sort each half recursively, merge.",
        "Merge sort runs in O(n log n).",
        "Base case is array of length ≤ 1 (nothing to sort).",
      ],
      commonMistakes: [
        "Swapping mid + 1 and mid − 1 in recursive binary search.",
        "Forgetting to return the result of the recursive call.",
      ],
      codeInteractives: [
        {
          id: "10.2.a",
          title: "Recursive binary search",
          description:
            "Sorted array; returns index or −1.",
          starterCode:
            "public class Main {\n    public static int search(int[] a, int target, int lo, int hi) {\n        if (lo > hi) return -1;\n        int mid = (lo + hi) / 2;\n        if (a[mid] == target) return mid;\n        if (a[mid] < target) return search(a, target, mid + 1, hi);\n        return search(a, target, lo, mid - 1);\n    }\n    public static void main(String[] args) {\n        int[] arr = {1, 3, 5, 7, 9, 11, 13};\n        System.out.println(search(arr, 9, 0, arr.length - 1));   // 4\n        System.out.println(search(arr, 4, 0, arr.length - 1));   // -1\n    }\n}",
          expectedOutput: "4\n-1",
          variations: [
            {
              prompt: "Replace int with String and call compareTo instead of ==/<.",
              hint: "Use a[mid].compareTo(target) < 0 for the \"go right\" case.",
            },
          ],
        },
        {
          id: "10.2.b",
          title: "Merge sort skeleton",
          description:
            "The full merge sort. Trace split and merge for a tiny input to see the pattern.",
          starterCode:
            "public class Main {\n    public static void mergeSort(int[] a, int lo, int hi) {\n        if (lo >= hi) return;\n        int mid = (lo + hi) / 2;\n        mergeSort(a, lo, mid);\n        mergeSort(a, mid + 1, hi);\n        merge(a, lo, mid, hi);\n    }\n    public static void merge(int[] a, int lo, int mid, int hi) {\n        int[] buf = new int[hi - lo + 1];\n        int i = lo, j = mid + 1, k = 0;\n        while (i <= mid && j <= hi) {\n            if (a[i] <= a[j]) buf[k++] = a[i++];\n            else              buf[k++] = a[j++];\n        }\n        while (i <= mid) buf[k++] = a[i++];\n        while (j <= hi)  buf[k++] = a[j++];\n        for (int t = 0; t < buf.length; t++) a[lo + t] = buf[t];\n    }\n    public static void main(String[] args) {\n        int[] arr = {5, 2, 9, 1, 7, 3};\n        mergeSort(arr, 0, arr.length - 1);\n        for (int v : arr) System.out.print(v + \" \");\n    }\n}",
          expectedOutput: "1 2 3 5 7 9 ",
        },
      ],
      flashcards: [
        { front: "Recursive binary search base case?", back: "lo > hi → return −1." },
        { front: "Merge sort complexity?", back: "O(n log n)." },
        { front: "Merge sort base case?", back: "Range of 0 or 1 element is sorted." },
      ],
      practiceProblems: [
        {
          id: "10.2.p1",
          difficulty: "medium",
          prompt:
            "In recursive binary search, if a[mid] < target, which subrange do you search next?",
          answer: "[mid + 1, hi]",
          explanation:
            "A smaller midpoint means the target, if present, lies in the right half. mid itself has been checked, so start at mid + 1.",
        },
        {
          id: "10.2.p2",
          difficulty: "hard",
          prompt:
            "Why is merge sort faster than selection sort on large inputs?",
          answer:
            "Merge sort is O(n log n); selection sort is O(n²). For large n, n log n grows much slower than n².",
          explanation:
            "Asymptotic complexity dominates at scale. Doubling n in selection sort quadruples the time; in merge sort, it just over doubles (2n × `log(2n)` ≈ 2·n log n + 2n).",
        },
      ],
    },
  ],
});

// =============================================================================
// Default export — consumed by the Finals Prep study surface.
// =============================================================================
export default AP_COMPUTER_SCIENCE_A;
