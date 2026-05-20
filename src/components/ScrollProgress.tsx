import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const updateBar = () => {
      if (!barRef.current) return;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / docHeight) * 100;
      barRef.current.style.width = `${progress}%`;
    };

    window.addEventListener("scroll", updateBar);
    updateBar();

    return () => {
      window.removeEventListener("scroll", updateBar);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 h-[2px] z-[40]"
      style={{
        background: "#e85d26",
        boxShadow: "0 0 8px rgba(232, 93, 38, 0.5), 0 0 20px rgba(232, 93, 38, 0.2)",
        width: "0%",
        pointerEvents: "none",
      }}
    />
  );
}