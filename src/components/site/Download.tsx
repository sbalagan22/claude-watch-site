import { BlurFade } from "@/components/motion/blur-fade";
import { BorderBeam } from "@/components/motion/border-beam";
import { BuyButton } from "./BuyButton";
import { MobileDownload } from "./MobileDownload";
import { siteContent, GITHUB_URL } from "@/content";

export function Download() {
  const { download, price } = siteContent;

  return (
    <section id="download" className="section" aria-labelledby="download-title">
      <div className="shell">
        <BlurFade>
          <div className="mx-auto max-w-[640px] text-center">
            <h2 id="download-title">{download.title}</h2>
            <p className="lede mt-4">{download.lede}</p>
          </div>
        </BlurFade>

        <BlurFade delay={0.08} className="mt-14 sm:mt-16">
          {/* The one card on the page, and the only border beam. */}
          <div className="relative mx-auto max-w-[720px] rounded-[var(--radius)] bg-[var(--bg-raised)] p-7 shadow-[var(--shadow)] sm:p-10">
            <BorderBeam size={220} duration={9} borderWidth={1.25} />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
              <div>
                <p className="text-[13px] font-medium text-[var(--text-3)]">Included</p>
                <ul className="mt-3 flex flex-col gap-2 text-[16px]">
                  {download.includes.map((i) => (
                    <li key={i} className="flex gap-3">
                      <Check />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[13px] font-medium text-[var(--text-3)]">Requires</p>
                <ul className="mt-3 flex flex-col gap-2 text-[16px] text-[var(--text-2)]">
                  {download.requirements.map((r) => (
                    <li key={r} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[var(--mid)]" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-9 flex flex-col gap-5 border-t border-[var(--hairline)] pt-8">
              <MobileDownload>
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    {/* Price: static, never animated. */}
                    <p className="text-[34px] font-semibold leading-none tracking-[-0.02em]">
                      {price.label}
                      <span className="ml-2 text-[15px] font-normal tracking-normal text-[var(--text-2)]">
                        {price.terms}
                      </span>
                    </p>
                  </div>
                  <BuyButton label={download.cta} className="px-7" />
                </div>
              </MobileDownload>
              <p className="text-[14px] leading-[1.5] text-[var(--text-3)]">{download.setupNote}</p>
              <div className="flex items-center gap-3 rounded-[10px] border border-[var(--hairline)] bg-[var(--bg)] px-4 py-3">
                <StarIcon />
                <p className="text-[14px] text-[var(--text-2)]">
                  {download.starPrompt}{" "}
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
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg
      aria-hidden="true"
      className="mt-[5px] h-[14px] w-[14px] shrink-0 text-[var(--accent-text)]"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[18px] w-[18px] shrink-0 text-[var(--accent-text)]"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M8 .5l2.163 4.382 4.837.703-3.5 3.412.826 4.818L8 11.5l-4.326 2.315.826-4.818L1 5.585l4.837-.703z" />
    </svg>
  );
}
