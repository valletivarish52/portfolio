import { motion } from "framer-motion";
import { PROFILE, RESUME_FILE } from "../data/content";

export default function Nav({ ready }: { ready: boolean }) {
  return (
    <motion.nav
      className="nav"
      initial={{ opacity: 0, y: -12 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <a href="#top" className="nav-mark">
        VV
      </a>
      <div className="nav-links">
        <a href="#work">Work</a>
        <a href="#experience">Experience</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href={PROFILE.links.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <a
          href={`${import.meta.env.BASE_URL}${RESUME_FILE}`}
          download
          className="nav-resume"
        >
          Résumé
        </a>
      </div>
    </motion.nav>
  );
}
