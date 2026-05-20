import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CurlyLine from "./CurlyLine";

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    company: "Okapi Sports",
    role: "Frontend Engineer",
    start: "09/2025",
    end: "Present",
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

const skillCategories = [
  {
    label: "frameworks",
    items: [
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Vue.js",
      "Svelte",
      "HTML5",
      "CSS3",
    ],
  },
  { label: "state", items: ["Redux", "Context API"] },
  {
    label: "styling",
    items: ["Tailwind CSS", "Shadcn", "CSS Modules"],
  },
  {
    label: "design systems",
    items: [
      "Design tokens",
      "Component library architecture",
      "Figma",
      "Wireframing",
      "Prototyping",
    ],
  },
  {
    label: "ui/ux",
    items: [
      "Information hierarchy",
      "Interaction patterns",
      "Accessibility (WCAG)",
      "Responsive design",
    ],
  },
  {
    label: "tools",
    items: ["Git", "GitHub", "Vite", "CI/CD", "RESTful APIs", "Agile", "Scrum"],
  },
  { label: "testing", items: ["Cypress", "Jest"] },
];

const statLayout = [
  { y: -6, rotate: -0.5, label: "Years Experience", target: 5 },
  { y: 4, rotate: 0.8, label: "Companies", target: 6 },
  { y: -4, rotate: -0.3, label: "Design Systems", target: 1 },
];

