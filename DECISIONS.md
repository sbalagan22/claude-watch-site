# Architecture & Design Decisions

This document logs all key decisions made during the development of claudewatch's product site.

### D1: Copywriting First (Part 4)
- **Decision**: Drafted all page copy prior to building layout components.
- **Reason**: Copy length, direct declaratives, and developer tone establish the visual hierarchy and container budgets for the layout.

### D2: Headline Constraint (< 8 words, no adjectives)
- **Decision**: Chose "See Claude Code run from your menu bar" (7 words, 0 adjectives).
- **Reason**: Directly names the tool, the outcome, and the physical UI placement without hype.

### D3: Honesty on the Free Alternative
- **Decision**: Added a dedicated section acknowledging the 4-line `osascript` Stop hook in `~/.claude/settings.json`.
- **Reason**: Developers already know shell scripting; acknowledging the one-liner builds immediate technical credibility and clarifies why a persistent multi-session menu bar utility is different.

### D4: Suggested Preset for Pay-What-You-Want ($10)
- **Decision**: Default suggested support amount set to $10, with $0 frictionless download.
- **Reason**: $10 is modest, standard for indie Mac utility support, covers annual notarization and hosting costs without feeling predatory.

### D5: Single Accent Color Policy
- **Decision**: Restrict Claude orange (`#D97757`) strictly to the primary download CTA and the active hero indicator dot.
- **Reason**: Matches Scrub Dat's Apple aesthetic discipline where accent color is not sprayed gratuitously across backgrounds or decorative borders.

### D6: Font Stack Selection
- **Decision**: Use Apple's system font stack (`-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui`) for UI and `SF Mono` for code/tabular metrics.
- **Reason**: Native macOS identity, zero web font load penalty, matches Scrub Dat site design system exactly.

### D7: Strict Zero-Tolerance Copy Audit
- **Decision**: Eliminated all em dashes, rhetorical questions, and marketing tropes.
- **Reason**: Adheres strictly to the Part 4 banned phrase list. Automated audit verified 0 hits.

### D8: Motion Selection & Catalog Swaps (Part 3)
- **Decision**: Sourced motion components directly from `motion-index`:
  - Hero Headline: `CutReveal` line-by-line masked entry (`overflow: clip; y: 105% -> 0%` with Apple cubic easing `[0.16, 0.77, 0.3, 1]`)
  - Section Entrances: `Reveal` (Apple-tuned Blur Fade, `once: true`, `viewport: { margin: '-10% 0px -6% 0px' }`)
  - Hero Ambient: Canvas-based `FlickerGrid` with radial gradient fade mask and intersection-observer pause
  - State Cards: `MagicCard` with subtle cursor spotlight
  - Support Card: `BorderBeam` (Magic) on the pay-what-you-want card only
  - Architecture Flow: `AnimatedBeam` (Magic) connecting Claude Code -> Hook -> claudewatch
  - Key Metrics: `Ticker` with cubic ease-out, `Intl` locale formatting, and `.mono` tabular digits
  - Command Snippets: `CopyButton` with Apple micro-check feedback
  - Reading Indicator: `ScrollProgress` (Magic)
  - Hero Menu Bar Demo: Hand-crafted pixel-accurate macOS menu bar simulator cycling through 4 states (`working`, `needs_input`, `done`, `failed`) with popover inspector and segmented control.
- **Reason**: Adheres strictly to motion budget (max 3 animated items above fold, nothing over 400ms, full `prefers-reduced-motion` overrides).

### D9: Ungated Download Architecture (Part 5)
- **Decision**: Direct download is never gated behind payment. $0 is an instantaneous frictionless direct download.
- **Reason**: Free means free. Framing payment as voluntary developer support eliminates dark patterns.

### D10: Stripe Integration (Part 5)
- **Decision**: Implemented `/api/checkout` with server-side Stripe Checkout Session creation for custom support amounts with direct fallback for $0.
- **Reason**: Conforms to `stripe-best-practices` using environment variables for secret keys and isolated sandbox testing.

### D11: Dedicated Changelog & Privacy-Preserving Analytics (Part 6)
- **Decision**: Built `/changelog` with structured semantic releases (v1.0.0, v1.1.0) and cookie-free client analytics.
- **Reason**: Developer transparency and GDPR/PECR compliance without annoying cookie banners.

