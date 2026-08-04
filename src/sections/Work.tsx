import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { WORK, WorkItem } from "../data/content";
import "./work.css";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_CURTAIN: [number, number, number, number] = [0.87, 0, 0.13, 1];

function WorkCard({ p }: { p: WorkItem }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <article ref={ref} className="work-item">
      <motion.div
        className="work-media"
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div
          className="work-curtain"
          style={reduce ? undefined : { y: parallaxY, scale: 1.15 }}
          variants={{
            hidden: { clipPath: "inset(100% 0 0 0)" },
            show: { clipPath: "inset(0% 0 0 0)" },
          }}
          transition={{ duration: 0.9, ease: EASE_CURTAIN }}
        >
          <img src={p.image} alt={p.name} loading="lazy" />
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
                {p.name} ↗
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
      </motion.div>
    </article>
  );
}

export default function Work() {
  const reduce = useReducedMotion();

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
            <WorkCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
