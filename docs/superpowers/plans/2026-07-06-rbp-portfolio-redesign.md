# Portfolio Redesign (rbp-portfolio style) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retrofit `harley-portfolio` to match the black-and-white, WebGL-shader design system of the `rbp-portfolio` reference template, with all of Harley's real content (projects, skills, bio, contact) ported in, on three routes: `/`, `/about`, `/projects`.

**Architecture:** Upgrade Next.js/React/Tailwind to the versions the template requires, replace the design-token/CSS system and layout shell (nav, WebGL backdrop, smooth scroll, theme toggle) wholesale, then rebuild each content section (Hero, Projects, Skills, Stack, Experience, Education, Contact, Footer) as new components carrying real content, following the reference component's structure and CSS class patterns exactly. `AdminDemos.tsx` and `ScrollStack.tsx` are left in the repo, unwired from any route.

**Tech Stack:** Next.js 16, React 19.2, TypeScript (strict), Tailwind CSS v4, `motion` (renamed from `framer-motion`), `next-themes`, `lenis`, `matter-js`, `lucide-react`, existing `nodemailer` contact API route.

**Reference material:** The full reference template is cloned at `/private/tmp/claude-501/-Users-harleywilliams-Desktop-Obsidian-Claude-Memory/684969c2-7f73-41e3-bc83-04fe645b9d4f/scratchpad/ref/rbp-portfolio` (source: https://github.com/DavidHDev/rbp-portfolio). Several tasks below copy files verbatim from this path with `cp` — this path is valid in the current working environment/session. If that path no longer exists when a task runs, re-clone it first: `git clone --depth 1 https://github.com/DavidHDev/rbp-portfolio.git <path>`.

Design spec: `docs/superpowers/specs/2026-07-06-rbp-portfolio-redesign-design.md`

---

### Task 1: Update dependencies and config files

**Files:**
- Modify: `package.json`
- Modify: `tsconfig.json`
- Modify: `next.config.js` → replace with `next.config.ts`
- Create: `postcss.config.mjs`
- Delete: `postcss.config.js` (if present) — check first with `ls postcss.config.*`
- Delete: `tailwind.config.ts`

- [ ] **Step 1: Replace `package.json`**

```json
{
  "name": "harley-portfolio",
  "version": "1.0.0",
  "description": "Harley Williams - Full Stack Developer Portfolio",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "lenis": "^1.3.23",
    "lucide-react": "^0.562.0",
    "matter-js": "^0.20.0",
    "motion": "^12.23.26",
    "next": "^16.1.1",
    "next-themes": "^0.4.6",
    "nodemailer": "^8.0.1",
    "ogl": "^1.0.11",
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "recharts": "^2.12.0",
    "three": "^0.182.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/matter-js": "^0.20.2",
    "@types/node": "^20.0.0",
    "@types/nodemailer": "^7.0.10",
    "@types/react": "^19.0.0",
    "tailwindcss": "^4",
    "typescript": "^5.0.0"
  }
}
```

This removes `@fortawesome/*`, `framer-motion`, `autoprefixer`, and `postcss` (as a direct dep — `@tailwindcss/postcss` supersedes it) since the two components that used FontAwesome (`Contact.tsx`, `Footer.tsx`) are being replaced in this plan. `recharts`, `three`, and `ogl` stay installed for Phase 2 (`AdminDemos.tsx`, `ScrollStack.tsx`) even though they aren't imported by anything after this plan — that's expected and fine.

- [ ] **Step 2: Delete the old Tailwind v3 config**

```bash
rm tailwind.config.ts
```

Tailwind v4 configures theme via CSS (`@theme inline` block in `globals.css`, done in Task 3), not a JS config file.

- [ ] **Step 3: Replace PostCSS config**

Check what exists first:

```bash
ls postcss.config.*
```

Delete whichever old one exists (likely `postcss.config.js`) and create `postcss.config.mjs`:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 4: Replace `next.config.js` with `next.config.ts`**

```bash
rm next.config.js
```

Create `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
```

`output: "standalone"` and `images.unoptimized: true` are kept from the current config — required for the existing PM2/VPS deployment setup. The template's `remotePatterns` for `dribbble.com`/`unsplash.com` are dropped since we aren't using external mockup images (Task 10 uses a CSS placeholder tile instead).

- [ ] **Step 5: Replace `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```

This keeps the single `@/*` path alias (matching the current repo's convention, per the design spec) rather than adding the template's extra `@/components/*`, `@/lib/*`, `@/styles/*` aliases, which aren't needed.

- [ ] **Step 6: Install dependencies**

```bash
npm install
```

Expected: installs succeed with no errors. Some peer-dependency warnings about React 19 are expected and fine (the template itself uses these exact versions).

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs
git rm tailwind.config.ts next.config.js
git add -u
git commit -m "Upgrade to Next 16 / Tailwind v4 dependency set for portfolio redesign"
```

---

### Task 2: Replace `globals.css` with the token-driven design system

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace the full contents of `app/globals.css`**

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --muted: #f5f5f5;
  --muted-foreground: #737373;
  --border: #e5e5e5;
  --ring: #0066ff;
  --frame: #ffffff;
  --font-sans: var(--font-geist-sans), system-ui, -apple-system, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
  --font-serif: var(--font-fraunces), ui-serif, Georgia, serif;
}

.dark {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --muted: #171717;
  --muted-foreground: #a3a3a3;
  --border: #262626;
  --ring: #3b82f6;
  --frame: #0a0a0a;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-ring: var(--ring);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);
}

html {
  color-scheme: light;
}

html.dark {
  color-scheme: dark;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.skip-to-content {
  position: absolute;
  left: -9999px;
  top: 1rem;
  z-index: 9999;
  padding: 0.75rem 1rem;
  background: var(--background);
  border: 2px solid var(--ring);
  border-radius: 0.375rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--foreground);
}

.skip-to-content:focus {
  left: 1rem;
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

.focus-ring:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

html[data-theme-anim="1"]::view-transition-old(root) {
  z-index: 0;
}

html[data-theme-anim="1"]::view-transition-new(root) {
  z-index: 1;
  animation: theme-reveal 700ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes theme-reveal {
  from {
    clip-path: circle(0px at var(--theme-cx) var(--theme-cy));
  }
  to {
    clip-path: circle(var(--theme-r) at var(--theme-cx) var(--theme-cy));
  }
}

@media (prefers-reduced-motion: reduce) {
  html[data-theme-anim="1"]::view-transition-new(root) {
    animation: none;
  }
}

.site-frame {
  display: block;
  position: absolute;
  z-index: 9999;
  pointer-events: none;
  background-color: var(--frame);
}

.site-frame--top {
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
}

.site-frame--left {
  top: 0;
  left: 0;
  bottom: 0;
  width: 10px;
}

.site-frame--right {
  top: 0;
  right: 0;
  bottom: 0;
  width: 10px;
}

.site-corner {
  display: block;
  position: absolute;
  z-index: 9998;
  pointer-events: none;
  color: var(--frame);
}

.site-corner--top-left {
  transform: rotate(90deg);
  top: 10px;
  left: 10px;
}

.site-corner--top-right {
  top: 10px;
  right: 10px;
  transform: rotate(180deg);
}

@media (max-width: 850px) {
  .site-frame,
  .site-corner {
    display: none;
  }
}

.project-card {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.04);
  transition:
    transform 400ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 400ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 400ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--foreground) 14%, transparent);
  box-shadow:
    0 10px 20px -8px rgb(0 0 0 / 0.12),
    0 4px 8px -4px rgb(0 0 0 / 0.08);
}

.dark .project-card {
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.4);
}

.dark .project-card:hover {
  box-shadow:
    0 10px 24px -8px rgb(0 0 0 / 0.6),
    0 4px 8px -4px rgb(0 0 0 / 0.4);
}

.project-card__image {
  overflow: hidden;
}

.project-card__image-inner {
  position: absolute;
  inset: 0;
  transform: scale(1);
  transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.project-card:hover .project-card__image-inner {
  transform: scale(1.06);
}
```

This is a verbatim copy of the reference template's `globals.css` — no content changes needed here, it's pure design-system CSS with no hardcoded copy or brand-specific values.

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "Replace globals.css with token-driven B&W design system"
```

---

### Task 3: Remove Aurora background

**Files:**
- Delete: `components/Aurora.tsx`
- Delete: `components/Aurora.css`

- [ ] **Step 1: Delete the files**

```bash
git rm components/Aurora.tsx components/Aurora.css
```

- [ ] **Step 2: Commit**

```bash
git commit -m "Remove Aurora background (replaced by WebGL shader backdrop)"
```

(`app/page.tsx` still imports `Aurora` at this point — that's fixed in Task 11 when the home page is reassembled. The build will not be attempted until then.)

---

### Task 4: Add shader, layout infrastructure, and motion helper files

**Files:**
- Create: `components/shaders/shader-flow.tsx`
- Create: `components/layout/page-backdrop.tsx`
- Create: `components/layout/providers.tsx`
- Create: `components/layout/smooth-scroll.tsx`
- Create: `components/layout/skip-to-content.tsx`
- Create: `components/ui/motion-primitives.tsx`
- Create: `lib/config.ts`
- Create: `lib/motion.tsx`

Reference path used below:
`REF=/private/tmp/claude-501/-Users-harleywilliams-Desktop-Obsidian-Claude-Memory/684969c2-7f73-41e3-bc83-04fe645b9d4f/scratchpad/ref/rbp-portfolio`

These files are pure infrastructure — no brand-specific copy or data — so they're copied verbatim from the reference template.

- [ ] **Step 1: Copy the shader component**

```bash
REF="/private/tmp/claude-501/-Users-harleywilliams-Desktop-Obsidian-Claude-Memory/684969c2-7f73-41e3-bc83-04fe645b9d4f/scratchpad/ref/rbp-portfolio"
mkdir -p components/shaders components/layout components/ui
cp "$REF/components/shaders/shader-flow.tsx" components/shaders/shader-flow.tsx
```

- [ ] **Step 2: Copy layout infrastructure components**

```bash
REF="/private/tmp/claude-501/-Users-harleywilliams-Desktop-Obsidian-Claude-Memory/684969c2-7f73-41e3-bc83-04fe645b9d4f/scratchpad/ref/rbp-portfolio"
cp "$REF/components/layout/page-backdrop.tsx" components/layout/page-backdrop.tsx
cp "$REF/components/layout/providers.tsx" components/layout/providers.tsx
cp "$REF/components/layout/smooth-scroll.tsx" components/layout/smooth-scroll.tsx
cp "$REF/components/layout/skip-to-content.tsx" components/layout/skip-to-content.tsx
```

- [ ] **Step 3: Copy motion primitives**

```bash
REF="/private/tmp/claude-501/-Users-harleywilliams-Desktop-Obsidian-Claude-Memory/684969c2-7f73-41e3-bc83-04fe645b9d4f/scratchpad/ref/rbp-portfolio"
cp "$REF/components/ui/motion-primitives.tsx" components/ui/motion-primitives.tsx
```

- [ ] **Step 4: Copy `lib/config.ts` and `lib/motion.tsx`**

```bash
REF="/private/tmp/claude-501/-Users-harleywilliams-Desktop-Obsidian-Claude-Memory/684969c2-7f73-41e3-bc83-04fe645b9d4f/scratchpad/ref/rbp-portfolio"
mkdir -p lib
cp "$REF/lib/config.ts" lib/config.ts
cp "$REF/lib/motion.tsx" lib/motion.tsx
```

- [ ] **Step 5: Verify the copied files reference only relative/`@/` imports that will resolve**

```bash
grep -rn "^import" components/shaders/shader-flow.tsx components/layout/*.tsx components/ui/motion-primitives.tsx lib/motion.tsx
```

Expected: only imports from `react`, `motion/react`, `next-themes`, `lenis`, `@/lib/config`, `@/lib/motion` — no imports of files that don't exist yet at this point except `@/lib/config` (created this task) and `@/components/layout/smooth-scroll` (created this task) and `../shaders/shader-flow` (created this task). No dangling imports.

- [ ] **Step 6: Commit**

```bash
git add components/shaders components/layout/page-backdrop.tsx components/layout/providers.tsx components/layout/smooth-scroll.tsx components/layout/skip-to-content.tsx components/ui/motion-primitives.tsx lib/config.ts lib/motion.tsx
git commit -m "Add WebGL shader backdrop, smooth scroll, and motion helper infrastructure"
```

---

### Task 5: Site metadata config

**Files:**
- Create: `lib/metadata.ts`

- [ ] **Step 1: Create `lib/metadata.ts`**

```ts
import type { Metadata } from "next";

export const siteConfig = {
  name: "Harley Williams",
  description:
    "Full-stack developer building scalable web applications with React, Node.js, and modern tooling.",
  url: "https://harleywilliams.co.uk",
  ogImage: "/og-image.png",
  creator: "@Harleywill",
  authors: [
    {
      name: "Harley Williams",
      url: "https://harleywilliams.co.uk",
    },
  ],
  keywords: [
    "Harley Williams",
    "full stack developer",
    "portfolio",
    "Next.js",
    "React",
    "TypeScript",
  ],
} as const;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Full Stack Developer`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.creator,
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export function createMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: title ?? siteConfig.name,
      description: description ?? siteConfig.description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title ?? siteConfig.name,
        },
      ],
    },
    twitter: {
      title: title ?? siteConfig.name,
      description: description ?? siteConfig.description,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
```

This keeps the existing `favicon.svg` referenced from `app/layout.tsx` today, rather than requiring new icon assets.

- [ ] **Step 2: Commit**

```bash
git add lib/metadata.ts
git commit -m "Add site metadata config for Harley's portfolio"
```

---

### Task 6: Root layout with nav, backdrop, and site frame

**Files:**
- Create: `components/layout/nav.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `components/layout/nav.tsx`**

```tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
];

function useIsMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function NavThemeToggle(): ReactNode {
  const mounted = useIsMounted();
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const next = isDark ? "light" : "dark";

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const supportsViewTransitions =
      typeof document !== "undefined" &&
      typeof document.startViewTransition === "function";

    if (!supportsViewTransitions || prefersReducedMotion) {
      setTheme(next);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy)
    );

    const root = document.documentElement;
    root.style.setProperty("--theme-cx", `${cx}px`);
    root.style.setProperty("--theme-cy", `${cy}px`);
    root.style.setProperty("--theme-r", `${radius}px`);
    root.dataset.themeAnim = "1";

    const transition = document.startViewTransition(() => {
      setTheme(next);
    });

    transition.finished.finally(() => {
      delete root.dataset.themeAnim;
    });
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light theme"
            : "Switch to dark theme"
          : "Toggle theme"
      }
      aria-pressed={mounted ? isDark : undefined}
      className="focus-ring relative inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-background ring-1 ring-foreground/8 transition-colors"
    >
      <span aria-hidden="true" className="relative h-4 w-4">
        <Sun
          className={`absolute inset-0 h-4 w-4 text-foreground transition-all duration-300 ${
            mounted && isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
        <Moon
          className={`absolute inset-0 h-4 w-4 text-foreground transition-all duration-300 ${
            mounted && !isDark
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0"
          }`}
        />
      </span>
    </button>
  );
}

export function Nav(): ReactNode {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [pillRect, setPillRect] = useState<{
    x: number;
    width: number;
  } | null>(null);
  const [hasMeasured, setHasMeasured] = useState(false);

  const activeIndex = NAV_ITEMS.findIndex((item) =>
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href || pathname.startsWith(`${item.href}/`)
  );

  useLayoutEffect(() => {
    const list = listRef.current;
    const activeEl =
      activeIndex >= 0 ? itemRefs.current[activeIndex] : null;
    if (!list || !activeEl) {
      setPillRect(null);
      return;
    }
    const listRect = list.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();
    setPillRect({
      x: itemRect.left - listRect.left,
      width: itemRect.width,
    });
  }, [activeIndex, pathname]);

  useEffect(() => {
    if (!pillRect) return;
    const id = requestAnimationFrame(() => setHasMeasured(true));
    return () => cancelAnimationFrame(id);
  }, [pillRect]);

  return (
    <nav
      aria-label="Primary"
      className="fixed left-1/2 top-6 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-full bg-background p-1.5 shadow-sm border border-foreground/8">
        <ul ref={listRef} className="relative flex items-center gap-1">
          {pillRect && (
            <motion.span
              aria-hidden="true"
              initial={false}
              animate={{ x: pillRect.x, width: pillRect.width }}
              transition={
                hasMeasured
                  ? { type: "spring", stiffness: 380, damping: 32 }
                  : { duration: 0 }
              }
              style={{ left: 0, top: 0, bottom: 0 }}
              className="absolute rounded-full bg-foreground/5 ring-1 ring-foreground/8"
            />
          )}
          {NAV_ITEMS.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={item.href}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="relative"
              >
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className="focus-ring relative inline-flex cursor-pointer items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300"
                >
                  <span
                    className={
                      isActive
                        ? "relative z-10 text-foreground"
                        : "relative z-10 text-foreground/60 hover:text-foreground"
                    }
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <NavThemeToggle />
      </div>
    </nav>
  );
}
```

This is verbatim from the template — the `NAV_ITEMS` (Home/Projects/About) already match the route structure from the design spec, no changes needed.

- [ ] **Step 2: Replace `app/layout.tsx`**

```tsx
import { Nav } from "@/components/layout/nav";
import { PageBackdrop } from "@/components/layout/page-backdrop";
import { Providers } from "@/components/layout/providers";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { baseMetadata } from "@/lib/metadata";
import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <Providers>
          <div className="site-frame site-frame--top" aria-hidden="true" />
          <div className="site-frame site-frame--left" aria-hidden="true" />
          <div className="site-frame site-frame--right" aria-hidden="true" />
          <svg className="site-corner site-corner--top-left" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z" fill="currentColor"/>
          </svg>
          <svg className="site-corner site-corner--top-right" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z" fill="currentColor"/>
          </svg>
          <SkipToContent />
          <PageBackdrop />
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/layout/nav.tsx app/layout.tsx
git commit -m "Add pill nav with theme toggle, rebuild root layout with shader backdrop and site frame"
```

(The app will not build yet — `app/page.tsx` still imports deleted components. That's fixed in Task 11.)

---

### Task 7: Hero section with real bio content (no portrait)

**Files:**
- Create: `components/hero/hero-ctas.tsx`
- Create: `components/hero/hero.tsx`
- Delete: `components/Hero.tsx` (old)

- [ ] **Step 1: Create `components/hero/hero-ctas.tsx`**

```tsx
"use client";

import { ArrowRight } from "lucide-react";
import { LayoutGroup, motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroCtas(): ReactNode {
  return (
    <LayoutGroup>
      <motion.div
        layout
        transition={{ layout: { duration: 0.55, ease: EASE } }}
        className="mt-2 flex flex-wrap items-center gap-3"
      >
        <motion.div layout transition={{ layout: { duration: 0.55, ease: EASE } }}>
          <a
            href="#contact"
            className="focus-ring inline-flex cursor-pointer items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-md/2 transition-opacity hover:opacity-90"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.div layout transition={{ layout: { duration: 0.55, ease: EASE } }}>
          <Link
            href="/projects"
            className="border border-foreground/5 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-2xl transition-colors hover:bg-foreground/4"
          >
            View my work
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
}
```

- [ ] **Step 2: Create `components/hero/hero.tsx`**

Single-column layout (no portrait slot), real bio copy adapted from the current site's `Hero.tsx`/`About.tsx`:

```tsx
import type { ReactNode } from "react";

import { HeroCtas } from "./hero-ctas";
import { FadeIn } from "@/components/ui/motion-primitives";

export function Hero(): ReactNode {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 pt-44 pb-24 sm:px-10 sm:pt-56 sm:pb-32">
        <FadeIn className="mx-auto flex max-w-160 flex-col items-center gap-4 text-center">
          <p className="text-[20px] leading-tight tracking-tight font-medium text-foreground">
            Hey
            <span aria-hidden="true" className="mx-0.5">
              👋
            </span>
            , I&rsquo;m Harley
          </p>

          <h1 className="text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[2.5rem] lg:text-[3.65rem]">
            <span className="block">Full-stack developer</span>
          </h1>

          <p className="max-w-[40ch] text-[22px] leading-[1.4] tracking-tight text-foreground/65">
            I build scalable web applications with React, Node.js, and
            MongoDB — focused on seamless user experiences backed by robust
            backend systems.
          </p>

          <HeroCtas />
        </FadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Delete the old Hero component**

```bash
git rm components/Hero.tsx
```

- [ ] **Step 4: Commit**

```bash
git add components/hero
git commit -m "Add new Hero section with real bio copy, no portrait"
```

---

### Task 8: Projects section and page with real project data

**Files:**
- Create: `components/projects/projects.tsx`
- Create: `app/projects/page.tsx`
- Delete: `components/Projects.tsx` (old)

- [ ] **Step 1: Create `components/projects/projects.tsx`**

Real data ported verbatim from the current `components/Projects.tsx`, restyled into the template's masonry `project-card` pattern. Since there are no project screenshots yet, each card uses a CSS gradient placeholder tile instead of an `<Image>`.

```tsx
import { ArrowRight, Code2 } from "lucide-react";
import type { ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  underDevelopment?: boolean;
};

const PROJECTS: Project[] = [
  {
    id: "nts",
    title: "NTS Ltd - HVAC Services Website",
    description:
      "Modern Next.js website for NTS Ltd, a mechanical and electrical services company in Hull. Features custom admin dashboard for managing projects, testimonials, and news. Includes dynamic service pages, project galleries with image uploads, client testimonials carousel, and a professional portfolio section showcasing completed installations.",
    technologies: ["Next.js 16", "TypeScript", "Tailwind CSS", "Prisma", "SQLite", "Framer Motion"],
    link: "https://nevilletuckerservices.co.uk",
  },
  {
    id: "mepm",
    title: "MEPM Services - Mechanical Services Website",
    description:
      "Professional website for MEPM Services showcasing their mechanical services offerings. Built with modern Next.js architecture featuring service catalogs, project portfolios, client testimonials, and comprehensive contact management systems.",
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "Responsive Design"],
    link: "https://www.mepmservices.co.uk",
    underDevelopment: true,
  },
  {
    id: "jdbm",
    title: "JDBM Building Contractors - Services Website",
    description:
      "Modern website for JDBM Building Contractors Ltd featuring their building services, completed projects showcase, and client testimonials. Designed to establish strong online presence and attract new construction projects.",
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "Portfolio Display"],
    link: "https://www.jdbuildingcontractorsltd.co.uk",
    underDevelopment: true,
  },
  {
    id: "trventilation",
    title: "TRVentilation",
    description:
      "Full-stack e-commerce platform for ventilation products. Features include product catalog, shopping cart, order management, Stripe payments, email notifications, admin dashboard with analytics, and inventory management.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Express", "Tailwind"],
    link: "https://trventilation.com",
  },
  {
    id: "analytics-dashboard",
    title: "E-Commerce Analytics Dashboard",
    description:
      "Real-time analytics dashboard integrated with Google Analytics 4. Displays key metrics like active users, sessions, page views, bounce rate with customizable time filters and automated performance monitoring.",
    technologies: ["React", "GA4 API", "Analytics", "Dashboard", "Node.js"],
    link: "https://analytics.google.com",
  },
  {
    id: "product-management",
    title: "Advanced Product Management System",
    description:
      "Dynamic product management system with real-time category updates, image upload optimization, SEO enhancements, and inventory tracking. Features advanced search, filtering, and product recommendations.",
    technologies: ["React", "Node.js", "MongoDB", "Multer", "SEO"],
  },
  {
    id: "payment-processing",
    title: "Payment & Order Processing",
    description:
      "Robust payment processing with Stripe integration, order tracking, PDF invoice generation, and email notifications. Supports multiple order statuses with automated workflows and shipment tracking.",
    technologies: ["Stripe API", "Node.js", "Email Service", "PDF Generation"],
  },
];

export type ProjectsProps = {
  withHeadline?: boolean;
};

export function Projects({ withHeadline = false }: ProjectsProps): ReactNode {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <h2 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
              My projects
            </h2>
            <p className="max-w-[33ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              Full-stack development work, with a focus on scalable
              architecture and exceptional user experiences.
            </p>
          </FadeIn>
        ) : null}

        <div className="columns-1 gap-6 md:columns-2 md:gap-7">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}): ReactNode {
  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="mb-6 break-inside-avoid md:mb-7"
    >
      <article className="project-card flex flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5">
        <header className="flex items-center gap-2.5 px-1 pt-2">
          <span className="border-foreground/10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background">
            <Code2 className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
          </span>
          <span className="text-sm font-medium tracking-tight text-foreground">
            {project.title}
          </span>
        </header>

        <div className="project-card__image ring-foreground/5 relative w-full overflow-hidden rounded-2xl bg-foreground/5 ring-1 aspect-[4/3]">
          <div className="project-card__image-inner bg-gradient-to-br from-foreground/10 via-foreground/5 to-transparent" />
        </div>

        <div className="flex flex-col gap-2.5 px-1 pb-1">
          <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-foreground/8 bg-foreground/2 px-3 py-1 text-[12px] tracking-tight text-foreground/70 dark:bg-foreground/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="px-1 pb-2">
          {project.link && !project.underDevelopment ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring group inline-flex items-center gap-1.5 text-[14px] font-medium tracking-tight text-foreground"
            >
              View project
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          ) : project.underDevelopment ? (
            <span className="text-[14px] tracking-tight text-foreground/40">
              Under development
            </span>
          ) : null}
        </div>
      </article>
    </FadeIn>
  );
}
```

- [ ] **Step 2: Create `app/projects/page.tsx`**

```tsx
import { Projects } from "@/components/projects/projects";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "A look at the full-stack projects I've built and shipped.",
  path: "/projects",
});

export default function ProjectsPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col gap-20 sm:gap-28">
      <div className="pt-40 sm:pt-56">
        <Projects withHeadline />
      </div>
      <div className="h-12 sm:h-16" />
    </main>
  );
}
```

- [ ] **Step 3: Delete the old Projects component**

```bash
git rm components/Projects.tsx
```

- [ ] **Step 4: Commit**

```bash
git add components/projects app/projects
git commit -m "Add Projects grid with real project data and dedicated /projects page"
```

---

### Task 9: Contact section (Nodemailer form in a shader card) and Footer

**Files:**
- Create: `components/contact/contact-section.tsx`
- Create: `components/layout/footer.tsx`
- Delete: `components/Contact.tsx` (old)
- Delete: `components/Footer.tsx` (old)

- [ ] **Step 1: Create `components/contact/contact-section.tsx`**

Keeps the existing Nodemailer form logic from the current `Contact.tsx` (fields, fetch to `/api/send-email`, loading/error/success states) unchanged, restyled into the template's shader-backed card layout.

```tsx
"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";
import { ShaderFlow } from "@/components/shaders/shader-flow";

const CARD_FADE_MASK =
  "radial-gradient(ellipse 90% 110% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.15) 100%)";

export function ContactSection(): ReactNode {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="mx-auto my-12 w-full max-w-275 px-6 sm:my-20 sm:px-10">
      <FadeIn>
        <div className="relative w-full overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
          <div className="relative w-full overflow-hidden rounded-[1.6rem]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-45 dark:opacity-25"
              style={{ WebkitMaskImage: CARD_FADE_MASK, maskImage: CARD_FADE_MASK }}
            >
              <ShaderFlow scale={3} brightness={3} />
            </div>

            <div className="relative grid gap-8 p-6 sm:gap-10 sm:p-7 md:grid-cols-[1.1fr_1fr] md:items-stretch md:gap-6 md:p-6">
              <div className="flex flex-col gap-5">
                <h2 className="font-serif text-[2.25rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-[2.75rem] lg:text-[3.25rem]">
                  Let&rsquo;s connect
                </h2>
                <p className="max-w-[32ch] text-[18px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[20px]">
                  Feel free to reach out for collaboration or just a friendly
                  hello.
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <SocialIcon href="mailto:Hjakewilliams@gmail.com" label="Email" Icon={Mail} />
                  <SocialIcon
                    href="https://www.linkedin.com/in/harley-williams/"
                    label="LinkedIn"
                    Icon={Linkedin}
                  />
                  <SocialIcon href="https://github.com/Harleywill" label="GitHub" Icon={Github} />
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="border-foreground/8 flex flex-col gap-3 rounded-[1.1rem] border bg-background p-6 sm:p-7"
              >
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[13px] font-medium tracking-tight text-foreground/70">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="focus-ring rounded-xl border border-foreground/10 bg-background px-3.5 py-2.5 text-[15px] text-foreground placeholder:text-foreground/35"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[13px] font-medium tracking-tight text-foreground/70">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="focus-ring rounded-xl border border-foreground/10 bg-background px-3.5 py-2.5 text-[15px] text-foreground placeholder:text-foreground/35"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[13px] font-medium tracking-tight text-foreground/70">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Your message here..."
                    className="focus-ring resize-none rounded-xl border border-foreground/10 bg-background px-3.5 py-2.5 text-[15px] text-foreground placeholder:text-foreground/35"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="focus-ring mt-1 inline-flex items-center justify-center rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send message"}
                </button>

                {error && <p className="text-[13px] text-red-500">{error}</p>}
                {submitted && (
                  <p className="text-[13px] text-foreground/70">
                    Thanks for reaching out! I&rsquo;ll get back to you soon.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}): ReactNode {
  const isExternal = href.startsWith("http");
  const externalProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link
      href={href}
      aria-label={label}
      className="border-foreground/8 hover:border-foreground/15 focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-background text-foreground/70 transition-colors hover:text-foreground"
      {...externalProps}
    >
      <Icon className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
    </Link>
  );
}
```

- [ ] **Step 2: Create `components/layout/footer.tsx`**

```tsx
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const SOCIAL_LINKS = [
  { label: "Email", href: "mailto:Hjakewilliams@gmail.com", Icon: Mail },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/harley-williams/", Icon: Linkedin },
  { label: "GitHub", href: "https://github.com/Harleywill", Icon: Github },
];

export function Footer(): ReactNode {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mx-auto w-full max-w-275 border-t border-foreground/8 px-6 py-10 sm:px-10">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => {
            const isExternal = href.startsWith("http");
            const externalProps = isExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {};
            return (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="border-foreground/8 hover:border-foreground/15 focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-background text-foreground/70 transition-colors hover:text-foreground"
                {...externalProps}
              >
                <Icon className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
              </Link>
            );
          })}
        </div>
        <p className="text-[13px] tracking-tight text-foreground/50">
          &copy; {currentYear} Harley Williams. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Delete old Contact and Footer components**

```bash
git rm components/Contact.tsx components/Footer.tsx
```

- [ ] **Step 4: Commit**

```bash
git add components/contact components/layout/footer.tsx
git commit -m "Add Contact section (shader card + existing Nodemailer form) and Footer"
```

---

### Task 10: About page — Skills, Stack, Experience, Education

**Files:**
- Create: `components/about/skills.tsx`
- Create: `components/about/stack.tsx`
- Create: `components/about/experience.tsx`
- Create: `components/about/education.tsx`
- Delete: `components/Skills.tsx` (old)

- [ ] **Step 1: Create `components/about/skills.tsx`**

Real categories ported from the current `Skills.tsx`, restyled into the template's pill-tag pattern, grouped by category.

```tsx
import type { ReactNode } from "react";

type SkillCategory = {
  category: string;
  skills: string[];
};

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend",
    skills: ["React", "TypeScript", "Tailwind CSS", "Bootstrap", "Next.js", "Responsive Design"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "MongoDB", "Mongoose", "RESTful APIs", "Authentication"],
  },
  {
    category: "Tools & DevOps",
    skills: ["Git", "GitHub", "PM2", "Nginx", "Linux/VPS", "SSL/TLS", "Stripe API"],
  },
  {
    category: "Other",
    skills: ["Email Services", "File Upload", "Payment Processing", "Performance Optimization", "SEO", "Analytics"],
  },
];

export function Skills(): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
        What I do
      </h3>
      <div className="flex flex-col gap-4 rounded-4xl border border-foreground/5 bg-foreground/2 p-4 dark:bg-foreground/5 sm:p-5">
        {SKILL_CATEGORIES.map((category) => (
          <div key={category.category} className="flex flex-col gap-2.5">
            <span className="text-[13px] font-medium tracking-tight text-foreground/50">
              {category.category}
            </span>
            <div className="flex flex-wrap gap-2.5">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-foreground/8 bg-background px-4 py-2 text-[14px] tracking-tight text-foreground/85 sm:text-[15px]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `components/about/stack.tsx`**

Physics-driven chips (Matter.js) seeded with the flattened skill list, copied structurally from the template with the `CHIPS` array replaced:

```tsx
"use client";

import { RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

type Chip = {
  label: string;
  slug: string;
  bg: string;
  fg: string;
};

const CHIPS: Chip[] = [
  { label: "React", slug: "react", bg: "#1FB6CB", fg: "#ffffff" },
  { label: "TypeScript", slug: "typescript", bg: "#2F74C0", fg: "#ffffff" },
  { label: "Next.js", slug: "nextdotjs", bg: "#1f1f1f", fg: "#ffffff" },
  { label: "Node.js", slug: "nodedotjs", bg: "#3C873A", fg: "#ffffff" },
  { label: "MongoDB", slug: "mongodb", bg: "#13AA52", fg: "#ffffff" },
  { label: "Express", slug: "express", bg: "#1f1f1f", fg: "#ffffff" },
  { label: "Tailwind CSS", slug: "tailwindcss", bg: "#2BBCF5", fg: "#ffffff" },
  { label: "Stripe", slug: "stripe", bg: "#635BFF", fg: "#ffffff" },
  { label: "Git", slug: "git", bg: "#F1502F", fg: "#ffffff" },
  { label: "GitHub", slug: "github", bg: "#181717", fg: "#ffffff" },
];

const CHIP_RADIUS = 14;
const ICON_RADIUS = 10;
const WALL_PAD = 16;

type ChipState = {
  chip: Chip;
  body: Matter.Body;
  width: number;
  height: number;
};

export function Stack(): ReactNode {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const Matter = await import("matter-js");
      if (cancelled) return;

      const { Engine, Runner, World, Bodies, Body, Mouse, MouseConstraint, Events } = Matter;

      const measureChildren = Array.from(measure.children) as HTMLElement[];
      const dims = measureChildren.map((el) => {
        const r = el.getBoundingClientRect();
        return { w: Math.max(80, r.width), h: Math.max(28, r.height) };
      });

      let width = container.clientWidth;
      let height = container.clientHeight;

      const engine = Engine.create();
      engine.gravity.y = 1;
      const world = engine.world;

      const wallThickness = 400;
      const floor = Bodies.rectangle(
        width / 2,
        height - WALL_PAD + wallThickness / 2,
        width * 3,
        wallThickness,
        { isStatic: true }
      );
      const leftWall = Bodies.rectangle(
        WALL_PAD - wallThickness / 2,
        height / 2,
        wallThickness,
        height * 4,
        { isStatic: true }
      );
      const rightWall = Bodies.rectangle(
        width - WALL_PAD + wallThickness / 2,
        height / 2,
        wallThickness,
        height * 4,
        { isStatic: true }
      );
      World.add(world, [floor, leftWall, rightWall]);

      const states: ChipState[] = CHIPS.map((chip, i) => {
        const dim = dims[i] ?? { w: 120, h: 36 };
        const { w, h } = dim;
        const halfW = w / 2;
        const minX = WALL_PAD + halfW + 4;
        const maxX = width - WALL_PAD - halfW - 4;
        const x = minX + Math.random() * Math.max(1, maxX - minX);
        const y = -80 - i * 60 - Math.random() * 120;
        const body = Bodies.rectangle(x, y, w, h, {
          chamfer: { radius: CHIP_RADIUS },
          restitution: 0.35,
          friction: 0.5,
          frictionAir: 0.025,
          density: 0.0018,
          angle: (Math.random() - 0.5) * 0.4,
        });
        World.add(world, body);
        return { chip, body, width: w, height: h };
      });

      const mouse = Mouse.create(container);

      const wheelTarget = mouse.element as HTMLElement & { mousewheel?: EventListener };
      if (wheelTarget.mousewheel) {
        wheelTarget.removeEventListener("wheel", wheelTarget.mousewheel);
        wheelTarget.removeEventListener("DOMMouseScroll", wheelTarget.mousewheel);
      }

      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, damping: 0.2, render: { visible: false } },
      });
      World.add(world, mouseConstraint);

      Events.on(mouseConstraint, "startdrag", () => {
        container.style.cursor = "grabbing";
      });
      Events.on(mouseConstraint, "enddrag", () => {
        container.style.cursor = "grab";
      });

      const runner = Runner.create();
      Runner.run(runner, engine);

      let raf = 0;
      const tick = (): void => {
        for (let i = 0; i < states.length; i++) {
          const s = states[i];
          const el = chipRefs.current[i];
          if (!s || !el) continue;
          const { x, y } = s.body.position;
          el.style.transform = `translate3d(${x - s.width / 2}px, ${y - s.height / 2}px, 0) rotate(${s.body.angle}rad)`;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      const onResize = (): void => {
        const newW = container.clientWidth;
        const newH = container.clientHeight;
        if (newW === width && newH === height) return;
        Body.setPosition(floor, { x: newW / 2, y: newH - WALL_PAD + wallThickness / 2 });
        Body.setPosition(leftWall, { x: WALL_PAD - wallThickness / 2, y: newH / 2 });
        Body.setPosition(rightWall, { x: newW - WALL_PAD + wallThickness / 2, y: newH / 2 });
        width = newW;
        height = newH;
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(container);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        Runner.stop(runner);
        World.clear(world, false);
        Engine.clear(engine);
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [resetKey]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <h3 className="text-foreground text-[15px] font-semibold tracking-tight">Stack</h3>
      </div>

      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative h-40 overflow-hidden rounded-4xl border sm:h-64">
        <button
          type="button"
          onClick={() => setResetKey((k) => k + 1)}
          aria-label="Reset stack"
          className="focus-ring border-foreground/8 bg-background text-foreground/70 hover:text-foreground absolute top-3 right-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-colors"
        >
          <RotateCcw className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
        </button>

        <div
          ref={measureRef}
          aria-hidden="true"
          className="pointer-events-none invisible absolute top-0 left-0 flex flex-wrap gap-2"
        >
          {CHIPS.map((chip) => (
            <ChipPill key={`m-${chip.label}`} chip={chip} />
          ))}
        </div>

        <div
          ref={containerRef}
          className="absolute inset-0 cursor-grab select-none"
          style={{ touchAction: "none" }}
        >
          {CHIPS.map((chip, i) => (
            <div
              key={`${resetKey}-${chip.label}`}
              ref={(el) => {
                chipRefs.current[i] = el;
              }}
              data-stack-chip
              className="pointer-events-none absolute top-0 left-0 will-change-transform"
              style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
            >
              <ChipPill chip={chip} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChipPill({ chip }: { chip: Chip }): ReactNode {
  return (
    <div
      className="dark:ring-1 dark:ring-white/15 inline-flex items-center gap-2 p-1 pr-2 text-[15px] font-medium tracking-tight sm:text-[16px]"
      style={{ backgroundColor: chip.bg, color: chip.fg, borderRadius: `${CHIP_RADIUS}px` }}
    >
      <span
        className="inline-flex h-8 w-8 items-center justify-center bg-white/95"
        style={{ borderRadius: `${ICON_RADIUS}px` }}
        aria-hidden="true"
      >
        <img
          src={`https://cdn.simpleicons.org/${chip.slug}`}
          alt=""
          width={18}
          height={18}
          className="h-5 w-5"
          draggable={false}
        />
      </span>
      <span>{chip.label}</span>
    </div>
  );
}
```

- [ ] **Step 3: Create `components/about/experience.tsx`**

Scaffolded per the template's expandable-timeline pattern, but with an empty `ENTRIES` array and an explicit placeholder message (per the design spec — real TRVentilation/NTS job titles and dates to be added later).

```tsx
import type { ReactNode } from "react";

type Entry = {
  company: string;
  role: string;
  period: string;
};

const ENTRIES: Entry[] = [];

export function Experience(): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
        Experience
      </h3>
      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative rounded-4xl border p-4 sm:p-6">
        {ENTRIES.length === 0 ? (
          <p className="text-[14px] tracking-tight text-foreground/50 sm:text-[15px]">
            Worked with TRVentilation and NTS &mdash; full role details coming
            soon.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {ENTRIES.map((entry) => (
              <li
                key={`${entry.company}-${entry.period}`}
                className="bg-background border-foreground/5 flex items-center gap-4 rounded-3xl border p-2"
                style={{ minHeight: 64 }}
              >
                <div className="flex min-w-0 flex-col">
                  <span className="text-foreground text-[17px] font-semibold tracking-tight sm:text-[18px]">
                    {entry.company}
                  </span>
                  <span className="text-foreground/65 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">
                    {entry.role}
                    <span className="text-foreground/30 mx-2">&bull;</span>
                    <span className="text-foreground/55">{entry.period}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create `components/about/education.tsx`**

One real entry (Manchester Metropolitan University), dates left as `"Dates TBD"` per the design spec.

```tsx
import type { ReactNode } from "react";

type Entry = {
  school: string;
  degree: string;
  period: string;
};

const ENTRIES: Entry[] = [
  {
    school: "Manchester Metropolitan University",
    degree: "BSc, Software Engineering",
    period: "Dates TBD",
  },
];

const ROW_HEIGHT = 64;

export function Education(): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
        Education
      </h3>
      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative rounded-4xl border p-2 sm:p-4">
        <ul className="flex flex-col gap-2">
          {ENTRIES.map((entry) => (
            <li
              key={`${entry.school}-${entry.period}`}
              className="bg-background border-foreground/5 flex items-center gap-4 rounded-3xl border p-2"
              style={{ minHeight: ROW_HEIGHT }}
            >
              <span
                className="border-foreground/15 inline-flex h-12 w-12 shrink-0 items-center justify-center border"
                aria-hidden="true"
                style={{ borderRadius: 14 }}
              >
                <span className="text-foreground/60 text-[18px] font-semibold tracking-tight">
                  {entry.school.charAt(0)}
                </span>
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="text-foreground text-[17px] font-semibold tracking-tight sm:text-[18px]">
                  {entry.school}
                </span>
                <span className="text-foreground/65 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">
                  {entry.degree}
                  <span className="text-foreground/30 mx-2">&bull;</span>
                  <span className="text-foreground/55">{entry.period}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Delete the old Skills component**

```bash
git rm components/Skills.tsx
```

- [ ] **Step 6: Commit**

```bash
git add components/about
git commit -m "Add About page sections: Skills, Stack, Experience (scaffolded), Education"
```

---

### Task 11: Assemble the About page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Create `app/about/page.tsx`**

Bio paragraph adapted from the current `About.tsx` content. No polaroid strip (deferred per spec).

```tsx
import { Education } from "@/components/about/education";
import { Experience } from "@/components/about/experience";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import { ContactSection } from "@/components/contact/contact-section";
import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "About me, background, and how to get in touch.",
  path: "/about",
});

export default function AboutPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-160 px-6 pt-40 pb-16 sm:px-10 sm:pt-56 sm:pb-24">
        <FadeIn>
          <div className="rounded-4xl border border-foreground/5 bg-foreground/1.5 p-8 sm:p-12 dark:bg-foreground/3">
            <h1 className="font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2rem]">
              Hello! I&rsquo;m <span className="border-b border-foreground/30 pb-0.5">Harley Williams</span>.
            </h1>
            <div className="mt-8 space-y-6 text-[17px] leading-[1.7] tracking-tight text-foreground/75 sm:text-[18px]">
              <p>
                I&rsquo;m a <strong className="font-semibold text-foreground">full-stack developer</strong> with
                hands-on experience building scalable web applications and solving complex technical challenges. My
                specialty is creating seamless user experiences backed by robust backend systems.
              </p>
              <p>
                I&rsquo;ve launched multiple production projects including a full-featured e-commerce platform with
                Stripe payments and real-time analytics dashboards. I&rsquo;m passionate about{" "}
                <strong className="font-semibold text-foreground">clean code, performance optimization</strong>, and
                delivering products that users love.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-[40rem] px-6 pb-20 sm:px-10 sm:pb-28">
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-10">
            <Experience />
            <Education />
            <Skills />
            <Stack />
          </div>
        </FadeIn>
      </section>

      <ContactSection />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/about
git commit -m "Assemble /about page with bio, experience, education, skills, stack"
```

---

### Task 12: Assemble the home page and remove now-unused old components

**Files:**
- Modify: `app/page.tsx`
- Delete: `components/Navigation.tsx` (old — superseded by `components/layout/nav.tsx`)
- Delete: `components/About.tsx` (old — content merged into `app/about/page.tsx`)

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/hero/hero";
import { Projects } from "@/components/projects/projects";
import { createMetadata, siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Home",
  description: `Welcome to ${siteConfig.name}'s portfolio. ${siteConfig.description}`,
  path: "/",
});

export default function HomePage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col gap-20 sm:gap-28">
      <Hero />
      <Projects withHeadline />
      <ContactSection />
      <Footer />
    </main>
  );
}
```

Note: `AdminDemos` and `ScrollStack` are intentionally not imported here — they're left unwired per the design spec (Phase 2).

- [ ] **Step 2: Delete now-unused old components**

```bash
git rm components/Navigation.tsx components/About.tsx
```

- [ ] **Step 3: Confirm `AdminDemos.tsx` and `ScrollStack.tsx`/`ScrollStack.css` still exist but are unreferenced**

```bash
ls components/AdminDemos.tsx components/ScrollStack.tsx components/ScrollStack.css
grep -rn "AdminDemos\|ScrollStack" app/ components/layout components/hero components/projects components/about components/contact
```

Expected: the files exist; the `grep` returns no matches (nothing currently imports them) — confirming they're correctly left disconnected for Phase 2.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "Assemble home page: Hero, Projects, Contact, Footer; remove old Navigation/About components"
```

---

### Task 13: Verification

**Files:** none (verification only)

- [ ] **Step 1: Typecheck**

```bash
npm run typecheck
```

Expected: exits with no errors. If there are errors, they are almost always one of: (a) a leftover import of a deleted component — search with `grep -rn "components/Aurora\|components/Navigation\|components/About'\|components/Hero'\|components/Projects'\|components/Skills'\|components/Contact'\|components/Footer'" app/ components/` and remove/fix it, or (b) a `motion/react` vs `framer-motion` import left over somewhere — search with `grep -rln "framer-motion" app/ components/` and fix any remaining imports to use `motion/react`.

- [ ] **Step 2: Lint**

```bash
npm run lint
```

Expected: exits with no errors.

- [ ] **Step 3: Production build**

```bash
npm run build
```

Expected: build succeeds. If Tailwind v4 reports unknown utility classes, check that `app/globals.css` starts with `@import "tailwindcss";` (Task 2) and that `postcss.config.mjs` is in place (Task 1).

- [ ] **Step 4: Manual verification in dev server**

```bash
npm run dev
```

Open `http://localhost:3000` and check:
- `/` loads: Hero renders with real bio copy and two CTAs, Projects grid shows all 7 real projects with tech tags, Contact form renders inside the shader card, Footer renders with 3 social links
- `/about` loads: bio card, Experience section shows the TRVentilation/NTS placeholder note, Education shows the Manchester Met entry, Skills shows all 4 categories, Stack shows draggable physics chips
- `/projects` loads: same 7 projects, with headline
- Nav pill highlights the active route and animates when switching pages
- Theme toggle (sun/moon icon in nav) switches between light and dark, with a circular reveal animation, and toggling doesn't throw console errors
- Contact form: fill in all three fields and submit — confirm it reaches `/api/send-email` (check the Network tab; a non-2xx response is fine here if the mail server itself isn't configured in dev, the important thing is no client-side crash and the existing error state renders correctly)
- Resize the viewport to 375px, 768px, and 1280px — layout should reflow without horizontal scroll or overlapping content at each size
- Open browser devtools console — no errors on any of the three routes

- [ ] **Step 5: Final commit (only if manual verification required fixes)**

If Step 4 required any code fixes, commit them:

```bash
git add -A
git commit -m "Fix issues found during manual verification of portfolio redesign"
```
