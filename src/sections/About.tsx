import { motion, useReducedMotion } from "framer-motion";
import { AWARD, STACK_LINE } from "../data/content";
import "./about.css";

const STATEMENT =
  "Backend engineer at Monocept, building the MPro platform for Axis Max Life Insurance. I care about the paths users never see: the query plan, the cache hit, the failed retry.";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const CURTAIN: [number, number, number, number] = [0.87, 0, 0.13, 1];
const BASE = import.meta.env.BASE_URL;

export default function About() {
  const reduce = useReducedMotion();
  const words = STATEMENT.split(" ");

  const fadeUp = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-grid">
          <div>
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
                    transition={{
                      duration: 0.5,
                      delay: i * 0.02,
                      ease: "easeOut",
                    }}
                  >
                    {word}
                    {i < words.length - 1 ? " " : ""}
                  </motion.span>
                ))}
              </p>
            )}
            <motion.p className="about-stack" {...fadeUp(0.1)}>
              {STACK_LINE}
            </motion.p>
          </div>

          <motion.figure
            className="about-photo"
            initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
            whileInView={reduce ? undefined : { clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: CURTAIN }}
          >
            <img
              src={`${BASE}images/varish.jpg`}
              alt="Portrait of Varish Valleti"
              loading="lazy"
              width="434"
              height="512"
            />
          </motion.figure>
        </div>

        <div className="about-award-band">
          <motion.p className="about-award" {...fadeUp(0)}>
            {AWARD}
          </motion.p>
          <div className="about-award-media">
            <motion.img
              src={`${BASE}images/award-ceremony.jpg`}
              alt="Varish receiving the Excellence Award on stage at Axis Max Life"
              loading="lazy"
              {...fadeUp(0.1)}
            />
            <motion.img
              src={`${BASE}images/award-trophy.jpg`}
              alt="Excellence Award trophy presented to Valleti Varish"
              loading="lazy"
              {...fadeUp(0.2)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