const skillTilts = [-0.8, 0.5, -0.3, 1.0, -0.6, 0.4, -0.5];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [stats, setStats] = useState({ years: 0, companies: 0, systems: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    const label = section.querySelector(".about-label");
    if (label) {
      const t = gsap.fromTo(label,
        { x: -30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: label,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          immediateRender: false,
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    }

    const headingLines = section.querySelectorAll(".about-heading-line");
    if (headingLines.length) {
      const t = gsap.fromTo(headingLines,
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: headingLines[0].parentElement,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          immediateRender: false,
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    }

    const swoosh = section.querySelector(".heading-swoosh");
    if (swoosh) {
      const t = gsap.fromTo(swoosh,
        { scaleX: 0 },
        {
          scrollTrigger: {
            trigger: swoosh,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
          transformOrigin: "left center",
          immediateRender: false,
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    }

    const introEl = section.querySelector(".about-intro");
    if (introEl) {
      const text = introEl.textContent?.trim() || "";
      if (text) {
        const words = text.split(/\s+/);
        introEl.innerHTML = "";
        const wordSpans: HTMLElement[] = [];
        words.forEach((w, i) => {
          const span = document.createElement("span");
          span.textContent = w + (i < words.length - 1 ? "\u00A0" : "");
          span.style.display = "inline-block";
          introEl.appendChild(span);
          wordSpans.push(span);
        });
        const t = gsap.fromTo(wordSpans,
          { y: 15, opacity: 0 },
          {
            scrollTrigger: {
              trigger: introEl,
              start: "top 88%",
              end: "top 40%",
              scrub: 1,
            },
            y: 0,
            opacity: 1,
            stagger: 0.03,
            ease: "power2.out",
          }
        );
        if (t.scrollTrigger) triggers.push(t.scrollTrigger);
      }
    }

    const statCards = section.querySelectorAll(".stat");
    if (statCards.length) {
      const t = gsap.fromTo(statCards,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: statCards[0].parentElement,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          immediateRender: false,
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);

      statCards.forEach((card, i) => {
        const numEl = card.querySelector(".stat-number") as HTMLElement | null;
        if (!numEl) return;
        const target = parseFloat(numEl.getAttribute("data-target") || "0");
        if (isNaN(target)) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => {
            const rounded = Math.round(obj.val);
            if (i === 0) setStats((prev) => ({ ...prev, years: rounded }));
            if (i === 1) setStats((prev) => ({ ...prev, companies: rounded }));
            if (i === 2) setStats((prev) => ({ ...prev, systems: rounded }));
          },
        });
      });

      statCards.forEach((card, i) => {
        const numEl = card.querySelector(".stat-number") as HTMLElement | null;
        if (numEl) {
          numEl.style.animation = "statFloat 3s ease-in-out infinite";
          numEl.style.animationDelay = `${i * 0.3 + 2.5}s`;
        }
      });
    }

    const timelineRows = section.querySelectorAll(".timeline-row");
    if (timelineRows.length) {
      const t = gsap.fromTo(timelineRows,
        { opacity: 0.3, y: 8 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: timelineRows[0].parentElement,
            start: "top 85%",
            end: "top 45%",
            scrub: 1,
          },
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    }

    const skillGroups = section.querySelectorAll(".skill-group");
    if (skillGroups.length) {
      const t = gsap.fromTo(skillGroups,
        { y: 30, opacity: 0, rotate: -2 },
        {
          scrollTrigger: {
            trigger: skillGroups[0].parentElement,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
          immediateRender: false,
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    }

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section bg-dot-grid bg-bg px-6 sm:px-12 py-24 sm:py-32"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Layer 1 — Paper grain */}
        <div className="about-grain" />
        {/* Layer 2 — Wavy line repeat */}
        <div className="about-wavy" />
        <div className="about-frame">
          <div className="flex items-center gap-4 mb-10">
            <span className="about-label font-mono text-[10px] tracking-[0.12em] text-accent uppercase shrink-0">
              ✦ 01 //about me
            </span>
            <span className="flex-1 about-divider" />
          </div>

          <div className="mb-3">
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <span
                className="about-heading-line about-headline text-[clamp(44px,8vw,90px)] leading-[0.85]"
                style={{ transform: "rotate(-0.8deg)" }}
              >
                FRONTEND
              </span>
              <span
                className="about-heading-line about-headline text-[clamp(44px,8vw,90px)] leading-[0.85]"
                style={{ transform: "rotate(0.4deg)" }}
              >
                ENGINEER
              </span>
            </div>

            <svg
              viewBox="0 0 400 16"
              className="w-full max-w-[400px] h-4 my-3 ml-2"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0 8 C 15 0, 30 16, 45 8 S 75 0, 90 8 S 120 0, 135 8 S 165 0, 180 8 S 210 0, 225 8 S 255 0, 270 8 S 300 0, 315 8 S 345 0, 360 8 S 390 0, 400 8"
                stroke="var(--color-accent)"
                strokeWidth="2"
                opacity="0.3"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span
                className="about-heading-line about-headline text-[clamp(24px,4vw,48px)] leading-[1] italic text-fg/70"
                style={{ transform: "rotate(0.6deg)" }}
              >
                & DESIGN SYSTEM
              </span>
              <span
                className="about-heading-line about-headline text-[clamp(24px,4vw,48px)] leading-[1] italic text-fg/70"
                style={{ transform: "rotate(-0.3deg)" }}
              >
                BUILDER
              </span>
            </div>
          </div>

          <svg
            viewBox="0 0 400 14"
            className="heading-swoosh w-full max-w-[400px] h-3 mb-8"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 11 C 40 2, 80 16, 120 9 S 200 2, 240 9 S 320 2, 360 9 S 390 5, 398 7"
              stroke="var(--color-accent)"
              strokeWidth="2"
              opacity="0.35"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="flex gap-4 mb-8">
            <svg
              width="24"
              height="120"
              viewBox="0 0 24 120"
              fill="none"
              className="shrink-0 mt-1"
              aria-hidden="true"
            >
              <path
                d="M20 4 C 6 4, 4 30, 4 60 C 4 90, 6 116, 20 116"
                stroke="var(--color-accent)"
                strokeWidth="2"
                opacity="0.25"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="flex-1">
              <p className="about-intro about-body text-[16px] sm:text-[17px] leading-[1.8] text-fg/85 max-w-[700px]">
                I help companies, brands and entrepreneurs develop digital
                products and achieve their goals.
              </p>
              <p className="font-mono text-[10px] text-accent/60 tracking-[0.1em] mt-2 uppercase">
                ✧ functional solutions × aesthetics
              </p>
            </div>
          </div>

          <CurlyLine className="my-8" />

          <div className="font-mono text-[9px] tracking-[0.14em] text-accent/60 uppercase mb-5">
            ✦ metrics
          </div>

          <div className="flex flex-wrap justify-start gap-5 mb-8">
            {statLayout.map((s, i) => (
              <div
                key={s.label}
                className={`stat min-w-[180px] flex-1 max-w-[260px] text-center p-6 ${
                  i === 0
                    ? "bg-accent/15 border border-accent/20"
                    : "about-card"
                }`}
                style={{
                  transform: `translateY(${s.y}px) rotate(${s.rotate}deg)`,
                  borderRadius: i === 0 ? "30px" : "var(--about-radius)",
                }}
              >
                <span
                  className="stat-number about-headline text-[clamp(44px,4vw,60px)] tracking-[-0.03em] leading-none text-fg block"
                  data-target={s.target}
                >
                  {i === 0 ? stats.years : i === 1 ? stats.companies : stats.systems}
                </span>
                <span className="about-meta text-[9px] tracking-[0.1em] uppercase block mt-1.5">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <span className="font-mono text-[10px] text-accent/50 tracking-[0.12em] uppercase">
              ✦ 5+ years of shipping ✦
            </span>
          </div>

          <CurlyLine className="my-8" />

          <div className="font-mono text-[9px] tracking-[0.14em] text-accent/60 uppercase mb-5">
            ✦ experience
          </div>

          <div className="timeline mb-8">
            {experienceData.map((exp) => (
              <div
                key={exp.company + exp.start}
                className="timeline-row flex items-start gap-3 py-2.5"
              >
                <div className="about-dot shrink-0 mt-2" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="font-mono text-[10px] text-muted tracking-[0.04em]">
                      {exp.start}
                    </span>
                    <h3 className="about-headline text-[15px] sm:text-[17px] tracking-[-0.01em] text-fg">
                      {exp.company}
                    </h3>
                    <span className="font-mono text-[10px] text-muted tracking-[0.02em]">
                      — {exp.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <CurlyLine className="my-8" />

          <div className="font-mono text-[9px] tracking-[0.14em] text-accent/60 uppercase mb-5">
            ✦ tooling
          </div>

          <div className="flex gap-4">
            <svg
              width="20"
              height="160"
              viewBox="0 0 20 160"
              fill="none"
              className="shrink-0 mt-1"
              aria-hidden="true"
            >
              <path
                d="M16 4 C 4 4, 4 30, 4 80 C 4 130, 4 156, 16 156"
                stroke="var(--color-accent)"
                strokeWidth="2"
                opacity="0.2"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="flex-1">
              <div className="skills-body flex flex-wrap justify-center gap-5">
                {skillCategories.map((cat, idx) => (
                  <div
                    key={cat.label}
                    className="skill-group about-card"
                    style={{
                      transform: `rotate(${skillTilts[idx] || 0}deg)`,
                      maxWidth: "260px",
                      flex: "1 1 auto",
                    }}
                  >
                    <p className="font-mono text-[8px] tracking-[0.16em] text-accent uppercase mb-2">
                      [{cat.label}]
                    </p>
                    <p className="font-mono text-[10px] leading-[1.8] text-fg/65">
                      {cat.items.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="about-divider mt-10" />
          <CurlyLine className="mt-5" />
        </div>
      </div>
    </section>
  );
}
