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
    rotate: -2,
    top: "18%",
    left: "4%",
  },
  {
    src: "/photos/flowers.jpg",
    caption: "flowers",
    rotate: 2,
    top: "18%",
    left: "40%",
  },
  {
    src: "/photos/art.jpg",
    caption: "art",
    rotate: 1,
    top: "32%",
    left: "40%",
  },
  {
    src: "/photos/cream_flower.jpg",
    caption: "cream",
    rotate: 1,
    top: "32%",
    left: "4%",
  },
  {
    src: "/photos/art_gallery.jpg",
    caption: "gallery",
    rotate: 3,
    top: "18%",
    right: "22%",
  },
  {
    src: "/photos/rose.jpg",
    caption: "rose",
    rotate: -1,
    top: "32%",
    left: "22%",
  },
  {
    src: "/photos/hike.jpg",
    caption: "hike",
    rotate: -3,
    top: "32%",
    right: "22%",
  },
  {
    src: "/photos/white_flowers.jpg",
    caption: "white",
    rotate: -2,
    top: "32%",
    left: "40%",
  },
  {
    src: "/photos/art.jpg",
    caption: "art",
    rotate: 1,
    top: "32%",
    right: "4%",
  },
  {
    src: "/photos/books.jpg",
    caption: "crochet",
    rotate: -2,
    top: "18%",
    right: "4%",
  },
];

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
  const rafRef = useRef<number>(0);
  const idleTweenRef = useRef<gsap.core.Tween | null>(null);
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    const winW = window.innerWidth;

    if (!isTouch) {
      targetRef.current = 0.5;
    } else {
      targetRef.current = 0.5;
    }

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
            if (items.length === 0) return;

            gsap.fromTo(
              items,
              { opacity: 0, scale: 0.85 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                stagger: 0.08,
                ease: "power3.out",
                onComplete: () => {
                  items.forEach((el) => {
                    const dur = 3 + Math.random() * 2;
                    const d = Math.random() * 1.5;
                    gsap.to(el, {
                      y: -6,
                      duration: dur,
                      ease: "sine.inOut",
                      yoyo: true,
                      repeat: -1,
                      delay: d,
                    });
                  });
                },
              },
            );
          },
        });
      },
    });

    const updateSplit = () => {
      currentRef.current += (targetRef.current - currentRef.current) * 0.08;
      const leftPct = (currentRef.current * 100).toFixed(2);
      const rightPct = ((1 - currentRef.current) * 100).toFixed(2);

      if (leftPanelRef.current) {
        leftPanelRef.current.style.clipPath = `inset(0 ${rightPct}% 0 0)`;
      }
      if (rightPanelRef.current) {
        rightPanelRef.current.style.clipPath = `inset(0 0 0 ${leftPct}%)`;
      }
      if (dividerRef.current) {
        dividerRef.current.style.transform = `translateX(${currentRef.current * winW}px)`;
      }
      if (tooltipRef.current) {
        const tooltipX = currentRef.current * winW;
        if (currentRef.current < 0.5) {
          tooltipRef.current.textContent = "← designer";
          tooltipRef.current.style.left = tooltipX + 16 + "px";
          tooltipRef.current.style.transform = "translateY(-50%)";
          if (leftRoleRef.current) leftRoleRef.current.style.opacity = "1";
          if (rightRoleRef.current) rightRoleRef.current.style.opacity = "0";
        } else {
          tooltipRef.current.textContent = "developer →";
          tooltipRef.current.style.left = tooltipX - 16 + "px";
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

    const stopIdleOsc = () => {
      if (idleTweenRef.current) {
        idleTweenRef.current.kill();
        idleTweenRef.current = null;
      }
    };

    const startIdleOsc = () => {
      stopIdleOsc();
      const center = Math.max(0.2, Math.min(0.8, targetRef.current));
      const obj = { val: center - 0.08 };
      idleTweenRef.current = gsap.to(obj, {
        val: center + 0.08,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        onUpdate: () => {
          targetRef.current = obj.val;
        },
      });
    };

    const resetIdle = () => {
      stopIdleOsc();
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(startIdleOsc, 3000);
    };

    if (!isTouch) {
      const handleMouseMove = (e: MouseEvent) => {
        targetRef.current = e.clientX / window.innerWidth;
        resetIdle();

        const cx = e.clientX / window.innerWidth - 0.5;
        const items = collageItemsRef.current.filter(Boolean);
        items.forEach((el, i) => {
          const factor = 6 + i * 4;
          gsap.set(el, { x: cx * factor });
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      resetIdle();
      updateSplit();

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        cancelAnimationFrame(rafRef.current);
        stopIdleOsc();
        if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
        preloaderTl.kill();
      };
    } else {
      const mobObj = { val: 0.3 };
      gsap.to(mobObj, {
        val: 0.7,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        onUpdate: () => {
          targetRef.current = mobObj.val;
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
    if (lenis) {
      lenis.scrollTo(0, { duration: 0 });
    } else {
      window.scrollTo(0, 0);
    }

    if (heroRef.current) {
      gsap.to(heroRef.current, {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => {
          if (heroRef.current) {
            heroRef.current.style.pointerEvents = "none";
          }
          setIsDismissed(true);
          if (sneakBackRef.current) {
            sneakBackRef.current.classList.add("show");
          }
        },
      });
    }
  };

  const handleSneakBackClick = () => {
    const lenis = lenisInstance.current;
    if (lenis) {
      lenis.scrollTo(0, { duration: 0 });
    } else {
      window.scrollTo(0, 0);
    }

    if (heroRef.current) {
      heroRef.current.style.pointerEvents = "auto";
      gsap.to(heroRef.current, {
        y: "0%",
        duration: 0.8,
        ease: "power4.inOut",
      });
      setIsDismissed(false);
      if (sneakBackRef.current) {
        sneakBackRef.current.classList.remove("show");
      }
    }
  };

  return (
    <>
      <div
        ref={heroRef}
        className="fixed inset-0 z-[50] overflow-hidden"
        style={{
          background: "#ede8df",
          fontFamily: `"Space Mono", "Courier New", monospace`,
        }}
      >
        <div
          ref={leftPanelRef}
          className="absolute inset-0 flex flex-col justify-center p-[clamp(40px,6vw,80px)]"
          style={{
            background: "#ede8df",
            color: "#1c1814",
            clipPath: "inset(0 100% 0 0)",
          }}
        >
          <div className="font-mono text-[11px] tracking-[0.06em] text-[#8a7f77] uppercase mb-[clamp(12px,1.5vw,20px)]">
            [at work]
          </div>
          <div
            className="font-['Bebas_Neue','Impact',sans-serif] text-[clamp(3.2rem,12vw,10rem)] tracking-[-0.03em] leading-[0.92] mb-[clamp(16px,2vw,28px)]"
            style={{ color: "#1c1814" }}
          >
            Nazarene Wanyaga
          </div>
          <div className="font-mono text-[clamp(11px,0.9vw,14px)] tracking-[0.02em] leading-[1.8] max-width: 460px; opacity: 0.8; color: #1c1814;">
            Frontend Engineer — Design Systems — Nairobi
          </div>
          <div
            style={{
              background: "#1c1814",
              border: "1px solid #d4cdc0",
              borderRadius: "4px",
              padding: "0",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.4)",
              fontFamily: `"Space Mono", "Courier New", monospace`,
              minWidth: "190px",
              margin: "16px 0",
              alignSelf: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 10px",
                borderBottom: "1px solid #d4cdc0",
                opacity: 0.7,
              }}
            >
              <span
                style={{
                  fontSize: "9px",
                  color: "#6bcb77",
                  letterSpacing: "0.04em",
                }}
              >
                ~/nazarene
              </span>
              <span style={{ fontSize: "9px", color: "#8a7f77" }}>zsh</span>
            </div>
            <div style={{ padding: "8px 10px 10px" }}>
              <div
                style={{ fontSize: "9px", lineHeight: "1.7", color: "#ede8df" }}
              >
                <span
                  style={{
                    color: "#e85d26",
                    fontWeight: 700,
                    marginRight: "6px",
                  }}
                >
                  $
                </span>
                <span>whoami</span>
              </div>
              <div
                style={{
                  fontSize: "9px",
                  lineHeight: "1.7",
                  color: "#ede8df",
                  opacity: 0.9,
                  paddingLeft: "14px",
                }}
              >
                Frontend Engineer with 5+ years experience
              </div>
              <div
                style={{
                  fontSize: "9px",
                  lineHeight: "1.7",
                  color: "#ede8df",
                  marginTop: "4px",
                }}
              >
                <span
                  style={{
                    color: "#e85d26",
                    fontWeight: 700,
                    marginRight: "6px",
                  }}
                >
                  $
                </span>
                <span>cat stack.txt</span>
              </div>
              <div
                style={{
                  fontSize: "9px",
                  lineHeight: "1.7",
                  color: "#ede8df",
                  opacity: 0.9,
                  paddingLeft: "14px",
                }}
              >
                React / Next.js / Vue / Svelte / TypeScript
              </div>
              <div
                style={{ fontSize: "9px", lineHeight: "1.7", color: "#ede8df" }}
              >
                <span
                  style={{
                    color: "#e85d26",
                    fontWeight: 700,
                    marginRight: "6px",
                  }}
                >
                  $
                </span>
                <span style={{ color: "#e85d26", fontWeight: 700 }}>_</span>
              </div>
            </div>
          </div>
          <div
            ref={leftRoleRef}
            className="absolute bottom-[clamp(80px,10vh,110px)] right-[clamp(24px,3vw,48px)] font-['Bebas_Neue','Impact',sans-serif] text-[clamp(20px,3vw,36px)] tracking-[-0.02em] opacity-0 transition-opacity duration-400"
            style={{ textAlign: "right", whiteSpace: "nowrap" }}
          >
            Designer
          </div>
        </div>

        <div
          ref={rightPanelRef}
          className="absolute inset-0 flex flex-col justify-center p-[clamp(40px,6vw,80px)]"
          style={{
            background: "#1c1814",
            color: "#ede8df",
            clipPath: "inset(0 0 0 100%)",
          }}
        >
          <div
            className="absolute top-[clamp(48px,6vh,72px)] right-[clamp(24px,3vw,48px)] font-mono text-[11px] tracking-[0.06em] text-[#8a7f77] uppercase font-bold"
            style={{ opacity: 0.7 }}
          >
            [off the clock]
          </div>

          {/* Anime Grid */}
          <div className="absolute" style={{ top: "3%", right: "36%" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <div style={{ display: "flex", gap: "7px" }}>
                {animeItems.slice(0, 3).map((item, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      if (el) collageItemsRef.current[i] = el;
                    }}
                    style={{
                      background: "#f5f0e8",
                      padding: "2px 2px 10px",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.35)",
                      borderRadius: "1px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position: "relative",
                      rotate: `${item.rotate}deg`,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-3px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "6px",
                        height: "6px",
                        background: "#e85d26",
                        borderRadius: "50%",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.35)",
                        zIndex: 1,
                      }}
                    />
                    <img
                      src={item.src}
                      alt=""
                      loading="lazy"
                      width={52}
                      height={80}
                      style={{
                        display: "block",
                        width: "52px",
                        height: "auto",
                        borderRadius: "1px",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        bottom: "2px",
                        fontFamily: `"Space Mono", "Courier New", monospace`,
                        fontSize: "6px",
                        color: "#1c1814",
                        letterSpacing: "0.06em",
                        opacity: 0.7,
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "7px",
                  justifyContent: "center",
                }}
              >
                {animeItems.slice(3).map((item, i) => (
                  <div
                    key={i + 3}
                    ref={(el) => {
                      if (el) collageItemsRef.current[i + 3] = el;
                    }}
                    style={{
                      background: "#f5f0e8",
                      padding: "2px 2px 10px",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.35)",
                      borderRadius: "1px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position: "relative",
                      rotate: `${item.rotate}deg`,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-3px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "6px",
                        height: "6px",
                        background: "#e85d26",
                        borderRadius: "50%",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.35)",
                        zIndex: 1,
                      }}
                    />
                    <img
                      src={item.src}
                      alt=""
                      loading="lazy"
                      width={52}
                      height={80}
                      style={{
                        display: "block",
                        width: "52px",
                        height: "auto",
                        borderRadius: "1px",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        bottom: "2px",
                        fontFamily: `"Space Mono", "Courier New", monospace`,
                        fontSize: "6px",
                        color: "#1c1814",
                        letterSpacing: "0.06em",
                        opacity: 0.7,
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Music Player */}
          <div
            ref={(el) => {
              if (el) collageItemsRef.current[5] = el;
            }}
            className="absolute"
            style={{
              top: "3%",
              right: "66%",
              rotate: "2deg",
              background: "#ede8df",
              borderRadius: "4px",
              padding: "8px 10px 8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.35)",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              minWidth: "170px",
              fontFamily: `"Space Mono", "Courier New", monospace`,
            }}
          >
            <div
              style={{
                fontSize: "8px",
                color: "#e85d26",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              ▼ now playing
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "#1c1814",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  flexShrink: 0,
                  boxShadow:
                    "inset 0 0 0 2px rgba(237, 232, 223, 0.08), inset 0 0 0 5px rgba(237, 232, 223, 0.05), inset 0 0 0 9px rgba(237, 232, 223, 0.03)",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#e85d26",
                    boxShadow: "0 0 3px rgba(232, 93, 38, 0.3)",
                    position: "absolute",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1px",
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#1c1814",
                    letterSpacing: "0.02em",
                    lineHeight: "1.3",
                  }}
                >
                  drawing
                </span>
                <span
                  style={{
                    fontSize: "8px",
                    color: "#8a7f77",
                    letterSpacing: "0.04em",
                  }}
                >
                  Nazarene
                </span>
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <div
                style={{
                  height: "3px",
                  background: "#d4cdc0",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: "#e85d26",
                    borderRadius: "2px",
                    width: "42%",
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontSize: "7px",
                    color: "#8a7f77",
                    letterSpacing: "0.03em",
                  }}
                >
                  1:24
                </span>
                <span
                  style={{
                    fontSize: "7px",
                    color: "#8a7f77",
                    letterSpacing: "0.03em",
                  }}
                >
                  3:07
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
                padding: "2px 0",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  color: "#1c1814",
                  cursor: "pointer",
                  opacity: 0.7,
                }}
              >
                ⏮
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "#1c1814",
                  cursor: "pointer",
                  opacity: 0.7,
                }}
              >
                ▶
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "#1c1814",
                  cursor: "pointer",
                  opacity: 0.7,
                }}
              >
                ⏭
              </span>
            </div>
          </div>

          {/* Badge */}
          <div
            ref={(el) => {
              if (el) collageItemsRef.current[6] = el;
            }}
            className="absolute"
            style={{ top: "3%", right: "4%" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "-2px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "5px",
                  background: "#8a7f77",
                  borderRadius: "2px 2px 0 0",
                }}
              />
              <div
                style={{
                  width: "3px",
                  height: "22px",
                  background: "#e85d26",
                  borderRadius: "0 0 2px 2px",
                  opacity: 0.7,
                }}
              />
            </div>
            <div
              style={{
                background: "#f5f0e8",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3px",
                minWidth: "140px",
                padding: "12px 14px 10px",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  border: "2px solid #e85d26",
                  overflow: "hidden",
                  flexShrink: 0,
                  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
                }}
              >
                <img
                  src="/photos/profile_pic.jpg"
                  alt=""
                  loading="lazy"
                  width={52}
                  height={52}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1px",
                }}
              >
                <span
                  style={{
                    fontFamily: `"Space Mono", "Courier New", monospace`,
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#1c1814",
                    letterSpacing: "0.04em",
                    lineHeight: "1.3",
                  }}
                >
                  Nazarene Wanyaga
                </span>
                <span
                  style={{
                    fontFamily: `"Space Mono", "Courier New", monospace`,
                    fontSize: "9px",
                    color: "#8a7f77",
                    letterSpacing: "0.04em",
                    lineHeight: 1,
                  }}
                >
                  Frontend Engineer
                </span>
                <span
                  style={{
                    fontFamily: `"Space Mono", "Courier New", monospace`,
                    fontSize: "7px",
                    color: "#e85d26",
                    letterSpacing: "0.06em",
                    marginTop: "1px",
                  }}
                >
                  Nairobi
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "5px",
                  marginTop: "2px",
                  background:
                    "repeating-linear-gradient(90deg, #1c1814 0 1px, transparent 1px 3px, #1c1814 3px 4px, transparent 4px 6px, #1c1814 6px 7px, transparent 7px 10px, #1c1814 10px 12px, transparent 12px 15px, #1c1814 15px 16px, transparent 16px 18px)",
                  opacity: 0.4,
                }}
              />
              <span
                style={{
                  position: "absolute",
                  fontFamily: `"Space Mono", "Courier New", monospace`,
                  fontSize: "6px",
                  color: "#e85d26",
                  opacity: 0.3,
                  rotate: "-15deg",
                  letterSpacing: "0.12em",
                  border: "1px solid #e85d26",
                  padding: "1px 3px",
                  borderRadius: "1px",
                  bottom: "32px",
                  right: "6px",
                  pointerEvents: "none",
                }}
              >
                ISSUED
              </span>
            </div>
          </div>

          {/* Polaroids */}
          {polaroids.map((polaroid, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) collageItemsRef.current[7 + i] = el;
              }}
              className="absolute"
              style={{
                top: polaroid.top,
                left: polaroid.left,
                rotate: `${polaroid.rotate}deg`,
              }}
            >
              <div
                style={{
                  background: "#f5f0e8",
                  padding: "5px 5px 18px",
                  boxShadow:
                    "0 2px 12px rgba(0, 0, 0, 0.35), -1px 0 0 rgba(0, 200, 255, 0.04), 1px 0 0 rgba(255, 0, 100, 0.04)",
                  borderRadius: "1px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-4px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "8px",
                    height: "8px",
                    background: "#e85d26",
                    borderRadius: "50%",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.35)",
                    zIndex: 1,
                  }}
                />
                <img
                  src={polaroid.src}
                  alt=""
                  loading="lazy"
                  width={140}
                  height={110}
                  style={{
                    display: "block",
                    width: "140px",
                    height: "auto",
                    borderRadius: "1px",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: "3px",
                    fontFamily: `"Space Mono", "Courier New", monospace`,
                    fontSize: "9px",
                    color: "#1c1814",
                    letterSpacing: "0.04em",
                    opacity: 0.75,
                  }}
                >
                  {polaroid.caption}
                </span>
              </div>
            </div>
          ))}

          {/* Doodles */}
          <div
            ref={(el) => {
              if (el) collageItemsRef.current[17] = el;
            }}
            className="absolute"
            style={{ top: "55%", right: "16%" }}
          >
            <span
              style={{
                fontFamily: `"Space Mono", "Courier New", monospace`,
                fontSize: "9px",
                color: "#8a7f77",
                letterSpacing: "0.08em",
                opacity: 0.7,
                whiteSpace: "nowrap",
              }}
            >
              curious · building · exploring
            </span>
          </div>

          <div
            ref={(el) => {
              if (el) collageItemsRef.current[18] = el;
            }}
            className="absolute"
            style={{ bottom: "28%", right: "36%" }}
          >
            <svg
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
            </svg>
          </div>

          <div
            ref={(el) => {
              if (el) collageItemsRef.current[19] = el;
            }}
            className="absolute"
            style={{ bottom: "22%", right: "28%", rotate: "-6deg" }}
          >
            <svg
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
              <path
                d="M10 12h4"
                stroke="#e85d26"
                strokeWidth="2"
                opacity="0.45"
              />
            </svg>
          </div>

          <div
            ref={(el) => {
              if (el) collageItemsRef.current[20] = el;
            }}
            className="absolute"
            style={{ bottom: "22%", right: "46%", rotate: "4deg" }}
          >
            <svg
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
            </svg>
          </div>

          {/* Stitch */}
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

          {/* Name and Role */}
          <div
            className="absolute"
            style={{ bottom: "20%", left: "clamp(24px,3vw,48px)", zIndex: 10 }}
          >
            <div
              className="font-['Bebas_Neue','Impact',sans-serif] text-[clamp(3.2rem,12vw,10rem)] tracking-[-0.03em] leading-[0.92]"
              style={{ color: "transparent", WebkitTextStroke: "1px #ede8df" }}
            >
              Nazarene Wanyaga
            </div>
          </div>

          <div
            ref={rightRoleRef}
            className="absolute bottom-[clamp(80px,10vh,110px)] left-[clamp(24px,3vw,48px)] font-['Bebas_Neue','Impact',sans-serif] text-[clamp(20px,3vw,36px)] tracking-[-0.02em] opacity-0 transition-opacity duration-400"
            style={{ whiteSpace: "nowrap" }}
          >
            Developer
          </div>
        </div>

        {/* Divider */}
        <div
          ref={dividerRef}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "2px",
            background: "#e85d26",
            left: 0,
            pointerEvents: "none",
            zIndex: 10,
            transform: "translateX(0)",
          }}
        />

        {/* Tooltip */}
        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            top: "70%",
            padding: "1px 12px",
            textAlign: "center",
            borderRadius: "8px",
            fontFamily: `"Space Mono", "Courier New", monospace`,
            fontSize: "11px",
            backgroundColor: "#e85d26",
            color: "white",
            pointerEvents: "none",
            zIndex: 11,
            opacity: 0,
            transition: "opacity 0.3s",
          }}
        >
          ← designer
        </div>

        {/* Bottom CTA */}
        <div className="absolute bottom-[clamp(12px,1.5vh,20px)] left-0 right-0 text-center z-12 pointer-events-none">
          <a
            ref={ctaRef}
            onClick={handleCtaClick}
            style={{
              display: "inline-block",
              fontFamily: `"Space Mono", "Courier New", monospace`,
              fontSize: "12px",
              fontWeight: 700,
              color: "#e85d26",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              cursor: "pointer",
              pointerEvents: "auto",
            }}
          >
            [ click to explore ]
          </a>
        </div>

        {/* Fun Links */}
        <div
          className="absolute"
          style={{
            bottom: "clamp(80px,10vh,120px)",
            right: "clamp(24px,3vw,48px)",
            zIndex: 13,
            textAlign: "right",
            fontFamily: `"Space Mono", "Courier New", monospace`,
            fontSize: "clamp(11px,0.9vw,14px)",
            color: "#ede8df",
            lineHeight: 1.8,
            pointerEvents: "none",
          }}
        >
          <span style={{ color: "#8a7f77", marginRight: "8px" }}>
            want to snoop what i do for fun?
          </span>
          <br />
          <a
            href="https://github.com/nazarenegena"
            target="_blank"
            style={{
              color: "#e85d26",
              textDecoration: "none",
              pointerEvents: "auto",
              transition: "opacity 0.2s",
            }}
          >
            GitHub
          </a>
          <span style={{ color: "#8a7f77", margin: "0 8px" }}>·</span>
          <a
            href="https://www.linkedin.com/in/nazarene-wanyaga"
            target="_blank"
            style={{
              color: "#e85d26",
              textDecoration: "none",
              pointerEvents: "auto",
              transition: "opacity 0.2s",
            }}
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Sneak Back */}
      <a
        ref={sneakBackRef}
        onClick={handleSneakBackClick}
        className={`fixed bottom-[clamp(16px,2vh,32px)] left-[clamp(16px,2vw,32px)] z-[100] font-mono text-[11px] text-muted no-underline cursor-pointer opacity-0 pointer-events-none transition-opacity duration-500 ${isDismissed ? "show" : ""}`}
        style={{
          opacity: isDismissed ? 1 : 0,
          pointerEvents: isDismissed ? "auto" : "none",
          transition: "opacity 0.5s ease",
        }}
      >
        ↻ come back to play
      </a>
    </>
  );
}
