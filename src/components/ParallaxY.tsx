import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

// Subtle scroll-linked vertical drift. Wraps a block; the child moves from
// `from`px to `to`px as the block crosses the viewport. Static under
// prefers-reduced-motion.
export default function ParallaxY({
  children,
  from = 24,
  to = -24,
  className,
}: {
  children: React.ReactNode;
  from?: number;
  to?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { y }}
    >
      {children}
    </motion.div>
  );
}
