import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ALL_CASES,
  CLIENT_WORK,
  PROJECTS,
  WorkItem,
  slugOf,
} from "../data/content";
import WorkCard from "../components/WorkCard";
import WorkModal from "../components/WorkModal";
import "./work.css";

gsap.registerPlugin(ScrollTrigger);

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Work() {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<WorkItem | null>(null);

  // Horizontal pinned pan on wide screens; vertical grid on mobile
  // and under prefers-reduced-motion.
  const [horizontal, setHorizontal] = useState(false);
  const wrapRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setHorizontal(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  useEffect(() => {
    if (!horizontal || !wrapRef.current || !trackRef.current) return;

    const lenis = (window as unknown as { __lenis?: { on: (e: string, f: () => void) => void; off: (e: string, f: () => void) => void } }).__lenis;
    const sync = () => ScrollTrigger.update();
    lenis?.on?.("scroll", sync);

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const ghost = wrapRef.current!.querySelector(".work-h-ghost");
      const cards = gsap.utils.toArray<HTMLElement>(".work-h-track .work-item");
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      // Focus choreography: the card nearest viewport center is full size,
      // neighbors recede and dim.
      const focusCards = () => {
        const mid = window.innerWidth / 2;
        for (const card of cards) {
          const r = card.getBoundingClientRect();
          const d = Math.abs(r.left + r.width / 2 - mid) / (window.innerWidth * 0.7);
          const t = Math.max(0, 1 - d);
          gsap.set(card, {
            scale: 0.9 + 0.1 * t,
            opacity: 0.45 + 0.55 * t,
          });
        }
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (cards.length - 1),
            duration: { min: 0.2, max: 0.6 },
            ease: "power1.inOut",
            delay: 0.1,
          },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
            focusCards();
          },
          onRefresh: focusCards,
        },
      });
      tl.to(track, { x: () => -distance(), ease: "none" }, 0);
      if (ghost) {
        tl.to(ghost, { x: () => -distance() * 0.35, ease: "none" }, 0);
      }
      focusCards();
    }, wrapRef);

    return () => {
      lenis?.off?.("scroll", sync);
      ctx.revert();
    };
  }, [horizontal]);

  // Case studies are deep-linkable: #work/<slug>. openItem pushes exactly one
  // history entry and closeItem unwinds it with history.back(), so Back never
  // reopens a closed modal and history never grows across open/close cycles.
  // This section owns the modal for ALL case studies, including the client
  // cards rendered under Experience (they arrive via the vv:case event).
  const pushedEntry = useRef(false);

  useEffect(() => {
    let first = true;
    const syncFromHash = () => {
      const m = window.location.hash.match(/^#work\/(.+)$/);
      const item = m ? ALL_CASES.find((w) => slugOf(w.name) === m[1]) : undefined;
      // Any traversal or manual hash edit means our pushed entry is gone.
      pushedEntry.current = false;
      setSelected(item ?? null);
      if (item && first) {
        const home = CLIENT_WORK.includes(item) ? "experience" : "work";
        document.getElementById(home)?.scrollIntoView();
      }
      first = false;
    };
    syncFromHash();
    window.addEventListener("popstate", syncFromHash);
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      window.removeEventListener("popstate", syncFromHash);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, []);

  const openItem = (p: WorkItem) => {
    setSelected(p);
    history.pushState(null, "", `#work/${slugOf(p.name)}`);
    pushedEntry.current = true;
  };

  useEffect(() => {
    const onCase = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      const item = ALL_CASES.find((w) => slugOf(w.name) === slug);
      if (item) openItem(item);
    };
    window.addEventListener("vv:case", onCase);
    return () => window.removeEventListener("vv:case", onCase);
  }, []);

  const closeItem = () => {
    setSelected(null);
    if (pushedEntry.current) {
      pushedEntry.current = false;
      history.back();
    } else if (window.location.hash.startsWith("#work/")) {
      // Opened via direct deep link: no entry of ours to unwind.
      history.replaceState(null, "", "#work");
    }
  };

  const heading = (
    <div className="h2-mask">
      <motion.h2
        initial={reduce ? false : { y: "110%" }}
        whileInView={reduce ? undefined : { y: "0%" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
      >
        Personal projects
      </motion.h2>
    </div>
  );

  return (
    <section
      id="work"
      className={horizontal ? "work work-horizontal" : "work"}
      ref={wrapRef}
    >
      {horizontal ? (
        <>
          <div className="work-h-head container">
            {heading}
            <div className="work-h-progress" aria-hidden>
              <div className="work-h-progress-fill" ref={progressRef} />
            </div>
          </div>
          <div className="work-h-ghost" aria-hidden>
            PROJECTS
          </div>
          <div className="work-h-track" ref={trackRef}>
            {PROJECTS.map((p) => (
              <WorkCard key={p.name} p={p} onOpen={() => openItem(p)} />
            ))}
          </div>
        </>
      ) : (
        <div className="container">
          {heading}
          <div className="work-grid">
            {PROJECTS.map((p) => (
              <WorkCard key={p.name} p={p} onOpen={() => openItem(p)} />
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {selected && <WorkModal item={selected} onClose={closeItem} />}
      </AnimatePresence>
    </section>
  );
}
