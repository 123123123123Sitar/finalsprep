/**
 * Official AP Course and Exam Description (CED) unit + topic breakdowns
 * for the CS courses.
 *
 * AP CSA uses a 10-unit Java-based framework. AP CSP uses 5 "Big Ideas"
 * (modeled as units 1-5 for consistency with our data model).
 */

export type ApTopicLite = { id: string; title: string };
export type ApUnitLite = { number: number; title: string; topics: ApTopicLite[] };

export const CS_UNITS: Record<string, ApUnitLite[]> = {
  // =========================================================================
  // AP COMPUTER SCIENCE A (10 units)
  // =========================================================================
  "ap-cs-a": [
    {
      number: 1,
      title: "Primitive Types",
      topics: [
        { id: "1.1", title: "Why Programming? Why Java?" },
        { id: "1.2", title: "Variables and Data Types" },
        { id: "1.3", title: "Expressions and Assignment Statements" },
        { id: "1.4", title: "Compound Assignment Operators" },
        { id: "1.5", title: "Casting and Ranges of Variables" },
      ],
    },
    {
      number: 2,
      title: "Using Objects",
      topics: [
        { id: "2.1", title: "Objects: Instances of Classes" },
        { id: "2.2", title: "Creating and Storing Objects (Instantiation)" },
        { id: "2.3", title: "Calling a Void Method" },
        { id: "2.4", title: "Calling a Void Method with Parameters" },
        { id: "2.5", title: "Calling a Non-void Method" },
        { id: "2.6", title: "String Objects: Concatenation, Literals, and More" },
        { id: "2.7", title: "String Methods" },
        { id: "2.8", title: "Wrapper Classes: Integer and Double" },
        { id: "2.9", title: "Using the Math Class" },
      ],
    },
    {
      number: 3,
      title: "Boolean Expressions and if Statements",
      topics: [
        { id: "3.1", title: "Boolean Expressions" },
        { id: "3.2", title: "if Statements and Control Flow" },
        { id: "3.3", title: "if-else Statements" },
        { id: "3.4", title: "else if Statements" },
        { id: "3.5", title: "Compound Boolean Expressions" },
        { id: "3.6", title: "Equivalent Boolean Expressions" },
        { id: "3.7", title: "Comparing Objects" },
      ],
    },
    {
      number: 4,
      title: "Iteration",
      topics: [
        { id: "4.1", title: "while Loops" },
        { id: "4.2", title: "for Loops" },
        { id: "4.3", title: "Developing Algorithms Using Strings" },
        { id: "4.4", title: "Nested Iteration" },
        { id: "4.5", title: "Informal Code Analysis" },
      ],
    },
    {
      number: 5,
      title: "Writing Classes",
      topics: [
        { id: "5.1", title: "Anatomy of a Class" },
        { id: "5.2", title: "Constructors" },
        { id: "5.3", title: "Documentation with Comments" },
        { id: "5.4", title: "Accessor Methods" },
        { id: "5.5", title: "Mutator Methods" },
        { id: "5.6", title: "Writing Methods" },
        { id: "5.7", title: "Static Variables and Methods" },
        { id: "5.8", title: "Scope and Access" },
        { id: "5.9", title: "this Keyword" },
        { id: "5.10", title: "Ethical and Social Implications of Computing Systems" },
      ],
    },
    {
      number: 6,
      title: "Array",
      topics: [
        { id: "6.1", title: "Array Creation and Access" },
        { id: "6.2", title: "Traversing Arrays" },
        { id: "6.3", title: "Enhanced for Loop for Arrays" },
        { id: "6.4", title: "Developing Algorithms Using Arrays" },
      ],
    },
    {
      number: 7,
      title: "ArrayList",
      topics: [
        { id: "7.1", title: "Introduction to ArrayList" },
        { id: "7.2", title: "ArrayList Methods" },
        { id: "7.3", title: "Traversing ArrayLists" },
        { id: "7.4", title: "Developing Algorithms Using ArrayLists" },
        { id: "7.5", title: "Searching" },
        { id: "7.6", title: "Sorting" },
        { id: "7.7", title: "Ethical Issues Around Data Collection" },
      ],
    },
    {
      number: 8,
      title: "2D Array",
      topics: [
        { id: "8.1", title: "2D Arrays" },
        { id: "8.2", title: "Traversing 2D Arrays" },
      ],
    },
    {
      number: 9,
      title: "Inheritance",
      topics: [
        { id: "9.1", title: "Creating Superclasses and Subclasses" },
        { id: "9.2", title: "Writing Constructors for Subclasses" },
        { id: "9.3", title: "Overriding Methods" },
        { id: "9.4", title: "super Keyword" },
        { id: "9.5", title: "Creating References Using Inheritance Hierarchies" },
        { id: "9.6", title: "Polymorphism" },
        { id: "9.7", title: "Object Superclass" },
      ],
    },
    {
      number: 10,
      title: "Recursion",
      topics: [
        { id: "10.1", title: "Recursion" },
        { id: "10.2", title: "Recursive Searching and Sorting" },
      ],
    },
  ],

  // =========================================================================
  // AP COMPUTER SCIENCE PRINCIPLES (5 Big Ideas)
  // =========================================================================
  "ap-cs-principles": [
    {
      number: 1,
      title: "Big Idea 1: Creative Development",
      topics: [
        { id: "1.1", title: "Collaboration" },
        { id: "1.2", title: "Program Function and Purpose" },
        { id: "1.3", title: "Program Design and Development" },
        { id: "1.4", title: "Identifying and Correcting Errors" },
      ],
    },
    {
      number: 2,
      title: "Big Idea 2: Data",
      topics: [
        { id: "2.1", title: "Binary Numbers" },
        { id: "2.2", title: "Data Compression" },
        { id: "2.3", title: "Extracting Information from Data" },
        { id: "2.4", title: "Using Programs with Data" },
      ],
    },
    {
      number: 3,
      title: "Big Idea 3: Algorithms and Programming",
      topics: [
        { id: "3.1", title: "Variables and Assignments" },
        { id: "3.2", title: "Data Abstraction" },
        { id: "3.3", title: "Mathematical Expressions" },
        { id: "3.4", title: "Strings" },
        { id: "3.5", title: "Boolean Expressions" },
        { id: "3.6", title: "Conditionals" },
        { id: "3.7", title: "Nested Conditionals" },
        { id: "3.8", title: "Iteration" },
        { id: "3.9", title: "Developing Algorithms" },
        { id: "3.10", title: "Lists" },
        { id: "3.11", title: "Binary Search" },
        { id: "3.12", title: "Calling Procedures" },
        { id: "3.13", title: "Developing Procedures" },
        { id: "3.14", title: "Libraries" },
        { id: "3.15", title: "Random Values" },
        { id: "3.16", title: "Simulations" },
        { id: "3.17", title: "Algorithmic Efficiency" },
        { id: "3.18", title: "Undecidable Problems" },
      ],
    },
    {
      number: 4,
      title: "Big Idea 4: Computer Systems and Networks",
      topics: [
        { id: "4.1", title: "The Internet" },
        { id: "4.2", title: "Fault Tolerance" },
        { id: "4.3", title: "Parallel and Distributed Computing" },
      ],
    },
    {
      number: 5,
      title: "Big Idea 5: Impact of Computing",
      topics: [
        { id: "5.1", title: "Beneficial and Harmful Effects" },
        { id: "5.2", title: "Digital Divide" },
        { id: "5.3", title: "Computing Bias" },
        { id: "5.4", title: "Crowdsourcing" },
        { id: "5.5", title: "Legal and Ethical Concerns" },
        { id: "5.6", title: "Safe Computing" },
      ],
    },
  ],
};
