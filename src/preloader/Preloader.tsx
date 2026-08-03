import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { GREETINGS } from "./greetings";

interface PreloaderProps {
  onComplete: () => void;
}

interface AmbientSpec {
  text: string;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  peak: number;
  rotate: number;
  weight: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Preloader({ onComplete }: PreloaderProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);
  const progress = useMotionValue(0);
  const progressSpring = useSpring(progress, { stiffness: 80, damping: 22 });

  const ambient = useMemo<AmbientSpec[]>(() => {
    if (reduce) return [];
    return GREETINGS.slice(1, GREETINGS.length - 1).map((g, i) => {
      const r = (n: number) => {
        // deterministic-ish pseudo random per item
        const x = Math.sin(i * 127.1 + n * 311.7) * 43758.5453;
        return x - Math.floor(x);
      };
      return {
        text: g.text,
        left: 6 + r(1) * 84,
        top: 8 + r(2) * 80,
        size: 12 + r(3) * 18,
        delay: r(4) * 2200,
        duration: 1300 + r(5) * 900,
        peak: 0.1 + r(6) * 0.26,
        rotate: -6 + r(7) * 12,
        weight: r(8) > 0.5 ? 500 : 350,
      };
    });
  }, [reduce]);

  useEffect(() => {
    const finish = () => {
      if (done.current) return;
      done.current = true;
      onComplete();
    };

    if (reduce) {
      progress.set(1);
      const t = window.setTimeout(finish, 900);
      return () => window.clearTimeout(t);
    }

    let i = 0;
    let t: number;
    const step = () => {
      setIndex(i);
      progress.set((i + 1) / GREETINGS.length);
      const d = i === 0 ? 440 : Math.max(140, 310 - i * 14);
      i += 1;
      if (i < GREETINGS.length) {
        t = window.setTimeout(step, d);
      } else {
        setLeaving(true);
        t = window.setTimeout(finish, 620);
      }
    };
    t = window.setTimeout(step, 160);
    return () => window.clearTimeout(t);
  }, [reduce, onComplete, progress]);

  const current = GREETINGS[index];

  return (
    <div className="preloader" aria-label="Loading" role="status">
      <div className="pre-glow a" />
      <div className="pre-glow b" />

      {!reduce && (
        <motion.div
          className="pre-ambient"
          animate={{ opacity: leaving ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          aria-hidden
        >
          {ambient.map((a, i) => (
            <motion.span
              key={i}
              style={{
                left: `${a.left}%`,
                top: `${a.top}%`,
                fontSize: a.size,
                fontWeight: a.weight,
              }}
              initial={{ opacity: 0, y: 22, rotate: a.rotate, filter: "blur(6px)" }}
              animate={{
                opacity: [0, a.peak, 0],
                y: [22, 0, -16],
                filter: ["blur(6px)", "blur(0px)", "blur(4px)"],
              }}
              transition={{
                duration: a.duration / 1000,
                delay: a.delay / 1000,
                times: [0, 0.45, 1],
                ease: "easeInOut",
              }}
            >
              {a.text}
            </motion.span>
          ))}
        </motion.div>
      )}

      <div className="pre-center">
        {reduce ? (
          <span className="pre-word" style={{ position: "static" }}>
            Hello
          </span>
        ) : (
          <AnimatePresence>
            <motion.span
              key={index}
              className="pre-word"
              dir="auto"
              initial={{ opacity: 0, y: 26, scale: 0.96, filter: "blur(10px)" }}
              animate={{
                opacity: leaving ? 0 : 1,
                y: 0,
                scale: leaving ? 1.04 : 1,
                filter: leaving ? "blur(8px)" : "blur(0px)",
              }}
              exit={{ opacity: 0, y: -26, scale: 1.02, filter: "blur(10px)" }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {current.text}
            </motion.span>
          </AnimatePresence>
        )}
      </div>

      <div className="pre-progress">
        <motion.div className="pre-progress-fill" style={{ scaleX: progressSpring }} />
      </div>
      <div className="pre-lang">{reduce ? "ENGLISH" : current.lang.toUpperCase()}</div>
    </div>
  );
}
