import { BlurFade } from "@/components/motion/blur-fade";
import { MenuBarMock } from "@/components/brand/MenuBarMock";
import { siteContent } from "@/content";

/**
 * The one place the glyph appears on the site: here it is the subject being
 * explained, so each state runs live inside a menu bar strip beside one line.
 */
export function States() {
  const { states } = siteContent;

  return (
    <section className="section" aria-labelledby="states-title">
      <div className="shell">
        <BlurFade>
          <div className="mx-auto max-w-[640px] text-center">
            <h2 id="states-title">{states.title}</h2>
            <p className="lede mt-4">{states.lede}</p>
          </div>
        </BlurFade>

        <BlurFade delay={0.08} className="mt-16 sm:mt-20">
          <ul className="rows mx-auto max-w-[880px]">
            {states.items.map((item) => (
              <li
                key={item.state}
                className="grid grid-cols-1 items-center gap-5 py-7 sm:grid-cols-[minmax(0,300px)_1fr] sm:gap-10"
              >
                <MenuBarMock
                  state={item.state}
                  label={item.state === "idle" ? undefined : item.name}
                  scale={1.25}
                  className="w-full"
                />
                <div className="flex flex-col gap-1">
                  <h3>{item.name}</h3>
                  <p className="text-[16px] leading-[1.5] text-[var(--text-2)]">{item.line}</p>
                </div>
              </li>
            ))}
          </ul>
        </BlurFade>

        <BlurFade delay={0.08} className="mt-14 sm:mt-16">
          <div className="mx-auto max-w-[560px] text-center">
            <h3 className="text-[22px] tracking-[-0.02em]">{states.panel.title}</h3>
            <p className="mt-3 text-[16px] leading-[1.5] text-[var(--text-2)]">{states.panel.line}</p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
