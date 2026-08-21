import { motion, useReducedMotion } from "framer-motion";
import { ACHIEVEMENTS, CLIENT_WORK, EXPERIENCE, slugOf } from "../data/content";
import CountUp from "../components/CountUp";
import WorkCard from "../components/WorkCard";
import "./experience.css";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Experience() {
  const reduce = useReducedMotion();

  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: { duration: 0.6, ease: EASE, delay },
        };

  return (
    <section id="experience" className="exp">
      <div className="container">
        <h2 className="sr-only">Experience</h2>
        <div className="exp-stats">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div key={a.stat} className="exp-stat" {...reveal(i * 0.08)}>
              <span className="exp-stat-number">
                <CountUp value={a.stat} />
              </span>
              <span className="exp-stat-dir">{a.dir}</span>
              <span className="exp-stat-label">{a.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="exp-roles">
          {EXPERIENCE.map((role, i) => (
            <motion.div
              key={role.role}
              className="exp-role"
              {...reveal(i * 0.08)}
            >
              <div className="exp-role-head">
                <h3 className="exp-role-title">
                  {role.role}
                  <span className="exp-role-company"> · {role.company}</span>
                </h3>
                <span className="exp-role-period">{role.period}</span>
              </div>
              <p className="exp-role-summary">{role.summary}</p>
            </motion.div>
          ))}
        </div>

        <div className="exp-clients">
          {CLIENT_WORK.map((p) => (
            <WorkCard
              key={p.name}
              p={p}
              onOpen={() =>
                window.dispatchEvent(
                  new CustomEvent("vv:case", { detail: slugOf(p.name) })
                )
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
