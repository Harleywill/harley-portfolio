# Portfolio Redesign — Adopt rbp-portfolio Template Style

## Overview

Retrofit the existing `harley-portfolio` Next.js site to match the visual design and architecture of the free open-source template [rbp-portfolio](https://github.com/DavidHDev/rbp-portfolio) (React Bits Pro's portfolio template): a calm black-and-white design system, WebGL flow shader backdrop, Lenis smooth scroll, and a multi-page structure. Content (projects, skills, bio, contact) is ported from the current site; a couple of features from the reference template (morphing portrait, polaroid strip) are deferred, and two existing custom components (AdminDemos, ScrollStack) are treated as a later phase.

## Reference Material

- Template source: https://github.com/DavidHDev/rbp-portfolio (cloned locally to `/private/tmp/.../scratchpad/ref/rbp-portfolio` for reference — not to be committed into this repo)
- Template license: free for personal/commercial use; template itself may not be resold/redistributed
- Live local preview of the unmodified reference template was run and visually approved by the user

## Scope: This Pass vs. Phase 2

**This pass (in scope):**
- Dependency upgrade: Next 15→16, React 19.0→19.2, Tailwind 3→4, add `next-themes`, `lenis`, `matter-js`, `lucide-react`; migrate `framer-motion` imports to the `motion` package (API-compatible rename)
- Adopt template's design tokens, fonts (Geist Sans/Mono + Fraunces), dark/light theme via `next-themes` with view-transition circular reveal
- WebGL flow shader page backdrop (`shader-flow.tsx` + `page-backdrop.tsx`), Lenis smooth scroll, animated pill nav with theme toggle
- Site frame rails (top/left/right, desktop only)
- Routes: `/` (home) and `/about`; `/projects` as a dedicated page
- Real content ported in: bio/hero copy, all 7 projects, 4 skill categories, physics-driven tech stack chips (Matter.js), one education entry (Manchester Metropolitan University — dates TBD), experience section scaffolded but left empty pending job title/dates for TRVentilation and NTS
- Existing Nodemailer contact form (`/api/send-email`) kept functionally as-is, restyled into the B&W design system, wrapped in a shader-backed card
- Footer kept, restyled to B&W

**Explicitly deferred to Phase 2 (not touched this pass):**
- Morphing portrait (hero) — needs two real photos of the user, same framing/dimensions
- Polaroid strip (about page) — needs real photos
- `AdminDemos.tsx` and `ScrollStack.tsx` — existing custom components, left in the repo unwired from any route, to be reintroduced/restyled later
- Real project screenshot/mockup images (cards will use a placeholder gradient/pattern tile instead of `dribbble.com`-style mockups)
- Experience section real content (TRVentilation + NTS job titles and dates — user will supply later)
- Education entry dates (user will supply later)

## Architecture Decisions

- **Retrofit in place**, not a fresh repo — keep existing git history in `harley-portfolio`.
- **Remove**: `components/Aurora.tsx`, `components/Aurora.css` (replaced by WebGL shader backdrop); old token-based `globals.css` (replaced by template's Tailwind v4 `@theme inline` token setup).
- **Keep installed but unused this pass**: `recharts`, `three`, `ogl` — still needed for Phase 2 (AdminDemos/ScrollStack use them).
- **Color scheme**: adopt the template's strict black & white palette exactly — no lime/orange/gold accents carried over. `--background`/`--foreground`/`--muted`/`--muted-foreground`/`--border`/`--ring` tokens per template, light + dark variants.

## Page/Route Structure

### `/` (home)
1. `Nav` — fixed pill nav, spring-animated active indicator, theme toggle (ported near-verbatim from template)
2. `Hero` — WebGL shader backdrop, two-line headline + subtitle adapted from current bio copy ("full-stack developer... scalable web applications..."), CTAs: "View Work" (→ `/projects`) and "Get In Touch" (→ contact section anchor). **No morphing portrait this pass** — hero uses text/CTA layout only, portrait slot omitted (not stubbed with placeholder imagery).
3. `Projects` — full list of all 7 projects (same list used on `/projects`), template's `project-card` styling (hover lift + image zoom via `.project-card`/`.project-card__image-inner` CSS from template's `globals.css`), placeholder gradient tile per card in place of real screenshots.
4. Contact section (see below)
5. `Footer` — kept from current site, restyled to B&W tokens, same links (email, LinkedIn, GitHub)

### `/about`
1. `Skills` — current site's 4 categories (Frontend, Backend, Tools & DevOps, Other) restyled into template's skills-grid pattern
2. `Stack` — Matter.js physics-driven chips, seeded from the flattened list of skill names across all 4 categories
3. `Experience` — timeline component scaffolded per template's `experience.tsx` pattern (expandable, fade-mask collapse), but rendered with zero entries / a lightweight "more detail coming soon" note until the user supplies TRVentilation and NTS job titles + dates
4. `Education` — one entry: Manchester Metropolitan University, Software Engineering degree, dates left blank/TBD
5. **Polaroid strip omitted** (Phase 2, needs real photos)

### `/projects`
Same full list/component as the home page's projects section (not a separate "featured vs. full" split — user confirmed same full list in both places).

### Contact
Not a separate route — a section on the home page, reachable via the Hero's "Get In Touch" CTA and Nav. Existing Nodemailer form (name/email/message fields, POSTs to `/api/send-email`, shows loading/success/error states) is kept functionally unchanged, restyled into the B&W design system. Wrapped visually using the template's shader-backed card treatment (reuse `shader-flow.tsx` component within the card, matching how the template embeds it in its own `contact-card.tsx`). Email/LinkedIn/GitHub links kept as secondary CTAs alongside the form.

## Design System

- Tokens: `--background`, `--foreground`, `--muted`, `--muted-foreground`, `--border`, `--ring`, `--frame` — light and dark pairs, per template's `globals.css`
- Tailwind v4 `@theme inline` mapping, replacing current Tailwind v3 config-based theme
- Fonts: Geist Sans (body), Geist Mono, Fraunces (serif, selective display headlines) — replacing current Poppins-only setup
- Dark/light mode via `next-themes` (class-based `.dark`), toggle button in nav uses `document.startViewTransition` for a circular reveal animation (with `prefers-reduced-motion` guard)
- Site frame: fixed top/left/right rails with rounded corner cutouts, desktop only (hidden under 850px), per template's `.site-frame`/`.site-corner` CSS
- No `backdrop-blur` except where the template itself uses it (experience section's collapsed-state fade)
- WebGL flow shader (`shader-flow.tsx`, raw OGL): used as page-wide backdrop (mobile-attenuated) and reused inside the contact card

## Data Flow / Content Mapping

| New location | Source of content |
|---|---|
| Hero headline/subtitle | Adapted from current `components/About.tsx` bio paragraphs |
| Projects (both `/` and `/projects`) | Verbatim from current `components/Projects.tsx` `projects` array (7 entries) — titles, descriptions, tech tags, links, under-development flags all preserved |
| About → Skills | Verbatim from current `components/Skills.tsx` `skillCategories` array |
| About → Stack chips | Derived: flattened skill names from the same `skillCategories` array |
| About → Experience | Empty/placeholder — awaiting user-supplied TRVentilation + NTS job titles and dates |
| About → Education | Manchester Metropolitan University / Software Engineering — dates awaiting user input |
| Contact form | Verbatim logic from current `components/Contact.tsx` (fields, fetch to `/api/send-email`, states) — restyled only |
| Footer links | Verbatim from current `components/Footer.tsx` |

## Error Handling

No new failure modes introduced beyond what exists today: contact form keeps its existing try/catch around the fetch call with error state shown to the user. Theme toggle falls back to a plain (non-view-transition) theme switch when `document.startViewTransition` is unsupported or `prefers-reduced-motion` is set — matches template behavior.

## Testing / Verification Plan

After implementation:
1. `npm run typecheck` — must pass with no errors under the new TypeScript/Next 16 setup
2. `npm run lint` — must pass
3. `npm run build` — production build must succeed
4. Manual verification in dev server (`npm run dev`):
   - Both light and dark themes render correctly, toggle animates without console errors
   - `/`, `/about`, `/projects` all load and render expected content
   - Contact form successfully submits (or at minimum reaches the existing API route without regressions)
   - Responsive check at 375px, 768px, 1280px viewport widths
   - No console errors in browser devtools

## Out of Scope / Explicit Non-Goals

- Not building the morphing portrait or polaroid strip this pass (no photos available)
- Not touching `AdminDemos.tsx` or `ScrollStack.tsx` beyond leaving them in place, unwired
- Not sourcing or designing real project screenshots
- Not finalizing Experience/Education dates — placeholders acceptable per user's explicit instruction to add real data later
- Not deploying to the VPS as part of this pass (local dev verification only, deployment is a separate follow-up)
