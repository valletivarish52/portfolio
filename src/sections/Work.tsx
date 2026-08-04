import { motion, useReducedMotion } from "framer-motion";
import { WORK } from "../data/content";
import "./work.css";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_CURTAIN: [number, number, number, number] = [0.87, 0, 0.13, 1];

export default function Work() {
  const reduce = useReducedMotion();

  return (
    <section id="work" className="work">
      <div className="container">
        <h2>Selected work</h2>

        <div className="work-grid">
          {WORK.map((p) => (
            <article key={p.name} className="work-item">
              <div className="work-media">
                <motion.div
                  className="work-curtain"
                  initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
                  whileInView={
                    reduce ? undefined : { clipPath: "inset(0% 0 0 0)" }
                  }
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.9, ease: EASE_CURTAIN }}
                >
                  <img src={p.image} alt={p.name} loading="lazy" />
                </motion.div>
              </div>

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
          ))}
        </div>
      </div>
    </section>
  );
}
