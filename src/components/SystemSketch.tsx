import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { SystemSketch as Sketch, SketchNode } from "../data/content";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const H = 26;

// Box width fitted to the label so text never touches the border.
const nodeW = (n: SketchNode) => n.label.length * 6 + 26;
const rect = (n: SketchNode) => {
  const w = nodeW(n);
  return { x: n.x - w / 2, y: n.y - H / 2, w, h: H };
};

function edgePath(a: SketchNode, b: SketchNode): string {
  const ra = rect(a);
  const rb = rect(b);
  const acy = a.y;
  const bcy = b.y;

  if (rb.x >= ra.x + ra.w) {
    const sx = ra.x + ra.w;
    const tx = rb.x;
    const mx = (sx + tx) / 2;
    return `M ${sx} ${acy} C ${mx} ${acy}, ${mx} ${bcy}, ${tx} ${bcy}`;
  }
  if (ra.x >= rb.x + rb.w) {
    const sx = ra.x;
    const tx = rb.x + rb.w;
    const mx = (sx + tx) / 2;
    return `M ${sx} ${acy} C ${mx} ${acy}, ${mx} ${bcy}, ${tx} ${bcy}`;
  }
  if (rb.y >= ra.y + ra.h) {
    const sy = ra.y + ra.h;
    const ty = rb.y;
    const my = (sy + ty) / 2;
    return `M ${a.x} ${sy} C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${ty}`;
  }
  const sy = ra.y;
  const ty = rb.y + rb.h;
  const my = (sy + ty) / 2;
  return `M ${a.x} ${sy} C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${ty}`;
}

export default function SystemSketch({
  sketch,
  tint,
  title,
}: {
  sketch: Sketch;
  tint: string;
  title: string;
}) {
  const reduce = useReducedMotion();
  const markerId = useId().replace(/:/g, "");
  const byId = Object.fromEntries(sketch.nodes.map((n) => [n.id, n]));

  return (
    <svg
      viewBox="0 0 400 240"
      role="img"
      aria-label={`${title} system sketch`}
      style={{ display: "block", width: "100%", height: "auto" }}
    >
      <defs>
        <marker
          id={markerId}
          markerWidth="5"
          markerHeight="5"
          refX="4"
          refY="2.5"
          orient="auto"
        >
          <path d="M0,0 L5,2.5 L0,5 z" fill="rgba(255,255,255,0.3)" />
        </marker>
      </defs>

      {sketch.edges.map((e, i) => {
        const a = byId[e.from];
        const b = byId[e.to];
        if (!a || !b) return null;
        return (
          <motion.path
            key={`${e.from}-${e.to}`}
            d={edgePath(a, b)}
            fill="none"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1"
            strokeDasharray={e.dashed ? "3 4" : undefined}
            markerEnd={`url(#${markerId})`}
            initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
            animate={reduce ? undefined : { pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 + i * 0.08, ease: EASE }}
          />
        );
      })}

      {sketch.nodes.map((n, i) => {
        const r = rect(n);
        return (
          <motion.g
            key={n.id}
            initial={reduce ? undefined : { opacity: 0, y: 8 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: EASE }}
          >
            <rect
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              rx="5"
              fill={n.accent ? `rgba(${tint}, 0.07)` : "rgba(255,255,255,0.025)"}
              stroke={n.accent ? `rgba(${tint}, 0.85)` : "rgba(255,255,255,0.15)"}
              strokeWidth="1"
              strokeDasharray={n.dashed ? "3 4" : undefined}
            />
            <text
              x={n.x}
              y={n.y + 3.2}
              textAnchor="middle"
              fill={n.accent ? `rgb(${tint})` : "#B9B9B4"}
              fontSize="9.5"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.02em"
            >
              {n.label}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
