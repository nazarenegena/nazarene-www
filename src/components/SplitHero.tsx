import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { lenisInstance } from "../hooks/useSmoothScroll";
import { animeItems, polaroids, terminalLines } from "../data/heroData";
import "../styles/split-hero.css";

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
  const floatingTweensRef = useRef<gsap.core.Tween[]>([]);
  const updateSplitRef = useRef<(() => void) | null>(null);
  const mobileTweenRef = useRef<gsap.core.Tween | null>(null);

  const killHeroAnimations = () => {
    cancelAnimationFrame(rafRef.current);
    floatingTweensRef.current.forEach((t) => t.kill());
    floatingTweensRef.current = [];
    idleTweenRef.current?.kill();
    idleTweenRef.current = null;
    mobileTweenRef.current?.kill();
    mobileTweenRef.current = null;
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = null;
    }
  };

  const restartHeroAnimations = () => {
    const items = collageItemsRef.current.filter(Boolean);
    items.forEach((el) => {
      const dur = 3 + Math.random() * 2;
      const tween = gsap.to(el, {
        y: -6,
        duration: dur,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: Math.random() * 1.5,
      });
      floatingTweensRef.current.push(tween);
    });
    updateSplitRef.current?.();
  };

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
                      const tween = gsap.to(el, {
                        y: -6,
                        duration: dur,
                        ease: "sine.inOut",
                        yoyo: true,
                        repeat: -1,
                        delay: Math.random() * 1.5,
                      });
                      floatingTweensRef.current.push(tween);
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
    updateSplitRef.current = updateSplit;
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
      const handleMouseMove = (e: MouseEvent) => {
        targetRef.current = e.clientX / window.innerWidth;
        resetIdle();
        const cx = e.clientX / window.innerWidth - 0.5;
        collageItemsRef.current
          .filter(Boolean)
          .forEach((el, i) => gsap.set(el, { x: cx * (6 + i * 4) }));
      };
      window.addEventListener("mousemove", handleMouseMove);
      resetIdle();
      updateSplit();
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        cancelAnimationFrame(rafRef.current);
        stopIdle();
        if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
        preloaderTl.kill();
      };
    } else {
      const mo = { val: 0.3 };
      mobileTweenRef.current = gsap.to(mo, {
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
          killHeroAnimations();
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
        onComplete: () => {
          restartHeroAnimations();
        },
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
          <div className="name">Nazarene Wairimu</div>
          <div className="sub">
            frontend engineer. design-obsessed developer.
          </div>
          <p className="font-mono text-md leading-[1.6] max-w-[500px] mb-4 font-medium italic">
            "I started in code, wandered into design, and never quite came back.
            Now I live somewhere in between — and I think that's my favourite
            place to be."
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
                    loading="lazy"
                    width={50}
                    height={50}
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
        <div className="film-strip-cta">
          <div className="film-holes">
            <span className="film-hole" />
            <span className="film-hole" />
            <span className="film-hole" />
          </div>
          <a
            ref={ctaRef}
            onClick={handleCtaClick}
            href="#about"
            className="film-body"
          >
            [ view the full picture ]
          </a>
          <div className="film-holes">
            <span className="film-hole" />
            <span className="film-hole" />
            <span className="film-hole" />
          </div>
        </div>
        <div className="links">
          <span className="links-label">not just a dev, here's proof →</span>
          <br />
          <a
            href="https://www.instagram.com/designs_bynaz/"
            target="_blank"
            rel="noopener"
          >
            Instagram
          </a>
          <span className="links-sep">·</span>
          <a
            href="https://medium.com/@genarene96"
            target="_blank"
            rel="noopener"
          >
            Medium
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
