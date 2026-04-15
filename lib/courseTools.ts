/**
 * Which interactive tools to show for each course/unit. Each course picks
 * from: graphing calculator (2D/3D), physics simulation, code sandbox.
 */

import type { SimKind } from "@/app/components/PhysicsSim";

export type CourseTool =
  | { type: "graph2d"; initial?: string[] }
  | { type: "graph3d"; initial?: string }
  | { type: "physics"; kind: SimKind }
  | { type: "code-java"; initialCode: string; expectedOutput?: string; prompt?: string }
  | { type: "code-pseudo"; initialCode: string; expectedOutput?: string; prompt?: string };

export type UnitTools = {
  unitNumber: number;
  tools: CourseTool[];
};

const MATH_TOOLS: Record<string, UnitTools[]> = {
  "ap-precalc": [
    {
      unitNumber: 1,
      tools: [
        { type: "graph2d", initial: ["x^2 - 4", "x^3 - 3*x"] },
      ],
    },
    {
      unitNumber: 2,
      tools: [
        { type: "graph2d", initial: ["2^x", "log(x)", "exp(-x)"] },
      ],
    },
    {
      unitNumber: 3,
      tools: [
        { type: "graph2d", initial: ["sin(x)", "cos(x)", "2*sin(x) + 1"] },
      ],
    },
    {
      unitNumber: 4,
      tools: [
        { type: "graph3d", initial: "sin(x)*cos(y)" },
      ],
    },
  ],
  "ap-calc-ab": [
    { unitNumber: 1, tools: [{ type: "graph2d", initial: ["1/x", "sin(x)/x"] }] },
    {
      unitNumber: 2,
      tools: [
        { type: "graph2d", initial: ["x^2", "2*x"] },
      ],
    },
    {
      unitNumber: 3,
      tools: [
        { type: "graph2d", initial: ["(3*x^2 + 1)^2", "sin(cos(x))"] },
      ],
    },
    {
      unitNumber: 4,
      tools: [
        { type: "graph2d", initial: ["-16*x^2 + 64*x", "-32*x + 64"] },
      ],
    },
    {
      unitNumber: 5,
      tools: [{ type: "graph2d", initial: ["x^3 - 3*x^2 + 2", "3*x^2 - 6*x"] }],
    },
    {
      unitNumber: 6,
      tools: [
        { type: "graph2d", initial: ["x^2", "(1/3)*x^3"] },
      ],
    },
    {
      unitNumber: 7,
      tools: [
        { type: "graph2d", initial: ["exp(-x/2)", "exp(x/3)"] },
      ],
    },
    {
      unitNumber: 8,
      tools: [{ type: "graph2d", initial: ["sqrt(4 - x^2)", "x^2"] }],
    },
  ],
  "ap-calc-bc": [
    { unitNumber: 1, tools: [{ type: "graph2d", initial: ["1/x", "sin(x)/x"] }] },
    { unitNumber: 2, tools: [{ type: "graph2d", initial: ["x^2", "2*x"] }] },
    { unitNumber: 3, tools: [{ type: "graph2d", initial: ["sin(x^2)", "cos(x^2)"] }] },
    { unitNumber: 4, tools: [{ type: "graph2d", initial: ["-16*x^2 + 64*x"] }] },
    { unitNumber: 5, tools: [{ type: "graph2d", initial: ["x^3 - 3*x"] }] },
    {
      unitNumber: 6,
      tools: [{ type: "graph2d", initial: ["x*ln(x)", "x*exp(-x)"] }],
    },
    { unitNumber: 7, tools: [{ type: "graph2d", initial: ["exp(-x/2)"] }] },
    { unitNumber: 8, tools: [{ type: "graph2d", initial: ["sqrt(4 - x^2)"] }] },
    {
      unitNumber: 9,
      tools: [
        { type: "graph2d", initial: ["sin(x)*cos(2*x)", "cos(x)*sin(2*x)"] },
        { type: "graph3d", initial: "sin(x)*cos(y)" },
      ],
    },
    {
      unitNumber: 10,
      tools: [
        {
          type: "graph2d",
          initial: [
            "1 + x + x^2/2 + x^3/6 + x^4/24",
            "exp(x)",
          ],
        },
      ],
    },
  ],
  "ap-statistics": [
    {
      unitNumber: 1,
      tools: [{ type: "graph2d", initial: ["exp(-(x^2)/2)/sqrt(2*pi)"] }],
    },
    {
      unitNumber: 2,
      tools: [{ type: "graph2d", initial: ["0.5*x + 2"] }],
    },
    {
      unitNumber: 3,
      tools: [],
    },
    {
      unitNumber: 4,
      tools: [{ type: "graph2d", initial: ["exp(-(x^2)/2)/sqrt(2*pi)"] }],
    },
    { unitNumber: 5, tools: [] },
    { unitNumber: 6, tools: [] },
    { unitNumber: 7, tools: [] },
    { unitNumber: 8, tools: [] },
    { unitNumber: 9, tools: [{ type: "graph2d", initial: ["2*x - 1"] }] },
  ],
};

