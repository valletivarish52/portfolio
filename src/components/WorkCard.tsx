import { motion, useReducedMotion } from "framer-motion";
import { WorkItem } from "../data/content";
import FlowField from "./FlowField";
import LiveCommit from "./LiveCommit";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_CURTAIN: [number, number, number, number] = [0.87, 0, 0.13, 1];

export default function WorkCard({
  p,
  onOpen,
}: {
  p: WorkItem;
  onOpen: () => void;
}) {
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
