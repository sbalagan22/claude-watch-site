import { ShimmerButton } from "@/components/motion/shimmer-button";
import { siteContent, GITHUB_URL } from "@/content";

/**
 * The one primary call to action: a direct download link. A quiet GitHub
 * link sits beside it — the app is free and open source, so there is no
 * checkout flow, no "enabled" flag, nothing that can be unavailable.
 */
export function BuyButton({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  const { hero } = siteContent;

  return (
    <span className="inline-flex flex-wrap items-center justify-center gap-3">
      <ShimmerButton as="a" href={hero.downloadUrl} className={`btn btn-primary ${className}`}>
        {label}
      </ShimmerButton>
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn btn-quiet ${className}`}
      >
        {hero.githubCta}
      </a>
    </span>
  );
}
