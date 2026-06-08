import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CurlyLine from "./CurlyLine";
import { useScrollReveal } from "../hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "Yuno",
    subtitle: "a design system that actually gets used",
    year: "2024",
    href: "https://yuno.somethinglabs.io",
    cta: "explore the system →",
    tags: ["React", "Design Tokens", "CLI Tooling"],
    oneLiner: "A font-pairing engine with contrast-validated palettes",
  },
  {
    number: "02",
    title: "Sahani",
    subtitle: "making healthcare feel a little less clinical",
    year: "2025",
    href: "https://sahani.app",
    cta: "see it in action →",
    tags: ["React", "UX Design", "Data Visualization"],
    oneLiner: "A digital health platform rethinking the clinic experience",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollReveal();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".project-card");

    gsap.fromTo(
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
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
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
            <span data-reveal className="about-label font-mono text-[10px] tracking-[0.12em] text-accent uppercase shrink-0">
              ✦ 02 //projects
            </span>
            <span className="flex-1 about-divider" />
          </div>

          <div className="mb-3">
            <h2 data-reveal className="about-heading-line about-headline text-[clamp(36px,6vw,72px)] leading-[0.9]">
              Selected Works
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
            {projects?.map((project) => (
              <a
                key={project.number}
                href={project.href}
                target="_blank"
                rel="noopener"
                className="project-card about-card block no-underline group"
                style={{
                  padding: "0",
                  overflow: "hidden",
                }}
              >
                <div className="project-image-placeholder relative flex items-center justify-center bg-[#faf6f1] overflow-hidden">
                  <div className="project-arrow">↗</div>
                  <span className="font-mono text-[10px] tracking-[0.14em] text-accent uppercase project-screenshot-text">
                    [project screenshot]
                  </span>
                  <div className="project-overlay">
                    <p className="project-overlay-text">{project.oneLiner}</p>
                    <div className="project-overlay-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-overlay-tag">{tag}</span>
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

                  <span className="about-pill inline-block text-[12px] group-hover:opacity-90 transition-opacity">
                    {project.cta}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="about-divider mt-10" />
          <CurlyLine className="mt-5" />
        </div>
      </div>
    </section>
  );
}
