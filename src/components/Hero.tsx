import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { lenisInstance } from "../hooks/useSmoothScroll";

function scrollTo(sectionId: string) {
  const target = document.querySelector(sectionId);
  const lenis = lenisInstance.current;
  if (target && lenis) {
    lenis.scrollTo(target);
  } else if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Hero() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const labels = header.querySelectorAll<HTMLElement>(".hero-label");
    const names = header.querySelectorAll<HTMLElement>(".hero-name");
    const titleLine = header.querySelector<HTMLElement>(".title-line");
    const cards = header.querySelectorAll<HTMLElement>(".nav-card");

    const tl = gsap.timeline({ delay: 2.3 });

    tl.from(labels, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: "power2.out",
    });

    tl.from(
      names,
      {
        y: 80,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
      },
      "-=0.1",
    );

    tl.to(
      titleLine,
      {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.3",
    );

    tl.from(
      cards,
      {
        y: 60,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.4",
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <header ref={headerRef} className="py-16 sm:py-24 px-6 sm:px-12">
      <div className="bg-red-600 max-w-[1400px] mx-auto">
        <div className="flex items-baseline gap-4 sm:gap-8 mb-8 sm:mb-12 overflow-hidden">
          <span className=" hero-label font-mono text-[10px] sm:text-[11px] tracking-[0.12em] text-muted uppercase flex-shrink-0">
            Frontend Engineers | JavaScript Engineer
          </span>
          <span className="flex-1 h-px bg-border" />
          <span className="hero-label font-mono text-[10px] sm:text-[11px] tracking-[0.12em] text-muted uppercase flex-shrink-0">
            Nairobi, Kenya
          </span>
        </div>

        <div className="titleLines">
          <div className="overflow-hidden">
            <h1 className="hero-name font-display text-[clamp(48px,10vw,140px)] font-black tracking-[-0.04em] leading-[0.9] text-fg">
              Nazarene Naz
            </h1>
          </div>
          <div className="flex items-center gap-6 sm:gap-12 overflow-hidden">
            <span className="flex-1 h-px bg-border" />
            <h1 className="hero-name font-display text-[clamp(48px,10vw,140px)] font-black tracking-[-0.04em] leading-[0.9] italic text-accent">
              Wanyaga.
            </h1>
          </div>
          <div className="h-px bg-border w-full mt-2 scale-x-0 origin-left title-line" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-12 sm:mt-16 max-w-3xl">
          <div
            className="nav-card bg-accent/20 border border-accent/30 px-6 py-5 cursor-pointer"
            onClick={() => scrollTo("#about")}
            data-cursor
          >
            <span className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase block mb-1">
              01
            </span>
            <span className="font-display text-[18px] font-bold tracking-[-0.01em] text-fg">
              About
            </span>
          </div>
          <div
            className="nav-card bg-reveal border border-border px-6 py-5 cursor-pointer"
            onClick={() => scrollTo("#projects")}
            data-cursor
          >
            <span className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase block mb-1">
              02
            </span>
            <span className="font-display text-[18px] font-bold tracking-[-0.01em] text-fg">
              Projects
            </span>
          </div>
          <div
            className="nav-card bg-fg/5 border border-border px-6 py-5 cursor-pointer"
            onClick={() => scrollTo("#contact")}
            data-cursor
          >
            <span className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase block mb-1">
              03
            </span>
            <span className="font-display text-[18px] font-bold tracking-[-0.01em] text-fg">
              Contact
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
