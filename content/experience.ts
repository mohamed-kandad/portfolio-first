export type Experience = {
  company: string;
  dates: string;
  role: string;
  location: string;
  summary: string;
  responsibilities: string[];
};
export const career = { eyebrow: "03 / THE JOURNEY", heading: "EXPERIENCE" };
export const experience: Experience[] = [
  {
    company: "Popcard",
    dates: "07/2025 – Present",
    role: "Full Stack Developer",
    location: "Casablanca",
    summary:
      "Full-stack dashboards, mobile loyalty apps, API integrations, and production operations.",
    responsibilities: [
      "React.js / Next.js dashboards with Material UI and RTK Query; React Native / Expo apps and reusable components.",
      "Node.js / Express REST APIs: business logic, JWT authentication, validation, error handling, and MongoDB.",
      "Mobile publishing: EAS builds, OTA updates, TestFlight, App Store Connect, push notifications, and RTL.",
      "Loyalty platforms with points, tiers, and cashback connected to Apple Wallet and Google Wallet.",
      "QR / barcode ticket scanning with API verification; WhatsApp Business API automated messages and templates.",
      "GitHub Actions CI/CD; deployment and maintenance on a Linux VPS with Nginx and PM2; incident resolution.",
    ],
  },
  {
    company: "RiverTech",
    dates: "01/2025 – 06/2025",
    role: "Mobile Frontend Developer",
    location: "Casablanca",
    summary:
      "React Native interfaces from Figma, Redux Toolkit state, and SCRUM collaboration.",
    responsibilities: [
      "Built React Native interfaces from Figma mockups.",
      "Managed application state with Redux Toolkit.",
      "Collaborated through SCRUM and Jira.",
    ],
  },
  {
    company: "BigHouse Marketing",
    dates: "04/2024 – 01/2025",
    role: "Frontend Developer",
    location: "Remote",
    summary:
      "Real-time mobile asset management with financial APIs and WebSockets.",
    responsibilities: [
      "Developed React Native interfaces for real-time asset management.",
      "Connected Redux Toolkit state with financial APIs and WebSockets.",
    ],
  },
  {
    company: "Mahalat.ma",
    dates: "08/2023 – 04/2024",
    role: "Frontend Developer",
    location: "Remote",
    summary:
      "Next.js component redesign, Redux Toolkit, and responsive cross-browser improvements.",
    responsibilities: [
      "Redesigned UI components with Next.js and Redux Toolkit.",
      "Performed cross-browser testing and responsive fixes.",
    ],
  },
  {
    company: "Cactus",
    dates: "01/2021 – 08/2021",
    role: "Frontend Developer (internship)",
    location: "Remote",
    summary:
      "Next.js frontend and REST API integration for an HR and payroll platform.",
    responsibilities: [
      "Built the frontend of an HR and payroll platform in Next.js.",
      "Integrated REST APIs into application workflows.",
    ],
  },
];