### D12: Performance Verification
- **Decision**: Measured mobile Lighthouse audit with production server.
- **Reason**: Scored 95 Performance, 95 Accessibility, 100 Best Practices, 100 SEO (exceeding the 90+ mobile budget).

### D13: Authentic Apple Design Architecture (Pristine Upgrade)
- **Decision**: Refactored layout away from generic boxed Tailwind cards into Apple's whitespace-driven standard:
  - 128px vertical rhythm between sections (`--section-y: 128px`).
  - Hairlines (`rgba(0, 0, 0, 0.08)`) and background tone shifts (`--chrome: #F5F5F7`, `--bg-page: #FAF9F5`) rather than cards with heavy borders everywhere.
  - Native Apple pill buttons (`border-radius: 980px`, `120ms` ease-out hover) replacing generic rounded rects.
  - True scroll-pinned multi-session inspector (matching Scrub Dat's `Steps.tsx`), unpinning gracefully on mobile.
- **Reason**: Eliminates any generic/vibecoded impression, delivering the authentic tactile standard of native Apple product marketing.

## Measurements

- **Idle CPU: 0.0% average, 0.0% peak** (10 samples over 40s, app running, zero sessions).
  The animation timer is invalidated entirely when nothing is animating rather than left
  ticking a no-op, so idle is genuinely zero rather than merely small.
- **Animating CPU: 3.15% average, 3.6% peak** (8 samples over 24s, two working sessions,
  12fps cap). Returns to 0.0% within one liveness interval of the work finishing.
- Measured with `make idle-cpu` (`Scripts/measure-idle-cpu.sh`) on an arm64 Mac, Release build.

## Menu bar

- **Animation runs from an explicit phase advanced by a capped `Timer`, not from SwiftUI's
  implicit interpolation.** SwiftUI would animate at display rate (up to 120Hz on ProMotion);
  a permanently visible menu bar animation at that rate is exactly what shows up in the
  energy column. The phase is recomputed at 12fps and the timer is torn down when idle.
- **Working icon is monochrome, not orange.** Orange is reserved for the two states that are
  *about the user* — needs-you and just-finished. Working is the most common state; colouring
  it would make the menu bar loud and dilute the accent to meaninglessness.
- **Working state dot is a hollow ring, other states are filled.** State is carried by shape as
  well as colour, so the panel is legible without colour vision and the working dot does not
  compete with the orange ones.
- **Dropped the system accent colour entirely.** The first pass used `controlAccentColor` for
  the working dot, which put a third hue (usually blue) next to the brand orange.

## Panel

- **Row click activates the owning application, not a specific window.** Hooks give a PID and a
  cwd but no window id, and terminal scripting dictionaries differ per app. The implementation
  walks up the recorded PID's ancestry to the nearest process with `activationPolicy == .regular`
  and activates it, falls back to activating by inferred bundle id, and finally reveals the
  project directory in Finder. In practice: VS Code, Cursor, Terminal, iTerm, Ghostty and friends
  come to the front; you still pick the tab. Revealing in Finder always works.
- **Disambiguation is progressive, not always-on.** A short session-id suffix and start time are
  added only to rows whose project name is shared with another visible row, so the common case
  stays clean while two sessions in one directory are always tellable apart.
- **One timer drives every row's elapsed clock**, rather than a timer per row.

## Packaging

- **The Python installer is the single implementation of the merge logic**, shipped inside the
  bundle and shared with `make install-hooks`. Reimplementing the merge in Swift would risk the
  app and the CLI drifting apart on the one operation that can damage a user's settings file.
- **Ad-hoc signed (`CODE_SIGN_IDENTITY = "-"`) with hardened runtime already on** and an
  entitlements file present, so signing is a one-setting change once the Developer ID cert
  exists. Not signed or notarised here: that needs the Apple Developer account.
- **Preview rendering lives in the test target** (`RenderPreviewTests`) and writes PNGs only when
  its output directory already exists, so it is a no-op in a normal `make test` run. `xcodebuild`
  does not forward the parent environment into the test process, which is why the switch is a
  directory rather than an env var.

## Hook events: what actually fires (measured, not assumed)

I instrumented the installed hook script and ran real Claude Code sessions to see which events
arrive. Findings, all reproducible:

- **`claude -p` (print mode) never fires `Stop`.** Every one-shot run delivers exactly
  `SessionStart` -> `UserPromptSubmit` -> `SessionEnd`. This holds for a fresh session and for
  one resumed with `-r`, so it is not about the session being new. `Stop` appears to be an
  interactive-session event.
- **`SubagentStop` does fire**, and it carries the same payload shape. The docs note that a
  skill's `Stop` hook is converted to `SubagentStop` in a subagent context.
- **Therefore `SubagentStop` is now registered alongside `Stop`**, and both map to `done`.
  Registering only `Stop` would have left every subagent turn-completion invisible, and would
  have made the app look broken for anyone whose work is mostly agent-driven.
- **Hook config is read at session start.** A session already running when the hooks are
  installed fires nothing at all until it restarts — including this very session, which was the
  clearest demonstration. The brief's lazy-creation rule still matters for the *next* session's
  first event, but it cannot rescue an already-running session, because no event arrives.

**Not verified by me:** `Stop` firing in a genuinely interactive terminal session, and the
`Notification` events (`permission_prompt`, `agent_needs_input`). Driving an interactive TTY
from this environment was not reliable. The state machine for both is unit-tested and the
matchers are taken from the official reference, but the live path needs a human at a terminal.
See the report for exactly what to try.

## Part A — the finished icon and animation system

**D20 — The glyph is drawn in `Canvas`, not as SwiftUI shapes.** Every state is a
pure function of an integer frame index (`Motion.phase`), so the spec's
`floor(t × 12) mod (duration × 12)` is implemented literally rather than
approximated by SwiftUI's animation engine. No implicit animation anywhere in
the icon path; nothing to drift, and every loop is period-closed by construction.

**D21 — Two rendering paths, split on `isTemplate`.** A SwiftUI view inside an
`NSHostingView` does not get macOS's automatic template inversion — that applies
only to `NSImage` with `isTemplate = true`. So the status item is fed a
rasterised `NSImage` per frame (via `ImageRenderer`) rather than hosting a live
view. Idle and working ship as template images; done, needs-you and failed ship
non-template and are tinted from one accent constant.

**D22 — `IconPalette.ink(for:forTemplate:)` takes the render path as a
parameter.** Monochrome states must be pure black when rasterised for the status
item, but `.primary` when the same view is drawn on screen in the settings
picker. Caught by rendering the previews and sampling the pixels: the template
states were drawing black-on-black against a dark bar, i.e. invisible. Covered
now by `testMonochromeInkDiffersByRenderPath`.

**D23 — Rasterising per frame at 12fps is cheap enough to prefer over a live
hosting view.** An 18pt canvas twelve times a second costs far less than the
correctness problem it solves. Measured idle CPU is unchanged at 0.0%, because
the tick is invalidated entirely when no state animates.

**D24 — The status item no longer carries a count badge.** The spec fixes the
glyph's silhouette precisely and a badge would both break that and survive
template inversion badly. The working count still reaches the user through the
VoiceOver label and the panel header.

**D25 — Preferences cut to three.** Spinner style, animation, launch at login.
The accent and glow toggles were removed: the spec fixes which states carry
colour and what the done gesture is, so those toggles only let a user configure
the app into a state the design calls wrong.

**D26 — Needs-you does not clear when the panel opens.** Per the spec it clears
"on the prompt being answered". `markAllSeen` was renamed `markFinishedSeen` to
make that explicit — opening the panel acknowledges done and failed only,
because the panel cannot answer a permission prompt for you.

**D27 — Spec beats prior code wherever they disagreed.** The failure red moved
from `#C15F4A` to the spec's `#C2564A`; the working/attention/bloom cycles moved
from the invented 2.4s/1.8s/0.55s to the spec's 4s+8s/3.2s/900ms; the three
spinner styles were replaced by Precession, Quiet and Pip.

**D28 — Preview rendering switched to `ImageRenderer` at scale 6.**
`bitmapImageRepForCachingDisplay` rasterised at layout size, so the gem's
concave flanks and the 1.3pt arcs were destroyed before they could be reviewed —
they looked like a bulging six-point star. The geometry was correct all along;
only the harness was lying. Rows are now also rendered directly, because a
`LazyVStack` in a `ScrollView` lays out empty under `ImageRenderer` and would
have hidden a broken row behind an empty list.

**D29 — The orbit ring was removed; the mark is the gem alone.** Your call,
mid-build, and it overrides the design spec. Without a ring the gem is scaled up
from the spec's 8…28 bounds to 4…32, so it fills the menu bar and is markedly
more legible at 16pt. Consequences, all decided with you:

  * *Working* is a plain rotation of the gem rather than the tipping ring.
    A quarter turn is loop-invariant on a fourfold-symmetric shape, so the loop
    still closes with nothing to catch.
  * *Quiet* becomes the same turn slowed down with a shallow breath; *Pip* keeps
    its travelling disc, which still needs the orbit path, so that geometry is
    retained in `Glyph` even though it is no longer stroked.
  * *Done* keeps the overshoot keyframes but loses the expanding halo ring.
  * *Needs-you* becomes a pulse rather than two ping rings.
  * *Failed* loses the dashed-open orbit. The silhouette is instead broken by
    cutting the upper-right spike off at its waist, which preserves the spec's
    intent — a user who cannot separate #C2564A from #D97757 still sees a
    severed mark — without needing a ring to break.

**D30 — Tick lowered from the spec's 12fps to 8fps.** Only valid because of D29.
The spec sized 12fps for the tipping orbit, whose stroke weight and `ry` changed
on every frame. A slow rotation at 18pt moves the gem's outermost point about a
third of a pixel per frame at 12fps, so most frames were visually identical to
the one before. Profiling located the cost in AppKit's `stepTransactionFlush`
and `_NSViewDrawRect` — the per-frame re-layout of the status item, not the
drawing — so those surplus frames were pure waste. At 8fps the tip still moves
under half a pixel per frame, below the threshold where stepping is visible.

`NeedsYou` (3.2s) and `Done` (0.9s) do not land on whole frames at 8fps; they
quantise to 26 and 7 frames, shifting the period by 50ms and 25ms respectively.
Each loop still closes on its own integer frame count, so nothing accumulates.
Covered by `testPeriodQuantisationStaysImperceptible`.

**D31 — Measured CPU.** Idle **0.00%** (20s sample, tick fully invalidated —
not ticking a no-op). Animating **2.90%**, down from 10% when frames were
rendered through `ImageRenderer`. The improvement came in three steps: drawing
via `CGContext` instead of rebuilding a SwiftUI view graph per frame (10% →
4.25%), caching rendered frames by index (→ 3.70%), and the 8fps tick (→ 2.90%).
Redundant redraws are also skipped: an unchanged frame is never re-assigned to
the button, since assigning `button.image` is what triggers the AppKit re-layout.

## Part B — the site

### B1 audit: what Gemini invented, and what replaced it

Gemini built the page before the app existed, so it filled every gap with
plausible-looking invention. Catalogued here because each item had to be
replaced, not merely restyled.

**Colours outside the palette.** The page defined a full set of status colours
that the app does not have and the brand does not own:

| Invented | Used for | Replaced with |
|---|---|---|
| `#28C840` green | "done" state | `#D97757` accent — done is orange in the app |
| `#E5853B` amber | "needs input" | `#D97757` accent — the app deliberately uses *one* attention colour and separates the two states by motion, not hue |
| `#FF453A` iOS red | "failed" | `#C2564A`, the palette's muted failure red |
| `#FF5F56 / #FFBD2E / #27C93F` | macOS traffic lights in a mock window chrome | removed with the mock chrome |

The green is the most consequential: a green "done" dot contradicts the icon
system, where orange *is* the finished state, and it introduced a third hue into
a palette that has exactly one accent.

**Invented iconography.** `public/brand/icon-192.png`, `icon-512.png`,
`favicon.ico`, `favicon-32.png`, `favicon-192.png` and `apple-touch-icon.png`
were a terminal window containing a chevron and a bullseye — unrelated to the
gem. All regenerated from the master mark.

**Invented screenshots.** `og-image.png` was a rendered mock: a fabricated menu
bar, a session panel that does not match the real one, fake session names
(`payment-service`, `dashboard-web`, `infra-deploy`), fake status lines
("Completed 4 tool calls. Turn finished."), and a green dot. Replaced with an OG
image built from the real mark.

**Fonts.** The stack was already `-apple-system` / `SF Mono`, which is correct
and matches the app, so nothing to replace here.

**D32 — One glyph implementation, shared by app and site.** `MenuBarGlyph` was
a second, independent drawing of the mark with its own CSS keyframes, written
against the spec's ringed version. Two implementations meant the page could
drift from the product, and it had: it was still drawing the orbit after the
app dropped it. It is now a thin wrapper over `Mark`, which runs the same
frame-indexed animation at the same 8fps on the same keyframes. Verified in a
browser: the hero rotates 18.28° → 29.53° on the frame grid, and under
`prefers-reduced-motion` it freezes at the designed 34° static frame rather
than a paused phase 0.

**D33 — Accessibility fixes, all from measured contrast.** The accent is a
mid-tone: `#D97757` is only 3.12:1 against white, so both white-on-accent and
accent-on-white failed AA for body text. Three tokens were added rather than
changing the brand colour:

  * `--on-accent: #141413` — charcoal on the accent, 5.9:1. Used on every
    filled accent button, including the download CTA.
  * `--accent-text: #A64B33` — a darkened accent for small text on the light
    page, 5.7:1.
  * `--accent-on-dark: #E8926F` — the light accent for small text on the dark
    mock chrome, 4.9:1, where a *darkened* accent would have been worse.

`--text-tertiary` also moved from `#87857E` (3.63:1) to `#6E6C66` (4.98:1).
Header nav links and the CTA gained a 44pt minimum height. Result: mobile
Lighthouse **Performance 97, Accessibility 100, Best Practices 100, SEO 100**,
zero failed audits.

**D34 — Claims the build cannot support were removed.** The page stated "Apple
notarized universal binary" and "download the notarized disk image" in two
places. The build is deliberately unsigned — notarization needs the Developer
account — so both were false. Also corrected "macOS 13 or later" to macOS 14,
which is the actual deployment target in `project.yml`.

**D35 — The product is named Watchtower on the site too.** The page called it
"claudewatch" throughout, which puts "Claude" as the first word of the app
name — the one naming constraint the trademark boundary states outright. The
app bundle was already Watchtower; the site now matches.

**D36 — A stale dev server masked a real bug for several minutes.** An earlier
`next start` stayed bound to port 3000 and served JS chunks from a previous
build, so every chunk 500'd, nothing hydrated, and the hero mark appeared
frozen in a way that looked exactly like a broken animation. Worth recording
because the symptom and the cause were unrelated: the fix was killing the
stale process, not touching the component.

**D37 — Working spin is one quarter turn per 5s, not 8s.** Requested faster.
Still slow enough to be peripheral; the loop closes at 40 frames on the 8fps
grid so there is no seam.

**D38 — The alternate spinners (Quiet, Pip) are gone.** One spin, no picker.
Requested; it also removes the only setting that let a user pick a look the
spec called secondary.

**D39 — The app is named claude_watch.** Requested by name. This puts
"Claude" as the first word, which the brief's own trademark rule forbids; the
conflict was raised and the instruction stood. "Not affiliated with
Anthropic" is in About, onboarding, the panel footer, Info.plist copyright,
the site footer and the OG image.

**D40 — A finish always shows in the bar, even while other sessions work.**
`Snapshot.iconState(at:)` lets an unseen done outrank working for
`Motion.Done.holdDuration` (4s), then working takes the glyph back. Before,
done only showed when nothing was working, so a finish in a busy bar was
invisible — the case the user hit.

**D41 — Panel state dots are 14pt, drawn on an 8pt design box and scaled.**
8pt read as specks once there were five rows. The geometry is unchanged.

**D42 — "Show status as text" setting, off by default.** Idle shows no text
either way, so a quiet bar stays quiet.

**D43 — Onboarding is three steps and closes itself.** Reopens on step 2 if
the hooks go missing. The config preview comes from the installer's own
`print` mode, so the JSON shown is the JSON merged — one implementation.
Dismisses 1.6s after the first real event so the glyph is seen to move.

**D44 — Completion sound.** `done.wav` bundled, played through `NSSound`,
on by default with a Settings toggle. Sessions already finished at launch do
not play — nothing just happened. Rapid successive finishes restart the clip.

**D45 — The official logo ships in the bundle three ways.** `AppIcon.icns`
composited on the same charcoal tile as the favicons, plus two PNG sizes for
onboarding/About/panel header. The glyph appears nowhere but the status item
and the onboarding menu-bar mock, which is a demo of the item itself.

**D46 — Site: four sections, fixed $2.99, checkout behind a flag.** The flag
is the presence of a Stripe key or payment link; off shows "Available soon"
and no error. No download is served from the page; /thanks carries the link
from `NEXT_PUBLIC_DOWNLOAD_URL`. From the B5 list: sticky panel, Animated
Beam, Animated List and Magic Card were cut with the sections that would have
held them (a four-section page has no architecture or panel-scroll section,
and cards would break the hairline rule). The hero shows the real panel under
a live, true-size menu bar instead.

**D47 — The site's dark mode follows the system, like the app.** No toggle.

**D48 — Panel screenshots are renders from the test harness.** Same views,
same data shape as the app, at 14pt dots, light and dark. 640px WebP.

**D49 — Lighthouse (mobile, simulated): Performance 94, Accessibility 100,
Best Practices 100, SEO 100.** LCP is the hero lede at 3.0s under simulated
4G; TBT 20ms, CLS 0.

**D50 — Working spin halved again: 2.5s per quarter turn.** Requested. 20
frames at 8fps, loop-closed.

**D51 — Done is a hard, repeating pulse, not a one-shot.** The 0.9s
overshoot-then-freeze was reported as "not pulsating": unless you were
watching the bar during that second, done looked like idle in orange. Now
.72 → 1.28 → .72 every 1.25s (10 frames), continuing until the panel is
opened — and for the 4s hold when other sessions are still working (D40).
Reduce Motion shows the full-size orange gem.

**D52 — Clicking a row targets the exact tab or window.** The hook now
records focus hints: ITERM_SESSION_ID, TERM_SESSION_ID, the owner's tty,
KITTY_WINDOW_ID, WEZTERM_PANE, VSCODE_PID and `__CFBundleIdentifier` (the
GUI app that spawned Claude; present even when TERM_PROGRAM is not, which is
the case for IDE extensions). Tiers: iTerm2 session by unique id and
Terminal.app tab by tty over AppleScript; kitty/WezTerm over their CLIs; IDE
and other windows raised by title match through Accessibility (system prompt
shown once); then the spawning app by bundle id; then Finder. Apple Events
entitlement added. IDE windows cannot be addressed any other way: each VS
Code-family window has its own extension host, but nothing maps that
process to a window except the title.

**D53 — Display name is "Claude Watch".** The bundle id, folder names,
Application Support directory and repo stay `claude_watch`; only what a
person reads changed. D39's trademark note still applies.

**D54 — Info.plist is generated by XcodeGen from `project.yml`.** Hand edits
to `Resources/Info.plist` were silently discarded at the next `xcodegen
generate`, which is why the bundle had no `CFBundleIconFile` and still said
claude_watch: the icon was blank in Finder and in the Accessibility list.
Icon keys and names now live in `project.yml` only.

**D55 — The row timer is the turn, not the lifetime.** `workingSince` starts
when a prompt is submitted, survives a needs-you pause inside the turn, and
clears when the turn ends; the row then freezes at the last turn's length.
A session that has not worked yet shows no time.

**D56 — Chat names come from Claude Code's own `ai-title` records.** The
transcript carries `{"type":"ai-title","aiTitle":…}` once Claude Code names
the chat — the same title its session picker shows. The previous approach
(first user message) failed on long transcripts because a 256KB byte cut
landed mid-line and jq rejected the whole thing, so extension sessions fell
back to the folder name. The first-prompt fallback is now line-based. The
secondary line is the root folder path with `~`, not just its last component.

**D57 — Interrupts are detected from the transcript, not a hook.** Stopping a
turn (Esc, or rejecting a tool call) fires no Claude Code hook — the Stop hook
is documented as not running on a user interrupt — so the session sat at
working until the next prompt. Claude Code does append a user record reading
"[Request interrupted by user…]" to the transcript, so working sessions'
transcripts are stat-polled once a second and the tail is scanned when the
file grows. A hit rewrites the session file to idle through the same path a
hook would take. The turn timer freezes at the interrupted length.

**D58 — Needs-you arrives at once and clears when answered.** Three more
hooks: `PreToolUse`/`PostToolUse` matched to `AskUserQuestion` bracket a
question, and `PermissionRequest` announces a permission dialog the moment it
opens (the `Notification` `permission_prompt` only fires after six seconds).
PermissionRequest runs synchronously because its output is a decision; the
script prints nothing, so the dialog appears as normal. A permission
*decision* fires nothing, so the transcript monitor treats any new user
record while at needs-you as "answered" and returns the session to working.

**D59 — Onboarding shows the terminal equivalent.** The button installs the
hooks; the same bundled installer is shown as a copyable command for anyone
who prefers to run it themselves or wants to see what ran.
