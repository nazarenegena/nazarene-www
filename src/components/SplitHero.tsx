import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { lenisInstance } from "../hooks/useSmoothScroll";

const animeItems = [
  { src: "bleach.jpeg", label: "BL", rotate: -2 },
  { src: "mha.jpeg", label: "MH", rotate: 3 },
  { src: "sakamoto_days.webp", label: "SD", rotate: -1 },
  { src: "black_clover.jpeg", label: "BC", rotate: 1 },
  { src: "dandandan.jpeg", label: "DD", rotate: 2 },
];

const polaroids = [
  {
    src: "/photos/sunset.jpg",
    caption: "sunset",
    rotate: 8,
    top: "38%",
    left: "4%",
    tooltip: "golden hour magic",
  },
  {
    src: "/photos/flowers.jpg",
    caption: "flowers",
    rotate: -6,
    top: "36%",
    left: "14%",
    tooltip: "nature's art",
  },
  {
    src: "/photos/cream_flower.jpg",
    caption: "cream",
    rotate: 10,
    top: "30%",
    right: "15%",
    tooltip: "taken on a good day",
  },
  {
    src: "/photos/rose.jpg",
    caption: "rose",
    rotate: -6,
    top: "6%",
    left: "28%",
    tooltip: "this one smells nice",
  },
  {
    src: "/photos/hike.jpg",
    caption: "hike",
    rotate: -3,
    top: "60%",
    right: "12%",
    tooltip: "worth the climb",
  },
  {
    src: "/photos/white_flowers.jpg",
    caption: "sunflowers",
    rotate: 8,
    top: "5%",
    left: "18%",
    tooltip: "perfect lighting",
  },
  {
    src: "/photos/art_gallery.jpg",
    caption: "art",
    rotate: 3,
    top: "60%",
    right: "2%",
    tooltip: "feeling cultured",
  },
  {
    src: "/photos/books.jpg",
    caption: "reading",
    rotate: -8,
    top: "34%",
    right: "5%",
    tooltip: "lost in pages",
  },
];
const terminalLines = [
  ["whoami", "nazarene. dev. nairobi-based."],
  ["cat stack.txt", "Javascript / TypeScript / React.js / "],
  ["cat status.txt", "open to work ✦"],
];

const shapes = [
  [
    18,
    "28%",
    "36%",
    0,
    <svg
      key="0"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 1 L15 8 L8 15 L1 8 Z"
        stroke="#ffd93d"
        strokeWidth="1.5"
        fill="#ffd93d"
        opacity="0.55"
      />
    </svg>,
  ],
  [
    19,
    "22%",
    "28%",
    "-6deg",
    <svg
      key="1"
      width="18"
      height="36"
      viewBox="0 0 24 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2L8 12l6 2-2 10"
        stroke="#e85d26"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path d="M10 12h4" stroke="#e85d26" strokeWidth="2" opacity="0.45" />
    </svg>,
  ],
  [
    20,
    "22%",
    "46%",
    "4deg",
    <svg
      key="2"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke="#e85d26"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M2 10h16M10 2v16M5 5l10 10M15 5L5 15"
        stroke="#e85d26"
        strokeWidth="0.8"
        fill="none"
        opacity="0.25"
      />
    </svg>,
  ],
].map(([i, b, r, rot, svg]) => ({
  idx: i as number,
  bottom: b as string,
  right: r as string,
  rotate: rot as string,
  svg,
}));

