import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { WORK, WorkItem } from "../data/content";
import FlowField from "../components/FlowField";
import WorkModal from "../components/WorkModal";
import "./work.css";

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
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div
          className="work-curtain"
          variants={{
            hidden: { clipPath: "inset(100% 0 0 0)" },
            show: { clipPath: "inset(0% 0 0 0)" },
          }}
          transition={{ duration: 0.9, ease: EASE_CURTAIN }}
        >
          <FlowField seed={p.seed} tint={p.tint} label={p.name} />
        </motion.div>
      </motion.div>

      <motion.div
        className="work-text"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.35 }}
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

  return (
    <section id="work" className="work">
      <div className="container">
        <div className="h2-mask">
          <motion.h2
            initial={reduce ? false : { y: "110%" }}
            whileInView={reduce ? undefined : { y: "0%" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
          >
            Selected work
          </motion.h2>
        </div>

        <div className="work-grid">
          {WORK.map((p) => (
            <WorkCard key={p.name} p={p} onOpen={() => openItem(p)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <WorkModal item={selected} onClose={closeItem} />}
      </AnimatePresence>
    </section>
  );
}
