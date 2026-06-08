import { useEffect } from "react";
import Preloader from "./components/Preloader";
import TimeDisplay from "./components/TimeDisplay";
import SplitHero from "./components/SplitHero";
import ScrollProgress from "./components/ScrollProgress";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useGsapScroll } from "./hooks/useGsapScroll";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { getLenis } from "./hooks/useSmoothScroll";

function App() {
  useSmoothScroll();
  useGsapScroll();
  useScrollReveal();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("section") !== "projects") return;

    const el = document.getElementById("projects");
    if (!el) return;

    setTimeout(() => {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(el, { immediate: false });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 600);
  }, []);

  return (
    <div className="bg-bg text-fg min-h-screen">
      <Preloader />
      <SplitHero />
      <ScrollProgress />

      <div className="fixed top-4 right-4 z-50" style={{ mixBlendMode: "difference" }}>
        <TimeDisplay />
      </div>

      <div className="wrapperFirst">
        <About />
        <Projects />
      </div>

      <div className="ticker-container border-t border-accent/10 border-b border-accent/10">
        <div className="ticker-track py-4">
          <span className="ticker-text font-mono text-[10px] text-accent tracking-[0.12em] uppercase px-4">
            available for work · nairobi · frontend · design · open to collab · javascript · react · design systems ·
          </span>
          <span className="ticker-text font-mono text-[10px] text-accent tracking-[0.12em] uppercase px-4">
            available for work · nairobi · frontend · design · open to collab · javascript · react · design systems ·
          </span>
        </div>
      </div>

      <div className="wrapperSecond bg-surface/50">
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;