export default function SplitHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const leftRoleRef = useRef<HTMLDivElement>(null);
  const rightRoleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const sneakBackRef = useRef<HTMLAnchorElement>(null);
  const collageItemsRef = useRef<HTMLDivElement[]>([]);
  const [isDismissed, setIsDismissed] = useState(false);
  const targetRef = useRef(0.5);
  const currentRef = useRef(0.5);
  const rafRef = useRef(0);
  const idleTweenRef = useRef<gsap.core.Tween | null>(null);
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    const winW = window.innerWidth;
    targetRef.current = 0.5;
    const preloaderTl = gsap.timeline({
      delay: 2.5,
      onComplete: () => {
        if (!leftPanelRef.current || !rightPanelRef.current) return;
        gsap.to(leftPanelRef.current, {
          clipPath: "inset(0 50% 0 0)",
          duration: 1.2,
          ease: "power4.out",
        });
        gsap.to(rightPanelRef.current, {
          clipPath: "inset(0 0 0 50%)",
          duration: 1.2,
          ease: "power4.out",
          delay: 0.05,
          onComplete: () => {
            const items = collageItemsRef.current.filter(Boolean);
            if (!items.length) return;
            gsap.fromTo(
              items,
              { opacity: 0, scale: 0.85 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                stagger: 0.08,
                ease: "power3.out",
                onComplete: () =>
                  items.forEach((el) => {
                    const dur = 3 + Math.random() * 2;
                    gsap.to(el, {
                      y: -6,
                      duration: dur,
                      ease: "sine.inOut",
                      yoyo: true,
                      repeat: -1,
                      delay: Math.random() * 1.5,
                    });
                  }),
              },
            );
          },
        });
      },
    });
    const updateSplit = () => {
      currentRef.current += (targetRef.current - currentRef.current) * 0.08;
      const lp = (currentRef.current * 100).toFixed(2);
      const rp = ((1 - currentRef.current) * 100).toFixed(2);
      if (leftPanelRef.current)
        leftPanelRef.current.style.clipPath = `inset(0 ${rp}% 0 0)`;
      if (rightPanelRef.current)
        rightPanelRef.current.style.clipPath = `inset(0 0 0 ${lp}%)`;
      if (dividerRef.current)
        dividerRef.current.style.transform = `translateX(${currentRef.current * winW}px)`;
      if (tooltipRef.current) {
        const tx = currentRef.current * winW;
        if (currentRef.current < 0.5) {
          tooltipRef.current.textContent = "← designer";
          tooltipRef.current.style.left = tx + 16 + "px";
          tooltipRef.current.style.transform = "translateY(-50%)";
          if (leftRoleRef.current) leftRoleRef.current.style.opacity = "1";
          if (rightRoleRef.current) rightRoleRef.current.style.opacity = "0";
        } else {
          tooltipRef.current.textContent = "developer →";
          tooltipRef.current.style.left = tx - 16 + "px";
          tooltipRef.current.style.transform =
            "translateY(-50%) translateX(-100%)";
          if (leftRoleRef.current) leftRoleRef.current.style.opacity = "0";
          if (rightRoleRef.current) rightRoleRef.current.style.opacity = "1";
        }
        tooltipRef.current.style.opacity =
          Math.abs(currentRef.current - targetRef.current) < 0.01 && !isTouch
            ? "0"
            : "1";
      }
      rafRef.current = requestAnimationFrame(updateSplit);
    };
    const stopIdle = () => {
      idleTweenRef.current?.kill();
      idleTweenRef.current = null;
    };
    const startIdle = () => {
      stopIdle();
      const c = Math.max(0.2, Math.min(0.8, targetRef.current));
      const o = { val: c - 0.08 };
      idleTweenRef.current = gsap.to(o, {
        val: c + 0.08,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        onUpdate: () => {
          targetRef.current = o.val;
        },
      });
    };
    const resetIdle = () => {
      stopIdle();
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(startIdle, 3000);
    };
    if (!isTouch) {
      window.addEventListener("mousemove", (e) => {
        targetRef.current = e.clientX / window.innerWidth;
        resetIdle();
        const cx = e.clientX / window.innerWidth - 0.5;
        collageItemsRef.current
          .filter(Boolean)
          .forEach((el, i) => gsap.set(el, { x: cx * (6 + i * 4) }));
      });
      resetIdle();
      updateSplit();
      return () => {
        window.removeEventListener("mousemove", () => {});
        cancelAnimationFrame(rafRef.current);
        stopIdle();
        if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
        preloaderTl.kill();
      };
    } else {
      const mo = { val: 0.3 };
      gsap.to(mo, {
        val: 0.7,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        onUpdate: () => {
          targetRef.current = mo.val;
        },
      });
      updateSplit();
      return () => {
        cancelAnimationFrame(rafRef.current);
        preloaderTl.kill();
      };
    }
  }, []);

  const handleCtaClick = () => {
    const lenis = lenisInstance.current;
    if (lenis) lenis.scrollTo(0, { duration: 0 });
    else window.scrollTo(0, 0);
    if (heroRef.current)
      gsap.to(heroRef.current, {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => {
          if (heroRef.current) heroRef.current.style.pointerEvents = "none";
          setIsDismissed(true);
          if (sneakBackRef.current) sneakBackRef.current.classList.add("show");
        },
      });
  };

  const handleSneakBackClick = () => {
    const lenis = lenisInstance.current;
    if (lenis) lenis.scrollTo(0, { duration: 0 });
    else window.scrollTo(0, 0);
    if (heroRef.current) {
      heroRef.current.style.pointerEvents = "auto";
      gsap.to(heroRef.current, {
        y: "0%",
        duration: 0.8,
        ease: "power4.inOut",
      });
      setIsDismissed(false);
      if (sneakBackRef.current) sneakBackRef.current.classList.remove("show");
    }
  };

  const row = (items: typeof animeItems, offset: number) =>
    items.map((item, i) => (
      <div
        key={offset + i}
        ref={(el) => {
          if (el) collageItemsRef.current[offset + i] = el;
        }}
        className="anime-card"
        style={{ transform: `rotate(${item.rotate}deg)` }}
      >
        <div className="anime-pin" />
        <img
          className="anime-img"
          src={item.src}
          alt=""
          loading="lazy"
          width={52}
          height={80}
        />
        <span className="anime-label">{item.label}</span>
      </div>
    ));

  return (
    <>
      <div ref={heroRef} className="hero">
        <div ref={leftPanelRef} className="panel panel-light">
          <div className="badge badge-l">[at work]</div>
          <div className="name">Nazarene Wanyaga</div>
          <div className="sub">frontend engineer. design-obsessed developer.</div>
          <p className="font-mono text-[11px] leading-[1.6] text-[#1c1814]/70 max-w-[420px] mb-4">
            I started in code, wandered into design, and never quite came back.
            Now I live somewhere in between — and I think that's my favourite
            place to be.
          </p>
          <div className="term">
            <div className="term-bar">
              <span className="term-path">~/nazarene</span>
              <span className="term-shell">zsh</span>
            </div>
            <div className="term-body">
              {terminalLines.map((l, i) => (
                <div key={i}>
                  {i > 0 && <div className="term-space" />}
                  <div className="term-line">
                    <span className="term-prompt">$</span>
                    <span>{l[0]}</span>
                  </div>
                  <div className="term-output">{l[1]}</div>
                </div>
              ))}
              <div className="term-space" />
              <div className="term-line">
                <span className="term-prompt">$</span>
                <span className="term-cursor">_</span>
              </div>
            </div>
          </div>
          <div ref={leftRoleRef} className="role role-l">
            Designer
          </div>
        </div>

        <div ref={rightPanelRef} className="panel panel-dark">
          <div className="badge badge-r">[off the clock]</div>
          <div className="anime-grid">
            <div className="anime-col">
              <div className="anime-row">{row(animeItems.slice(0, 3), 0)}</div>
              <div className="anime-row">{row(animeItems.slice(3), 3)}</div>
            </div>
          </div>

          <div
            className="player"
            ref={(el) => {
              if (el) collageItemsRef.current[5] = el;
            }}
          >
            <div className="player-header">▼ now playing</div>
            <div className="player-body">
              <div className="player-art">
                <div className="player-dot" />
              </div>
              <div className="player-info">
                <div className="player-track">drawing</div>
                <div className="player-artist">Nazarene</div>
              </div>
            </div>
            <div className="player-progress">
              <div className="player-bar">
                <div className="player-fill" />
              </div>
            </div>
            <div className="player-times">
              <span className="player-time">1:24</span>
              <span className="player-time">3:07</span>
            </div>
            <div className="player-controls">
              <span className="player-btn">⏮</span>
              <span className="player-btn">▶</span>
              <span className="player-btn">⏭</span>
            </div>
          </div>

          <div
            className="badge-card"
            ref={(el) => {
              if (el) collageItemsRef.current[6] = el;
            }}
          >
            <div className="badge-mount">
              <div className="badge-mount-top" />
              <div className="badge-mount-line" />
            </div>
            <div className="badge-card-body">
              <div className="badge-photo-wrap">
                <img
                  className="badge-photo"
                  src="/photos/profile_pic.jpg"
                  alt=""
                />
              </div>
              <div className="badge-text">
                <div className="badge-name">Nazarene Wanyaga</div>
                <div className="badge-title">JavaScript Engineer</div>
                <div className="badge-location">Nairobi</div>
              </div>
              <div className="badge-divider" />
              <div className="badge-stamp">ISSUED</div>
            </div>
          </div>

          {polaroids.map((p, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) collageItemsRef.current[7 + i] = el;
              }}
              className="polaroid"
              style={{
                top: p.top,
                left: (p as any).left,
                right: (p as any).right,
                rotate: `${p.rotate}deg`,
              }}
            >
              <div className="polaroid-card">
                <div className="polaroid-pin" />
                <img
                  className="polaroid-img"
                  src={p.src}
                  alt=""
                  loading="lazy"
                  width={140}
                  height={110}
                />
                <span className="polaroid-caption">{p.tooltip}</span>
              </div>
            </div>
          ))}

          <div
            className="doodles"
            ref={(el) => {
              if (el) collageItemsRef.current[17] = el;
            }}
          >
            <span className="doodles-text">curious · building · exploring</span>
          </div>

          {shapes.map((s) => (
            <div
              key={s.idx}
              className="absolute"
              style={{ bottom: s.bottom, right: s.right, rotate: s.rotate }}
              ref={(el) => {
                if (el) collageItemsRef.current[s.idx] = el;
              }}
            >
              {s.svg}
            </div>
          ))}

          <svg
            className="absolute"
            style={{
              bottom: "6%",
              left: "3%",
              right: "3%",
              width: "auto",
              height: "16px",
            }}
            viewBox="0 0 400 16"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M2 12 L398 12"
              stroke="#e85d26"
              strokeWidth="1.5"
              fill="none"
              opacity="0.25"
              strokeDasharray="4 4"
              strokeLinecap="round"
            />
          </svg>

          <div ref={rightRoleRef} className="role role-r">
            Developer
          </div>
        </div>

        <div ref={dividerRef} className="divider" />
        <div ref={tooltipRef} className="tooltip">
          ← designer
        </div>
        <div className="cta-wrap">
          <a
            ref={ctaRef}
            onClick={handleCtaClick}
            className="cta"
            href="#about"
          >
            [ view the full picture]
          </a>
        </div>

        <div className="links">
          <span className="links-label">not just a dev, here's proof →</span>
          <br />
          <a
            href="https://github.com/nazarenegena"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
          <span className="links-sep">·</span>
          <a
            href="https://www.linkedin.com/in/nazarene-wanyaga"
            target="_blank"
            rel="noopener"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <a
        ref={sneakBackRef}
        onClick={(e) => {
          e.preventDefault();
          handleSneakBackClick();
        }}
        className={`sneak bg-accent text-white text-sm px-4 py-1 font-bold rounded-lg  ${isDismissed ? "show" : ""}`}
        href="#"
      >
        ↻ come back to play
      </a>
    </>
  );
}
