export type ContentStatus = "draft" | "review" | "published" | "rejected";
export type Difficulty = "Foundation" | "Higher";
export type BloomLevel = "Remember" | "Understand" | "Apply" | "Analyse" | "Evaluate";

export type CurriculumNode = {
  title: string;
  description: string;
  topics: Array<{
    title: string;
    description: string;
  }>;
};

export type Lesson = {
  id: string;
  title: string;
  unit: string;
  status: ContentStatus;
  difficulty: Difficulty;
  learningObjectives: string[];
  explanation: string;
  workedExamples: string[];
  practiceQuestions: string[];
  homework: string;
  markScheme: string[];
  teacherNotes: string;
};

export type Question = {
  id: string;
  text: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  marks: number;
  difficulty: Difficulty;
  topic: string;
  commandWord: string;
  bloomLevel: BloomLevel;
  status: ContentStatus;
};

export type ReviewItem = {
  id: string;
  title: string;
  contentType: "Lesson" | "Question";
  status: ContentStatus;
  reviewer: string;
  notes: string;
  history: Array<{ label: string; detail: string }>;
};

export const curriculumStructure: CurriculumNode[] = [
  {
    title: "Number",
    description: "Build fluency with integers, fractions, percentages, ratio and standard form.",
    topics: [
      { title: "Integers", description: "Directed numbers and number lines" },
      { title: "Factors and Multiples", description: "Prime factors, HCF and LCM" },
      { title: "Fractions", description: "Simplifying, operations and problem solving" },
      { title: "Decimals", description: "Place value and recurring decimals" },
      { title: "Percentages", description: "Increase, decrease and simple interest" },
      { title: "Ratio and Proportion", description: "Sharing, scaling and compound measures" },
      { title: "Standard Form", description: "Scientific notation and powers of ten" },
      { title: "Bounds and Estimation", description: "Upper and lower bounds" },
    ],
  },
  {
    title: "Algebra",
    description: "Develop algebraic manipulation, equations and sequences.",
    topics: [
      { title: "Expressions", description: "Collecting like terms and factorising" },
      { title: "Equations", description: "Linear and quadratic solutions" },
      { title: "Graphs", description: "Straight-line and quadratic graphs" },
    ],
  },
  {
    title: "Geometry and Measures",
    description: "Explore 2D shapes, area, volume and transformations.",
    topics: [
      { title: "Angles", description: "Parallel lines and polygons" },
      { title: "Area and Volume", description: "Compound shapes and prisms" },
      { title: "Transformations", description: "Translations, rotations and reflections" },
    ],
  },
  {
    title: "Trigonometry",
    description: "Introduce right-angled triangles and sine, cosine and tangent.",
    topics: [
      { title: "Right-Angled Triangles", description: "SOHCAHTOA and inverse functions" },
      { title: "Bearings", description: "Direction and scale drawing" },
    ],
  },
  {
    title: "Statistics",
    description: "Analyse data sets, averages and interpretation.",
    topics: [
      { title: "Averages", description: "Mean, median, mode and range" },
      { title: "Charts", description: "Histograms, box plots and cumulative frequency" },
    ],
  },
  {
    title: "Probability",
    description: "Model chance and compare theoretical to experimental outcomes.",
    topics: [
      { title: "Single Events", description: "Fractions and relative frequency" },
      { title: "Combined Events", description: "Tree diagrams and sample space" },
    ],
  },
];

export const lessons: Lesson[] = [
  {
    id: "LESS-001",
    title: "Integers and Number Lines",
    unit: "Number",
    status: "published",
    difficulty: "Foundation",
    learningObjectives: [
      "Order integers accurately",
      "Compare positive and negative values",
      "Solve directed number problems",
    ],
    explanation:
      "Learners use a number line to compare values and apply sign rules when adding and subtracting integers.",
    workedExamples: [
      "Calculate -7 + 5 using a number line.",
      "Solve 4 - 9 by moving left from zero.",
    ],
    practiceQuestions: [
      "What is -3 + 8?",
      "Arrange -4, 2, -1 in order from smallest to largest.",
    ],
    homework: "Complete 10 integer operations and describe one real-life context.",
    markScheme: ["Award 1 mark for correct order", "Award 2 marks for fully correct calculations"],
    teacherNotes: "Use a horizontal number line to support visual learners and check common sign mistakes.",
  },
];

