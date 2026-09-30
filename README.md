# Level Capital Advisors — website

Marketing site for Level Capital Advisors LLC · [levelcapitaladvisors.com](https://levelcapitaladvisors.com)

GitHub is the shared brain: Jack and Nick each run Claude on their own account against this one repo.
`CLAUDE.md` gives both Claudes the same context automatically.

## One-time setup (each person)
1. **GitHub** — have an account and accept the collaborator invite to `level-website`.
2. **Git** — install from [git-scm.com](https://git-scm.com) if you don't have it.
3. **Node.js** (v20 or newer) — install from [nodejs.org](https://nodejs.org).
4. **Claude desktop app** — install, sign in with your own Claude account, open the **Code** tab.
5. **Clone the repo** — in the Code tab, open the repo from GitHub, or in a terminal:
   ```bash
   git clone https://github.com/JackCREAgents/level-website.git
   cd level-website
   npm install
   ```
   Tip: clone somewhere **outside** OneDrive/Dropbox (e.g. `C:\dev\level-website`) — syncing
   `node_modules` causes slowdowns and file-lock errors.
6. Ask Claude: *"Summarize this project and its CLAUDE.md."* If it answers correctly, you're set.

## Daily workflow
1. `git pull` on `main` to get the latest.
2. Tell Claude what to change. It creates a branch (`jack/<topic>` or `nick/<topic>`), edits,
   commits, pushes, and opens a pull request.
3. Send the other person the **Vercel preview link** from the PR.
4. They review the preview (and the PR), approve, and merge.
5. Merging to `main` deploys the live site.

**Never commit directly to `main`.** Copy changes need Nick's approval. Don't edit the site in Manus
anymore — this repo is the source of truth.

## Commands
```bash
npm run dev       # local dev server (http://localhost:3000)
npm run build     # production build → dist/
npm run preview   # preview the production build
npm run check     # TypeScript type-check
```

## Where things live
```
client/index.html                     Page title, meta tags, fonts
client/src/pages/Home.tsx             Home page (all sections)
client/src/pages/Team.tsx             Team page — edit the teamMembers array for bios/titles/photos
client/src/components/SiteChrome.tsx  Header, navigation, footer, LCA logo
client/src/index.css                  All styling + brand colors
client/public/images/                 Photos
CLAUDE.md                             Rules and context Claude reads every session
```
