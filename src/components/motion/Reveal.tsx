"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 0.77, 0.3, 1] as const;
const DURATION = 0.38;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
}

export function Reveal({
  children,
  delay = 0,
  y = 12,
  blur = 4,
  className,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px -6% 0px" }}
      transition={{ duration: DURATION, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
