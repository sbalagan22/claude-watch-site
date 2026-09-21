"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 0.77, 0.3, 1] as const;

interface CutRevealProps {
  lines: string[];
  delay?: number;
  className?: string;
}

export function CutReveal({ lines, delay = 0, className }: CutRevealProps) {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (reduced) {
    return <span className={className}>{lines.join(" ")}</span>;
  }

  return (
    <span className={className} style={{ display: "block" }}>
      {lines.map((line, i) => (
        <span
          key={line}
          style={{
            display: "block",
            overflow: "hidden",
            paddingBottom: "0.04em",
          }}
        >
          <motion.span
            style={{ display: "block", willChange: "transform" }}
            initial={{ y: "105%" }}
            animate={ready ? { y: "0%" } : { y: "105%" }}
            transition={{
              duration: 0.38,
              delay: delay + i * 0.08,
              ease: EASE,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
