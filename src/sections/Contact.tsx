import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PROFILE, RESUME_FILE } from "../data/content";
import "./contact.css";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="contact-copy"
      onClick={async () => {
        await navigator.clipboard.writeText(PROFILE.email);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }}
    >
      {copied ? "Copied ✓" : "Copy email"}
    </button>
  );
}

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
        <p className="contact-status">
          Open to full-time roles and interesting backend problems.
        </p>
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

        <CopyEmail />

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

        <p className="contact-colophon">
          This site: React 18, TypeScript, Framer Motion, Three.js and Lenis.
          Core bundle ~97 KB gzipped, WebGL code-split, reduced motion
          respected.{" "}
          <a
            href="https://github.com/valletivarish52/portfolio"
            target="_blank"
            rel="noreferrer"
          >
            Source ↗
          </a>
        </p>

        <footer className="contact-footer">
          <span>© 2026 Varish Valleti</span>
          <span>Hyderabad, India · Updated {__BUILD_DATE__}</span>
        </footer>
      </div>
    </section>
  );
}
