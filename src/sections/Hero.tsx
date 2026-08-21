import { Suspense, lazy, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
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
  // Kinetic exit: the two name lines shear apart as the visitor scrolls away.
  // Viewport-relative so the name never slides past the container padding.
  const shearA = useTransform(scrollYProgress, [0, 1], ["0vw", "-2.2vw"]);
  const shearB = useTransform(scrollYProgress, [0, 1], ["0vw", "2.2vw"]);

  // Egg: clicking the outlined surname scrambles it, then it settles back.
  const [surname, setSurname] = useState(PROFILE.lastName);
  const scrambling = useRef(false);
  const scramble = () => {
    if (reduce || scrambling.current) return;
    scrambling.current = true;
    const target = PROFILE.lastName.toUpperCase();
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let settled = 0;
    const timer = window.setInterval(() => {
      settled += 1;
      setSurname(
        target
          .split("")
          .map((c, i) =>
            i < settled ? c : chars[Math.floor(Math.random() * chars.length)]
          )
          .join("")
      );
      if (settled >= target.length) {
        window.clearInterval(timer);
        setSurname(PROFILE.lastName);
        scrambling.current = false;
      }
    }, 70);
  };

  const line = (text: string, delay: number, thin = false) => (
    <span
      className="hero-line"
      onClick={thin ? scramble : undefined}
    >
      <motion.span
        className={thin ? "thin" : undefined}
        initial={reduce ? false : { y: "110%" }}
        animate={ready ? { y: "0%" } : {}}
        style={reduce ? undefined : { x: thin ? shearB : shearA }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {text}
      </motion.span>
    </span>
  );

  return (
    <header className="hero" id="top" ref={heroRef}>
      <Suspense fallback={null}>
        <ThreeScene />
      </Suspense>
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
          {line(surname, 0.45, true)}
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
