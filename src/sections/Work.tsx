import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WORK, WorkItem } from "../data/content";
import FlowField from "../components/FlowField";
import LiveCommit from "../components/LiveCommit";
import WorkModal from "../components/WorkModal";
import "./work.css";

gsap.registerPlugin(ScrollTrigger);

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_CURTAIN: [number, number, number, number] = [0.87, 0, 0.13, 1];

function WorkCard({ p, onOpen }: { p: WorkItem; onOpen: () => void }) {
  const reduce = useReducedMotion();

  return (
    <article className="work-item">
      <motion.div
        className="work-media"
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.div
          className="work-curtain"
          variants={{
            hidden: { clipPath: "inset(100% 0 0 0)" },
            show: { clipPath: "inset(0% 0 0 0)" },
          }}
          transition={{ duration: 0.7, ease: EASE_CURTAIN }}
        >
          <FlowField seed={p.seed} tint={p.tint} label={p.name} />
        </motion.div>
      </motion.div>

      <motion.div
        className="work-text"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 }}
      >
        <div className="work-row">
          <h3 className="work-name">
            {p.link ? (
              <a href={p.link} target="_blank" rel="noreferrer">
                {p.name} <span className="work-arrow">↗</span>
              </a>
            ) : (
              p.name
            )}
          </h3>
          <span className="work-year">{p.year}</span>
        </div>
        <p className="work-kind">{p.kind}</p>
        <p className="work-desc">{p.desc}</p>
        <p className="work-stack">{p.stack.join(" / ")}</p>
        {p.liveRepo && <LiveCommit repo={p.liveRepo} />}
        <button className="work-case" onClick={onOpen}>
          Case study
        </button>
      </motion.div>
    </article>
  );
}

const slugOf = (n: string) =>
  n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function Work() {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<WorkItem | null>(null);

  // Horizontal pinned pan on wide screens; vertical grid on mobile
  // and under prefers-reduced-motion.
  const [horizontal, setHorizontal] = useState(false);
  const wrapRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setHorizontal(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  useEffect(() => {
    if (!horizontal || !wrapRef.current || !trackRef.current) return;

    const lenis = (window as unknown as { __lenis?: { on: (e: string, f: () => void) => void; off: (e: string, f: () => void) => void } }).__lenis;
    const sync = () => ScrollTrigger.update();
    lenis?.on?.("scroll", sync);

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });
    }, wrapRef);

    return () => {
      lenis?.off?.("scroll", sync);
      ctx.revert();
    };
  }, [horizontal]);

  // Case studies are deep-linkable: #work/<slug>. openItem pushes exactly one
  // history entry and closeItem unwinds it with history.back(), so Back never
  // reopens a closed modal and history never grows across open/close cycles.
  const pushedEntry = useRef(false);

  useEffect(() => {
    let first = true;
    const syncFromHash = () => {
      const m = window.location.hash.match(/^#work\/(.+)$/);
      const item = m ? WORK.find((w) => slugOf(w.name) === m[1]) : undefined;
      // Any traversal or manual hash edit means our pushed entry is gone.
      pushedEntry.current = false;
      setSelected(item ?? null);
      if (item && first) {
        document.getElementById("work")?.scrollIntoView();
      }
      first = false;
    };
    syncFromHash();
    window.addEventListener("popstate", syncFromHash);
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      window.removeEventListener("popstate", syncFromHash);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, []);

  const openItem = (p: WorkItem) => {
    setSelected(p);
    history.pushState(null, "", `#work/${slugOf(p.name)}`);
    pushedEntry.current = true;
  };

  const closeItem = () => {
    setSelected(null);
    if (pushedEntry.current) {
      pushedEntry.current = false;
      history.back();
    } else if (window.location.hash.startsWith("#work/")) {
      // Opened via direct deep link: no entry of ours to unwind.
      history.replaceState(null, "", "#work");
    }
  };

  const heading = (
    <div className="h2-mask">
      <motion.h2
        initial={reduce ? false : { y: "110%" }}
        whileInView={reduce ? undefined : { y: "0%" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
      >
        Selected work
      </motion.h2>
    </div>
  );

  return (
    <section
      id="work"
      className={horizontal ? "work work-horizontal" : "work"}
      ref={wrapRef}
    >
      {horizontal ? (
        <>
          <div className="work-h-head container">
            {heading}
            <div className="work-h-progress" aria-hidden>
              <div className="work-h-progress-fill" ref={progressRef} />
            </div>
          </div>
          <div className="work-h-track" ref={trackRef}>
            {WORK.map((p) => (
              <WorkCard key={p.name} p={p} onOpen={() => openItem(p)} />
            ))}
          </div>
        </>
      ) : (
        <div className="container">
          {heading}
          <div className="work-grid">
            {WORK.map((p) => (
              <WorkCard key={p.name} p={p} onOpen={() => openItem(p)} />
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {selected && <WorkModal item={selected} onClose={closeItem} />}
      </AnimatePresence>
    </section>
  );
}
