import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROFILE, RESUME_FILE } from "../data/content";
import "./command-palette.css";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Action {
  id: string;
  label: string;
  hint: string;
  run: () => void | Promise<void>;
}

function scrollToSection(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element) => void } }).__lenis;
  if (lenis) lenis.scrollTo(el);
  else el.scrollIntoView({ behavior: "smooth" });
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
    setCopied(false);
  }, []);

  const actions = useMemo<Action[]>(
    () => [
      { id: "work", label: "Go to Work", hint: "Section", run: () => { scrollToSection("#work"); close(); } },
      { id: "experience", label: "Go to Experience", hint: "Section", run: () => { scrollToSection("#experience"); close(); } },
      { id: "about", label: "Go to About", hint: "Section", run: () => { scrollToSection("#about"); close(); } },
      { id: "contact", label: "Go to Contact", hint: "Section", run: () => { scrollToSection("#contact"); close(); } },
      {
        id: "copy-email",
        label: copied ? "Copied ✓" : "Copy email address",
        hint: PROFILE.email,
        run: async () => {
          await navigator.clipboard.writeText(PROFILE.email);
          setCopied(true);
          window.setTimeout(close, 700);
        },
      },
      {
        id: "resume",
        label: "Download résumé",
        hint: "PDF",
        run: () => {
          const a = document.createElement("a");
          a.href = `${import.meta.env.BASE_URL}${RESUME_FILE}`;
          a.download = RESUME_FILE;
          a.click();
          close();
        },
      },
      { id: "github", label: "Open GitHub", hint: "↗", run: () => { window.open(PROFILE.links.github, "_blank"); close(); } },
      { id: "linkedin", label: "Open LinkedIn", hint: "↗", run: () => { window.open(PROFILE.links.linkedin, "_blank"); close(); } },
      { id: "leetcode", label: "Open LeetCode", hint: "↗", run: () => { window.open(PROFILE.links.leetcode, "_blank"); close(); } },
    ],
    [close, copied]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => a.label.toLowerCase().includes(q) || a.hint.toLowerCase().includes(q));
  }, [actions, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("vv:palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("vv:palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowDown") { e.preventDefault(); setIndex((i) => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setIndex((i) => Math.max(i - 1, 0)); }
      if (e.key === "Enter") { filtered[index]?.run(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, filtered, index, close]);

  useEffect(() => {
    setIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cp-backdrop"
          onClick={close}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="cp-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <input
              ref={inputRef}
              className="cp-input"
              placeholder="Type a command or search"
              aria-label="Search commands"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="cp-list" role="listbox" aria-label="Commands">
              {filtered.length === 0 && <p className="cp-empty">No matches.</p>}
              {filtered.map((a, i) => (
                <button
                  key={a.id}
                  role="option"
                  aria-selected={i === index}
                  className={`cp-item${i === index ? " active" : ""}`}
                  onMouseEnter={() => setIndex(i)}
                  onClick={() => a.run()}
                >
                  <span>{a.label}</span>
                  <span className="cp-hint">{a.hint}</span>
                </button>
              ))}
            </div>
            <div className="cp-foot">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
