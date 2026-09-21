"use client";

import { useEffect, useState } from "react";
import { siteContent } from "@/content";

/**
 * Nobody downloads a Mac app on a phone, but everyone reads about it there
 * first. On a phone the button is not hidden and no disk image is served:
 * the visitor gets the link to send to their Mac.
 */
export function MobileDownload({ children }: { children: React.ReactNode }) {
  const [mobile, setMobile] = useState(false);
  const [copied, setCopied] = useState(false);
  const { mobile: copy } = siteContent.download;

  useEffect(() => {
    const ua = navigator.userAgent;
    const phone = /iPhone|iPad|iPod|Android/i.test(ua);
    const coarse = window.matchMedia("(pointer: coarse) and (max-width: 820px)").matches;
    setMobile(phone || coarse);
  }, []);

  if (!mobile) return <>{children}</>;

  const url = typeof window !== "undefined" ? window.location.origin + "/#download" : siteContent.meta.url;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  const mail = `mailto:?subject=${encodeURIComponent("Claude Watch for Mac")}&body=${encodeURIComponent(url)}`;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[16px] font-semibold">{copy.title}</p>
      <p className="text-[15px] text-[var(--text-2)]">{copy.line}</p>
      <div className="mt-1 flex flex-wrap gap-3">
        <button type="button" onClick={copyLink} className="btn btn-primary min-w-[140px]">
          {copied ? copy.copied : copy.copy}
        </button>
        <a href={mail} className="btn btn-quiet">
          {copy.email}
        </a>
      </div>
    </div>
  );
}
