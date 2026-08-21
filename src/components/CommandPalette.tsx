import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROFILE, RESUME_FILE } from "../data/content";
import { lockScroll, unlockScroll } from "../lib/scrollLock";
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

export default function CommandPalette({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
    setCopied(false);
  }, []);

  const actions = useMemo<Action[]>(
    () => [
      { id: "experience", label: "Go to Experience", hint: "Section", run: () => { scrollToSection("#experience"); close(); } },
      { id: "work", label: "Go to Projects", hint: "Section", run: () => { scrollToSection("#work"); close(); } },
      { id: "about", label: "Go to About", hint: "Section", run: () => { scrollToSection("#about"); close(); } },
      { id: "contact", label: "Go to Contact", hint: "Section", run: () => { scrollToSection("#contact"); close(); } },
      {
        id: "copy-email",
        label: copied ? "Copied ✓" : "Copy email address",
        hint: PROFILE.email,
        run: async () => {
          try {
            await navigator.clipboard.writeText(PROFILE.email);
            setCopied(true);
            window.setTimeout(close, 700);
          } catch {
            close();
          }
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
      {
        id: "stats",
        label: "Runtime stats",
        hint: "for nerds",
        run: () => {
          window.dispatchEvent(new Event("vv:stats"));
          close();
        },
      },
      {
        id: "replay-intro",
        label: "Replay intro",
        hint: "hello ×17",
        run: () => {
          sessionStorage.removeItem("vv-preloader-seen");
          window.location.hash = "";
          window.location.reload();
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

  // Global open/toggle listeners, inert until the preloader is done.
  useEffect(() => {
    if (!ready) return;
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
  }, [ready]);

  // Scroll lock + focus capture: runs once per open, never on keystrokes.
  useEffect(() => {
    if (!open) return;
    prevFocus.current = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    lockScroll();
    return () => {
      unlockScroll();
      prevFocus.current?.focus?.();
    };
  }, [open]);

  // Key handling. Capture phase + stopImmediatePropagation so the palette,
  // as the topmost layer, owns Escape even when a modal is open beneath it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        close();
      }
      if (e.key === "ArrowDown") { e.preventDefault(); setIndex((i) => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setIndex((i) => Math.max(i - 1, 0)); }
      if (e.key === "Enter") { filtered[index]?.run(); }
      if (e.key === "Tab") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, [open, filtered, index, close]);

  useEffect(() => {
    setIndex(0);
  }, [query]);

  // Keep the active option visible in the scrollable list.
  useEffect(() => {
    if (!open) return;
    document
      .getElementById(`cp-opt-${index}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, index]);

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
              role="combobox"
              aria-expanded="true"
              aria-controls="cp-listbox"
              aria-activedescendant={filtered.length > 0 ? `cp-opt-${index}` : undefined}
              aria-label="Search commands"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div
              id="cp-listbox"
              className="cp-list"
              role="listbox"
              aria-label="Commands"
              data-lenis-prevent
            >
              {filtered.length === 0 && <p className="cp-empty">No matches.</p>}
              {filtered.map((a, i) => (
                <button
                  key={a.id}
                  id={`cp-opt-${i}`}
                  role="option"
                  aria-selected={i === index}
                  className={`cp-item${i === index ? " active" : ""}`}
                  tabIndex={-1}
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
