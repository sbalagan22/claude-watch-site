"use client";

/**
 * A faithful strip of macOS menu bar with the real status item in it.
 *
 * Shown as a demo of the thing itself: the glyph runs the app's own animation
 * at the app's own size ratio. `scale` enlarges the whole strip for the states
 * section, where the glyph is the subject; the hero shows it at true size.
 */

import { Mark, type MarkState } from "./Mark";

export function MenuBarMock({
  state,
  label,
  scale = 1,
  tone = "auto",
  className = "",
}: {
  state: MarkState;
  /** Optional status text, as the app's "Show status as text" setting draws it. */
  label?: string;
  scale?: number;
  tone?: "auto" | "light" | "dark";
  className?: string;
}) {
  const u = (n: number) => `${n * scale}px`;
  const bg =
    tone === "light"
      ? "var(--bar-light)"
      : tone === "dark"
        ? "var(--bar-dark)"
        : "var(--bar)";
  const fg =
    tone === "light" ? "#141413" : tone === "dark" ? "#FAF9F5" : "var(--bar-fg)";

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: u(14),
        height: u(24),
        paddingInline: u(12),
        borderRadius: u(6),
        background: bg,
        color: fg,
        boxShadow: "inset 0 0 0 1px var(--hairline)",
        fontSize: u(12),
        fontWeight: 500,
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
      }}
      aria-label={`Menu bar showing the ${state} state`}
      role="img"
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: u(4) }}>
        <Mark state={state} size={18 * scale} />
        {label ? <span aria-hidden="true">{label}</span> : null}
      </span>
      {/* System items, drawn as neutral shapes rather than Apple's glyphs. */}
      <span aria-hidden="true" style={{ display: "inline-flex", gap: u(12), opacity: 0.55 }}>
        <Wifi size={14 * scale} />
        <Battery size={22 * scale} />
      </span>
      <span aria-hidden="true" style={{ opacity: 0.85 }}>
        Fri 9:41 AM
      </span>
    </div>
  );
}

function Wifi({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M1.5 6.2a9.5 9.5 0 0 1 13 0" />
      <path d="M4 8.9a6 6 0 0 1 8 0" />
      <path d="M6.4 11.5a2.6 2.6 0 0 1 3.2 0" />
    </svg>
  );
}

function Battery({ size }: { size: number }) {
  const h = size * 0.5;
  return (
    <svg width={size} height={h} viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="0.6" y="0.6" width="20" height="10.8" rx="2.4" />
      <rect x="2.4" y="2.4" width="15" height="7.2" rx="1.2" fill="currentColor" stroke="none" />
      <path d="M22.2 4.2v3.6" strokeLinecap="round" />
    </svg>
  );
}
