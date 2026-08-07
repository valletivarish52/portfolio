import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROFILE, RESUME_FILE } from "../data/content";
import { GREETINGS } from "../preloader/greetings";
import { lockScroll, unlockScroll } from "../lib/scrollLock";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SECTIONS: [string, string][] = [
  ["#work", "Work"],
  ["#experience", "Experience"],
  ["#about", "About"],
  ["#contact", "Contact"],
];

export default function Nav({ ready }: { ready: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [greet, setGreet] = useState<number | null>(null);
  const greetStep = useRef(0);
  const greetTimer = useRef(0);

  const onMarkClick = () => {
    greetStep.current = (greetStep.current + 1) % (GREETINGS.length - 1);
    setGreet(greetStep.current);
    window.clearTimeout(greetTimer.current);
    greetTimer.current = window.setTimeout(() => setGreet(null), 1800);
  };

  useEffect(() => () => window.clearTimeout(greetTimer.current), []);

  useEffect(() => {
    if (!menuOpen) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const firstLink = document.querySelector<HTMLElement>(".mnav-links a");
    firstLink?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
      document.querySelector<HTMLElement>(".nav-burger")?.focus();
    };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        className="nav"
        initial={{ opacity: 0, y: -12 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
      >
        <a href="#top" className="nav-mark" onClick={onMarkClick}>
          VV
        </a>
        <div className="nav-links">
          <span className="nav-status">
            <span className="nav-status-dot" aria-hidden />
            {PROFILE.availability}
          </span>
          {SECTIONS.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
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
          <button
            className="nav-palette"
            title="Command palette"
            aria-label="Open command palette"
            onClick={() => window.dispatchEvent(new Event("vv:palette"))}
          >
            ⌘K
          </button>
          <button
            className="nav-burger"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {greet !== null && (
          <motion.p
            key={greet}
            className="nav-greet"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE }}
            aria-hidden
          >
            {GREETINGS[greet].text}
            <span> · {GREETINGS[greet].lang}</span>
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mnav"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mnav-links">
              {SECTIONS.map(([href, label], i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 + i * 0.06, ease: EASE }}
                >
                  {label}
                </motion.a>
              ))}
            </div>
            <motion.div
              className="mnav-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a href={PROFILE.links.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a
                href={`${import.meta.env.BASE_URL}${RESUME_FILE}`}
                download
                onClick={() => setMenuOpen(false)}
              >
                Résumé ↓
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
