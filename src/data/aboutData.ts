interface Experience {
  company: string;
  role: string;
  start: string;
  end: string;
}

export const experienceData: Experience[] = [
  {
    company: "Okapi Sports",
    role: "Frontend Engineer",
    start: "09/2025",
    end: "03/2026",
  },
  {
    company: "Outreachy / Mozilla",
    role: "Open Source Contributor",
    start: "11/2023",
    end: "11/2023",
  },
  {
    company: "ALX-Africa",
    role: "Software Engineering Fellow",
    start: "11/2022",
    end: "01/2024",
  },
  {
    company: "Hitech Solutions",
    role: "Frontend Engineer",
    start: "05/2022",
    end: "11/2022",
  },
  {
    company: "Sycamore NG",
    role: "Frontend Engineer",
    start: "11/2021",
    end: "04/2022",
  },
  {
    company: "Tech4Dev",
    role: "Software Engineering Fellow",
    start: "03/2021",
    end: "03/2022",
  },
];

export const skillCategories = [
  {
    label: "the stack i live in",
    items: [
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Vue.js",
      "Svelte",
      "HTML5",
      "CSS3",
      "API Integration",
    ],
  },
  { label: "how i manage state", items: ["Redux", "Zustand", "Context API"] },
  {
    label: "making things pretty",
    items: ["Tailwind CSS", "Shadcn", "CSS Modules"],
  },
  {
    label: "my comfort zone",
    items: [
      "Figma",
      "Design tokens",
      "Component library architecture",
      "Storybook",
      "Wireframing",
      "Prototyping",
      "Responsive design",
      "Accessibility (WCAG)",
    ],
  },
  {
    label: "how i think about people",
    items: [
      "Cross-functional collaboration",
      "Remote async communication",
      "Documentation",
      "Design-engineering handoff",
    ],
  },
  {
    label: "my daily toolkit",
    items: ["Git", "GitHub", "CI/CD", "RESTful APIs", "Agile", "Scrum"],
  },
  { label: "trust but verify", items: ["Jest", "Cypress", "Vitest"] },
  { label: "taming the inputs", items: ["D3.js", "Chart.js"] },
];

export const statLayout = [
  {
    y: -6,
    rotate: -0.5,
    label: "Years Experience",
    target: 5,
    micro: "years (and counting)",
  },
  {
    y: 4,
    rotate: 0.8,
    label: "Companies",
    target: 6,
    micro: "companies, all still talking to me",
  },
  {
    y: -4,
    rotate: -0.3,
    label: "Design Systems",
    target: 1,
    micro: "design system i'm unreasonably proud of",
  },
];

export const skillTilts = [-0.8, 0.5, -0.3, 1.0, -0.6, 0.4, -0.5];