export const questions: Question[] = [
  {
    id: "Q-001",
    text: "What is the value of -6 + 9?",
    options: ["-15", "3", "-3", "15"],
    correctAnswer: "3",
    explanation: "Moving 9 steps right from -6 lands on 3.",
    marks: 2,
    difficulty: "Foundation",
    topic: "Integers",
    commandWord: "Calculate",
    bloomLevel: "Apply",
    status: "published",
  },
  {
    id: "Q-002",
    text: "Write 0.00045 in standard form.",
    options: ["4.5 × 10^-4", "4.5 × 10^-5", "4.5 × 10^4", "45 × 10^-5"],
    correctAnswer: "4.5 × 10^-4",
    explanation: "The decimal moves four places to the right, so the index is -4.",
    marks: 2,
    difficulty: "Higher",
    topic: "Standard Form",
    commandWord: "Write",
    bloomLevel: "Understand",
    status: "review",
  },
  {
    id: "Q-003",
    text: "A bag contains 3 red and 2 blue counters. What is the probability of picking a blue counter?",
    options: ["3/5", "2/5", "1/2", "1/5"],
    correctAnswer: "2/5",
    explanation: "There are 2 favourable outcomes out of 5 total counters.",
    marks: 2,
    difficulty: "Foundation",
    topic: "Probability",
    commandWord: "Calculate",
    bloomLevel: "Apply",
    status: "published",
  },
  {
    id: "Q-004",
    text: "Simplify 3x + 4 - x + 7.",
    options: ["2x + 11", "4x + 3", "2x + 3", "4x + 11"],
    correctAnswer: "2x + 11",
    explanation: "Combine like terms to obtain 2x and 11.",
    marks: 2,
    difficulty: "Foundation",
    topic: "Algebra",
    commandWord: "Simplify",
    bloomLevel: "Apply",
    status: "published",
  },
  {
    id: "Q-005",
    text: "Find the HCF of 24 and 36.",
    options: ["6", "8", "12", "18"],
    correctAnswer: "12",
    explanation: "The greatest common factor of 24 and 36 is 12.",
    marks: 2,
    difficulty: "Foundation",
    topic: "Factors and Multiples",
    commandWord: "Find",
    bloomLevel: "Remember",
    status: "draft",
  },
];

export const reviewQueue: ReviewItem[] = [
  {
    id: "REV-001",
    title: "Standard form worked example",
    contentType: "Lesson",
    status: "review",
    reviewer: "Aisha Khan",
    notes: "Needs a short explanation of negative powers.",
    history: [
      { label: "Submitted", detail: "Today, 09:15" },
      { label: "Assigned", detail: "Today, 10:00" },
    ],
  },
  {
    id: "REV-002",
    title: "Probability question set",
    contentType: "Question",
    status: "review",
    reviewer: "Mateo Cruz",
    notes: "Consider adding a second challenge tier for Higher candidates.",
    history: [
      { label: "Submitted", detail: "Yesterday, 16:30" },
      { label: "Returned", detail: "Today, 08:00" },
    ],
  },
];

export const recentActivity = [
  { title: "Lesson published", detail: "Integers and Number Lines is now live in the library." },
  { title: "Question reviewed", detail: "Question Q-003 was approved and scheduled for the next assessment." },
  { title: "Revision requested", detail: "Review notes were added for the standard form lesson draft." },
];

export const quickActions = [
  { title: "Create lesson", href: "/mathematics/lessons" },
  { title: "Add question", href: "/mathematics/questions" },
  { title: "Open review queue", href: "/mathematics/review" },
];
