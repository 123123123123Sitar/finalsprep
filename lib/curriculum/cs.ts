import type { CourseCurriculum } from "./types";

export const CS_CURRICULUM: Record<string, CourseCurriculum> = {
  // =========================================================================
  // AP COMPUTER SCIENCE A
  // =========================================================================
  "ap-cs-a": {
    courseSlug: "ap-cs-a",
    examFormat: {
      length: "3 hours",
      structure: "40 MCQ (90 min) + 4 FRQ (90 min). No calculator needed.",
      scoring: "MCQ 50%, FRQ 50%. Java is the only language.",
    },
    framing:
      "AP CSA teaches Java and object-oriented programming. Unlike most AP courses, the content is syntactic — you must know Java's specific rules, not general programming concepts. FRQs are graded on correctness, not style, but clean code reads faster for you too. Strong students write Java in their sleep by April.",
    units: [
      {
        unitNumber: 1,
        title: "Primitive Types",
        overview:
          "Java's built-in value types (int, double, boolean) and basic expressions.",
        examWeight: "2.5-5%",
        bigIdeas: [
          "Primitive types: int, double, boolean. Integer division truncates.",
          "Variables must be declared with a type.",
          "Operator precedence matters: *, /, % before +, -.",
          "Casting: (int)3.7 = 3. (double)5/2 = 2.5.",
          "Assignment operators: +=, -=, *=, /=, %=.",
        ],
        essentials: [
          {
            heading: "Declaring variables",
            body: "int x = 5; double y = 3.14; boolean flag = true; Type names are lowercase for primitives. Variables must be initialized before use.",
          },
          {
            heading: "Integer vs double division",
            body: "int/int = int (truncates). int/double or double/int = double. 5/2 = 2, but 5.0/2 = 2.5. Cast to double to force floating-point: (double)5/2 = 2.5.",
          },
          {
            heading: "Modulus operator",
            body: "% returns the remainder. 10 % 3 = 1. 7 % 2 = 1 (odd). Useful for checking divisibility: if (x % 2 == 0) is x even.",
          },
          {
            heading: "Casting",
            body: "(int) casts a double to int by truncating (not rounding). (double) casts int to double. Casting is a prefix: (int)3.7, not 3.7(int).",
          },
        ],
        keyFacts: [
          "int range: about ±2 billion.",
          "double has ~15 decimal digits of precision.",
          "boolean has only two values: true and false.",
        ],
        commonMistakes: [
          "Forgetting int/int truncates.",
          "Mixing up = (assignment) and == (comparison).",
          "Using == with objects (use .equals() instead).",
        ],
        examStrategy:
          "Practice tracing variable values through a sequence of assignments. The MCQ will ask 'what is x after line 5?'",
        studyTips: [
          "Write 10 expressions by hand and evaluate them.",
          "Practice integer division and modulus problems.",
          "Drill operator precedence.",
        ],
      },
      {
        unitNumber: 2,
        title: "Using Objects",
        overview:
          "Creating and using objects in Java. Calling methods. Using String and wrapper classes.",
        examWeight: "5-7.5%",
        bigIdeas: [
          "Objects are instances of classes.",
          "new ClassName(...) creates an object.",
          "Methods are called with a dot: obj.method().",
          "String is immutable — methods return new strings.",
          "Wrapper classes (Integer, Double) wrap primitives.",
        ],
        essentials: [
          {
            heading: "Creating objects",
            body: "String s = new String(\"hello\"); or the shorthand String s = \"hello\"; Rectangle r = new Rectangle(3, 4);",
          },
          {
            heading: "Calling methods",
            body: "Void methods: obj.doSomething(). Non-void: int len = s.length(). Methods with parameters: s.substring(0, 3).",
          },
          {
            heading: "String methods",
            body: "length(), charAt(i), substring(a, b), indexOf(str), equals(str), compareTo(str), toUpperCase(), toLowerCase().",
          },
          {
            heading: "Strings are immutable",
            body: "String methods return new strings. s.toUpperCase() doesn't change s — you must do s = s.toUpperCase().",
          },
          {
            heading: "Wrapper classes",
            body: "Integer wraps int, Double wraps double. Auto-boxing: Integer i = 5. Unboxing: int x = i. Methods: Integer.parseInt(\"5\") = 5.",
          },
          {
            heading: "Math class",
            body: "Math.sqrt(x), Math.pow(base, exp), Math.abs(x), Math.random() (double in [0,1)), Math.PI.",
          },
        ],
        keyFacts: [
          "String comparison: use .equals(), not ==.",
          "String indexing starts at 0.",
          "Math.random() returns double in [0, 1), not int.",
        ],
        commonMistakes: [
          "Using == to compare strings.",
          "Trying to mutate a String in place.",
          "Off-by-one errors in substring.",
        ],
        examStrategy:
          "Memorize common String methods and their return types. Trace method calls carefully.",
        studyTips: [
          "Drill String methods on 10 examples.",
          "Practice object creation syntax.",
          "Memorize Math class methods.",
        ],
      },
      {
        unitNumber: 3,
        title: "Boolean Expressions & if Statements",
        overview:
          "Conditional logic: comparisons, boolean operators, if/else statements.",
        examWeight: "15-17.5%",
        bigIdeas: [
          "Boolean operators: &&, ||, !.",
          "Comparison: <, <=, >, >=, ==, !=.",
          "Short-circuit evaluation: && stops on false, || stops on true.",
          "De Morgan's laws: !(A && B) = !A || !B.",
          "Nested conditionals: if inside if.",
        ],
        essentials: [
          {
            heading: "if-else syntax",
            body: "if (condition) { ... } else if (condition) { ... } else { ... } Braces are technically optional for single statements but always use them for clarity.",
          },
          {
            heading: "Boolean operators",
            body: "&& is AND, || is OR, ! is NOT. Higher precedence: !, then &&, then ||. Use parentheses to be explicit.",
          },
          {
            heading: "Short-circuit evaluation",
            body: "if (x != 0 && y/x > 1) — the second condition is skipped if x is 0, avoiding division by zero. This is a common pattern.",
          },
          {
            heading: "Comparing objects",
            body: "Use .equals() for strings and other objects. == compares references, not contents.",
          },
        ],
        keyFacts: [
          "short-circuit: && and || don't evaluate the right side if the left settles the result.",
          "Use .equals() for object comparison.",
          "Nested if vs else-if vs separate ifs.",
        ],
        commonMistakes: [
          "Missing else-if chains (write separate ifs instead).",
          "Forgetting short-circuit when ordering conditions.",
          "Assigning with = in an if condition (syntax error in Java).",
        ],
        examStrategy:
          "Trace through nested conditionals carefully. Draw a decision tree.",
        studyTips: [
          "Write 10 conditional logic problems and trace outputs.",
          "Practice De Morgan's laws.",
          "Drill short-circuit evaluation.",
        ],
      },
      {
        unitNumber: 4,
        title: "Iteration",
        overview:
          "Loops in Java: while, for, and nested iteration.",
        examWeight: "17.5-22.5%",
        bigIdeas: [
          "while loop: repeats as long as condition is true.",
          "for loop: compact initialization, condition, update.",
          "Nested loops: loop inside a loop.",
          "Loop traces: track variable values at each iteration.",
          "Off-by-one errors are the #1 source of bugs.",
        ],
        essentials: [
          {
            heading: "While loop",
            body: "while (condition) { ... } Executes body while condition is true. Infinite loop if condition never becomes false.",
          },
          {
            heading: "For loop",
            body: "for (int i = 0; i < 10; i++) { ... } Initialization runs once, condition checked before each iteration, update runs after.",
          },
          {
            heading: "Nested loops",
            body: "for (int i = 0; i < 5; i++) { for (int j = 0; j < 5; j++) { ... } } Inner loop runs fully for each iteration of outer loop.",
          },
          {
            heading: "Loop termination",
            body: "Ensure the condition will eventually become false. Watch for off-by-one errors: i < 10 runs 10 times (0..9), i <= 10 runs 11 times (0..10).",
          },
          {
            heading: "String iteration",
            body: "for (int i = 0; i < s.length(); i++) { char c = s.charAt(i); ... } iterates through each character.",
          },
        ],
        keyFacts: [
          "i++ is equivalent to i = i + 1.",
          "A for loop with condition i < n runs n times.",
          "break exits the loop; continue skips to the next iteration.",
        ],
        commonMistakes: [
          "Off-by-one errors.",
          "Using < when <= is needed (or vice versa).",
          "Modifying loop variable inside the body unexpectedly.",
        ],
        examStrategy:
          "On loop tracing MCQs, draw a table of variable values at each iteration. Don't try to predict.",
        studyTips: [
          "Trace 10 loops with nested structure.",
          "Practice string iteration.",
          "Drill off-by-one edge cases.",
        ],
      },
      {
        unitNumber: 5,
        title: "Writing Classes",
        overview:
          "Defining classes in Java: fields, constructors, methods, encapsulation.",
        examWeight: "5-7.5%",
        bigIdeas: [
          "Class defines a blueprint for objects.",
          "Fields (instance variables) store object state.",
          "Constructor initializes a new object.",
          "Methods operate on the object.",
          "private fields + public methods = encapsulation.",
        ],
        essentials: [
          {
            heading: "Class structure",
            body: "public class Dog { private String name; private int age; public Dog(String n, int a) { name = n; age = a; } public String getName() { return name; } public void setAge(int a) { age = a; } }",
          },
          {
            heading: "Constructors",
            body: "Same name as class, no return type. Called by new Dog('Rex', 3). Multiple constructors (overloading) allowed with different parameter lists.",
          },
          {
            heading: "Accessor and mutator methods",
            body: "Accessor (getter): returns a field value. getX() { return x; }. Mutator (setter): modifies a field. setX(int v) { x = v; }.",
          },
          {
            heading: "Scope and access",
            body: "private: accessible only in the class. public: accessible anywhere. Fields should be private, methods public.",
          },
          {
            heading: "this keyword",
            body: "Refers to the current object. Use when parameter name shadows a field: this.name = name;",
          },
          {
            heading: "Static variables and methods",
            body: "Belong to the class, not an instance. Accessed via ClassName.variable or ClassName.method(). Math.PI is an example.",
          },
        ],
        keyFacts: [
          "Constructors have no return type, not even void.",
          "Instance variables are initialized to default values (0, null, false) if not set in constructor.",
          "static methods can't access instance variables.",
        ],
        commonMistakes: [
          "Adding a return type to the constructor.",
          "Calling static methods on an instance.",
          "Forgetting this. when parameter shadows field.",
        ],
        examStrategy:
          "FRQ 1 (Class Design) is usually a full class. Practice writing fields, constructor, accessor, mutator, and a method that uses the fields.",
        studyTips: [
          "Write 5 classes from scratch.",
          "Practice constructor + accessor + mutator patterns.",
          "Memorize the private/public convention.",
        ],
      },
      {
        unitNumber: 6,
        title: "Array",
        overview:
          "Java arrays: creation, access, traversal, common algorithms.",
        examWeight: "10-15%",
        bigIdeas: [
          "Array is a fixed-size sequence of elements of the same type.",
          "int[] arr = new int[5]; or int[] arr = {1,2,3,4,5};",
          "arr[i] accesses index i. Indices are 0 to arr.length - 1.",
          "Traversal: for loop or enhanced for loop.",
          "Common algorithms: max, min, sum, search.",
        ],
        essentials: [
          {
            heading: "Array creation",
            body: "int[] arr = new int[10]; (creates array of 10 ints, all 0). int[] arr = {1, 2, 3, 4}; (creates array with initial values).",
          },
          {
            heading: "Array access",
            body: "arr[0] is first element. arr[arr.length - 1] is last. arr[i] where i is out of range throws ArrayIndexOutOfBoundsException.",
          },
          {
            heading: "Traversal",
            body: "Traditional: for (int i = 0; i < arr.length; i++) { ... arr[i] ... }. Enhanced: for (int x : arr) { ... x ... }. Enhanced is read-only — you can't modify via x.",
          },
          {
            heading: "Common algorithms",
            body: "Max: loop through, track largest. Sum: initialize sum to 0, add each element. Search: loop, return true if found.",
          },
        ],
        keyFacts: [
          "Array length is a field (arr.length), not a method (not arr.length()).",
          "Arrays are objects — reference semantics.",
          "Enhanced for loop is syntactic sugar but can't modify elements.",
        ],
        commonMistakes: [
          "Using parentheses on .length.",
          "Off-by-one with array indices.",
          "Trying to modify in enhanced for loop.",
        ],
        examStrategy:
          "FRQ 2 (Array/ArrayList) always tests array algorithms. Practice max, min, sum, count, search, reverse.",
        studyTips: [
          "Write each common algorithm from scratch.",
          "Drill array traversal with both loop styles.",
          "Practice boundary cases (empty array, single element).",
        ],
      },
      {
        unitNumber: 7,
        title: "ArrayList",
        overview:
          "Dynamic arrays: ArrayList<T>. Methods for adding, removing, traversing.",
        examWeight: "2.5-7.5%",
        bigIdeas: [
          "ArrayList is resizable, unlike arrays.",
          "Generic type: ArrayList<String> arr = new ArrayList<>();",
          "Methods: add(), get(), set(), size(), remove(), indexOf(), contains().",
          "Use .size() for length (not .length).",
          "Common operations: searching, sorting.",
        ],
        essentials: [
          {
            heading: "ArrayList basics",
            body: "ArrayList<Integer> list = new ArrayList<>(); list.add(5); list.add(10); int x = list.get(0);",
          },
          {
            heading: "Methods",
            body: "add(elem): append. add(i, elem): insert at index i. get(i): retrieve. set(i, elem): replace at i. remove(i) or remove(elem): remove. size(): number of elements. indexOf(elem): find first. contains(elem): check presence.",
          },
          {
            heading: "Traversal",
            body: "for (int i = 0; i < list.size(); i++) { list.get(i)... } or for (Integer x : list) { ... }.",
          },
          {
            heading: "Removing during iteration",
            body: "Be careful: removing an element shifts indices. Iterate backwards, or use an iterator, or collect indices first then remove.",
          },
        ],
        keyFacts: [
          "ArrayList<int> doesn't work — must use ArrayList<Integer> (wrapper).",
          ".size() not .length or .size.",
          "add() returns boolean for simple add, void for insert-at.",
        ],
        commonMistakes: [
          "Using .length on an ArrayList.",
          "Forgetting to import java.util.ArrayList.",
          "Removing during forward iteration.",
        ],
        examStrategy:
          "ArrayList FRQs often mix with algorithms. Know the methods cold.",
        studyTips: [
          "Drill ArrayList method signatures.",
          "Practice adding, removing, and traversing.",
          "Write common algorithms on ArrayLists.",
        ],
      },
      {
        unitNumber: 8,
        title: "2D Array",
        overview:
          "2-dimensional arrays (arrays of arrays). Row-major traversal.",
        examWeight: "7.5-10%",
        bigIdeas: [
          "int[][] grid = new int[rows][cols];",
          "grid[r][c] accesses row r, column c.",
          "Rows: grid.length. Columns: grid[0].length.",
          "Row-major traversal: outer loop rows, inner loop cols.",
          "Column-major: swap loops.",
        ],
        essentials: [
          {
            heading: "Creating 2D arrays",
            body: "int[][] grid = new int[3][4]; creates 3 rows, 4 columns. Can also use array initializer: int[][] grid = {{1,2,3},{4,5,6}};",
          },
          {
            heading: "Row-major traversal",
            body: "for (int r = 0; r < grid.length; r++) { for (int c = 0; c < grid[0].length; c++) { grid[r][c] ... } } This visits rows in order, columns in order.",
          },
          {
            heading: "Column-major traversal",
            body: "Swap the loops — outer loops over columns, inner over rows. Used for column-wise operations.",
          },
          {
            heading: "Enhanced for loop",
            body: "for (int[] row : grid) { for (int x : row) { ... } } Also possible but can't modify elements.",
          },
        ],
        keyFacts: [
          "2D arrays are arrays of arrays.",
          "grid[0].length works only if all rows have the same length.",
          "Rectangular: all rows same length. Jagged: variable lengths.",
        ],
        commonMistakes: [
          "Mixing up rows and columns.",
          "Using grid.length for column count.",
          "Off-by-one in nested loops.",
        ],
        examStrategy:
          "FRQ 3 often involves 2D arrays. Practice both row-major and column-major traversal.",
        studyTips: [
          "Write 5 algorithms on 2D arrays (find max, row sum, transpose).",
          "Drill row vs column counting.",
          "Practice nested loops.",
        ],
      },
      {
        unitNumber: 9,
        title: "Inheritance",
        overview:
          "Inheritance in Java: superclass, subclass, method overriding, polymorphism.",
        examWeight: "5-10%",
        bigIdeas: [
          "Subclass inherits from superclass with extends.",
          "Subclass can add fields/methods and override inherited methods.",
          "Polymorphism: a superclass variable can hold a subclass object.",
          "super keyword accesses the superclass.",
          "All classes ultimately inherit from Object.",
        ],
        essentials: [
          {
            heading: "Defining subclasses",
            body: "public class Dog extends Animal { ... } Dog inherits all of Animal's public and protected members.",
          },
          {
            heading: "Overriding methods",
            body: "Same method signature in subclass replaces superclass version. Use @Override annotation (optional but good practice). Can call super.method() to invoke superclass version.",
          },
          {
            heading: "Constructors with inheritance",
            body: "First line of a subclass constructor must call super(...). If omitted, Java calls super() by default. If superclass has no no-arg constructor, you must call super explicitly.",
          },
          {
            heading: "Polymorphism",
            body: "Animal a = new Dog(); a.makeSound() calls Dog's version if overridden. The object is a Dog, but the variable type is Animal, so only Animal methods can be called (plus any overridden versions).",
          },
          {
            heading: "Object class",
            body: "All classes extend Object (directly or indirectly). Methods from Object: toString(), equals(), hashCode(). Override as needed.",
          },
        ],
        keyFacts: [
          "extends creates an IS-A relationship.",
          "Private members are not inherited directly but can be accessed via accessor methods.",
          "Constructors are not inherited.",
        ],
        commonMistakes: [
          "Forgetting to call super() in the constructor.",
          "Trying to access private fields of superclass directly.",
          "Misunderstanding polymorphic method dispatch.",
        ],
        examStrategy:
          "FRQ 4 (inheritance) tests overriding and polymorphism. Write the superclass and subclass carefully.",
        studyTips: [
          "Write a 3-level class hierarchy (Animal → Dog → Puppy).",
          "Drill method overriding with super calls.",
          "Practice polymorphism with ArrayList<Animal>.",
        ],
      },
      {
        unitNumber: 10,
        title: "Recursion",
        overview:
          "Recursion: functions that call themselves. Base case, recursive case.",
        examWeight: "5-7.5%",
        bigIdeas: [
          "Every recursive method needs a base case (no recursion) and a recursive case.",
          "Recursive call must move toward the base case.",
          "Trace by drawing the call tree.",
          "Recursive problems: factorial, Fibonacci, tree traversal.",
          "Binary search is often written recursively.",
        ],
        essentials: [
          {
            heading: "Base case and recursive case",
            body: "public int factorial(int n) { if (n == 0) return 1; return n * factorial(n - 1); } Base case: n == 0. Recursive case: multiplies by factorial(n-1).",
          },
          {
            heading: "Call tree tracing",
            body: "Draw each recursive call as a node. Leaves are base cases. Fill in return values from leaves up.",
          },
          {
            heading: "Common patterns",
            body: "Factorial: n! = n × (n-1)!. Fibonacci: F(n) = F(n-1) + F(n-2). Sum of list: sum = first + sumOfRest.",
          },
          {
            heading: "Recursive vs iterative",
            body: "Any recursion can be rewritten iteratively (with a stack). Recursion is often clearer for tree-like problems.",
          },
          {
            heading: "Binary search (recursive)",
            body: "If target == middle, return. If target < middle, search left half. If target > middle, search right half. Logarithmic time.",
          },
        ],
        keyFacts: [
          "Missing base case = stack overflow.",
          "Recursive call must reduce the problem size.",
          "Trace by drawing call tree.",
        ],
        commonMistakes: [
          "Forgetting the base case.",
          "Recursing in the wrong direction.",
          "Not returning the recursive call's result.",
        ],
        examStrategy:
          "On MCQs, trace carefully. On FRQs, write the base case first.",
        studyTips: [
          "Trace 10 recursive methods.",
          "Write factorial, Fibonacci, and sum recursively.",
          "Practice recursive binary search.",
        ],
      },
    ],
  },

  // =========================================================================
  // AP COMPUTER SCIENCE PRINCIPLES
  // =========================================================================
  "ap-cs-principles": {
    courseSlug: "ap-cs-principles",
    examFormat: {
      length: "2 hours MCQ + 12 hours Create task (outside class)",
      structure:
        "70 MCQ (2 hours) + Create Performance Task (submitted ahead of exam). The Create task is 30% of score.",
      scoring:
        "MCQ 70%, Create Task 30%. Uses a pseudocode reference sheet — you don't need to know a specific language.",
    },
    framing:
      "AP CSP is a big-picture course about computing as a discipline. It's organized around 5 Big Ideas and uses pseudocode (not a real language). You need to understand programming concepts, not Java syntax. The Create Task is a significant portion of the score and is done outside the exam.",
    units: [
      {
        unitNumber: 1,
        title: "Big Idea 1: Creative Development",
        overview:
          "Collaboration, program purpose, design processes, debugging.",
        examWeight: "10-13%",
        bigIdeas: [
          "Programs are designed with purpose and audience in mind.",
          "Collaboration improves programs through diverse perspectives.",
          "Iterative development: design, develop, test, refine.",
          "Debugging: identifying and fixing errors.",
          "Input/output/stored data are the basics of any program.",
        ],
        essentials: [
          {
            heading: "Program design process",
            body: "Understand the problem. Plan an algorithm. Write code. Test. Debug. Refine. Document.",
          },
          {
            heading: "Collaboration",
            body: "Pair programming, code review, version control. Improves code quality through multiple perspectives.",
          },
          {
            heading: "Types of errors",
            body: "Syntax errors: code doesn't compile. Runtime errors: crash during execution. Logic errors: runs but produces wrong output.",
          },
          {
            heading: "Debugging techniques",
            body: "Test with different inputs. Use print statements to inspect state. Check each step. Read error messages carefully.",
          },
        ],
        keyFacts: [
          "Iterative development is the norm, not waterfall.",
          "Debugging is a normal part of programming.",
          "Good programs have clear purpose and clear inputs/outputs.",
        ],
        commonMistakes: [
          "Jumping to code without planning.",
          "Ignoring error messages.",
          "Testing only 'happy path' inputs.",
        ],
        examStrategy:
          "Big Idea 1 shows up in the Create task grading criteria. Focus on program purpose and documentation.",
        studyTips: [
          "Practice writing program purpose statements.",
          "Document a sample program with inputs, outputs, and purpose.",
          "Debug intentionally-broken code.",
        ],
      },
      {
        unitNumber: 2,
        title: "Big Idea 2: Data",
        overview:
          "Binary numbers, data compression, metadata, extracting information.",
        examWeight: "17-22%",
        bigIdeas: [
          "Computers represent data in binary (0s and 1s).",
          "Common base-10 to binary conversion: powers of 2.",
          "Data compression: lossy vs lossless.",
          "Metadata: data about data (file size, creation date).",
          "Data visualization helps extract patterns.",
        ],
        essentials: [
          {
            heading: "Binary representation",
            body: "Binary uses only 0 and 1. Each digit is a bit. 8 bits = 1 byte. 2⁸ = 256 values per byte.",
          },
          {
            heading: "Decimal to binary",
            body: "Find the largest power of 2 less than the number. Subtract. Repeat. Example: 13 = 8 + 4 + 1 = 1101 in binary.",
          },
          {
            heading: "Data compression",
            body: "Lossless: reduces size without losing information (ZIP, PNG). Lossy: trades quality for smaller size (JPEG, MP3).",
          },
          {
            heading: "Metadata",
            body: "Data about data. File size, type, creation date, author, etc. Helps organize and search.",
          },
          {
            heading: "Data and programs",
            body: "Programs process data. Input → processing → output. Examples: spreadsheets, databases, image editors.",
          },
        ],
        keyFacts: [
          "1 byte = 8 bits = 256 possible values.",
          "1 KB = 1024 bytes (approximately).",
          "ASCII uses 7 bits for 128 characters.",
        ],
        commonMistakes: [
          "Confusing bits and bytes.",
          "Mixing up lossy and lossless.",
          "Forgetting metadata is also data.",
        ],
        examStrategy:
          "Practice binary conversion and data compression concepts. MCQ will test these.",
        studyTips: [
          "Convert 10 decimal numbers to binary.",
          "Identify lossy vs lossless compression examples.",
          "List metadata for a photo file.",
        ],
      },
      {
        unitNumber: 3,
        title: "Big Idea 3: Algorithms & Programming",
        overview:
          "Variables, control flow, procedures, lists, algorithms, abstraction.",
        examWeight: "30-35%",
        bigIdeas: [
          "Variables store values.",
          "Control flow: sequence, selection, iteration.",
          "Procedures (functions) abstract code.",
          "Lists store multiple values.",
          "Algorithms have efficiency: linear, binary search.",
        ],
        essentials: [
          {
            heading: "Variables and assignment",
            body: "a ← 5 assigns 5 to variable a. Variables hold values that can change during execution.",
          },
          {
            heading: "Selection (if/else)",
            body: "IF (condition) { block } ELSE { block }. Executes block based on condition. Nested for complex logic.",
          },
          {
            heading: "Iteration",
            body: "REPEAT UNTIL (condition) { block }. REPEAT n TIMES { block }. FOR EACH item IN list { block }. Iteration = loop.",
          },
          {
            heading: "Procedures",
            body: "PROCEDURE name(parameters) { block }. Call with name(args). Returns values with RETURN. Abstracts repeated code.",
          },
          {
            heading: "Lists",
            body: "list[1] is first element (1-indexed in pseudocode, unlike most languages). APPEND, INSERT, REMOVE operations. Length of list.",
          },
          {
            heading: "Boolean expressions",
            body: "AND, OR, NOT. Used in conditions. Short-circuit evaluation depends on language.",
          },
          {
            heading: "Algorithm efficiency",
            body: "Linear search: O(n), checks each element. Binary search: O(log n), requires sorted list. Faster algorithms scale better.",
          },
          {
            heading: "Abstraction",
            body: "Hiding details to focus on higher-level concepts. Procedures, APIs, libraries. Allows complex systems to be built from simple parts.",
          },
          {
            heading: "Undecidable problems",
            body: "Some problems cannot be solved by any algorithm (e.g., halting problem). Algorithmic limits.",
          },
        ],
        keyFacts: [
          "Pseudocode uses ← for assignment, not =.",
          "Lists are typically 1-indexed in AP CSP pseudocode.",
          "Binary search is much faster than linear for large lists.",
        ],
        commonMistakes: [
          "Using = instead of ← in pseudocode.",
          "Forgetting list indices start at 1 in pseudocode.",
          "Confusing linear and binary search.",
        ],
        examStrategy:
          "Big Idea 3 is the biggest content area. Master the pseudocode reference sheet.",
        studyTips: [
          "Memorize the pseudocode reference sheet.",
          "Practice tracing pseudocode programs.",
          "Drill algorithm efficiency questions.",
        ],
      },
      {
        unitNumber: 4,
        title: "Big Idea 4: Computer Systems & Networks",
        overview:
          "Internet basics, protocols, fault tolerance, parallel and distributed computing.",
        examWeight: "11-15%",
        bigIdeas: [
          "Internet is a network of networks using TCP/IP.",
          "URL, HTTP, IP, DNS: foundational protocols.",
          "Redundancy enables fault tolerance.",
          "Parallel computing: tasks run simultaneously.",
          "Distributed computing: multiple computers work together.",
        ],
        essentials: [
          {
            heading: "Internet protocols",
            body: "IP: packets with addresses. TCP: reliable delivery (ordered, error-checked). HTTP: web pages. DNS: translates domain names to IPs.",
          },
          {
            heading: "Packet switching",
            body: "Data is broken into packets, sent independently, reassembled at destination. Allows efficient use of network.",
          },
          {
            heading: "Fault tolerance",
            body: "Redundancy: multiple paths, multiple servers. Failure of one component doesn't stop the system.",
          },
          {
            heading: "Parallel computing",
            body: "Multiple tasks run simultaneously on one computer (multiple cores). Speeds up independent tasks.",
          },
          {
            heading: "Distributed computing",
            body: "Multiple computers cooperate on a task. Scales to massive problems. Examples: cloud computing, BOINC.",
          },
        ],
        keyFacts: [
          "IP addresses identify devices on the internet.",
          "DNS is like a phone book for the internet.",
          "Packet switching is the foundation of the internet.",
        ],
        commonMistakes: [
          "Confusing HTTP and HTTPS.",
          "Thinking parallel computing speeds up sequential tasks.",
          "Mixing up redundancy and parallelism.",
        ],
        examStrategy:
          "Memorize protocol names and their purposes.",
        studyTips: [
          "List internet protocols with their roles.",
          "Explain packet switching.",
          "Compare parallel and distributed computing.",
        ],
      },
      {
        unitNumber: 5,
        title: "Big Idea 5: Impact of Computing",
        overview:
          "Social impact, digital divide, bias, legal and ethical issues.",
        examWeight: "21-26%",
        bigIdeas: [
          "Computing has beneficial and harmful effects.",
          "Digital divide: unequal access to technology.",
          "Algorithmic bias arises from training data or design.",
          "Crowdsourcing leverages many contributors.",
          "Privacy, intellectual property, and security are ongoing concerns.",
        ],
        essentials: [
          {
            heading: "Beneficial and harmful effects",
            body: "Technology transforms society in positive ways (healthcare, education) and negative (misinformation, surveillance). Context matters.",
          },
          {
            heading: "Digital divide",
            body: "Unequal access to computing resources based on geography, income, education. Limits opportunity.",
          },
          {
            heading: "Algorithmic bias",
            body: "Algorithms can perpetuate or amplify bias in training data. Example: facial recognition performing worse on darker skin tones. Mitigate by diverse data and testing.",
          },
          {
            heading: "Crowdsourcing",
            body: "Many people contribute to solve problems. Wikipedia, Kickstarter, citizen science. Leverages collective intelligence.",
          },
          {
            heading: "Privacy and security",
            body: "Data collection raises privacy concerns. Encryption protects data. Phishing and malware are common threats. Multi-factor authentication reduces risk.",
          },
          {
            heading: "Legal and ethical issues",
            body: "Copyright (creator's rights). Fair use (limited free use). Open source (explicit sharing). Creative Commons (flexible licensing).",
          },
        ],
        keyFacts: [
          "The digital divide affects billions globally.",
          "Algorithmic bias is a real, measurable problem.",
          "Encryption protects data in transit and at rest.",
        ],
        commonMistakes: [
          "Treating technology as value-neutral.",
          "Missing the role of training data in bias.",
          "Confusing copyright and fair use.",
        ],
        examStrategy:
          "Big Idea 5 is heavily weighted on MCQ. Be ready to analyze impacts and propose mitigation.",
        studyTips: [
          "List examples of beneficial and harmful impacts.",
          "Research a recent case of algorithmic bias.",
          "Memorize key legal/ethical concepts.",
        ],
      },
    ],
  },
};
