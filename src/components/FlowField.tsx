import { useEffect, useRef } from "react";

// Deterministic PRNG so each project's art is stable across renders.
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function draw(canvas: HTMLCanvasElement, seed: number, tint: string) {
  const rect = canvas.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(dpr, dpr);

  const rand = mulberry32(seed);
  const w = rect.width;
  const h = rect.height;

  ctx.clearRect(0, 0, w, h);

  // Per-seed field character
  const fa = 0.004 + rand() * 0.008;
  const fb = 0.004 + rand() * 0.008;
  const curl = 1 + rand() * 1.4;
  const p1 = rand() * Math.PI * 2;
  const p2 = rand() * Math.PI * 2;

  const angle = (x: number, y: number) =>
    (Math.sin(x * fa + p1) + Math.cos(y * fb + p2)) * curl;

  const lines = 220;
  const accents = 6;

  for (let i = 0; i < lines + accents; i++) {
    const isAccent = i >= lines;
    let x = -40 + rand() * (w + 80);
    let y = -40 + rand() * (h + 80);
    const steps = 110 + Math.floor(rand() * 140);

    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let s = 0; s < steps; s++) {
      const a = angle(x, y);
      x += Math.cos(a) * 2;
      y += Math.sin(a) * 2;
      if (x < -60 || x > w + 60 || y < -60 || y > h + 60) break;
      ctx.lineTo(x, y);
    }

    if (isAccent) {
      ctx.strokeStyle = `rgba(${tint}, ${0.3 + rand() * 0.25})`;
      ctx.lineWidth = 1.2;
    } else {
      ctx.strokeStyle = `rgba(242, 242, 239, ${0.05 + rand() * 0.1})`;
      ctx.lineWidth = 1;
    }
    ctx.stroke();
  }
}

export default function FlowField({
  seed,
  tint,
  label,
}: {
  seed: number;
  tint: string;
  label: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    draw(canvas, seed, tint);
    const ro = new ResizeObserver(() => draw(canvas, seed, tint));
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [seed, tint]);

  return (
    <canvas
      ref={ref}
      className="flow-canvas"
      role="img"
      aria-label={`Abstract generative artwork for ${label}`}
    />
  );
}
