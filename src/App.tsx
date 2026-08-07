import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import Lenis from "lenis";
import Preloader from "./preloader/Preloader";
import Nav from "./sections/Nav";
import Hero from "./sections/Hero";
import Experience from "./sections/Experience";
import Work from "./sections/Work";
import About from "./sections/About";
import Contact from "./sections/Contact";
import CommandPalette from "./components/CommandPalette";
import EasterEggs from "./components/EasterEggs";

const SEEN_KEY = "vv-preloader-seen";

const MARQUEE_ITEMS = [
  "Spring Boot",
  "Java",
  "AWS",
  "Redis",
  "Microservices",
  "React",
  "MySQL",
  "MongoDB",
  "Docker",
  "CI/CD",
];

function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  if (reduce) return null;
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

function Marquee() {
  const row = (
    <div className="marquee-track" aria-hidden>
      {MARQUEE_ITEMS.map((s) => (
        <span key={s}>{s}</span>
      ))}
    </div>
  );
  return (
    <div className="marquee" aria-label={`Stack: ${MARQUEE_ITEMS.join(", ")}`}>
      {row}
      {row}
    </div>
  );
}

function useLenis() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.1,
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
      lenis.destroy();
    };
  }, [reduce]);
}

export default function App() {
  useLenis();
  const [loading, setLoading] = useState(
    () => !sessionStorage.getItem(SEEN_KEY)
  );
  const ready = !loading;

  const handleComplete = useCallback(() => {
    sessionStorage.setItem(SEEN_KEY, "1");
    setLoading(false);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="grain" />
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.87, 0, 0.13, 1] }}
            style={{ position: "fixed", inset: 0, zIndex: 100 }}
          >
            <Preloader onComplete={handleComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollProgress />
      <CommandPalette />
      <EasterEggs />
      <Nav ready={ready} />
      <motion.main
        id="main"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Hero ready={ready} />
        <Marquee />
        <Work />
        <Experience />
        <About />
        <Contact />
      </motion.main>
    </>
  );
}