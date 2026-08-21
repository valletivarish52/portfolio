import { useRef } from "react";
import {
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { AWARD, EDUCATION, STACK_LINE } from "../data/content";
import ParallaxY from "../components/ParallaxY";
import "./about.css";

// One word of the statement, its opacity scrubbed to scroll position.
function ScrubWord({
  progress,
  index,
  total,
  word,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  word: string;
}) {
  const start = (index / total) * 0.85;
  const end = start + 0.12;
  const opacity = useTransform(progress, [start, end], [0.14, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

const STATEMENT =
  "My work spans two Axis Max Life platforms: MPro's policy onboarding and search, and Dolphin's event-driven reinstatement flows. I care about the paths users never see: the query plan, the cache hit, the failed retry.";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const CURTAIN: [number, number, number, number] = [0.87, 0, 0.13, 1];
const BASE = import.meta.env.BASE_URL;

export default function About() {
  const reduce = useReducedMotion();
  const words = STATEMENT.split(" ");
  const statementRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: statementRef,
    offset: ["start 0.9", "end 0.45"],
  });

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
              <p className="about-statement" ref={statementRef}>
                {words.map((word, i) => (
                  <ScrubWord
                    key={`${word}-${i}`}
                    progress={scrollYProgress}
                    index={i}
                    total={words.length}
                    word={word}
                  />
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
          <motion.p className="about-education" {...fadeUp(0.05)}>
            {EDUCATION.degree}, {EDUCATION.school}, {EDUCATION.period}
          </motion.p>
          <div className="about-award-media">
            <ParallaxY from={16} to={-16}>
              <motion.img
                src={`${BASE}images/award-ceremony.jpg`}
                alt="Varish receiving the Excellence Award on stage at Axis Max Life"
                loading="lazy"
                width="1600"
                height="1200"
                {...fadeUp(0.1)}
              />
            </ParallaxY>
            <ParallaxY from={34} to={-34}>
              <motion.img
                src={`${BASE}images/award-trophy.jpg`}
                alt="Excellence Award trophy presented to Valleti Varish"
                loading="lazy"
                width="900"
                height="1599"
                {...fadeUp(0.2)}
              />
            </ParallaxY>
          </div>
        </div>
      </div>
    </section>
  );
}
