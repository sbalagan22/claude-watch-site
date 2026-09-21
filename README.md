<div align="center">

# Claude Watch — Website

The marketing site for [Claude Watch](https://github.com/sbalagan22/claude-watch), a free, open-source macOS menu bar app for Claude Code.

**[claudewatch.app](https://claudewatch.app)** · [App repo](https://github.com/sbalagan22/claude-watch) · [Download](https://github.com/sbalagan22/claude-watch/releases/latest)

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

Built with Next.js (App Router), Tailwind CSS, and Motion. Fully static — no server functions, no database, no payment processor. The download button links straight to the latest [GitHub release](https://github.com/sbalagan22/claude-watch/releases/latest) of the app.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Motion](https://motion.dev) for the small set of scroll/fade animations
- TypeScript throughout

## Develop

```sh
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Build

```sh
npm run build
npm run start
```

## Environment

Everything is optional — see [`.env.example`](.env.example). With nothing set, the site builds and deploys, and the download button falls back to the latest GitHub release.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, used for OG tags. |
| `NEXT_PUBLIC_DOWNLOAD_URL` | Direct link to the `.dmg`. Defaults to the GitHub releases page. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional cookie-free analytics. |

## Deploy

The site deploys to [Vercel](https://vercel.com) on every push to `main`. It's a fully static export with no environment variables required to build.

## Regenerating brand assets

```sh
node Scripts/generate-icons.mjs         # favicons, app icons, OG mark
node Scripts/generate-favicon-ico.mjs   # favicon.ico from the PNG set
node Scripts/generate-og.mjs            # og-image.png
```

All raster brand assets derive from the master mark in `design/`.

## Content

Every word on the site lives in [`src/content.ts`](src/content.ts) — one file, no CMS. `DECISIONS.md` records the design and copy decisions behind the site.

## License

[MIT](LICENSE)

---

<div align="center">

If Claude Watch is useful, **[⭐ star the app repo](https://github.com/sbalagan22/claude-watch)**.

</div>
