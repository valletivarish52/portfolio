import { Suspense, lazy, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { PROFILE } from "../data/content";
import Magnetic from "../components/Magnetic";

const ThreeScene = lazy(() => import("../three/ThreeScene"));

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0.15]);

  const glowX = useMotionValue(-600);
  const glowY = useMotionValue(-600);
  const glowSX = useSpring(glowX, { stiffness: 60, damping: 18 });
  const glowSY = useSpring(glowY, { stiffness: 60, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    glowX.set(e.clientX - r.left);
    glowY.set(e.clientY - r.top);
  };

  const line = (text: string, delay: number, thin = false) => (
    <span className="hero-line">
      <motion.span
        className={thin ? "thin" : undefined}
        initial={reduce ? false : { y: "110%" }}
        animate={ready ? { y: "0%" } : {}}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {text}
      </motion.span>
    </span>
  );

  return (
    <header className="hero" id="top" ref={heroRef} onPointerMove={onMove}>
      <Suspense fallback={null}>
        <ThreeScene />
      </Suspense>
      {!reduce && (
        <motion.div
          className="hero-glow"
          style={{ x: glowSX, y: glowSY }}
          aria-hidden
        />
      )}
      <motion.div
        className="container"
        style={reduce ? undefined : { y, opacity: fade }}
      >
        <motion.p
          className="hero-role"
          initial={reduce ? false : { opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          {PROFILE.role} · {PROFILE.location}
        </motion.p>
        <h1 className="hero-name">
          {line(PROFILE.firstName, 0.35)}
          {line(PROFILE.lastName, 0.45, true)}
        </h1>
        <motion.p
          className="hero-sub"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
        >
          {PROFILE.tagline}
        </motion.p>
        <Magnetic strength={0.3}>
          <motion.a
            href="#work"
            className="hero-cta"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.78, ease: EASE }}
          >
            View selected work
          </motion.a>
        </Magnetic>
      </motion.div>
    </header>
  );
}
