# Repository setup — Hockey Ops Player Directory

**Author:** Carson Wood
**Date:** 2026-09-09
**Repository URL:** https://github.com/Cwood0270/hockey-player-directory
**Visibility:** public
**Default branch:** main

This repo was initialized during the Sprint 1 scaffold (first commit `6464bad`, 2026-09-03), not as a brand-new `git init` on this documentation day. This file records the live commands re-run on 2026-09-09, plus GitHub proof that source is online and secrets were never committed.

Known-good app check before this write-up: `npm run dev` served **http://localhost:3000/** with HTTP 200 and first HTML containing `Hockey Ops` and `Alex Mercer`.

## 1. Ignore rules in place before first commit

```text
node_modules/
dist/
.output/
.vinxi/
.vercel/

# Never commit real env files
.env
.env.local
.env.*.local

# OS / editor noise
.DS_Store
*.log
```

`.gitignore` existed before my first commit: YES

The TanStack Start scaffold wrote `.gitignore` in commit `6464bad` (`Scaffold TanStack Start with Tailwind v4 and workspace setup docs.`). That first-commit file already listed `node_modules`, `dist`, `.output`, `.vinxi`, `.env`, and `*.local`. On 2026-09-09 I added explicit `.vercel/`, `.env.local`, `.env.*.local`, and `*.log` so Sprint 2 / Vercel Hobby ignore rules are named in the file, not only implied.

`git ls-files` after that first commit (and on `origin/main` today) contains **no** `node_modules/`, **no** `.env`, **no** `.env.local`.

## 2. Repository initialized

```text
$ git branch --show-current
main

# git init -b main was not re-run on 2026-09-09.
# The folder already is a Git repo on branch main (initialized at scaffold).
# Re-running git init would rewrite .git/config; this course repo already has
# origin and a clean history, so init was skipped.
```

## 3. Pre-stage status review

Status **today** (working tree already committed and pushed):

```text
$ git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

Root of the **first** commit (`6464bad`) — the historical “what would have been staged” list:

```text
$ git ls-tree --name-only 6464bad
.cta.json
.gitignore
.vscode
AGENTS.md
README.md
docs
package-lock.json
package.json
src
tsconfig.json
tsr.config.json
vite.config.ts
```

- `node_modules/` absent from that list: PASS
- `.env` / `.env.local` absent from that list: PASS
- Build output (`dist/`, `.output/`) absent: PASS

`git check-ignore` on 2026-09-09: `node_modules`, `dist`, `.output`, `.vinxi`, `.env`, and `.env.local` all match `.gitignore`. No `.env` file exists in the project folder.

## 4. First commit

- Commit command used: `git commit -m "Scaffold TanStack Start with Tailwind v4 and workspace setup docs."` (hash `6464bad`; later sprint commits followed)
- Working tree clean afterward: PASS (confirmed again 2026-09-09 with `git status` before this documentation commit)

This step’s course example message (`chore: initial commit of hockey ops directory scaffold`) was **not** used, because the scaffold commit already existed. Inventing a second “initial” commit would rewrite history.

## 5. Remote and push

```text
$ git remote -v
origin	git@github.com:Cwood0270/hockey-player-directory.git (fetch)
origin	git@github.com:Cwood0270/hockey-player-directory.git (push)
```

`origin` is the remote **name** for the GitHub copy. Fetch and push both point at **this** GitHub repo (SSH). HTTPS clone URL: `https://github.com/Cwood0270/hockey-player-directory.git`.

- `git push -u origin main` completed without error: PASS

`-u` (`--set-upstream`) recorded that local `main` tracks `origin/main`, so later updates are `git push` / `git pull` without repeating the remote and branch. Feature-branch pushes in this sprint used `git push -u origin HEAD` the same way.

`origin/main` at documentation time: `bd30ce4` — `Record sprint 1 acceptance evidence from the live client-story walkthrough.`

## 6. Browser verification (the real proof)

Opened https://github.com/Cwood0270/hockey-player-directory and listed `origin/main` with `git ls-tree --name-only origin/main`. GitHub API: `"private": false`, `"default_branch": "main"`.

| Check | Result |
| --- | --- |
| Source files visible on the GitHub repo page | PASS (`src/`, `docs/`, `package.json`, `.gitignore`, `vite.config.ts`) |
| No `.env` file in the repository | PASS (`git ls-tree -r origin/main` has no `.env`) |
| No `node_modules` folder in the repository | PASS (same tree listing; GitHub root has no `node_modules`) |
| Commit message readable in the commit list | PASS (`6464bad` scaffold message; later sprint messages on `main`) |

Repo name on GitHub is `hockey-player-directory` (not the example `hockey-ops-directory`). Instructor/course work already used this URL.

## 7. Issues and fixes

| Issue | What I tried | Outcome |
| --- | --- | --- |
| Repo already existed; `git init -b main` was not a first-time command | Confirmed `main`, `origin`, and history instead of re-init | Honest record; no second empty GitHub repo |
| Course example repo name `hockey-ops-directory` | Kept existing `hockey-player-directory` | Same GitHub account; avoids a duplicate empty remote |
| `gh` CLI not installed on this machine | Used `git remote -v`, `git ls-tree origin/main`, and the public GitHub API | Same proof: files present, no `.env`, no `node_modules` |
| `.gitignore` lacked explicit `.vercel/` and `*.log` | Added those lines (plus named `.env.local` / `.env.*.local`) **before** any secret existed | Still no env file in the folder; nothing secret was ever committed |

## 8. Ready for Sprint 2

Sprint 2 will add env-variable separation and commit `.env.example`. My repository
is ready for that because ignore rules are already in place and no secret has ever
been committed: YES

**.gitignore must exist before the first commit** because Git only ignores *untracked* files. If `node_modules` or a real `.env` is committed first, adding `.gitignore` later does not erase them from history—you would still need a history rewrite. This repo ignored those paths in the same commit that introduced the scaffold, and no credential has been committed.
