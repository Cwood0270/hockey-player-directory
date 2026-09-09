# Vercel Hobby setup — hockey ops directory

**Date:** 2026-09-09
**Vercel plan:** Hobby (free) — not Pro
**Vercel project (keep this one all semester):** `uvu2/hockey-player-directory`

## URLs (the same ones you will reuse all semester)

| Item | Value |
| --- | --- |
| GitHub repository (you can push) | `https://github.com/Cwood0270/hockey-player-directory` |
| Instructor collaborator | `thortek` added: **no** — add under GitHub **Settings → Collaborators** (repo is already public) |
| Vercel Production URL | `https://hockey-player-directory-one.vercel.app` |
| Preview URLs | Do **not** submit these to Canvas (example of a deployment host, not Production: `https://hockey-player-directory-b7ahq0i3r-uvu2.vercel.app`) |

Stable Production aliases on this project: `https://hockey-player-directory-one.vercel.app` and `https://hockey-player-directory-uvu2.vercel.app`. Submit the first one to Canvas.

## Hobby constraints I will keep

- One Vercel project for this course
- Production deploys from `main` only
- No cron / Fluid Compute / paid add-ons (`vercel.json` sets `"fluid": false`)
- Secrets go in the Vercel dashboard later — never in git
- Do **not** set `outputDirectory: "dist"` — this app uses TanStack Start + Nitro SSR, not a static export

## First production deploy

- Status: **Ready** (2026-09-09, deployment `dpl_FUwSWXA3j6R9JAeK2vvh3PYmwu8E`)
- Framework on Vercel: TanStack Start. Server build used Nitro `preset: vercel` (function `__server`), not a static `dist` site.
- Incognito / public check of Production URL: **pass** — HTTP **200** on `/` and `/players/player-00`; HTML includes **Hockey Ops** and **Alex Mercer**; browser title **Hockey Ops Directory** (the app, not the Vercel dashboard).

## Git connection (needed so later `main` pushes update this same URL)

CLI `vercel git connect` failed with: *Failed to connect Cwood0270/hockey-player-directory to project.* Connect the repo once in the Vercel dashboard: Project → Settings → Git → GitHub repository `Cwood0270/hockey-player-directory`, production branch **`main`**. Do not click **Add New Project**.
