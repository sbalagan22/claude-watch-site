import Link from "next/link";
import { siteContent } from "@/content";

export function Footer() {
  const { footer } = siteContent;
  return (
    <footer className="border-t border-[var(--hairline)]">
      <div className="shell flex flex-col gap-8 py-14 text-[14px] text-[var(--text-2)]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5 text-[var(--text)]">
            <img src="/brand/mark-64.webp" alt="" width={22} height={22} loading="lazy" decoding="async" />
            <span className="font-semibold">Claude Watch</span>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {footer.links.map((l) =>
              l.href.startsWith("/") ? (
                <Link key={l.label} href={l.href} className="link">
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.label}
                  href={l.href}
                  className="link"
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {l.label}
                </a>
              ),
            )}
          </nav>
        </div>
        <div className="flex flex-col gap-2 border-t border-[var(--hairline)] pt-6 text-[13px] text-[var(--text-3)] sm:flex-row sm:justify-between">
          {/* Never animated. */}
          <p>{footer.disclaimer}</p>
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
