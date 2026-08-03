import { motion, useReducedMotion } from "framer-motion";
import { ACHIEVEMENTS, EXPERIENCE } from "../data/content";
import "./experience.css";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Experience() {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2>Experience</h2>

        <div className="exp-stats">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.label}
              className="exp-stat"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
            >
              <span className="exp-stat-num">{a.stat}</span>
              <span className="exp-stat-label">{a.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="exp-rows">
          {EXPERIENCE.map((job, i) => (
            <motion.article
              key={`${job.company}-${job.period}`}
              className="exp-row"
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
            >
              <div className="exp-head">
                <div className="exp-ident">
                  <h3 className="exp-company">{job.company}</h3>
                  <p className="exp-sub">{job.role}</p>
                  <p className="exp-sub">{job.meta}</p>
                </div>
                <span className="exp-period">{job.period}</span>
              </div>
              <div className="exp-points">
                {job.points.map((pt) => (
                  <p key={pt}>{pt}</p>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