const SCIENCE_TOOLS: Record<string, UnitTools[]> = {
  "ap-physics-1": [
    { unitNumber: 1, tools: [{ type: "physics", kind: "projectile" }] },
    { unitNumber: 2, tools: [{ type: "physics", kind: "incline" }] },
    { unitNumber: 3, tools: [{ type: "physics", kind: "spring" }] },
    { unitNumber: 4, tools: [{ type: "physics", kind: "collision" }] },
    { unitNumber: 5, tools: [{ type: "physics", kind: "pendulum" }] },
    { unitNumber: 6, tools: [{ type: "physics", kind: "orbit" }] },
    { unitNumber: 7, tools: [{ type: "physics", kind: "pendulum" }, { type: "physics", kind: "spring" }] },
    { unitNumber: 8, tools: [{ type: "physics", kind: "fluid" }] },
  ],
  "ap-physics-2": [
    { unitNumber: 1, tools: [{ type: "physics", kind: "fluid" }] },
    { unitNumber: 2, tools: [] },
    { unitNumber: 3, tools: [{ type: "physics", kind: "circuit" }] },
    { unitNumber: 4, tools: [] },
    { unitNumber: 5, tools: [{ type: "physics", kind: "waves" }] },
    { unitNumber: 6, tools: [{ type: "physics", kind: "waves" }] },
    { unitNumber: 7, tools: [] },
  ],
  "ap-physics-c-mech": [
    { unitNumber: 1, tools: [{ type: "physics", kind: "projectile" }] },
    { unitNumber: 2, tools: [{ type: "physics", kind: "incline" }] },
    { unitNumber: 3, tools: [{ type: "physics", kind: "spring" }] },
    { unitNumber: 4, tools: [{ type: "physics", kind: "collision" }] },
    { unitNumber: 5, tools: [{ type: "physics", kind: "orbit" }] },
    { unitNumber: 6, tools: [{ type: "physics", kind: "pendulum" }] },
    { unitNumber: 7, tools: [{ type: "physics", kind: "orbit" }] },
  ],
  "ap-physics-c-em": [
    { unitNumber: 1, tools: [] },
    { unitNumber: 2, tools: [{ type: "physics", kind: "circuit" }] },
    { unitNumber: 3, tools: [{ type: "physics", kind: "circuit" }] },
    { unitNumber: 4, tools: [] },
    { unitNumber: 5, tools: [{ type: "physics", kind: "waves" }] },
  ],
  "ap-biology": [],
  "ap-chemistry": [],
  "ap-environmental": [
    { unitNumber: 1, tools: [{ type: "physics", kind: "fluid" }] },
  ],
};

