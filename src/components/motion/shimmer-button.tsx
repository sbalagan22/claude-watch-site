"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
  href?: string;
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = "rgba(255, 255, 255, 0.35)",
      shimmerSize = "0.08em",
      shimmerDuration = "2.4s",
      borderRadius = "12px",
      background = "#D97757",
      className,
      children,
      as: Component = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as React.CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3.5 text-[#141413] [background:var(--bg)] [border-radius:var(--radius)] shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(217,119,87,0.25)] transition-all duration-150 ease-out hover:brightness-105 active:scale-[0.985] font-medium text-[16px]",
          className,
        )}
        {...props}
      >
        {/* Spark/shimmer container */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden [border-radius:var(--radius)] opacity-70 group-hover:opacity-100 transition-opacity duration-150"
        >
          <div
            className="absolute inset-[-100%] animate-[spin_var(--speed)_linear_infinite] [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] motion-reduce:hidden"
          />
        </div>

        {/* Backing inset layer */}
        <div
          aria-hidden="true"
          className="absolute inset-[1px] [background:var(--bg)] [border-radius:calc(var(--radius)-1px)] transition-colors duration-150"
        />

        {/* Static content container (never animates label text) */}
        <div className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </div>
      </Component>
    );
  },
);

ShimmerButton.displayName = "ShimmerButton";
