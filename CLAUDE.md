# CLAUDE.md — Level Capital Advisors website

Read this first, every session. Jack and Nick each run Claude on their own accounts against this
repo; this file is what keeps both Claudes working from the same context.

## What this is
The marketing site for **Level Capital Advisors LLC** ("LCA"), a commercial real estate investment
bank (debt and equity advisory across the capital stack). Domain: **levelcapitaladvisors.com**.
The firm was formerly **Tower Capital Advisors** — the rebrand is final. Never reintroduce "Tower"
or `towercapitaladvisorsllc.com` anywhere (copy, emails, alt text, metadata).

Stack: plain **Vite** multi-page site — `index.html` (home) and `team.html` (team). No framework.
- Styles: `src/styles/tokens.css` (brand tokens) → `src/styles/main.css` (everything else)
- Behavior: `src/main.js` (mobile nav, contact form, team directory)
- Team data: `src/data/team.js`
- Images: `public/images/` (served from `/images/...`)

## Rules — non-negotiable
1. **Copy stays word-for-word unless Nick approves.** Do not rewrite, "tighten", or reorder site
   copy on your own. Layout, styling, and code changes are fine; wording changes need Nick's sign-off
   in the PR. If you think copy should change, propose it in the PR description instead.
2. **Never commit to `main`.** Every change goes on its own branch (`jack/<topic>` or
   `nick/<topic>`), then a pull request, then review of the Vercel preview, then merge.
3. **Colors and fonts come from `tokens.css` only.** Never hard-code a hex value or font name in
   `main.css` or HTML. Use the semantic roles (`--color-accent`, etc.) where one fits.
4. **LevelMark usage:** the wordmark is typographic — `<strong>Level</strong>Capital Advisors`
   inside `.levelmark`. "Level" is always bold, "Capital Advisors" regular; never restyle, recolor
   outside the tokens, abbreviate to "LCA" on the site, or replace with an image until the final
   logo file lands (see Open items).
5. **Email addresses:** `Borrowers@levelcapitaladvisors.com`, `Lenders@levelcapitaladvisors.com`,
   and personal addresses `firstname@levelcapitaladvisors.com`. Nothing else.
6. **Keep the legal line** in every footer: "Information is for discussion purposes only and does
   not constitute a financing commitment."
7. Keep it accessible and mobile-first: real alt text, labeled form fields, works at 375px wide.

## Brand tokens (from `src/styles/tokens.css`)
| Token | Value | Use |
|---|---|---|
| `--basalt` | `#2b2d2f` | Primary dark — web text, nav, footer, dark sections |
| `--basalt-soft` | `#45484b` | Secondary dark |
| `--paper` | `#f5f1ea` | Primary light background |
| `--paper-deep` | `#ebe4d8` | Alternate section background |
| `--copper` | `#b8612a` | Accent — italic emphasis, links, CTAs |
| `--copper-deep` | `#954c1f` | Accent hover |
| `--navy` | `#1c2b3f` | Print / masthead navy (business cards, letterhead) |
| `--stone` | `#8a8580` | Muted text, rules |

Fonts: **Cormorant Garamond** (display — headings, LevelMark, quotes) and **Inter** (body), via
Google Fonts. Signature move: headline with the second phrase in copper italic — e.g.
"Capital, *elevated.*"

> ⚠️ The hex values and fonts above are **provisional** placeholders. Replace them with the exact
> values from the refresh file / brand kit (see Open items) — change them in `tokens.css` and this
> table together.

## Open items
- [ ] **Confirm brand tokens** — exact basalt / paper / copper hex values and the two fonts.
- [ ] **Final Level logo** — replace the typographic LevelMark only once the real logo file exists.
- [ ] **Nick's hi-res portrait** → `public/images/team/nick-yanoti.jpg`, then set `photo` in `team.js`.
- [ ] **Missing LA and Chicago photos** → `public/images/` (placement TBD with Nick).
- [ ] **Hero image** → `public/images/hero.jpg`. Current alt text is "Contemporary desert tower in
      late-afternoon light" (a Tower-era image) — confirm whether the image changes with the rebrand.
- [ ] **Team roles and bios** in `team.js` are placeholders ("Role TBD", "Bio pending.").
- [ ] **Illustrative capital structures** bar proportions in `index.html` are placeholders.
- [ ] **Rebrand copy swaps need Nick's sign-off**: "We are *Level.*", "the *Level standard.*",
      "Each Level Capital Advisor…", "Level is built on…" (all were "Tower" in the source copy).
- [ ] Hero coordinates (33.49° N · 111.93° W, Scottsdale) — confirm they still apply.

## How to run
```bash
npm install
npm run dev       # local dev server at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## How to deploy
Hosted on **Vercel**, connected to this GitHub repo.
- Every pull request gets an automatic **preview URL** (posted on the PR by the Vercel bot) — that
  is what the other person reviews before approving.
- Merging to `main` deploys production at levelcapitaladvisors.com.
- Vercel settings: Framework preset **Vite**, build command `npm run build`, output `dist`.

## Working with Claude in this repo
When asked to make a change: create a branch, make the edit, run `npm run build` to confirm it
compiles, commit with a clear message, push, and open a PR using the template in
`.github/pull_request_template.md`. Call out any copy changes explicitly in the PR so Nick can
approve them. When asked to review the other person's PR, check it against the rules above.
