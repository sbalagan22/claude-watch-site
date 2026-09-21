import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { siteContent, GITHUB_URL } from "@/content";

export const metadata = {
  title: "Thank you — Claude Watch",
  description: "Your download of Claude Watch for macOS.",
  robots: { index: false },
};

export default function ThanksPage() {
  const url = siteContent.hero.downloadUrl;

  return (
    <>
      <Header />
      <main className="shell section">
        <div className="mx-auto max-w-[560px] text-center">
          <img
            src="/brand/mark-320.webp"
            alt=""
            width={96}
            height={95}
            className="mx-auto"
            decoding="async"
          />
          <h1 className="mt-8 text-[clamp(32px,5vw,48px)]">Thank you.</h1>
          <p className="lede mt-4">
            Open the disk image, drag Claude Watch to Applications, and launch it. It installs its
            Claude Code hooks for you on first run.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={url} className="btn btn-primary px-7">
              Download Claude Watch
            </a>
            <Link href="/" className="btn btn-quiet">
              Back to the site
            </Link>
          </div>
          <p className="mt-8 text-[14px] text-[var(--text-2)]">
            {siteContent.hero.starPrompt}{" "}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link font-medium text-[var(--text)]"
            >
              Star it on GitHub ↗
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
