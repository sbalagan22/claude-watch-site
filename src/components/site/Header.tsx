import Link from "next/link";

/** The official logo identifies the product; the glyph never appears here. */
export function Header() {
  return (
    <header className="shell flex h-16 items-center justify-between">
      <Link href="/" className="flex items-center gap-2.5" aria-label="Claude Watch home">
        <img src="/brand/mark-64.webp" alt="" width={26} height={26} decoding="async" />
        <span className="text-[15px] font-semibold tracking-[-0.01em]">Claude Watch</span>
      </Link>
      <nav aria-label="Primary" className="flex items-center gap-6 text-[15px]">
        <Link href="/changelog" className="link">
          Changelog
        </Link>
        <a href="#download" className="link">
          Download
        </a>
      </nav>
    </header>
  );
}
