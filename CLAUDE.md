# CLAUDE.md — Level Capital Advisors website

Read this first, every session. Jack and Nick each run Claude on their own accounts against this
repo; this file is what keeps both Claudes working from the same context.

## What this is
The marketing site for **Level Capital Advisors LLC** ("LCA"), a commercial real estate investment
bank (debt and equity advisory across the capital stack). Domain: **levelcapitaladvisors.com**.
The firm was formerly **Tower Capital Advisors** — the rebrand is final. Never reintroduce "Tower"
or `towercapitaladvisorsllc.com` anywhere (copy, emails, alt text, metadata).

The site was originally generated in **Manus** and imported here (Sept 2026). GitHub is now the
source of truth — **do not edit the site in Manus anymore**; changes there will not reach this repo.

## Stack
React 19 + TypeScript + Tailwind CSS v4, built with Vite, routed with `wouter`. Hosted on Vercel.
- `client/index.html` — page shell: title, meta tags, Google Fonts
- `client/src/App.tsx` — routes: `/` (Home), `/team` (Team), fallback 404
- `client/src/pages/Home.tsx` — every home-page section; list content (expertise, approach steps,
  capital structures, operating principles) lives in arrays at the top of the file
- `client/src/pages/Team.tsx` — team directory; **team members are the `teamMembers` array** at the
  top (name, title, portrait, email, phone, LinkedIn, biography paragraphs)
- `client/src/components/SiteChrome.tsx` — header, nav, mobile menu, footer, `LevelMark`, `Brand`
- `client/src/index.css` — **all site styling and brand tokens** (hand-written CSS, not utility classes)
- `client/public/images/` — photos (served at `/images/...`); `client/public/favicon.svg`
- `client/src/components/ui/` — stock shadcn/ui component library from the Manus template. Mostly
  unused by the pages; leave it alone unless a change needs a component.
- `vercel.json` — build settings + rewrite so `/team` loads when opened directly

## Rules — non-negotiable
1. **Copy stays word-for-word unless Nick approves.** Do not rewrite, "tighten", or reorder site
   copy on your own. Layout, styling, and code changes are fine; wording changes need Nick's sign-off
   in the PR. If you think copy should change, propose it in the PR description instead.
2. **Never commit to `main`.** Every change goes on its own branch (`jack/<topic>` or
   `nick/<topic>`), then a pull request, then review of the Vercel preview, then merge.
3. **Colors come from the tokens in `index.css` `:root`.** Use `var(--copper)` etc.; don't introduce
   new hex values without adding a named token.
4. **LevelMark usage:** the monogram is the text **"LCA"** in Manrope 800, copper
   (`.brand-mark`), followed by the lockup **"Level"** (Instrument Serif) over **"CAPITAL ADVISORS"**
   (small caps). Use the `<Brand />` component — never rebuild or restyle the lockup inline, never
   swap it for an image until a final logo file exists.
5. **Email addresses:** `Borrowers@levelcapitaladvisors.com`, `Lenders@levelcapitaladvisors.com`,
   and personal addresses `Firstname@levelcapitaladvisors.com`. Nothing else.
6. **Keep the legal line** in the footer: "Information is for discussion purposes only and does not
   constitute a financing commitment."
7. Keep it accessible and responsive: real alt text, labeled form fields; check at ~375px, ~900px
   and desktop widths (the CSS has breakpoints at 1280px, 900px and 760px).

## Brand tokens (`client/src/index.css` → `:root`)
| Token | Value | Use |
|---|---|---|
| `--basalt` | `#171916` | Primary dark — hero, dark sections, footer |
| `--basalt-soft` | `#23251f` | Secondary dark |
| `--ink` | `#1d201c` | Body text on light backgrounds |
| `--paper` | `#f8f5ee` | Primary light background |
| `--limestone` | `#eee7da` | Alternate light background |
| `--copper` | `#c75b37` | Accent — LCA mark, italic emphasis, CTAs, datum lines |
| `--copper-dark` | `#a7462a` | Accent hover / pressed |
| `--hairline` | `rgba(29,32,28,.2)` | Rules and dividers |

Fonts (Google Fonts, loaded in `client/index.html`): **Instrument Serif** (headlines, "Level"
wordmark) and **Manrope** 400–800 (body, labels, LCA mark). Signature move: a headline whose second
phrase is copper italic — e.g. "Capital, *elevated.*" (`<em>` inside headings).
Design system name inherited from Manus: "Sonoran Monolith" (see file header comments).

## Open items
- [ ] **Search engines are blocked.** `client/index.html` has `<meta name="robots" content="noindex, nofollow">`
      and `client/public/robots.txt` disallows everything (same as the Manus site). Remove both
      **only** when Jack and Nick are ready for the site to appear in Google.
- [ ] **Move the domain** levelcapitaladvisors.com from Manus to Vercel once this version is approved.
- [ ] **Final Level logo** — the "LCA" text mark and "L" favicon are interim until a logo file exists.
- [ ] Hero coordinates (33.49° N · 111.93° W, Scottsdale) — confirm they still apply.

## How to run
```bash
npm install
npm run dev       # local dev server at http://localhost:3000
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm run check     # TypeScript type-check
```

## How to deploy
Hosted on **Vercel** (account `jack-7655`, project `level-website`), connected to this GitHub repo.
- Every pull request gets an automatic **preview URL** (posted on the PR by the Vercel bot) — that
  is what the other person reviews before approving.
- Merging to `main` deploys production (currently `level-website-jack-7655.vercel.app`; will be
  levelcapitaladvisors.com once the domain moves).
- Build settings live in `vercel.json`: `npm run build` → `dist`.

## Working with Claude in this repo
When asked to make a change: create a branch, make the edit, run `npm run build` (and `npm run check`)
to confirm it compiles, commit with a clear message, push, and open a PR using
`.github/pull_request_template.md`. Call out any copy changes explicitly in the PR so Nick can
approve them. When asked to review the other person's PR, check it against the rules above.
