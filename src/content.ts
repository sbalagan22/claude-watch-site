/**
 * Every word on the site. Nothing here describes a feature the app does not
 * have: each claim maps to code in Sources/ClaudeWatch.
 */

export type MarkState = "idle" | "working" | "needsYou" | "done" | "failed";

export const GITHUB_URL = "https://github.com/sbalagan22/claude-watch";
export const GITHUB_RELEASES_URL = `${GITHUB_URL}/releases/latest`;

export const siteContent = {
  meta: {
    title: "Claude Watch",
    description:
      "Claude Watch puts every Claude Code session in your menu bar: working, waiting on you, done, or failed. macOS 14 or later. Free and open source.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://claudewatch.app",
    ogImage: "/brand/og-image.png",
  },

  price: {
    label: "Free",
    terms: "and open source",
  },

  hero: {
    headline: ["Is Claude done yet?"],
    subline:
      "Claude Watch puts every Claude Code session in your menu bar, so you know without switching windows.",
    cta: "Download for macOS",
    githubCta: "View on GitHub",
    requirements: "macOS 14 or later · Apple silicon and Intel · Free",
    comingSoon: "Available soon",
    downloadUrl: process.env.NEXT_PUBLIC_DOWNLOAD_URL || GITHUB_RELEASES_URL,
    starPrompt: "Like it? A star on GitHub helps other people find it.",
  },

  states: {
    title: "Five states. One glance.",
    lede: "The mark in the bar is the whole interface. You learn it in a minute.",
    items: [
      {
        state: "idle" as MarkState,
        name: "Idle",
        line: "Nothing running. The mark sits still, in the bar's own colour.",
      },
      {
        state: "working" as MarkState,
        name: "Working",
        line: "A turn is in progress. The mark turns, a quarter every couple of seconds.",
      },
      {
        state: "needsYou" as MarkState,
        name: "Needs you",
        line: "A permission prompt or a question is waiting. Orange, breathing, until you answer.",
      },
      {
        state: "done" as MarkState,
        name: "Done",
        line: "A turn finished while you were elsewhere. It pulses orange, hard, until you look.",
      },
      {
        state: "failed" as MarkState,
        name: "Failed",
        line: "A turn ended on an error. Red, one spike broken, and it does not move.",
      },
    ],
    panel: {
      title: "Click it for the list.",
      line: "Every session by chat name and folder, with its state. Click a row to jump to that exact tab or window, however many you have open.",
    },
  },

  download: {
    title: "Free. Open source.",
    lede: "No account, no license key, no telemetry. Every Mac you own, free forever.",
    includes: [
      "Every Mac you use, no seat count",
      "Free updates, forever",
      "No account, no license key, no telemetry",
      "Source on GitHub — read it, fork it, audit it",
    ],
    requirements: [
      "macOS 14 Sonoma or later",
      "Apple silicon or Intel",
      "Claude Code installed",
    ],
    cta: "Download for macOS",
    githubCta: "View source on GitHub",
    comingSoon: "Available soon. Nothing to sign up for — check back or follow along.",
    setupNote:
      "Setup happens in the app: it installs its Claude Code hooks for you on first launch, merging into your existing settings.",
    starPrompt: "If Claude Watch is useful, a star on GitHub helps other people find it.",
    mobile: {
      title: "This is a Mac app.",
      line: "Send yourself the link and open it on your Mac.",
      copy: "Copy link",
      copied: "Copied",
      email: "Email me the link",
    },
  },

  footer: {
    links: [
      { label: "Changelog", href: "/changelog" },
      { label: "GitHub", href: GITHUB_URL },
      { label: "Support", href: "mailto:support@claudewatch.app" },
      { label: "X", href: "https://x.com/claude_watch" },
    ],
    disclaimer:
      "Not affiliated with Anthropic. Claude and Claude Code are trademarks of Anthropic, PBC.",
    copyright: `© ${new Date().getFullYear()} Claude Watch`,
  },
};
