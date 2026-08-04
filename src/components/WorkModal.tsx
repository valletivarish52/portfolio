import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { WorkItem } from "../data/content";
import SystemSketch from "./SystemSketch";
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
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
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

        <div className="wm-sketch">
          <SystemSketch
            sketch={item.sketch}
            tint={item.tint}
            title={item.name}
          />
        </div>

        <p className="wm-overview">{item.caseStudy.overview}</p>

        <div className="wm-points">
          {item.caseStudy.points.map((point) => (
            <p key={point.slice(0, 24)} className="wm-point">
              {point}
            </p>
          ))}
        </div>

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
