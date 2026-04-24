// Auto-split from lib/blogPosts.ts by tools/split_blogposts.ts.
// One file per post so diffs are small and git blame is readable.
//
// Do not edit the shape of this file manually; the loader in
// lib/blogPosts.ts expects a single named default export per slug.

import type { BlogPost } from "../../blogPosts";

export const POST_AP_COMPUTER_SCIENCE_A_REVIEW_GUIDE: BlogPost = {
    slug: "ap-computer-science-a-review-guide",
    title: "AP Computer Science A Review Guide: All 10 Units with Java Tips",
    metaTitle: "AP Computer Science A Review Guide: All 10 Units (2026)",
    description:
      "A complete AP Computer Science A review guide covering all 10 units of Java, common FRQ patterns, 2D arrays, recursion, inheritance, and the Java syntax gotchas the exam tests every year.",
    excerpt:
      "AP CS A is Java plus object-oriented thinking plus algorithms. This unit-by-unit guide covers every topic on the CED, with the exact FRQ patterns the exam uses and the Java syntax traps that cost points.",
    date: "2026-04-18",
    readTime: "18 min read",
    category: "AP Computer Science A",
    keywords: [
      "study guide",
      "exam prep",
      "frq strategy",
      "STEM",
      "computer science",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Computer Science A is the most practical AP exam in the lineup: you learn Java, and the exam tests whether you can read Java and write Java. Every FRQ is a class, a method, or a loop. The patterns are predictable. The syntax is what trips people up.",
      },
      {
        type: "p",
        text: "This guide walks through every unit, the four FRQ patterns that repeat every year, and the Java syntax gotchas that cost the most points. If you can read, write, and trace Java code, you will score well.",
      },
      { type: "h2", text: "What the exam looks like" },
      {
        type: "h3", text: "Exam structure and scoring" },
      {
        type: "ul",
        items: [
          "3 hours total.",
          "Section I: 40 multiple choice in 90 minutes. Worth 50 percent of score.",
          "Section II: 4 free response in 90 minutes. Worth 50 percent of score.",
          "FRQ #1: methods and control structures (often a class with a method to implement).",
          "FRQ #2: a class design (write a class from specification).",
          "FRQ #3: array or ArrayList manipulation.",
          "FRQ #4: 2D array traversal.",
          "A Java Quick Reference is provided (subset of String, Math, ArrayList, etc.). You do not need to memorize method signatures.",
        ],
      },
      { type: "h2", text: "Unit 1: Primitive Types" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "ul",
        items: [
          "Primitives: int, double, boolean (there are others but these three are tested most).",
          "Arithmetic: +, -, *, /, %. Precedence follows math rules (PEMDAS).",
          "Integer division truncates: 5 / 2 equals 2, not 2.5. To get a decimal, cast at least one operand: (double) 5 / 2 equals 2.5.",
          "Modulo (%) gives the remainder: 7 % 3 equals 1. Useful for checking even/odd (n % 2 == 0).",
          "Casting: (int) 3.7 equals 3 (truncates). (double) 5 equals 5.0.",
          "Variable assignment: int x = 5. Reassignment: x = x + 1 (or x++).",
        ],
      },
      { type: "h2", text: "Unit 2: Using Objects" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "ul",
        items: [
          "Strings are objects. String s = \"hello\". Create with double quotes or new String().",
          "String methods you must know: .length() (returns int), .substring(int), .substring(int, int), .indexOf(String), .equals(String), .compareTo(String).",
          "Strings are IMMUTABLE. s.substring(1) returns a NEW string; it does not modify s.",
          "String concatenation uses +. \"hello\" + \" world\" equals \"hello world\".",
          "Math class (static methods): Math.sqrt(x), Math.pow(base, exp), Math.abs(x), Math.random() (returns double in [0, 1)), Math.min, Math.max.",
          "Wrapper classes: Integer (wraps int), Double (wraps double). Used when you need to put primitives in an ArrayList.",
          "Autoboxing: int automatically converts to Integer when needed. Unboxing: Integer to int.",
        ],
      },
      { type: "h2", text: "Unit 3: Boolean Expressions and if Statements" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "ul",
        items: [
          "Comparison operators: <, >, <=, >=, ==, !=. Return boolean.",
          "Logical operators: && (AND), || (OR), ! (NOT).",
          "Short-circuit evaluation: && stops at first false, || stops at first true. Use this for safe checks: if (i < arr.length && arr[i] > 0) — the second condition only runs if the first is true, preventing ArrayIndexOutOfBounds.",
          "De Morgan's laws: !(a && b) equals !a || !b. !(a || b) equals !a && !b.",
          "if-else-if structure: only first matching branch runs.",
          "Compound conditions: if (x > 0 && y > 0) — both must be true.",
        ],
      },
      { type: "h2", text: "Unit 4: Iteration" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "ul",
        items: [
          "while loop: runs as long as condition is true. Easy to create infinite loops if condition never becomes false.",
          "for loop: initialization, condition, update. for (int i = 0; i < n; i++).",
          "Nested loops: loop inside a loop. O(n squared) time complexity for common cases.",
          "Breaking out of loops: return statement, or setting condition to false.",
          "Off-by-one errors: should the loop run n times or n-1 times? Tracing through on paper catches these.",
          "Loop invariants: what is true at the start of every iteration? This helps debug loops.",
        ],
      },
      { type: "h2", text: "Unit 5: Writing Classes" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "ul",
        items: [
          "Class: blueprint for objects. public class Car { ... }.",
          "Instance variables (fields): variables held by each object. private int speed;.",
          "Constructor: initializes a new object. Has same name as class, no return type.",
          "Methods: functions inside a class. Can access instance variables.",
          "this keyword: refers to the current object. Useful for disambiguation: this.speed = speed.",
          "Visibility: public (accessible anywhere), private (only inside the class). Encapsulate: make fields private, expose with getters/setters.",
          "Static keyword: belongs to the class, not an instance. static int count; shared by all instances. Access with ClassName.count, not instance.count.",
        ],
      },
      {
        type: "code",
        language: "java",
        text: "public class Book {\\n    private String title;\\n    private int pages;\\n\\n    public Book(String t, int p) {\\n        title = t;\\n        pages = p;\\n    }\\n\\n    public String getTitle() { return title; }\\n    public int getPages() { return pages; }\\n    public void setPages(int p) { pages = p; }\\n}",
      },
      { type: "h2", text: "Unit 6: Array" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "ul",
        items: [
          "Array: fixed-size, ordered collection of same-type items.",
          "Declaration: int[] arr = new int[10]. Or int[] arr = {1, 2, 3}.",
          "Access: arr[i]. Indices start at 0 and go to arr.length - 1.",
          "Length: arr.length (PROPERTY, no parens). This is different from String.length() (method).",
          "Traversal with for loop: for (int i = 0; i < arr.length; i++) { ... arr[i] ... }.",
          "Enhanced for loop (for-each): for (int n : arr) { ... n ... }. Good for reading, but you cannot modify arr elements through n.",
          "Common operations: find max, find min, count matching, sum, reverse, shift.",
        ],
      },
      { type: "h2", text: "Unit 7: ArrayList" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "ul",
        items: [
          "ArrayList: dynamic (resizable) array of objects. ArrayList<Integer> list = new ArrayList<Integer>().",
          "Autoboxing: list.add(5) auto-converts 5 (int) to Integer.",
          "Methods: .add(E), .add(int, E), .get(int), .set(int, E), .remove(int), .remove(E), .size().",
          "Size is a METHOD: list.size() (with parens). Different from array.length (property). String.length() is a method. Array .length is property. ArrayList .size() is method. This inconsistency is tested every year.",
          "Iteration: standard for with .size() and .get(i), or enhanced for.",
          "Removing while iterating: iterate BACKWARDS (from size()-1 to 0) to avoid skipping elements when indices shift.",
        ],
      },
      {
        type: "callout",
        variant: "warn",
        text: "Array length is a PROPERTY (arr.length, no parens). ArrayList size is a METHOD (list.size(), with parens). String length is a METHOD (s.length(), with parens). That inconsistency is tested every year. Memorize it.",
      },
      { type: "h2", text: "Unit 8: 2D Array" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "ul",
        items: [
          "2D array: array of arrays. int[][] grid = new int[rows][cols].",
          "Access: grid[row][col]. First index is row, second is column.",
          "Dimensions: grid.length is number of rows. grid[0].length is number of columns (assuming all rows same length).",
          "Row-major traversal: outer loop rows, inner loop columns. Most common.",
          "Column-major traversal: outer loop columns, inner loop rows. Less common, used for column-specific operations.",
          "Common operations: find max in each row/column, count occurrences, check if matrix is symmetric, sum of diagonal.",
        ],
      },
      {
        type: "code",
        language: "java",
        text: "public static int sumAll(int[][] grid) {\\n    int sum = 0;\\n    for (int r = 0; r < grid.length; r++) {\\n        for (int c = 0; c < grid[r].length; c++) {\\n            sum += grid[r][c];\\n        }\\n    }\\n    return sum;\\n}",
      },
      { type: "h2", text: "Unit 9: Inheritance" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "ul",
        items: [
          "Inheritance: a class extends another class, inheriting its public methods and fields. public class Dog extends Animal { ... }.",
          "Subclass (child) extends superclass (parent). Subclass inherits non-private methods.",
          "super keyword: access superclass constructor or method. super(args) calls parent constructor. super.method() calls parent's version.",
          "Method overriding: subclass redefines a method with same signature. @Override annotation helps catch typos.",
          "Polymorphism: declare variable as superclass type, assign subclass object. At runtime, the correct (overridden) method runs. Animal a = new Dog(); a.makeSound(); runs Dog's version.",
          "Object class: root of all Java classes. Every class inherits toString(), equals(), hashCode() from Object.",
          "Abstract classes: cannot be instantiated. Abstract methods must be overridden by subclasses.",
        ],
      },
      { type: "h2", text: "Unit 10: Recursion" },
      {
        type: "h3", text: "What you need to know" },
      {
        type: "ul",
        items: [
          "Recursion: a method that calls itself.",
          "Two parts: base case (stops recursion, no recursive call) and recursive case (calls itself with a smaller or simpler input).",
          "Without a base case: infinite recursion, StackOverflowError.",
          "Common recursive problems: factorial, Fibonacci, sum of array, binary search, tree traversal.",
          "Tracing recursion: draw the call stack. Each call is a frame, parent waits for child to return.",
          "Recursion is often equivalent to iteration but more elegant for naturally recursive problems (trees, divide-and-conquer).",
        ],
      },
      {
        type: "code",
        language: "java",
        text: "public static int factorial(int n) {\\n    if (n <= 1) return 1;      // base case\\n    return n * factorial(n - 1); // recursive case\\n}\\n\\npublic static int fibonacci(int n) {\\n    if (n <= 1) return n;\\n    return fibonacci(n - 1) + fibonacci(n - 2);\\n}",
      },
      { type: "h2", text: "The four FRQ patterns that repeat" },
      {
        type: "ol",
        items: [
          "Methods and control structures: write a method that loops and performs logic. Often involves an ArrayList or array parameter. Practice filter, transform, count methods.",
          "Class design: given a specification, write a class with fields, constructor, and methods. The spec describes what the class should DO; you translate to code.",
          "Array / ArrayList: manipulate a collection. Filter, sum, search, sort, reverse. Know both array and ArrayList syntax cold.",
          "2D array: traverse a grid. Find max in each row, sum all elements, count occurrences. Nested for loops. Know row vs column indexing.",
        ],
      },
      { type: "h2", text: "Java syntax gotchas" },
      {
        type: "ul",
        items: [
          "String comparison: use .equals(), NOT ==. == compares references; .equals compares content.",
          ".length vs .length() vs .size(): array is property (no parens), String is method (with parens), ArrayList is method (with parens).",
          "Integer division truncates: 5 / 2 = 2. Cast to double for decimal: (double) 5 / 2 = 2.5.",
          "ArrayList holds OBJECTS only. ArrayList<Integer>, not ArrayList<int>. Autoboxing handles conversion.",
          "When removing from ArrayList while iterating, iterate BACKWARDS to avoid skipping elements.",
          "Off-by-one: does the loop include arr.length or stop at arr.length - 1? Hint: use < arr.length, not <=.",
          "2D array: grid.length is rows, grid[0].length is columns. Don't confuse.",
          "Overriding requires identical signature: same name, same parameters, same return type.",
          "Don't forget to return. If a method has a return type (not void), every path must return.",
        ],
      },
      { type: "h2", text: "How to score a 5 on AP CSA" },
      {
        type: "ol",
        items: [
          "Practice tracing code by hand. The MCQ asks what a method returns. If you cannot trace it on paper, the method is confusing in your head too.",
          "Master the four FRQ patterns. Do at least 4-6 timed FRQs from past exams. The patterns repeat every year.",
          "Learn the Java Quick Reference. It tells you what methods are available. If you forget a method signature, check it.",
          "Know the syntax gotchas (especially .length vs .length() vs .size()). These are GUARANTEED to appear.",
          "Code is graded on correctness AND style. Use clear variable names (total, sum, count, not x, y, z). Indent consistently.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Using == instead of .equals() for String comparison. 'abc' == 'abc' is sometimes true in Java for literal strings, but you should ALWAYS use .equals() for strings.",
          "Off-by-one errors in loops. Test your code mentally with edge cases (empty array, array of 1, boundary values).",
          "Modifying an ArrayList while iterating forward: elements shift, you skip items. Iterate backward or use Iterator.remove().",
          "Forgetting to return from a non-void method. Every code path must return a value.",
          "Using int when you need double (or vice versa). Division and assignment rules differ.",
          "Forgetting @Override (not required, but catches typos). Without it, a typo creates a new method rather than overriding.",
          "Using instance variable name when constructor parameter shadows it. Use this.variable = variable to disambiguate.",
          "Confusing public and private. Private can only be accessed within the class. Public is accessible anywhere.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "FinalsPrep can step through any Java method you paste in and show what each variable holds at each line. Catches off-by-one and missing returns before the exam does. Free tier covers the course.",
      },
      {
        type: "p",
        text: "AP CSA rewards clean, readable code. Write like someone has to grade it in 30 seconds, because someone does.",
      },
    ],
  };
