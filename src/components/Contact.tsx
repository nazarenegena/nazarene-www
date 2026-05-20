import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CurlyLine from "./CurlyLine";

gsap.registerPlugin(ScrollTrigger);

const contacts = [
  {
    label: "Email",
    value: "nazarenewanyaga24@gmail.com",
    href: "mailto:nazarenewanyaga24@gmail.com",
    icon: "✉",
  },
  {
    label: "GitHub",
    value: "@nazarenegena",
    href: "https://github.com/nazarenegena",
    icon: "⌘",
  },
  {
    label: "LinkedIn",
    value: "nazarene-wanyaga",
    href: "https://linkedin.com/in/nazarene-wanyaga",
    icon: "◈",
  },
  {
    label: "Phone",
    value: "+254 705 434 749",
    href: "tel:+254705434749",
    icon: "✆",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    const badge = section.querySelector(".contact-badge");
    const headline = section.querySelector(".contact-headline");
    const body = section.querySelector(".about-body");
    const emailLink = section.querySelector(".contact-email-link");
    const cards = section.querySelectorAll(".contact-card");

    if (badge) {
      const t = gsap.fromTo(
        badge,
        { y: -8, opacity: 0.3 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 68%",
            scrub: 1,
          },
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    }

    if (headline) {
      const t = gsap.fromTo(
        headline,
        { y: 12, opacity: 0.3 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 76%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    }

    if (body) {
      const t = gsap.fromTo(
        body,
        { y: 10, opacity: 0.3 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 55%",
            scrub: 1,
          },
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    }

    if (emailLink) {
      const t = gsap.fromTo(
        emailLink,
        { y: 6, opacity: 0.3 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            end: "top 52%",
            scrub: 1,
          },
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    }

    if (cards.length) {
      const t = gsap.fromTo(
        cards,
        { y: 10, opacity: 0.3, rotate: -0.5 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          stagger: 0.08,
          scrollTrigger: {
            trigger: cards[0].parentElement,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    }

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact-section bg-dot-grid bg-bg px-6 sm:px-12 py-24 sm:py-32"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="about-frame">
          <div className="flex items-center gap-4 mb-10">
            <span className="about-label font-mono text-[10px] tracking-[0.12em] text-accent uppercase shrink-0">
              ✦ 03 //contact
            </span>
            <span className="flex-1 about-divider" />
          </div>

          <div className="flex gap-[5%] items-center">
            <div className="contact-left w-[40%] shrink-0">
              <div className="contact-badge">
                <span className="contact-badge-dot" />
                Available for work
              </div>

              <div className="relative">
                <svg
                  className="absolute left-0 top-0 h-full w-[14px]"
                  viewBox="0 0 14 100"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M8 0 H3 V100 H8"
                    stroke="#c97d4e"
                    strokeWidth="1.5"
                    opacity="0.35"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <h2 className="contact-headline about-headline text-[clamp(36px,5vw,56px)] leading-[0.95] mb-4 pl-[18px]">
                  Let's work<br />together
                </h2>
              </div>

              <p className="about-body text-[16px] text-fg/70 leading-[1.7] max-w-[400px] mb-6">
                Have a project in mind? I'd love to hear from you.
                Reach out through any of the channels below.
              </p>

              <a
                href="mailto:nazarenewanyaga24@gmail.com"
                className="contact-email-link"
              >
                or email me directly →
              </a>

              <CurlyLine className="curly-line" />
            </div>

            <div className="w-[55%] shrink-0">
              <div className="grid grid-cols-2 gap-[14px]">
                {contacts.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noopener" : undefined}
                    className="contact-card block no-underline"
                  >
                    <span className="contact-icon">{contact.icon}</span>
                    <span className="contact-label">{contact.label}</span>
                    <span className="contact-value">{contact.value}</span>
                  </a>
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