const CS_TOOLS: Record<string, UnitTools[]> = {
  "ap-cs-a": [
    {
      unitNumber: 1,
      tools: [
        {
          type: "code-java",
          prompt: "Declare some variables and print their values:",
          initialCode: `int x = 5;
int y = 12;
int sum = x + y;
int diff = x - y;
System.out.println(sum);
System.out.println(diff);`,
          expectedOutput: "17\n-7",
        },
      ],
    },
    {
      unitNumber: 2,
      tools: [
        {
          type: "code-java",
          prompt: "Use String methods:",
          initialCode: `String s = "FinalsPrep";
System.out.println(s.length());
System.out.println(s.substring(0, 6));
System.out.println(s.toUpperCase());`,
          expectedOutput: "10\nFinals\nFINALSPREP",
        },
      ],
    },
    {
      unitNumber: 3,
      tools: [
        {
          type: "code-java",
          prompt: "Write a FizzBuzz for 1-15:",
          initialCode: `for (int i = 1; i <= 15; i++) {
  if (i % 15 == 0) System.out.println("FizzBuzz");
  else if (i % 3 == 0) System.out.println("Fizz");
  else if (i % 5 == 0) System.out.println("Buzz");
  else System.out.println(i);
}`,
          expectedOutput:
            "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
        },
      ],
    },
    {
      unitNumber: 4,
      tools: [
        {
          type: "code-java",
          prompt: "Sum the numbers 1..100 with a for loop:",
          initialCode: `int sum = 0;
for (int i = 1; i <= 100; i++) {
  sum += i;
}
System.out.println(sum);`,
          expectedOutput: "5050",
        },
      ],
    },
    {
      unitNumber: 5,
      tools: [
        {
          type: "code-java",
          prompt: "Write a class and instantiate it (simplified):",
          initialCode: `// AP CSA subset — treat these as top-level methods
let name = "Rex";
let age = 3;
System.out.println(name + " is " + age + " years old.");`,
          expectedOutput: "Rex is 3 years old.",
        },
      ],
    },
    {
      unitNumber: 6,
      tools: [
        {
          type: "code-java",
          prompt: "Find the max of an array:",
          initialCode: `int[] arr = {4, 9, 1, 7, 3};
int max = arr[0];
for (int i = 1; i < arr.length; i++) {
  if (arr[i] > max) max = arr[i];
}
System.out.println(max);`,
          expectedOutput: "9",
        },
      ],
    },
    {
      unitNumber: 7,
      tools: [
        {
          type: "code-java",
          prompt: "Filter with a growable array:",
          initialCode: `let nums = [1, 2, 3, 4, 5, 6];
let even = [];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] % 2 == 0) even.push(nums[i]);
}
System.out.println(even);`,
          expectedOutput: "[2, 4, 6]",
        },
      ],
    },
    {
      unitNumber: 8,
      tools: [
        {
          type: "code-java",
          prompt: "Sum a 2D grid:",
          initialCode: `let grid = [[1, 2, 3], [4, 5, 6]];
let sum = 0;
for (let r = 0; r < grid.length; r++) {
  for (let c = 0; c < grid[0].length; c++) {
    sum += grid[r][c];
  }
}
System.out.println(sum);`,
          expectedOutput: "21",
        },
      ],
    },
    {
      unitNumber: 9,
      tools: [
        {
          type: "code-java",
          prompt: "Demonstrate polymorphism (simplified for the sandbox):",
          initialCode: `let animal = { sound: "generic" };
let dog = { sound: "woof" };
System.out.println(animal.sound);
System.out.println(dog.sound);`,
          expectedOutput: "generic\nwoof",
        },
      ],
    },
    {
      unitNumber: 10,
      tools: [
        {
          type: "code-java",
          prompt: "Recursive factorial:",
          initialCode: `function factorial(n) {
  if (n == 0) return 1;
  return n * factorial(n - 1);
}
System.out.println(factorial(6));`,
          expectedOutput: "720",
        },
      ],
    },
  ],
  "ap-cs-principles": [
    {
      unitNumber: 1,
      tools: [
        {
          type: "code-pseudo",
          prompt: "Sequence, selection, iteration:",
          initialCode: `x ← 5
IF (x > 0) {
  DISPLAY("positive")
} ELSE {
  DISPLAY("non-positive")
}`,
          expectedOutput: "positive",
        },
      ],
    },
    {
      unitNumber: 2,
      tools: [
        {
          type: "code-pseudo",
          prompt: "Convert a list to binary-count (length):",
          initialCode: `bits ← [1, 0, 1, 1]
DISPLAY(LENGTH(bits))`,
          expectedOutput: "4",
        },
      ],
    },
    {
      unitNumber: 3,
      tools: [
        {
          type: "code-pseudo",
          prompt: "REPEAT n TIMES:",
          initialCode: `total ← 0
REPEAT 10 TIMES {
  total ← total + 1
}
DISPLAY(total)`,
          expectedOutput: "10",
        },
      ],
    },
    {
      unitNumber: 4,
      tools: [
        {
          type: "code-pseudo",
          prompt: "Simulate packet count:",
          initialCode: `packets ← 0
REPEAT 5 TIMES {
  packets ← packets + 3
}
DISPLAY(packets)`,
          expectedOutput: "15",
        },
      ],
    },
    {
      unitNumber: 5,
      tools: [
        {
          type: "code-pseudo",
          prompt: "A tiny decision helper:",
          initialCode: `score ← 82
IF (score >= 80) {
  DISPLAY("pass")
} ELSE {
  DISPLAY("retake")
}`,
          expectedOutput: "pass",
        },
      ],
    },
  ],
};

const HISTORY_TOOLS: Record<string, UnitTools[]> = {};

const ALL_TOOLS: Record<string, UnitTools[]> = {
  ...MATH_TOOLS,
  ...SCIENCE_TOOLS,
  ...CS_TOOLS,
  ...HISTORY_TOOLS,
};

export function getUnitTools(
  courseSlug: string,
  unitNumber: number
): CourseTool[] {
  const course = ALL_TOOLS[courseSlug];
  if (!course) return [];
  return course.find((u) => u.unitNumber === unitNumber)?.tools ?? [];
}
