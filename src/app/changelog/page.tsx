import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const metadata = {
  title: "Changelog — Claude Watch",
  description: "What changed in each release of Claude Watch.",
};

/** Only shipped behaviour is listed here. */
const releases = [
  {
    version: "1.0",
    date: "September 2026",
    summary: "First release.",
    items: [
      "Menu bar item with five states: idle, working, needs you, done, failed.",
      "Working turns a quarter every 2.5 seconds; done pulses until you look; needs you clears only when you answer the prompt.",
      "Panel lists every Claude Code session by chat name and folder. Click a row to jump to that exact tab or window: iTerm2 and Terminal tabs, kitty and WezTerm panes, and IDE windows by title.",
      "Panel height follows the number of sessions; scrolls past eight.",
      "Optional status text beside the glyph, and a sound when a turn finishes. Both can be switched off.",
      "First-run onboarding installs the Claude Code hooks, merging into existing settings without overwriting anything.",
      "Reinstall from Settings if the hooks are ever removed.",
      "Reduce Motion shows a designed static frame for every state.",
      "Universal build for Apple silicon and Intel. macOS 14 or later.",
      "No network access. Session files live in Application Support and are deleted when a session ends.",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <>
      <Header />
      <main className="shell section">
        <div className="mx-auto max-w-[720px]">
          <h1 className="text-[clamp(34px,5vw,56px)]">Changelog</h1>
          <div className="rows mt-12">
            {releases.map((r) => (
              <article key={r.version} className="grid grid-cols-1 gap-6 py-10 sm:grid-cols-[160px_1fr]">
                <div>
                  <h2 className="text-[22px] tracking-[-0.02em]">{r.version}</h2>
                  <p className="mt-1 text-[14px] text-[var(--text-3)]">{r.date}</p>
                </div>
                <div>
                  <p className="text-[17px] font-medium">{r.summary}</p>
                  <ul className="mt-4 flex flex-col gap-2 text-[16px] leading-[1.5] text-[var(--text-2)]">
                    {r.items.map((i) => (
                      <li key={i} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-[var(--mid)]" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
