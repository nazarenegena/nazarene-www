import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import TimeDisplay from "./components/TimeDisplay";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useGsapScroll } from "./hooks/useGsapScroll";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

function App() {
  useSmoothScroll();
  useGsapScroll();

  return (
    <div className="bg-bg text-fg min-h-screen">
      <Preloader />
      <CustomCursor />

      <div className="fixed top-4 right-4 z-50">
        <TimeDisplay />
      </div>

      <div className="wrapperFirst">
        <Hero />
        <About />
        <Projects />
      </div>

      <div className="wrapperSecond bg-surface/50">
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
