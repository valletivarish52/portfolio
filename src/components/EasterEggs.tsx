import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./easter-eggs.css";

// Two quiet eggs: typing "hire" anywhere jumps to contact with a wink,
// and a palette-triggered runtime stats panel for the latency-obsessed.

function useTypedTrigger(word: string, onTrigger: () => void) {
  useEffect(() => {
    let buffer = "";
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        e.metaKey ||
        e.ctrlKey ||
        e.altKey ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-word.length);
      if (buffer === word) {
        buffer = "";
        onTrigger();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [word, onTrigger]);
}

function StatsPanel({ onClose }: { onClose: () => void }) {
  const [fps, setFps] = useState(0);
  const [frameMs, setFrameMs] = useState(0);
  const [size, setSize] = useState(`${window.innerWidth}×${window.innerHeight}`);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let frames = 0;
    let acc = 0;
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      frames += 1;
      acc += dt;
      if (acc >= 500) {
        setFps(Math.round((frames * 1000) / acc));
        setFrameMs(Math.round((acc / frames) * 10) / 10);
        frames = 0;
        acc = 0;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const onResize = () =>
      setSize(`${window.innerWidth}×${window.innerHeight}`);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <motion.div
      className="egg-stats"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.25 }}
    >
      <div className="egg-stats-row">
        <span>fps</span>
        <span>{fps}</span>
      </div>
      <div className="egg-stats-row">
        <span>frame</span>
        <span>{frameMs} ms</span>
      </div>
      <div className="egg-stats-row">
        <span>viewport</span>
        <span>{size}</span>
      </div>
      <div className="egg-stats-row">
        <span>dpr</span>
        <span>{window.devicePixelRatio}</span>
      </div>
      <div className="egg-stats-row">
        <span>build</span>
        <span>{__BUILD_DATE__}</span>
      </div>
      <button className="egg-stats-close" onClick={onClose} aria-label="Close stats">
        ✕
      </button>
    </motion.div>
  );
}

export default function EasterEggs() {
  const [toast, setToast] = useState<string | null>(null);
  const [stats, setStats] = useState(false);
  const toastTimer = useRef(0);

  const showToast = (msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  };

  useTypedTrigger("hire", () => {
    const el = document.getElementById("contact");
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element) => void } }).__lenis;
    if (el && lenis) lenis.scrollTo(el);
    else el?.scrollIntoView({ behavior: "smooth" });
    showToast("Good instinct. The email is right there.");
  });

  useTypedTrigger("sudo", () => {
    showToast("Permission granted. You were always root here.");
  });

  // Konami: the starfield warps lime for a few seconds.
  useEffect(() => {
    const SEQ = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
    ];
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = key === SEQ[pos] ? pos + 1 : key === SEQ[0] ? 1 : 0;
      if (pos === SEQ.length) {
        pos = 0;
        window.dispatchEvent(new Event("vv:party"));
        showToast("Warp drive engaged.");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Tab-away title swap.
  useEffect(() => {
    const original = document.title;
    const onVis = () => {
      document.title = document.hidden
        ? "Come back, the latency misses you"
        : original;
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      document.title = original;
    };
  }, []);

  // One patient-visitor toast per session.
  useEffect(() => {
    if (sessionStorage.getItem("vv-patient")) return;
    const t = window.setTimeout(() => {
      sessionStorage.setItem("vv-patient", "1");
      showToast("Five minutes deep. The résumé is shorter, I promise.");
    }, 5 * 60 * 1000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const onStats = () => setStats((s) => !s);
    window.addEventListener("vv:stats", onStats);
    return () => {
      window.removeEventListener("vv:stats", onStats);
      window.clearTimeout(toastTimer.current);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {toast && (
          <motion.p
            className="egg-toast"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            role="status"
          >
            {toast}
          </motion.p>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {stats && <StatsPanel onClose={() => setStats(false)} />}
      </AnimatePresence>
    </>
  );
}
