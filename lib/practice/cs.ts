import type { UnitPractice } from "./types";

export const CS_PRACTICE: Record<string, UnitPractice[]> = {
  "ap-cs-a": [
    {
      unitNumber: 1,
      problems: [
        {
          difficulty: "easy",
          prompt:
            "Trace the output:\nint x = 5;\nx += 3;\nx *= 2;\nSystem.out.println(x);",
          hint: "Apply each compound assignment in order.",
          answer: "16",
          explanation:
            "Start with x = 5.\nx += 3 makes x = 8.\nx *= 2 makes x = 16.\nSystem.out.println prints 16.",
        },
        {
          difficulty: "easy",
          prompt:
            "What is printed?\nint a = 17;\nint b = 5;\nSystem.out.println(a / b);\nSystem.out.println(a % b);",
          hint: "Remember integer division truncates and % gives remainder.",
          answer: "3\n2",
          explanation:
            "17 / 5 in integer math is 3 (truncated toward zero).\n17 % 5 gives the remainder 2.\nSo the program prints 3 on the first line and 2 on the second.",
        },
        {
          difficulty: "medium",
          prompt:
            "What is the value stored in result?\ndouble result = 7 / 2 + 1.5;",
          hint: "7 / 2 is integer division before addition with a double.",
          answer: "4.5",
          explanation:
            "7 and 2 are both int, so 7 / 2 evaluates to 3 using integer division.\nAdding 1.5 (double) promotes 3 to 3.0.\n3.0 + 1.5 = 4.5 which is stored in result.",
        },
        {
          difficulty: "hard",
          prompt:
            "Find the bug. The intent is to compute the average of two ints as a double:\nint s1 = 85;\nint s2 = 92;\ndouble avg = (s1 + s2) / 2;\nSystem.out.println(avg);",
          hint: "Check the types used in the division.",
          answer:
            "The division uses two ints so the fractional part is lost. Cast to double: double avg = (s1 + s2) / 2.0; (or (double)(s1 + s2) / 2).",
          explanation:
            "s1 + s2 = 177, an int.\n177 / 2 with int operands is 88, losing 0.5.\nAssigning to a double just stores 88.0, not 88.5.\nDividing by 2.0 (or casting) forces double division and produces 88.5.",
        },
      ],
    },
    {
      unitNumber: 2,
      problems: [
        {
          difficulty: "easy",
          prompt:
            "What is printed?\nString s = \"Hello\";\nSystem.out.println(s.length());",
          hint: "length() returns the number of characters.",
          answer: "5",
          explanation:
            "The String \"Hello\" contains the characters H, e, l, l, o.\nThat is 5 characters.\ns.length() returns 5 which is printed.",
        },
        {
          difficulty: "medium",
          prompt:
            "What is printed?\nString s = \"programming\";\nSystem.out.println(s.substring(3, 7));",
          hint: "substring(a, b) returns indices a through b-1.",
          answer: "gram",
          explanation:
            "Indices: p(0) r(1) o(2) g(3) r(4) a(5) m(6) m(7).\nsubstring(3, 7) starts at index 3 inclusive and ends at index 7 exclusive.\nThat gives characters at 3, 4, 5, 6 -> \"gram\".",
        },
        {
          difficulty: "medium",
          prompt:
            "What does this print?\nInteger a = 127;\nInteger b = 127;\nSystem.out.println(a.equals(b));",
          hint: "equals compares the wrapped int values.",
          answer: "true",
          explanation:
            "a and b are Integer objects wrapping the int value 127.\nInteger.equals compares the underlying int values.\n127 equals 127, so equals returns true.",
        },
        {
          difficulty: "hard",
          prompt:
            "What is printed?\nString a = \"APCS\";\nString b = a.toLowerCase();\nSystem.out.println(a + \" \" + b);",
          hint: "Strings are immutable; toLowerCase returns a new String.",
          answer: "APCS apcs",
          explanation:
            "Strings are immutable, so toLowerCase does not modify a.\na remains \"APCS\" and b becomes the new String \"apcs\".\nThe println concatenates them with a space, printing \"APCS apcs\".",
        },
      ],
    },
    {
      unitNumber: 3,
      problems: [
        {
          difficulty: "easy",
          prompt:
            "What is printed?\nint n = 10;\nif (n > 5 && n < 20) {\n    System.out.println(\"yes\");\n} else {\n    System.out.println(\"no\");\n}",
          hint: "Evaluate both sides of the &&.",
          answer: "yes",
          explanation:
            "n > 5 is true because 10 > 5.\nn < 20 is true because 10 < 20.\ntrue && true is true, so the if branch runs and prints \"yes\".",
        },
        {
          difficulty: "medium",
          prompt:
            "What is printed?\nint score = 72;\nif (score >= 90) System.out.println(\"A\");\nelse if (score >= 80) System.out.println(\"B\");\nelse if (score >= 70) System.out.println(\"C\");\nelse System.out.println(\"F\");",
          hint: "Only the first matching branch executes.",
          answer: "C",
          explanation:
            "score = 72. The first test 72 >= 90 is false.\n72 >= 80 is false.\n72 >= 70 is true, so \"C\" is printed.\nRemaining else is skipped because a branch matched.",
        },
        {
          difficulty: "medium",
          prompt:
            "Given boolean variables a and b, the expression !(a && b) is equivalent to which expression using De Morgan's law?",
          hint: "Negation distributes and flips && to ||.",
          answer: "!a || !b",
          explanation:
            "De Morgan's law states !(a && b) == !a || !b.\nNegation flips each operand and the operator.\nSo !(a && b) is equivalent to (!a) || (!b).",
        },
        {
          difficulty: "hard",
          prompt:
            "Find the bug: this is supposed to assign grade \"P\" if score is in [60, 100], else \"F\".\nString grade;\nif (score >= 60 || score <= 100) grade = \"P\";\nelse grade = \"F\";",
          hint: "Check the logical operator in the range test.",
          answer:
            "Use && not ||. Correct: if (score >= 60 && score <= 100) grade = \"P\"; else grade = \"F\";",
          explanation:
            "With ||, any score produces true because every number is either >= 60 or <= 100 (or both).\nA score of 30 would wrongly be labeled \"P\".\nRange checks require both conditions to hold at once, so use &&.",
        },
      ],
    },
    {
      unitNumber: 4,
      problems: [
        {
          difficulty: "easy",
          prompt:
            "How many times does this loop print \"hi\"?\nfor (int i = 0; i < 5; i++) {\n    System.out.println(\"hi\");\n}",
          hint: "Count i = 0, 1, 2, 3, 4.",
          answer: "5",
          explanation:
            "The loop starts with i = 0 and continues while i < 5.\ni takes values 0, 1, 2, 3, 4 before stopping.\nThat is 5 iterations, so \"hi\" is printed 5 times.",
        },
        {
          difficulty: "medium",
          prompt:
            "What is the final value of sum?\nint sum = 0;\nfor (int i = 1; i <= 10; i++) {\n    if (i % 2 == 0) sum += i;\n}",
          hint: "Add only the even values of i.",
          answer: "30",
          explanation:
            "i ranges from 1 through 10.\nEven values are 2, 4, 6, 8, 10.\nSum = 2 + 4 + 6 + 8 + 10 = 30.",
        },
        {
          difficulty: "medium",
          prompt:
            "Trace the output:\nint n = 1;\nwhile (n < 100) {\n    n *= 2;\n}\nSystem.out.println(n);",
          hint: "Double n until it is no longer less than 100.",
          answer: "128",
          explanation:
            "n doubles: 1, 2, 4, 8, 16, 32, 64, 128.\nAt n = 64, 64 < 100 is true so n becomes 128.\nNow 128 < 100 is false so the loop exits and 128 is printed.",
        },
        {
          difficulty: "hard",
          prompt:
            "How many times does the println execute?\nfor (int i = 0; i < 4; i++) {\n    for (int j = i; j < 4; j++) {\n        System.out.println(i + \",\" + j);\n    }\n}",
          hint: "Count pairs (i, j) with i <= j < 4.",
          answer: "10",
          explanation:
            "When i = 0, j runs 0..3 -> 4 prints.\nWhen i = 1, j runs 1..3 -> 3 prints.\nWhen i = 2, j runs 2..3 -> 2 prints.\nWhen i = 3, j runs 3..3 -> 1 print.\nTotal = 4 + 3 + 2 + 1 = 10.",
        },
      ],
    },
    {
      unitNumber: 5,
      problems: [
        {
          difficulty: "easy",
          prompt:
            "A class has the field:\nprivate int count;\nWrite a getter method getCount() that returns count.",
          hint: "Public int return type, no parameters.",
          answer:
            "public int getCount() {\n    return count;\n}",
          explanation:
            "Accessor methods are public so clients can call them.\nThe return type matches the field type int.\nThe body simply returns the field's current value.",
        },
        {
          difficulty: "medium",
          prompt:
            "Given:\npublic class Dog {\n    private String name;\n    public Dog(String n) { name = n; }\n    public String bark() { return name + \" says woof\"; }\n}\n\nWhat is printed?\nDog d = new Dog(\"Rex\");\nSystem.out.println(d.bark());",
          hint: "The constructor sets name.",
          answer: "Rex says woof",
          explanation:
            "new Dog(\"Rex\") calls the constructor which assigns name = \"Rex\".\nd.bark() returns \"Rex\" + \" says woof\" = \"Rex says woof\".\nThat string is printed.",
        },
        {
          difficulty: "medium",
          prompt:
            "Identify the scope issue. Does this compile?\npublic class Counter {\n    private int n;\n    public void inc() {\n        int n = n + 1;\n    }\n}",
          hint: "A local variable with the same name shadows the field.",
          answer:
            "It compiles but does not update the field. The local int n shadows the field; n + 1 reads the uninitialized-looking local n. Use this.n = this.n + 1; or rename the local.",
          explanation:
            "Declaring int n inside inc creates a new local variable that hides the field.\nThe expression on the right refers to the local n, which Java may flag or defaults to 0.\nEven if it compiles, the field is never changed.\nUse this.n = this.n + 1 to refer to the field explicitly.",
        },
        {
          difficulty: "hard",
          prompt:
            "Write a static method average that takes two doubles and returns their average, located inside a utility class.",
          hint: "Static methods belong to the class, not an instance.",
          answer:
            "public static double average(double a, double b) {\n    return (a + b) / 2.0;\n}",
          explanation:
            "static means the method belongs to the class and is called without an instance.\nThe parameters are doubles and the return type is double.\nDividing by 2.0 keeps the result in floating point.\nThe method simply returns (a + b) / 2.0.",
        },
      ],
    },
    {
      unitNumber: 6,
      problems: [
        {
          difficulty: "easy",
          prompt:
            "What is printed?\nint[] nums = {4, 8, 15, 16, 23, 42};\nSystem.out.println(nums.length);\nSystem.out.println(nums[2]);",
          hint: "Arrays use .length (no parentheses) and 0-based indexing.",
          answer: "6\n15",
          explanation:
            "nums has 6 elements so nums.length is 6.\nIndex 0 is 4, index 1 is 8, index 2 is 15.\nThe program prints 6 then 15.",
        },
        {
          difficulty: "medium",
          prompt:
            "What is the final value of total?\nint[] arr = {2, 4, 6, 8, 10};\nint total = 0;\nfor (int v : arr) {\n    total += v;\n}",
          hint: "Enhanced for loop visits every element once.",
          answer: "30",
          explanation:
            "The enhanced for loop assigns v each array element in turn.\nThe additions are 2 + 4 + 6 + 8 + 10 = 30.\nSo total is 30 after the loop.",
        },
        {
          difficulty: "medium",
          prompt:
            "Write a method that returns the index of the maximum value in an int[] a. You may assume a has at least one element.",
          hint: "Track the index of the best so far.",
          answer:
            "public int indexOfMax(int[] a) {\n    int maxIdx = 0;\n    for (int i = 1; i < a.length; i++) {\n        if (a[i] > a[maxIdx]) maxIdx = i;\n    }\n    return maxIdx;\n}",
          explanation:
            "Start by assuming index 0 holds the max.\nWalk indices 1..length-1.\nIf a[i] beats the current maximum, record i as maxIdx.\nReturn the index that points to the largest value.",
        },
        {
          difficulty: "hard",
          prompt:
            "Find the bug:\nint[] a = {3, 1, 4, 1, 5};\nfor (int i = 0; i <= a.length; i++) {\n    System.out.println(a[i]);\n}",
          hint: "Check loop bounds.",
          answer:
            "Off-by-one: the condition should be i < a.length. When i equals a.length the access a[i] throws ArrayIndexOutOfBoundsException.",
          explanation:
            "Valid indices are 0..a.length - 1.\nUsing <= lets i reach a.length which is out of bounds.\nAccessing a[a.length] throws ArrayIndexOutOfBoundsException.\nChange the condition to i < a.length.",
        },
      ],
    },
    {
      unitNumber: 7,
      problems: [
        {
          difficulty: "easy",
          prompt:
            "What is printed?\nArrayList<Integer> list = new ArrayList<>();\nlist.add(10);\nlist.add(20);\nlist.add(30);\nSystem.out.println(list.size());\nSystem.out.println(list.get(1));",
          hint: "ArrayList uses size() and get(index).",
          answer: "3\n20",
          explanation:
            "Three elements are added so size() is 3.\nget(1) returns the element at index 1 which is 20.\nSo the program prints 3 then 20.",
        },
        {
          difficulty: "medium",
          prompt:
            "What is list after this code runs?\nArrayList<String> list = new ArrayList<>();\nlist.add(\"a\");\nlist.add(\"b\");\nlist.add(\"c\");\nlist.add(1, \"x\");\nlist.remove(3);",
          hint: "add(i, e) inserts and shifts; remove(i) shifts left.",
          answer: "[a, x, b]",
          explanation:
            "Start: [a, b, c]. add(1, \"x\") inserts x at index 1 -> [a, x, b, c].\nremove(3) removes the element at index 3 which is c -> [a, x, b].\nFinal list is [a, x, b].",
        },
        {
          difficulty: "medium",
          prompt:
            "Write a method that returns true if an ArrayList<Integer> list contains any duplicate values.",
          hint: "Compare each pair using nested loops.",
          answer:
            "public boolean hasDuplicates(ArrayList<Integer> list) {\n    for (int i = 0; i < list.size(); i++) {\n        for (int j = i + 1; j < list.size(); j++) {\n            if (list.get(i).equals(list.get(j))) return true;\n        }\n    }\n    return false;\n}",
          explanation:
            "Outer loop picks element i.\nInner loop compares it against later elements j > i to avoid double-checking.\nUse equals because elements are Integer objects.\nReturn true on the first match, false if none is found.",
        },
        {
          difficulty: "hard",
          prompt:
            "Find the bug: this code removes every even element from an ArrayList<Integer>.\nfor (int i = 0; i < list.size(); i++) {\n    if (list.get(i) % 2 == 0) list.remove(i);\n}",
          hint: "Removing shifts later elements left by one.",
          answer:
            "After removing index i, the next element takes position i but the loop advances i past it. Iterate backwards or decrement i after removal: if (...) { list.remove(i); i--; }",
          explanation:
            "When you remove element at i, the element that was at i+1 moves to i.\nIncrementing i then skips that moved element.\nFix by iterating from size-1 down to 0, or by decrementing i after a remove.\nBoth avoid skipping an element right after a removal.",
        },
      ],
    },
    {
      unitNumber: 8,
      problems: [
        {
          difficulty: "easy",
          prompt:
            "What is printed?\nint[][] g = {{1, 2, 3}, {4, 5, 6}};\nSystem.out.println(g[1][2]);",
          hint: "First index is row, second is column.",
          answer: "6",
          explanation:
            "g[1] is the second row {4, 5, 6}.\ng[1][2] is the third element of that row which is 6.\nThe program prints 6.",
        },
        {
          difficulty: "medium",
          prompt:
            "How many total elements does g hold, and what is printed?\nint[][] g = new int[3][5];\nSystem.out.println(g.length);\nSystem.out.println(g[0].length);",
          hint: "g.length gives rows; g[r].length gives columns in row r.",
          answer: "3\n5",
          explanation:
            "g has 3 rows and each row has 5 columns, giving 15 elements total.\ng.length returns the number of rows which is 3.\ng[0].length returns the length of the first row which is 5.",
        },
        {
          difficulty: "medium",
          prompt:
            "Write a method that returns the sum of all elements in a rectangular int[][] grid.",
          hint: "Use nested for loops.",
          answer:
            "public int sumAll(int[][] grid) {\n    int total = 0;\n    for (int r = 0; r < grid.length; r++) {\n        for (int c = 0; c < grid[r].length; c++) {\n            total += grid[r][c];\n        }\n    }\n    return total;\n}",
          explanation:
            "Use grid.length for rows and grid[r].length for columns.\nAn outer loop over r and an inner loop over c visits each cell.\nAdd each element to the running total.\nReturn total once both loops finish.",
        },
        {
          difficulty: "hard",
          prompt:
            "What is printed by this row-major traversal?\nint[][] g = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\nfor (int r = 0; r < g.length; r++) {\n    for (int c = 0; c < g[r].length; c++) {\n        if ((r + c) % 2 == 0) System.out.print(g[r][c] + \" \");\n    }\n}",
          hint: "Print only when r + c is even.",
          answer: "1 3 5 7 9 ",
          explanation:
            "Row 0: (0,0)=1 even, (0,1)=2 odd, (0,2)=3 even -> print 1, 3.\nRow 1: (1,0)=4 odd, (1,1)=5 even, (1,2)=6 odd -> print 5.\nRow 2: (2,0)=7 even, (2,1)=8 odd, (2,2)=9 even -> print 7, 9.\nOutput: 1 3 5 7 9 (with trailing space).",
        },
      ],
    },
    {
      unitNumber: 9,
      problems: [
        {
          difficulty: "easy",
          prompt:
            "Given:\npublic class Animal { public String speak() { return \"...\"; } }\npublic class Dog extends Animal { public String speak() { return \"woof\"; } }\n\nWhat is printed?\nAnimal a = new Dog();\nSystem.out.println(a.speak());",
          hint: "Methods dispatch based on the actual object type.",
          answer: "woof",
          explanation:
            "Even though the variable is declared as Animal, the object is a Dog.\nJava uses dynamic dispatch at runtime for overridden methods.\nDog.speak() runs and returns \"woof\".",
        },
        {
          difficulty: "medium",
          prompt:
            "Write a subclass SavingsAccount that extends BankAccount and adds a method addInterest(double rate) that calls the inherited deposit method with the current balance times rate. Assume BankAccount has getBalance() and deposit(double amount).",
          hint: "Compute interest, then deposit it.",
          answer:
            "public class SavingsAccount extends BankAccount {\n    public void addInterest(double rate) {\n        deposit(getBalance() * rate);\n    }\n}",
          explanation:
            "SavingsAccount extends BankAccount to inherit deposit and getBalance.\naddInterest computes interest as balance * rate.\nCalling deposit with that amount credits the account.\nNo new fields are needed for this feature.",
        },
        {
          difficulty: "medium",
          prompt:
            "In a subclass constructor, how do you explicitly call a parent constructor that takes a String name?",
          hint: "Use super(...) on the first line.",
          answer: "super(name);",
          explanation:
            "The call super(name) invokes the parent constructor with matching parameters.\nIt must be the first statement in the subclass constructor.\nThis ensures the parent portion of the object is initialized before the subclass adds its own state.",
        },
        {
          difficulty: "hard",
          prompt:
            "What is printed?\npublic class A { public String who() { return \"A\"; } public String greet() { return \"Hi \" + who(); } }\npublic class B extends A { public String who() { return \"B\"; } }\n\nA obj = new B();\nSystem.out.println(obj.greet());",
          hint: "greet() is inherited but calls who() polymorphically.",
          answer: "Hi B",
          explanation:
            "obj refers to a B instance, so dynamic dispatch applies.\ngreet is inherited from A and internally calls who().\nwho() dispatches to B.who() which returns \"B\".\nSo greet returns \"Hi B\", which is printed.",
        },
      ],
    },
    {
      unitNumber: 10,
      problems: [
        {
          difficulty: "easy",
          prompt:
            "What does this method return for n = 4?\npublic int fact(int n) {\n    if (n <= 1) return 1;\n    return n * fact(n - 1);\n}",
          hint: "Unroll fact(4) -> 4 * fact(3) -> ...",
          answer: "24",
          explanation:
            "fact(4) = 4 * fact(3).\nfact(3) = 3 * fact(2).\nfact(2) = 2 * fact(1) = 2 * 1 = 2.\nSo fact(3) = 6, fact(4) = 24.",
        },
        {
          difficulty: "medium",
          prompt:
            "What is printed when called with n = 3?\npublic void mystery(int n) {\n    if (n == 0) return;\n    System.out.print(n + \" \");\n    mystery(n - 1);\n    System.out.print(n + \" \");\n}",
          hint: "Track prints before and after the recursive call.",
          answer: "3 2 1 1 2 3 ",
          explanation:
            "mystery(3) prints 3, calls mystery(2), then prints 3 again.\nmystery(2) prints 2, calls mystery(1), then prints 2 again.\nmystery(1) prints 1, calls mystery(0) which returns, then prints 1.\nCombined output: 3 2 1 1 2 3 (with trailing space).",
        },
        {
          difficulty: "medium",
          prompt:
            "Write a recursive method sum(int n) that returns 1 + 2 + ... + n for n >= 0.",
          hint: "Base case sum(0) = 0.",
          answer:
            "public int sum(int n) {\n    if (n <= 0) return 0;\n    return n + sum(n - 1);\n}",
          explanation:
            "Base case: when n is 0 or less, return 0 to stop recursion.\nRecursive case: sum(n) = n + sum(n - 1).\nEach call shrinks n by 1, guaranteeing termination.\nThis adds n, n-1, ..., 1, 0 which equals n(n+1)/2.",
        },
        {
          difficulty: "hard",
          prompt:
            "Find the bug. It is supposed to return the nth Fibonacci number, with fib(0) = 0 and fib(1) = 1.\npublic int fib(int n) {\n    if (n == 0) return 0;\n    return fib(n - 1) + fib(n - 2);\n}",
          hint: "Check all base cases.",
          answer:
            "Missing base case for n == 1 (and negative n). Add: if (n <= 1) return n; The current code recurses fib(1) -> fib(0) + fib(-1) which diverges.",
          explanation:
            "fib(1) falls through to the recursive branch and calls fib(0) + fib(-1).\nfib(-1) then calls fib(-2) + fib(-3), never reaching a base case.\nThe program throws StackOverflowError.\nA single guard if (n <= 1) return n fixes both 0 and 1 cases.",
        },
      ],
    },
  ],
  "ap-cs-principles": [
    {
      unitNumber: 1,
      problems: [
        {
          difficulty: "easy",
          prompt:
            "A team is deciding whether to meet in person or share files online. Which phase of the program development cycle focuses on reviewing how well a finished feature meets user needs?",
          hint: "Think about what happens after code is written.",
          answer: "Testing (and reflecting on / evaluating the program)",
          explanation:
            "The program development cycle includes investigating, designing, prototyping, and testing.\nAfter implementation, testing verifies the feature against user requirements.\nReflection on what worked and what to improve is part of this phase.",
        },
        {
          difficulty: "medium",
          prompt:
            "A program intermittently crashes only when multiple users click a button at once. What type of error is this and how is it typically found?",
          hint: "It is not a compile-time or immediate runtime error.",
          answer:
            "A logic / runtime error related to concurrency. It is typically found through testing with varied user scenarios (including stress tests) and user feedback, not by reading the code alone.",
          explanation:
            "The code compiles and runs in normal use, so it is not a syntax error.\nIt only appears under certain conditions, which indicates a logic error exposed at runtime.\nConcurrency bugs are usually caught by testing with multiple users, logging, and collaborative debugging.",
        },
        {
          difficulty: "medium",
          prompt:
            "List two advantages of collaborating in teams when developing a program.",
          hint: "Think about different perspectives and workload.",
          answer:
            "Teams bring diverse perspectives that reduce bias and surface edge cases, and they distribute the workload so more features can be built and tested in the same time.",
          explanation:
            "Multiple viewpoints catch assumptions that a single developer might miss.\nTeams also split responsibilities so tasks happen in parallel.\nCollaboration encourages code review which improves quality.",
        },
        {
          difficulty: "hard",
          prompt:
            "A student is designing a program and writes a step-by-step description of the inputs, outputs, and main steps before coding. Name this artifact and explain why it helps.",
          hint: "AP CSP calls this planning step by a specific name.",
          answer:
            "It is a program design document (such as a plan, flowchart, or pseudocode). It clarifies requirements, exposes design flaws early, and gives collaborators a shared reference before implementation.",
          explanation:
            "Planning artifacts turn vague ideas into concrete inputs, outputs, and steps.\nThey make missing cases visible before coding.\nThey also align team members and serve as documentation for future maintenance.",
        },
      ],
    },
    {
      unitNumber: 2,
      problems: [
        {
          difficulty: "easy",
          prompt:
            "Convert the 8-bit binary number 0010 1101 to decimal.",
          hint: "Use place values 128, 64, 32, 16, 8, 4, 2, 1.",
          answer: "45",
          explanation:
            "Place values for 1 bits: 32 + 8 + 4 + 1.\n32 + 8 = 40, 40 + 4 = 44, 44 + 1 = 45.\nSo 0010 1101 equals 45 in decimal.",
        },
        {
          difficulty: "medium",
          prompt:
            "A grayscale image is stored with 8 bits per pixel and has dimensions 200 by 300 pixels. How many bits are needed to store the raw pixel data?",
          hint: "Multiply pixels by bits per pixel.",
          answer: "480,000 bits",
          explanation:
            "Total pixels = 200 * 300 = 60,000.\nEach pixel uses 8 bits.\n60,000 * 8 = 480,000 bits.",
        },
        {
          difficulty: "medium",
          prompt:
            "Explain the difference between lossy and lossless compression, and give one example use case for each.",
          hint: "One can rebuild the original exactly; the other approximates it.",
          answer:
            "Lossless compression reduces file size without discarding information so the original data is perfectly recoverable (e.g., ZIP for text or PNG for graphics with sharp edges). Lossy compression discards some data to achieve much smaller files (e.g., JPEG for photos or MP3 for music).",
          explanation:
            "Lossless methods use patterns and redundancy to shrink files reversibly.\nLossy methods trade some fidelity for a much smaller size, which is acceptable when human senses cannot detect the loss.\nChoose lossless for code and text; lossy for photos, audio, and video where size matters more than perfect fidelity.",
        },
        {
          difficulty: "hard",
          prompt:
            "A dataset contains a Name and an Email for each user. Explain one concern about storing such data and describe a mitigation.",
          hint: "Think privacy, PII, security.",
          answer:
            "Emails are personally identifiable information (PII), and leaking them can expose users to spam, phishing, or identity theft. A mitigation is to store only what is needed, encrypt the data at rest and in transit, and restrict access through authentication and authorization.",
          explanation:
            "PII carries legal and ethical obligations; a breach harms users.\nMinimizing collection reduces risk exposure.\nEncryption and access controls make data harder to misuse even if storage is compromised.",
        },
      ],
    },
    {
      unitNumber: 3,
      problems: [
        {
          difficulty: "easy",
          prompt:
            "What does this pseudocode display?\na <- 3\nb <- 4\nDISPLAY(a + b)",
          hint: "Evaluate the expression inside DISPLAY.",
          answer: "7",
          explanation:
            "a is assigned 3 and b is assigned 4.\na + b evaluates to 7.\nDISPLAY outputs 7.",
        },
        {
          difficulty: "medium",
          prompt:
            "What does this pseudocode display?\ncount <- 0\nREPEAT 5 TIMES {\n    count <- count + 2\n}\nDISPLAY(count)",
          hint: "Each iteration adds 2 to count.",
          answer: "10",
          explanation:
            "count starts at 0.\nThe REPEAT block runs 5 times and each time increases count by 2.\nAfter 5 iterations count = 0 + 2 + 2 + 2 + 2 + 2 = 10, which is displayed.",
        },
        {
          difficulty: "medium",
          prompt:
            "Using the AP CSP reference (1-indexed lists), what is displayed?\nnums <- [10, 20, 30, 40, 50]\nDISPLAY(nums[2])\nDISPLAY(LENGTH(nums))",
          hint: "Remember CSP list indices start at 1.",
          answer: "20\n5",
          explanation:
            "CSP lists are 1-indexed, so nums[1] is 10 and nums[2] is 20.\nLENGTH(nums) returns 5 because the list has 5 elements.\nThe program displays 20 then 5.",
        },
        {
          difficulty: "hard",
          prompt:
            "Write pseudocode for a procedure isEven(n) that returns true if n is even and false otherwise. Then show a call that displays the result for 14.",
          hint: "Use MOD or an equivalent remainder operation and IF.",
          answer:
            "PROCEDURE isEven(n) {\n    IF (n MOD 2 = 0) {\n        RETURN(true)\n    }\n    RETURN(false)\n}\nDISPLAY(isEven(14))",
          explanation:
            "PROCEDURE defines a reusable block taking parameter n.\nIF checks whether n MOD 2 is 0, meaning n is divisible by 2.\nReturn true when even, otherwise false.\nCalling isEven(14) returns true, and DISPLAY prints it.",
        },
      ],
    },
    {
      unitNumber: 4,
      problems: [
        {
          difficulty: "easy",
          prompt:
            "What is the purpose of an IP address on the Internet?",
          hint: "Think routing between devices.",
          answer:
            "An IP address uniquely identifies a device on a network so that data packets can be routed to and from it.",
          explanation:
            "Every device on the Internet needs a unique identifier.\nRouters use IP addresses to forward packets toward the correct destination.\nWithout IP addresses, the network would not know where to deliver data.",
        },
        {
          difficulty: "medium",
          prompt:
            "Explain what it means for the Internet to use packet switching and why it is fault tolerant.",
          hint: "Data is split and can take multiple paths.",
          answer:
            "Packet switching splits data into small packets that travel independently across the network and are reassembled at the destination. If a link fails, packets can take alternate routes, so communication continues—this makes the Internet fault tolerant.",
          explanation:
            "Breaking data into packets lets the network interleave many conversations.\nRouters choose paths dynamically based on congestion and availability.\nIf one path breaks, packets reroute via another, so a single failure does not stop communication.",
        },
        {
          difficulty: "medium",
          prompt:
            "Explain how sequential, parallel, and distributed computing differ in one sentence each.",
          hint: "Focus on how many tasks run and where.",
          answer:
            "Sequential computing executes operations one at a time on a single processor. Parallel computing runs multiple operations at the same time on multiple processors within a single system. Distributed computing coordinates multiple networked computers to work on a shared problem.",
          explanation:
            "Sequential is the classic single-processor execution.\nParallel runs tasks simultaneously on cores or processors sharing memory.\nDistributed splits work across independent machines connected by a network, which adds communication overhead but scales massively.",
        },
        {
          difficulty: "hard",
          prompt:
            "A task takes 120 seconds to run sequentially. 90 seconds of the work can be split across 3 parallel processors and the remaining 30 seconds cannot be parallelized. What is the minimum total runtime using these 3 processors?",
          hint: "Parallel part divides; sequential part does not.",
          answer: "60 seconds",
          explanation:
            "The parallelizable 90 seconds split evenly across 3 processors becomes 30 seconds.\nThe non-parallel 30 seconds still runs sequentially.\nTotal = 30 + 30 = 60 seconds.",
        },
      ],
    },
    {
      unitNumber: 5,
      problems: [
        {
          difficulty: "easy",
          prompt:
            "Define the digital divide in one sentence.",
          hint: "Who has access to technology?",
          answer:
            "The digital divide is the gap between people or regions that have reliable, affordable access to computing technology and the Internet and those that do not.",
          explanation:
            "The digital divide describes unequal access to digital tools and connectivity.\nCauses include income, geography, infrastructure, and education.\nIt matters because lack of access limits opportunities in school, work, and civic life.",
        },
        {
          difficulty: "medium",
          prompt:
            "A free photo app asks for access to your contacts and location. Give two concerns and suggest a safer practice.",
          hint: "Think about data collection and permissions.",
          answer:
            "Concerns: the app may collect and share sensitive personal data with third parties for advertising or resale, and a breach of the app could expose private information. A safer practice is to grant only the permissions required for the app's core function and review privacy settings regularly.",
          explanation:
            "Unnecessary permissions expand the attack surface and enable unwanted data collection.\nUsers often cannot verify how data is used once collected.\nLimiting permissions to the minimum required reduces risk and protects privacy.",
        },
        {
          difficulty: "medium",
          prompt:
            "What is crowdsourcing, and give one example use case where it benefits society.",
          hint: "Many people contribute small amounts of work or data.",
          answer:
            "Crowdsourcing is obtaining input, information, or work from many people, typically online. Example: citizen science projects where volunteers help classify galaxy images or report local air quality, accelerating research that would be infeasible for a small team.",
          explanation:
            "Crowdsourcing taps distributed human effort at scale.\nIt lets projects collect or label data far faster than a small group could.\nExamples include OpenStreetMap, Wikipedia, and citizen science platforms.",
        },
        {
          difficulty: "hard",
          prompt:
            "A machine-learning model that screens job applications is found to reject women at a higher rate than men for technical roles. Explain two possible causes rooted in the data or design and one mitigation.",
          hint: "Think about biased training data and feedback loops.",
          answer:
            "Causes: (1) the training data reflects historical hiring decisions that favored men, so the model learns that bias; (2) features correlated with gender (school, club names, wording) act as proxies even when gender is removed. Mitigation: audit training data for representation, test outcomes for disparate impact across groups, and adjust features, labels, or models to reduce bias; include diverse reviewers in the loop.",
          explanation:
            "Historical data encodes past discrimination, which models faithfully reproduce.\nRemoving a protected attribute is not enough when correlated proxies remain.\nRegular fairness audits, diverse data, and human review can detect and counter bias before deployment.",
        },
      ],
    },
  ],
};
