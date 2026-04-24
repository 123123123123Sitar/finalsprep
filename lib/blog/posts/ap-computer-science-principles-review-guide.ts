// Auto-split from lib/blogPosts.ts by tools/split_blogposts.ts.
// One file per post so diffs are small and git blame is readable.
//
// Do not edit the shape of this file manually; the loader in
// lib/blogPosts.ts expects a single named default export per slug.

import type { BlogPost } from "../../blogPosts";

export const POST_AP_COMPUTER_SCIENCE_PRINCIPLES_REVIEW_GUIDE: BlogPost = {
    slug: "ap-computer-science-principles-review-guide",
    title: "AP Computer Science Principles Review Guide",
    metaTitle: "AP CSP Review: Seven Big Ideas, Performance Task, and Exam (2026)",
    description:
      "AP Computer Science Principles review covering the 7 big ideas (creativity, abstraction, data, algorithms, programming, internet, impact), the performance task (30 percent), and written exam strategies.",
    excerpt:
      "AP CSP tests computational thinking, not syntax. Create a program, document it (30 percent of grade), then take a written exam (70 percent). Master the seven big ideas and you score well.",
    date: "2026-04-24",
    readTime: "12 min read",
    category: "AP Computer Science Principles",
    keywords: [
      "study guide",
      "exam prep",
      "computer science",
      "STEM",
    ],
    author: "FinalsPrep Team",
    type: "subject",
    content: [
      {
        type: "p",
        text: "AP Computer Science Principles tests whether you understand computational thinking and the impact of computing on society, not whether you can write error-free code in one language. The course and exam are split 30-70: 30 percent is the performance task (design and create a program), 70 percent is the written exam (60-70 multiple choice).",
      },
      { type: "h2", text: "Exam structure" },
      {
        type: "h3", text: "Performance task (30 percent)" },
      {
        type: "ul",
        items: [
          "Create a useful program: game, tool, visualization, data analyzer, etc.",
          "10 hours of class time to design, code, and test.",
          "Document your process: planning, design choices, code, testing evidence.",
          "Rubric assesses program functionality, code clarity, design thinking, and documentation.",
        ],
      },
      { type: "h3", text: "Written exam (70 percent)" },
      {
        type: "ul",
        items: [
          "60-70 multiple choice questions.",
          "2 hours.",
          "Covers all seven big ideas and their applications.",
        ],
      },
      { type: "h2", text: "The seven big ideas" },
      {
        type: "h3", text: "1. Creativity: computing as creative tool" },
      {
        type: "p",
        text: "Programs solve problems and create experiences. Computational thinking: break problems into parts, find patterns, design algorithms, test and iterate.",
      },
      { type: "h3", text: "2. Abstraction: layers hide complexity" },
      {
        type: "ul",
        items: [
          "Variables encapsulate values.",
          "Functions encapsulate logic.",
          "APIs and libraries encapsulate complex systems.",
          "You use abstraction without knowing implementation details.",
        ],
      },
      { type: "h3", text: "3. Data: represent and analyze information" },
      {
        type: "ul",
        items: [
          "Bits and bytes: fundamental units. 8 bits equals 1 byte.",
          "Data types: integers, floating-point, strings, booleans, images, audio.",
          "Data structures: arrays, lists, dictionaries, records.",
          "Searching and sorting: linear search O(n), binary search O(log n), merge sort O(n log n).",
        ],
      },
      { type: "h3", text: "4. Algorithms: step-by-step procedures" },
      {
        type: "ul",
        items: [
          "Sequence: do A then B.",
          "Selection: if condition then A else B.",
          "Iteration: repeat while or for loop.",
          "Big O: classify runtime. O(1) constant, O(n) linear, O(n squared) quadratic, O(2 to the n) exponential.",
        ],
      },
      { type: "h3", text: "5. Programming: code as expression" },
      {
        type: "p",
        text: "Syntax differs by language. Logic does not. Exam uses pseudocode or Python, not exact syntax. Debugging: read errors, trace code, test assumptions.",
      },
      { type: "h3", text: "6. Internet: distributed systems" },
      {
        type: "ul",
        items: [
          "Packets: data chopped up with headers and routed to destination.",
          "Protocols: standards for communication (HTTP, TCP slash IP, DNS).",
          "Bandwidth: data per second. Latency: delay in milliseconds.",
          "Encryption: scramble data so only intended recipients can read it.",
          "Cybersecurity: passwords, two-factor, firewalls, updates.",
        ],
      },
      { type: "h3", text: "7. Impact: computing and society" },
      {
        type: "ul",
        items: [
          "Accessibility: is the software usable by everyone?",
          "Privacy: what data is collected and shared?",
          "Bias in algorithms: garbage data produces biased algorithms.",
          "Digital divide: not everyone has internet access.",
          "Environmental: data centers consume power. Efficiency saves energy.",
          "IP and open source: who owns software? What are you allowed to do with it?",
        ],
      },
      { type: "h2", text: "How to score a 5" },
      {
        type: "ol",
        items: [
          "Performance task: build something you believe in. Document it thoroughly. Passion counts.",
          "Study the seven big ideas. They connect every exam question.",
          "Learn Big O notation. Understand O(n) vs O(n squared) vs O(log n). The exam tests this constantly.",
          "Know binary, internet basics (packets, DNS, encryption), and algorithms (sorting, searching).",
          "Impact big idea is 15-20 percent of exam. Real-world consequences matter: privacy, bias, accessibility.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Obsessing over perfect syntax. The exam grades logic, not error-free code.",
          "Performance task too simple (hello world) or too ambitious (unfinished). Build something moderate and complete it.",
          "Confusing bandwidth and latency. Bandwidth is capacity (how much), latency is delay (how fast).",
          "Forgetting the impact big idea. It is 15-20 percent of the exam, not optional.",
          "Thinking CSP is just binary or just programming. It is about computational thinking across all domains.",
        ],
      },
      {
        type: "p",
        text: "AP Computer Science Principles rewards computational thinking and an understanding of computing's power and limits. Master the seven big ideas and the exam becomes straightforward.",
      },
    ],
  };
