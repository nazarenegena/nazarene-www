import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CurlyLine from "./CurlyLine";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "../styles/projects.css";
import "../styles/shared.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "Yuno",
    subtitle: "a design tool kit",
    year: "2024",
    href: "https://yuno.somethinglabs.io",
    image: "/yuno-splash-screen.jpeg",
    cta: "explore the system →",
    tags: ["React", "Design Tokens", "CLI Tooling"],
    oneLiner: "A component kit with contrast-validated design tokens",
  },
  {
    number: "02",
    title: "Sahani",
    subtitle: "a meal planner & generator",
    year: "2025",
    href: "https://sahani.sahani.workers.dev",
    image: "/sahani-dashboard.png",
    cta: "see it in action →",
    tags: ["React", "UX Design", "Data Visualization"],
    oneLiner: "Stop asking what's for dinner.",
  },
  {
    number: "03",
    title: "Aureah Design",
    subtitle:
      "Your personal cycle and wellness companion. Track, understand, and thrive.",
    year: "2026",
    href: "https://www.figma.com/design/ERiW9lds6vUDR6ErMrTgtp/Aureah-Designs?node-id=0-1&t=58Fnby3jSrRxXZpE-1",
    image: "/aureah-splash-screen.png",
    brandSpec: "/aureah-brand-spec.html",
    cta: "explore the wireframes →",
    tags: ["Figma", "Wireframing", "UI Design", "Product Design"],
    oneLiner: "Your cycle, your wellness",
  },
  {
    number: "04",
    title: "Plinth Design System",
    subtitle: "a theme-agnostic UI foundation",
    year: "2026",
    cta: "work in progress ✦",
    brandSpec: "/plinth-design-system.html",
    tags: ["Figma", "Design Tokens", "Component Library", "CSS"],
    oneLiner: "A token-driven base layer for building brand design systems.",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollReveal();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".project-card");

    const st = gsap.fromTo(
      cards,
      { y: 60, opacity: 0, rotate: -1 },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    ).scrollTrigger;

    return () => {
      st?.kill();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects-section bg-dot-grid bg-bg px-6 sm:px-12 py-24 sm:py-32"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="about-frame">
          <div className="flex items-center gap-4 mb-10">
            <span
              data-reveal
              className="about-label font-bold text-[10px] tracking-[0.12em] text-accent uppercase shrink-0"
            >
              ✦ 02 //projects
            </span>
            <span className="flex-1 about-divider" />
          </div>

          <div className="mb-2">
            <h2
              data-reveal
              className="about-heading-line about-headline text-[clamp(36px,3vw,72px)] leading-[0.9]"
            >
              What I've Been Up To
            </h2>

            <svg
              viewBox="0 0 400 14"
              className="heading-swoosh w-full max-w-[400px] h-3 my-3"
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
          </div>

          <CurlyLine className="my-8" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {projects?.map((project) => {
              const cardContent = (
                <>
                  <div className="project-image-placeholder relative flex items-center justify-center bg-[#faf6f1] overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover absolute inset-0"
                      />
                    ) : project.href ? (
                      <>
                        <div className="project-arrow">↗</div>
                        <span className="font-bold text-[10px] tracking-[0.14em] text-accent uppercase project-screenshot-text">
                          [project screenshot]
                        </span>
                      </>
                    ) : (
                      <span className="font-bold text-[12px] tracking-[0.1em] text-accent/60 uppercase">
                        {project.cta}
                      </span>
                    )}
                    <div className="project-overlay">
                      <p className="project-overlay-text">{project.oneLiner}</p>
                      <div className="project-overlay-tags">
                        {project.tags.map((tag) => (
                          <span key={tag} className="project-overlay-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="project-overlay-cta">{project.cta}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="about-meta text-[10px] tracking-[0.08em]">
                        {project.number} · {project.year}
                      </span>
                    </div>

                    <h3 className="about-headline text-[clamp(24px,3vw,36px)] leading-[1.1] mb-1">
                      {project.title}
                    </h3>

                    <p className="about-body text-[14px] text-fg/75 mb-4">
                      {project.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`about-pill inline-block text-[12px] transition-opacity ${project.href ? "group-hover:opacity-90" : "opacity-60 cursor-default"}`}
                      >
                        {project.cta}
                      </span>
                      {project.brandSpec && (
                        <a
                          href={project.brandSpec}
                          target="_blank"
                          rel="noopener"
                          className="inline-block text-[12px] font-semibold text-accent border border-accent rounded-full px-[15px] py-[5px] hover:opacity-80 transition-opacity"
                        >
                          view brand spec →
                        </a>
                      )}
                    </div>
                  </div>
                </>
              );

              const style = { padding: "0", overflow: "hidden" as const };
              if (project.href) {
                return (
                  <a
                    key={project.number}
                    href={project.href}
                    target="_blank"
                    rel="noopener"
                    className="project-card about-card block no-underline group"
                    style={style}
                  >
                    {cardContent}
                  </a>
                );
              }
              return (
                <div
                  key={project.number}
                  className="project-card about-card block no-underline group cursor-default"
                  style={style}
                >
                  {cardContent}
                </div>
              );
            })}
          </div>

          <div className="about-divider mt-10" />
          <CurlyLine className="mt-5" />
        </div>
      </div>
    </section>
  );
}
