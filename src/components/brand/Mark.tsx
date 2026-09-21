"use client";

/**
 * The menu bar glyph, animating exactly as the app does.
 *
 * Every number comes from the app's `Motion` and `Glyph`: the same gem path,
 * the same 8fps frame grid, the same periods and keyframes. The page and the
 * product are visibly the same thing because they run the same animation.
 *
 * This is a status indicator, not a logo. It appears only inside the menu bar
 * mock — the one place the site shows the product itself working.
 */

import { useEffect, useRef, useState } from "react";

/** The gem, filling its 36-unit canvas as the app draws it (bounds 4…32). */
export const GEM_PATH =
  "M18.000 4.000C19.260 11.560 24.440 16.740 32.000 18.000" +
  "C24.440 19.260 19.260 24.440 18.000 32.000" +
  "C16.740 24.440 11.560 19.260 4.000 18.000" +
  "C11.560 16.740 16.740 11.560 18.000 4.000Z";

export const FPS = 8;

/** Seconds per loop, as in `Motion`. */
export const PERIOD = { working: 2.5, needsYou: 3.2, done: 1.25 } as const;

/** Designed static frames, used under Reduce Motion. */
const STATIC = { workingAngle: 34, needsYouScale: 1.08 } as const;

export type MarkState = "idle" | "working" | "needsYou" | "done" | "failed";

const ACCENT = "#D97757";
const FAILURE = "#C2564A";

/** Quantised phase 0..<1 — identical to the app's `Motion.phase`. */
export function phaseAt(seconds: number, period: number) {
  const total = Math.max(1, Math.round(period * FPS));
  return (Math.floor(seconds * FPS) % total) / total;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
function pingPong(p: number) {
  return easeInOut(p < 0.5 ? p * 2 : (1 - p) * 2);
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(q.matches);
    const on = () => setReduced(q.matches);
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * A frame counter at the shared rate that pauses off-screen and re-renders
 * only when the frame index advances: eight renders a second, not sixty.
 */
function useFrameClock(active: boolean) {
  const [elapsed, setElapsed] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active || !visible) return;
    const start = performance.now();
    let raf = 0;
    let last = -1;
    const loop = (now: number) => {
      const s = (now - start) / 1000;
      const frame = Math.floor(s * FPS);
      if (frame !== last) {
        last = frame;
        setElapsed(s);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active, visible]);

  return { elapsed, ref };
}

/** Done: one hard breath per period, .72 → 1.28 → .72, as the app draws it. */
function doneScale(phase: number) {
  return lerp(0.72, 1.28, pingPong(phase));
}

const LABEL: Record<MarkState, string> = {
  idle: "Idle",
  working: "Working",
  done: "Done",
  needsYou: "Needs you",
  failed: "Failed",
};

export function Mark({
  state = "idle",
  size = 18,
  className,
}: {
  state?: MarkState;
  size?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const animates = state === "working" || state === "done" || state === "needsYou";
  const { elapsed, ref } = useFrameClock(animates && !reduced);

  const period =
    state === "working" ? PERIOD.working : state === "needsYou" ? PERIOD.needsYou : PERIOD.done;
  const phase = reduced ? 0 : phaseAt(elapsed, period);

  let rotate = 0;
  let scale = 1;
  let fill = "currentColor";

  if (state === "working") {
    rotate = reduced ? STATIC.workingAngle : phase * 90;
  } else if (state === "done") {
    fill = ACCENT;
    scale = reduced ? 1 : doneScale(phase);
  } else if (state === "needsYou") {
    fill = ACCENT;
    scale = reduced ? STATIC.needsYouScale : lerp(0.88, 1.08, pingPong(phase));
  } else if (state === "failed") {
    fill = FAILURE;
  }

  const maskId = `notch-${size}`;

  return (
    <span ref={ref} className={className} style={{ display: "inline-flex", lineHeight: 0 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        role="img"
        aria-label={LABEL[state]}
        style={{ overflow: "visible" }}
      >
        {state === "failed" ? (
          <>
            <defs>
              <mask id={maskId}>
                <rect width="36" height="36" fill="white" />
                {/* Upper-right spike cut at its waist: notch 2.6 × 13 at 9 out, -45°. */}
                <rect
                  x={-6.5}
                  y={-1.3}
                  width={13}
                  height={2.6}
                  fill="black"
                  transform="translate(18 18) rotate(-45) translate(9 0)"
                />
              </mask>
            </defs>
            <path d={GEM_PATH} fill={FAILURE} mask={`url(#${maskId})`} />
          </>
        ) : (
          <path
            d={GEM_PATH}
            fill={fill}
            transform={`rotate(${rotate} 18 18) translate(18 18) scale(${scale}) translate(-18 -18)`}
          />
        )}
      </svg>
    </span>
  );
}
