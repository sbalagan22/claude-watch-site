"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  className?: string;
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied command" : "Copy command to clipboard"}
      className={cn(
        "relative flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border-light)] bg-[var(--surface-card)] text-[var(--text-secondary)] transition-all duration-120 hover:border-[var(--border-mid)] hover:text-[var(--text-primary)] active:scale-95 focus-visible:outline-2 focus-visible:outline-[var(--accent)]",
        className,
      )}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-[#D97757] transition-transform duration-120" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}
