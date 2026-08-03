import { motion, useReducedMotion } from "framer-motion";
import { SKILLS, EDUCATION, AWARD } from "../data/content";
import "./about.css";

const STATEMENT =
  "Backend engineer at Monocept, building the MPro platform for Axis Max Life Insurance. I care about the paths users never see: the query plan, the cache hit, the failed retry.";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function About() {
  const reduce = useReducedMotion();
  const words = STATEMENT.split(" ");

  const fadeUp = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.7, delay: i * 0.06, ease: EASE },
        };

  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About</h2>

        {reduce ? (
          <p className="about-statement">{STATEMENT}</p>
        ) : (
          <p className="about-statement">
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0.12 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.02, ease: "easeOut" }}
              >
                {word}
                {i < words.length - 1 ? " " : ""}
              </motion.span>
            ))}
          </p>
        )}

        <div className="about-skills">
          {SKILLS.map((group, i) => (
            <motion.div key={group.group} {...fadeUp(i)}>
              <h3 className="about-group-name">{group.group}</h3>
              <ul className="about-group-items">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div className="about-meta" {...fadeUp(0)}>
          <div>
            <p className="about-school">{EDUCATION.school}</p>
            <p className="about-edu-line">{EDUCATION.degree}</p>
            <p className="about-edu-line">{EDUCATION.period}</p>
            <p className="about-edu-line">{EDUCATION.note}</p>
          </div>
          <p className="about-award">{AWARD}</p>
        </motion.div>
      </div>
    </section>
  );
}
