import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PROFILE, RESUME_FILE } from "../data/content";
import "./contact.css";

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (copied) return;
    try {
      await navigator.clipboard.writeText(PROFILE.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = PROFILE.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      className={`contact-copy${copied ? " copied" : ""}`}
      onClick={copy}
      aria-live="polite"
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
    { label: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/ /g, "")}` },
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <p className="contact-status">
          Open to full-time backend roles.
        </p>
        <div className="h2-mask">
          <motion.h2
            className="contact-intro"
            initial={reduce ? false : { y: "110%" }}
            whileInView={reduce ? undefined : { y: "0%" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            Get in touch
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
          {links.map((link) =>
            link.href.startsWith("http") ? (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.label} ↗
              </a>
            ) : (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            )
          )}
          <a href={`${import.meta.env.BASE_URL}${RESUME_FILE}`} download>
            Résumé ↓
          </a>
        </div>

        <p className="contact-colophon">
          This site: React 18, TypeScript, Framer Motion, Three.js and Lenis.
          Core bundle ~105 KB gzipped, WebGL code-split, reduced motion
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
