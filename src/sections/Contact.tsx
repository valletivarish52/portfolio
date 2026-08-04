import { motion, useReducedMotion } from "framer-motion";
import { PROFILE, RESUME_FILE } from "../data/content";
import "./contact.css";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Contact() {
  const reduce = useReducedMotion();

  const reveal = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.4 },
        transition: { duration: 0.8, ease: EASE },
      };

  const links = [
    { label: "GitHub", href: PROFILE.links.github },
    { label: "LinkedIn", href: PROFILE.links.linkedin },
    { label: "LeetCode", href: PROFILE.links.leetcode },
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="h2-mask">
          <motion.h2
            className="contact-intro"
            initial={reduce ? false : { y: "110%" }}
            whileInView={reduce ? undefined : { y: "0%" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            Have a project in mind?
          </motion.h2>
        </div>

        <motion.a
          href={`mailto:${PROFILE.email}`}
          className="contact-email"
          {...reveal}
        >
          {PROFILE.email}
        </motion.a>

        <div className="contact-links">
          {links.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label} ↗
            </a>
          ))}
          <a href={`${import.meta.env.BASE_URL}${RESUME_FILE}`} download>
            Résumé ↓
          </a>
        </div>

        <footer className="contact-footer">
          <span>© 2026 Varish Valleti</span>
          <span>Hyderabad, India</span>
        </footer>
      </div>
    </section>
  );
}
