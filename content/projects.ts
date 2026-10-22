export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  kind: "school" | "mobile" | "products";
  overview: string;
  businessNeed: string;
  architecture: string;
  capabilities: string[];
  challenges: string;
  contribution: string;
  results?: string;
  pending: string[];
};
export const work = {
  eyebrow: "02 / SELECTED WORK",
  heading: "SELECTED WORK",
  intro: "Web platforms. Mobile experiences. Thoughtful engineering.",
  other: "Other professional work",
  caseLink: "Explore case study",
  visualNote: "CONCEPT VISUAL · SCREENSHOTS TO CONFIRM",
};
export const caseCopy = {
  back: "Back to selected work",
  labels: [
    "Overview",
    "Business need",
    "Architecture",
    "Features",
    "Technical challenges",
    "My contribution",
    "Results",
  ],
  pending: "Publication details",
  next: "NEXT PROJECT",
  contact: "Have a project in mind? Let’s talk",
  visualNote:
    "These abstract interface studies illustrate product workflows. They are not original product screenshots. No usage or performance metrics are implied.",
};
export const projects: Project[] = [
  {
    slug: "madrasaticom",
    number: "01",
    title: "MadrasatiCom",
    category: "FULL-STACK SAAS / EDUCATION",
    description:
      "A connected platform for the whole school — students, enrollment, teachers, attendance, payments, exams, timetables, and reports.",
    stack: ["Next.js", "React", "Node.js", "Express", "MongoDB"],
    kind: "school",
    overview:
      "An education management platform connecting academic workflows and school administration in one full-stack product.",
    businessNeed:
      "Bring student records, teaching operations, financial tracking, and role-based administration into one coherent workspace.",
    architecture:
      "A Next.js / React interface connects to a Node.js and Express REST API, with MongoDB for application data and production deployment.",
    capabilities: [
      "Students & enrollment",
      "Teachers & attendance",
      "Payments & finance",
      "Exams & grades",
      "Timetables & reports",
      "Role-based access",
    ],
    challenges:
      "Specific engineering challenges and implementation tradeoffs are awaiting confirmation.",
    contribution:
      "Individual ownership across interface, API, data, and deployment needs to be distinguished from work completed by the wider team.",
    pending: [
      "Screenshots",
      "Project year",
      "Demo link",
      "GitHub link",
      "Personal contribution",
      "Technical challenges",
    ],
  },
  {
    slug: "popcard",
    number: "02",
    title: "Popcard Rewards Staff App",
    category: "REACT NATIVE / EXPO",
    description:
      "The staff app of a loyalty platform. Scan QR and barcode tickets, verify them through the API, and handle every status and error.",
    stack: ["React Native", "Expo", "EAS", "Redux Toolkit", "REST APIs"],
    kind: "mobile",
    overview:
      "An iOS and Android staff application supporting the day-to-day operation of a loyalty platform.",
    businessNeed:
      "Give staff a reliable mobile workflow for recognizing customers, verifying tickets, and handling rewards at the point of interaction.",
    architecture:
      "React Native and Expo with API integrations, EAS builds and OTA updates, and iOS release workflows through TestFlight.",
    capabilities: [
      "QR & barcode ticket scanning",
      "API verification & status handling",
      "Points, tiers & cashback",
      "Apple & Google Wallet",
      "WhatsApp Business messages",
      "EAS releases & TestFlight",
    ],
    challenges:
      "Ticket workflows require clear status validation and error handling. Detailed implementation decisions and measured performance improvements are awaiting confirmation.",
    contribution:
      "Professional development and maintenance work on the staff app as part of the Popcard team. Exact feature ownership is awaiting confirmation.",
    pending: [
      "Screenshots",
      "Project year",
      "Demo link",
      "GitHub link",
      "Personal contribution",
      "Technical challenges",
    ],
  },
  {
    slug: "product-manager",
    number: "03",
    title: "Product Manager",
    category: "FULL-STACK / WEB APPLICATION",
    description:
      "Product and data management, from everyday CRUD workflows to the backend API, admin dashboard, and production environment.",
    stack: ["Next.js", "TypeScript", "Node.js", "Express", "MongoDB"],
    kind: "products",
    overview:
      "A full-stack application connecting product and data management workflows with an administrative interface, API, and database.",
    businessNeed:
      "Make product records easier to create, inspect, update, and maintain through a connected admin workspace.",
    architecture:
      "Next.js and TypeScript on the frontend, Node.js and Express on the backend, and MongoDB for persistence, with development and production environments.",
    capabilities: [
      "Product & data management",
      "CRUD workflows",
      "Backend API",
      "Admin dashboard",
      "Development environment",
      "Production environment",
    ],
    challenges:
      "Specific technical challenges, authentication implementation, and production tradeoffs are awaiting confirmation.",
    contribution:
      "Individual responsibilities across the full-stack application are awaiting confirmation.",
    pending: [
      "Screenshots",
      "Project year",
      "Demo link",
      "GitHub link",
      "Personal contribution",
      "Technical challenges",
    ],
  },
];
export const visualCopy = {
  school: {
    brand: "MadrasatiCom",
    heading: "Your school, connected.",
    nav: ["Overview", "Students", "Academics", "Finance"],
    tiles: ["Students", "Attendance", "Classes"],
    chart: "Attendance overview",
    side: "Today’s schedule",
  },
  products: {
    brand: "Product Manager",
    heading: "Everything in its place.",
    nav: ["Overview", "Products", "Categories", "Reports"],
    tiles: ["Products", "Categories", "Active"],
    chart: "Product activity",
    side: "Recent updates",
  },
  mobile: {
    brand: "popcard",
    screens: ["Scan", "Customer", "History"],
    scan: "Scan a ticket",
    customer: "Customer rewards",
    history: "Reward history",
    notification: "Ticket verified",
    note: "Ready for the next reward",
  },
};
