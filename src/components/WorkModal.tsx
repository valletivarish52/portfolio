import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { WorkItem } from "../data/content";
import { lockScroll, unlockScroll } from "../lib/scrollLock";
import "./work-modal.css";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function WorkModal({
  item,
  onClose,
}: {
  item: WorkItem;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        // Cycle focus within the dialog.
        const panel = closeRef.current?.closest(".wm-panel");
        if (!panel) return;
        const focusables = panel.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])"
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (!panel.contains(active)) {
          // Focus escaped (e.g. click on panel text): pull it back in.
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    lockScroll();
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
      prevFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      className="wm-backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="wm-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${item.name} case study`}
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 44, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.99 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <button
          ref={closeRef}
          className="wm-close"
          onClick={onClose}
          aria-label="Close case study"
        >
          ✕
        </button>

        <div className="wm-head">
          <h3 className="wm-title">{item.name}</h3>
          <span className="wm-year">{item.year}</span>
        </div>
        <p className="wm-kind">{item.kind}</p>

        {item.caseStudy.overview && (
          <p className="wm-overview">{item.caseStudy.overview}</p>
        )}

        {(["problem", "approach", "outcome"] as const).map(
          (key) =>
            item.caseStudy[key] && (
              <div key={key} className="wm-block">
                <h4 className="wm-block-title">
                  {key === "problem"
                    ? "The problem"
                    : key === "approach"
                      ? "The approach"
                      : "The outcome"}
                </h4>
                <p className="wm-block-body">{item.caseStudy[key]}</p>
              </div>
            )
        )}

        {item.caseStudy.points && (
          <div className="wm-points">
            {item.caseStudy.points.map((point) => (
              <p key={point.slice(0, 24)} className="wm-point">
                {point}
              </p>
            ))}
          </div>
        )}

        <p className="wm-stack">{item.stack.join(" / ")}</p>

        {item.link && (
          <a
            className="wm-link"
            href={item.link}
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub ↗
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}
