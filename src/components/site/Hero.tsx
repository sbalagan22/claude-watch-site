import { CutReveal } from "@/components/motion/CutReveal";
import { BlurFade } from "@/components/motion/blur-fade";
import { DotPattern } from "@/components/motion/dot-pattern";
import { NoiseTexture } from "@/components/motion/noise-texture";
import { MenuBarMock } from "@/components/brand/MenuBarMock";
import { BuyButton } from "./BuyButton";
import { siteContent } from "@/content";

export function Hero() {
  const { hero } = siteContent;

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      {/* The only patterned background on the page; static. */}
      <DotPattern
        width={28}
        height={28}
        cr={0.9}
        className="[mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)] fill-[var(--text)]/[0.08]"
      />
      <NoiseTexture opacity={0.03} />

      <div className="shell relative flex flex-col items-center pt-14 pb-20 text-center sm:pt-20 sm:pb-28">
        <BlurFade delay={0} yOffset={0} blur="6px">
          <div className="hero-mark">
            <img
              src="/brand/mark-640.webp"
              srcSet="/brand/mark-320.webp 320w, /brand/mark-640.webp 640w, /brand/mark-1024.webp 1024w"
              sizes="(min-width: 1024px) 280px, 26vw"
              alt="Claude Watch logo"
              width={503}
              height={496}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </BlurFade>

        <h1 id="hero-title" className="mt-10 max-w-[14ch] sm:mt-12">
          <CutReveal lines={hero.headline} delay={0.08} />
        </h1>

        <BlurFade delay={0.16}>
          <p className="lede mt-6 max-w-[40ch]">{hero.subline}</p>
        </BlurFade>

        <BlurFade delay={0.24}>
          <div className="mt-9 flex flex-col items-center gap-3">
            <BuyButton label={hero.cta} className="px-7" />
            {/* Requirements never animate beyond the fade-in with their group. */}
            <p className="text-[14px] text-[var(--text-3)]">{hero.requirements}</p>
          </div>
        </BlurFade>

        {/* The product working: a true-size menu bar with the item running the
            precession animation live, and the real panel beneath it. */}
        <BlurFade delay={0.32} className="mt-16 w-full max-w-[720px] sm:mt-20">
          <div className="flex flex-col items-end gap-3">
            <MenuBarMock state="working" className="w-full" />
            <picture className="w-full max-w-[320px] sm:mr-[12%]">
              <source srcSet="/shots/panel-dark.webp" media="(prefers-color-scheme: dark)" />
              <img
                src="/shots/panel-light.webp"
                alt="The Claude Watch panel listing three Claude Code sessions: one working, one waiting for you, one finished."
                width={640}
                height={640}
                className="shot"
                decoding="async"
              />
            </picture>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
