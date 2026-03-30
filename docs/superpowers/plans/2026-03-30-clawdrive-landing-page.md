# ClawDrive Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page static landing page for ClawDrive per the spec in `landing-page.md`.

**Architecture:** Astro static site with zero client JS by default. 12 sections as Astro components assembled in `index.astro`. One global CSS file with design tokens as custom properties. A single vanilla JS file (<50KB) for copy-to-clipboard, scroll animations, and mobile menu. All static files (llms.txt, openapi.json, sitemap.xml, robots.txt) served from `public/`.

**Tech Stack:** Astro 5, vanilla CSS (custom properties), vanilla JS, Lucide icons (SVG inline), Google Fonts (Manrope, JetBrains Mono)

**Spec Reference:** All design details (colors, spacing, typography, copy, layout) are in `landing-page.md`. Each task references the relevant spec section.

---

## File Structure

```
src/
├── layouts/
│   └── Layout.astro              # Base HTML shell: <head>, meta tags, JSON-LD, font loading
├── components/
│   ├── Navbar.astro              # Spec §8.1 — Sticky nav bar
│   ├── Hero.astro                # Spec §8.2 — Hero with headline + install CTA
│   ├── SocialProof.astro         # Spec §8.3 — Horizontal trust strip
│   ├── Demo.astro                # Spec §8.4 — GIF in browser chrome mockup
│   ├── WhatIs.astro              # Spec §8.5 — Value proposition + 3 stats
│   ├── Features.astro            # Spec §8.6 — 2x2 feature card grid
│   ├── ForAgents.astro           # Spec §8.7 — Machine-readable agent section
│   ├── HowItWorks.astro          # Spec §8.8 — Architecture flow diagram
│   ├── QuickStart.astro          # Spec §8.9 — 3-step install guide
│   ├── ApiReference.astro        # Spec §8.10 — Endpoint table
│   ├── PitchHuman.astro          # Spec §8.11 — Agent-to-human pitch
│   ├── Footer.astro              # Spec §8.12 — 3-column footer
│   └── CodeBlock.astro           # Reusable code block with copy button + language label
├── styles/
│   └── global.css                # All styles: tokens, base, components, sections, responsive, animations
├── scripts/
│   └── main.js                   # Copy-to-clipboard, IntersectionObserver scroll reveal, mobile menu toggle
└── pages/
    └── index.astro               # Assembles all 12 sections

public/
├── llms.txt                      # Spec §4.1
├── openapi.json                  # Spec §4.3
├── sitemap.xml                   # Spec §5.1
├── robots.txt                    # Standard robots.txt
├── favicon.svg                   # From assets/favicons/
├── favicon.png                   # From assets/favicons/
├── favicon-32.png                # From assets/favicons/
├── social-preview.png            # From assets/social/
├── banner.png                    # From assets/social/
├── demo.gif                      # From assets/demo/
├── logo.svg                      # From assets/logo/
├── logo-solid.svg                # From assets/logo/
└── hero-illustration.png         # Generated via fal.ai (Task 13)

astro.config.mjs                  # Astro config: static output, site URL
package.json                      # Dependencies: astro only
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`

- [ ] **Step 1: Initialize Astro project**

```bash
cd /Users/morozzz/Desktop/Startup/hyper3labs/cdrive-landing
npm create astro@latest . -- --template minimal --no-install --typescript strict
```

If the interactive prompt blocks, manually create the files instead.

- [ ] **Step 2: Create package.json**

```json
{
  "name": "clawdrive-landing",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.7.10"
  }
}
```

- [ ] **Step 3: Create astro.config.mjs**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://clawdrive.dev',
  output: 'static',
  build: {
    assets: '_assets',
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
```

- [ ] **Step 4: Create tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@styles/*": ["src/styles/*"]
    }
  }
}
```

- [ ] **Step 5: Install dependencies**

```bash
npm install
```

- [ ] **Step 6: Commit**

```bash
git add package.json astro.config.mjs tsconfig.json .gitignore
git commit -m "chore: scaffold Astro project for landing page"
```

---

### Task 2: Copy Public Assets

**Files:**
- Create: `public/` (multiple files)

- [ ] **Step 1: Copy all assets to public/**

```bash
cp assets/favicons/favicon.svg public/favicon.svg
cp assets/favicons/favicon.png public/favicon.png
cp assets/favicons/favicon-32.png public/favicon-32.png
cp assets/social/social-preview.png public/social-preview.png
cp assets/social/banner.png public/banner.png
cp assets/demo/demo.gif public/demo.gif
cp assets/logo/logo.svg public/logo.svg
cp assets/logo/logo-solid.svg public/logo-solid.svg
```

- [ ] **Step 2: Commit**

```bash
git add public/
git commit -m "chore: copy assets to public directory"
```

---

### Task 3: Static Files (llms.txt, openapi.json, sitemap.xml, robots.txt)

**Files:**
- Create: `public/llms.txt` — content from spec §4.1 verbatim
- Create: `public/openapi.json` — basic OpenAPI 3.0 spec for ClawDrive API
- Create: `public/sitemap.xml` — per spec §5.1
- Create: `public/robots.txt`

- [ ] **Step 1: Create llms.txt**

Copy the exact content from spec §4.1 (lines 94-131 of `landing-page.md`).

- [ ] **Step 2: Create openapi.json**

Minimal OpenAPI 3.0 spec covering all endpoints from spec §8.10 (the API table). Include: info block with ClawDrive name/description/version, server url `http://localhost:7860`, and all 12 paths with method + summary.

- [ ] **Step 3: Create sitemap.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://clawdrive.dev/</loc><priority>1.0</priority></url>
  <url><loc>https://clawdrive.dev/llms.txt</loc><priority>0.8</priority></url>
  <url><loc>https://clawdrive.dev/openapi.json</loc><priority>0.8</priority></url>
</urlset>
```

- [ ] **Step 4: Create robots.txt**

```
User-agent: *
Allow: /

Sitemap: https://clawdrive.dev/sitemap.xml
```

- [ ] **Step 5: Commit**

```bash
git add public/llms.txt public/openapi.json public/sitemap.xml public/robots.txt
git commit -m "feat: add machine-readable static files (llms.txt, openapi.json, sitemap, robots)"
```

---

### Task 4: Global CSS

**Files:**
- Create: `src/styles/global.css`

This is the single CSS file for the entire page. It contains:
1. Design tokens as CSS custom properties (spec §6.2–6.4)
2. Font imports (Manrope from Google Fonts, JetBrains Mono)
3. CSS reset / base styles
4. Typography scale (spec §6.3)
5. Component styles: navbar, hero, social-proof, demo, features, for-agents, how-it-works, quick-start, api-reference, pitch-human, footer
6. Code block styles (spec §6.7)
7. Scroll animation classes
8. Star field background (CSS-only, spec §9)
9. Responsive breakpoints (spec §10)

**Key tokens from spec §6.2:**

```css
:root {
  --deep-space: #061018;
  --cosmos: #0E1A24;
  --nebula-edge: #1F3647;
  --starlight: #E6F0F7;
  --starlight-dim: rgba(230, 240, 247, 0.58);
  --cyan-pulse: #6EE7FF;
  --aurora-green: #7BD389;
  --solar-gold: #FFB84D;
  --soft-danger: #ff8d8d;
  --text-muted: #6B8A9E;
  --code-bg: #0A1420;
  /* modality colors */
  --mod-pdf: #8AB4FF;
  --mod-image: #7BD389;
  --mod-video: #C792EA;
  --mod-audio: #F6C177;
  --mod-text: #9AD1FF;
}
```

- [ ] **Step 1: Create complete global.css**

Write the full CSS file with all tokens, base styles, and section-specific styles matching the spec. Reference spec §6 for all design system values, §8 for section-specific styles, §9 for animations, §10 for responsive breakpoints.

Star field: Use CSS-generated pseudo-element with `radial-gradient` dots or `box-shadow` technique for scattered stars. Some stars twinkle with `@keyframes twinkle` animating opacity between 0.3 and 0.8.

Scroll reveal: `.reveal` class starts `opacity: 0; transform: translateY(20px)`. `.reveal.visible` transitions to `opacity: 1; transform: translateY(0)` over 400ms. Child stagger via `transition-delay` increments of 80ms.

- [ ] **Step 2: Verify build compiles**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add global CSS with design tokens, typography, and all section styles"
```

---

### Task 5: Layout Component

**Files:**
- Create: `src/layouts/Layout.astro`

This is the HTML shell. It contains:
- `<!DOCTYPE html>` with `lang="en"`
- `<head>` with all meta tags from spec §4.4 and §5.2 (title, description, keywords, robots, OG, Twitter Cards, AI-specific meta, canonical)
- JSON-LD structured data from spec §4.2
- Font loading: `<link rel="preconnect">` to Google Fonts, then `<link>` to Manrope (400;600;700) and JetBrains Mono (400)
- Favicon links (SVG + PNG fallbacks)
- Global CSS import
- `<body>` with `<slot />` for page content
- Script tag importing `main.js` with `defer`

- [ ] **Step 1: Create Layout.astro**

Include ALL meta tags exactly as specified. The JSON-LD `<script type="application/ld+json">` block goes in `<head>`. Props: `title` and `description` with defaults.

- [ ] **Step 2: Verify with dev server**

```bash
npm run dev
```

Open browser, check `<head>` contains all meta tags and JSON-LD.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: add Layout with SEO meta, JSON-LD, and font loading"
```

---

### Task 6: CodeBlock Component + Main JS

**Files:**
- Create: `src/components/CodeBlock.astro`
- Create: `src/scripts/main.js`

The CodeBlock component is reused across Hero, Features, ForAgents, and QuickStart sections. Per spec §6.7: dark bg, border, rounded corners, macOS dots, language label, copy button.

**Props:** `lang` (string, e.g. "bash"), `code` (string), `copyable` (boolean, default true)

The main.js file handles:
1. Copy-to-clipboard: event delegation on `.copy-btn` clicks, swap icon to checkmark for 2s
2. Scroll reveal: `IntersectionObserver` at 80% threshold adds `.visible` to `.reveal` elements
3. Mobile menu toggle: hamburger button toggles `.nav-open` on body

- [ ] **Step 1: Create CodeBlock.astro**

Renders: wrapper div with `code-block` class > top bar with 3 colored dots + language label > `<pre><code>` with content > copy button (clipboard SVG icon, absolute positioned top-right).

- [ ] **Step 2: Create main.js**

Three self-contained IIFE blocks:
- `initCopyButtons()` — `document.addEventListener('click', ...)` delegated to `.copy-btn`
- `initScrollReveal()` — `IntersectionObserver` with `threshold: 0.15`, `rootMargin: '0px 0px -80px 0px'`
- `initMobileMenu()` — toggle `.nav-open` class

Total size must stay under 3KB minified.

- [ ] **Step 3: Commit**

```bash
git add src/components/CodeBlock.astro src/scripts/main.js
git commit -m "feat: add CodeBlock component and main.js (copy, scroll reveal, mobile menu)"
```

---

### Task 7: Index Page + Navbar

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/components/Navbar.astro`

Index page imports Layout and all 12 section components, renders them in order.

Navbar per spec §8.1: sticky, blurred bg, logo + wordmark left, nav links right (Features, Docs, API, GitHub), GitHub star badge. Mobile: hamburger replaces nav links.

- [ ] **Step 1: Create Navbar.astro**

Inline the logo SVG (use the simplified `logo-solid.svg` at 28px height). Wordmark "ClawDrive" in span. Nav links as `<a>` tags. GitHub star link. Hamburger button (3-line SVG) visible only on mobile.

- [ ] **Step 2: Create index.astro**

Import Layout + all section components (use placeholder `<section>` elements for components not yet built). Render in order: Navbar, Hero, SocialProof, Demo, WhatIs, Features, ForAgents, HowItWorks, QuickStart, ApiReference, PitchHuman, Footer.

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Check sticky nav works, blur effect, responsive hamburger on narrow viewport.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro src/components/Navbar.astro
git commit -m "feat: add index page and sticky navbar with mobile hamburger"
```

---

### Task 8: Hero Section

**Files:**
- Create: `src/components/Hero.astro`

Per spec §8.2: Two-column layout. Left: eyebrow "FOR AUTONOMOUS AGENTS", H1 "Google Drive for AI Agents" ("AI Agents" in cyan), sub-headline, install command as CodeBlock with copy button, "or try it now" line with npx command, Gemini API key link. Right: hero illustration (use placeholder if not yet generated) + star field background.

Background: radial glow gradient behind text area + scattered star dots.

- [ ] **Step 1: Create Hero.astro**

Use semantic HTML: `<section id="hero">` > `.hero-content` container > two-column flex. Left column has eyebrow `<span>`, `<h1>`, `<p>` sub-headline, CodeBlock for install, helper text. Right column has `<img>` for illustration (src="/hero-illustration.png", with descriptive alt text), falls back gracefully if image missing.

The star field is a CSS pseudo-element on the hero section using `box-shadow` with many small dots.

- [ ] **Step 2: Verify layout**

```bash
npm run dev
```

Check two-column desktop layout, single-column on mobile, copy button works, radial glow visible.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: add hero section with headline, install CTA, and star field"
```

---

### Task 9: Social Proof Bar + Demo Section

**Files:**
- Create: `src/components/SocialProof.astro`
- Create: `src/components/Demo.astro`

**SocialProof (spec §8.3):** Horizontal strip with GitHub stars, npm install, MIT license badge, Live Demo link. Each item: icon + text. Flex row, gap 40px, centered.

**Demo (spec §8.4):** GIF inside a browser-chrome CSS mockup (rounded top + 3 dots). Max 800px centered. Floating shadow. Caption below in italic muted text.

- [ ] **Step 1: Create SocialProof.astro**

Four inline SVG icons (star, download, shield, rocket) from Lucide. Text beside each. Wrap in `.social-proof` section. Items wrap on mobile.

- [ ] **Step 2: Create Demo.astro**

Browser chrome frame: `.browser-frame` div with `.browser-dots` (3 small circles: red, yellow, green) in a top bar. Inside: `<img src="/demo.gif" alt="..." loading="lazy" width="800" height="460">`. Caption `<p>` below.

The frame has subtle parallax: CSS `transform: translateY(calc(var(--scroll) * -0.1))` driven by a tiny bit of JS in main.js that sets `--scroll` custom property on scroll (optional enhancement, not critical).

- [ ] **Step 3: Commit**

```bash
git add src/components/SocialProof.astro src/components/Demo.astro
git commit -m "feat: add social proof bar and demo section with browser mockup"
```

---

### Task 10: What Is ClawDrive + Features

**Files:**
- Create: `src/components/WhatIs.astro`
- Create: `src/components/Features.astro`

**WhatIs (spec §8.5):** Centered H2 "Your files, understood", body paragraph (max-width 680px), three stat callouts in a row (5 modalities, 768-dim vectors, Agent-native).

**Features (spec §8.6):** H2 "What ClawDrive does", 2x2 grid. Each card: accent-colored icon, title, description, CLI code block mockup. Cards have `.reveal` class for scroll animation. 4 features:
1. Multimodal Semantic Search (cyan, Search icon)
2. 3D File Cloud (purple, Box icon)
3. Pots & Sharing (gold, Package icon)
4. Agent-Native (green, Terminal icon)

Each card's code block is a simplified inline `<pre>` (not the full CodeBlock component) styled per spec §6.7.

- [ ] **Step 1: Create WhatIs.astro**

Centered section. Three stat cards in flex row. Each: Lucide SVG icon (Layers, Search, Share2) at 32px, value text in bold, label in muted. Add `.reveal` class to section.

- [ ] **Step 2: Create Features.astro**

CSS Grid `grid-template-columns: 1fr 1fr` on desktop, `1fr` on mobile. Each card div with accent color as `--accent` custom property for hover border. Include inline Lucide SVG icons. Code examples as `<pre>` blocks inside cards.

- [ ] **Step 3: Verify grid and hover effects**

```bash
npm run dev
```

Check 2x2 grid on desktop, single column on mobile, card hover border color change.

- [ ] **Step 4: Commit**

```bash
git add src/components/WhatIs.astro src/components/Features.astro
git commit -m "feat: add WhatIs section and 2x2 Features grid with CLI examples"
```

---

### Task 11: For Agents + How It Works

**Files:**
- Create: `src/components/ForAgents.astro`
- Create: `src/components/HowItWorks.astro`

**ForAgents (spec §8.7):** H2 "Welcome, Agent", italic sub-headline "This section is for you...", body text, agent quickstart code block (curl commands), capability bullet list showing API endpoints as inline code.

**HowItWorks (spec §8.8):** H2 "Under the hood", horizontal flow diagram: 5 step-cards connected by arrows ([File] → [Gemini Embedding 2] → [LanceDB] → [UMAP → 3D] → [Your Browser]). Each card: icon, step name, one-liner. Below: tech stack pills (TypeScript, React, Three.js, LanceDB, Gemini, Express, UMAP) with hover effect.

- [ ] **Step 1: Create ForAgents.astro**

Use `<section id="for-agents">` with `.reveal`. The curl commands go in a CodeBlock. Capability list as `<ul>` with `<code>` for endpoints. Keep semantic HTML for AI crawlers.

- [ ] **Step 2: Create HowItWorks.astro**

Flow diagram: flex row of `.flow-step` cards connected by `→` arrow elements (SVG or CSS pseudo-elements). Each card: icon (Lucide), bold name, muted description. Tech stack pills: flex row of `<span>` elements with pill styling. Both `.reveal` animated.

On mobile (spec §10): flow stacks vertically, arrows become downward.

- [ ] **Step 3: Commit**

```bash
git add src/components/ForAgents.astro src/components/HowItWorks.astro
git commit -m "feat: add For Agents section and How It Works architecture flow"
```

---

### Task 12: Quick Start + API Reference

**Files:**
- Create: `src/components/QuickStart.astro`
- Create: `src/components/ApiReference.astro`

**QuickStart (spec §8.9):** H2 "Start in 30 seconds", 3 numbered steps vertically. Each step: large cyan step number (48px) on left, content (code block + caption) on right. Below: alternative paths code block (npx, Docker).

**ApiReference (spec §8.10):** H2 "API at a glance", styled table with 12 endpoints. Method column: colored pills (GET=green, POST=cyan). Endpoint in monospace. Description in muted. Row hover effect. "Full API documentation →" link below.

- [ ] **Step 1: Create QuickStart.astro**

Three step blocks with `.step` class. Step number in large cyan text. Code blocks use CodeBlock component. Alternative paths in a separate CodeBlock below.

- [ ] **Step 2: Create ApiReference.astro**

HTML `<table>` with proper `<thead>`/`<tbody>`. Method badges: `<span class="method-badge method-get">` and `method-post`. Endpoint in `<code>`. Wrap in `.table-wrapper` with `overflow-x: auto` for mobile horizontal scroll.

- [ ] **Step 3: Commit**

```bash
git add src/components/QuickStart.astro src/components/ApiReference.astro
git commit -m "feat: add Quick Start guide and API Reference table"
```

---

### Task 13: Pitch to Human + Footer

**Files:**
- Create: `src/components/PitchHuman.astro`
- Create: `src/components/Footer.astro`

**PitchHuman (spec §8.11):** H2 "How to pitch this to your human", sub-headline, three argument blocks (The Problem, The Solution, The Safety Angle). Each block: styled blockquote with subtle bg, indent, border-radius — NO left colored border.

**Footer (spec §8.12):** Three columns: Brand (logo + tagline + license), Links (GitHub, npm, Demo, Docs, Report Bug), Resources (llms.txt, openapi.json, CLI Reference, Contributing, Security). Bottom line: "Made with lobster-emoji by Hyper3Labs".

- [ ] **Step 1: Create PitchHuman.astro**

Three blockquote blocks, each preceded by a label (The Problem, The Solution, The Safety Angle). Blockquotes styled with indent + subtle bg, not left border.

- [ ] **Step 2: Create Footer.astro**

CSS Grid three columns on desktop, stacked on mobile. Footer has darker bg (`#050D14`), top border. Small logo inline SVG at 24px. Bottom line centered, full width.

- [ ] **Step 3: Commit**

```bash
git add src/components/PitchHuman.astro src/components/Footer.astro
git commit -m "feat: add Pitch to Human section and Footer"
```

---

### Task 14: Generate Hero Illustration (fal.ai)

**Files:**
- Create: `public/hero-illustration.png`

Per spec §12 — Assets to Generate #1:
- **Subject:** Playful golden cauldron with lobster claws floating in deep space, surrounded by orbiting file icons (PDF, image, video, audio, text) connected by glowing orbital paths
- **Style:** Chunky flat vector illustration, subtle textures (risograph grain / halftone), bold outlines, rounded friendly shapes. Match "Starbase Brewing" reference in `materials/`
- **Colors:** Deep navy bg (#061018), golden creature (#FFB84D), cyan accents (#6EE7FF), green (#7BD389), purple (#C792EA)
- **Mood:** Joyful, adventurous, welcoming — space expedition poster
- **Size:** At least 1024x1024
- **Format:** PNG with transparency

- [ ] **Step 1: Use fal-generate skill to create the hero illustration**

Use the fal.ai image generation skill with a detailed prompt incorporating all the above requirements. Reference the Starbase Brewing image for style.

- [ ] **Step 2: Save to public/hero-illustration.png**

Download and place the generated image.

- [ ] **Step 3: Verify in hero section**

```bash
npm run dev
```

Check the illustration renders correctly in the hero right column.

- [ ] **Step 4: Commit**

```bash
git add public/hero-illustration.png
git commit -m "feat: add generated hero illustration"
```

---

### Task 15: Final Assembly, Polish, and Verification

**Files:**
- Modify: `src/pages/index.astro` — replace any placeholder sections with real components
- Modify: `src/styles/global.css` — any final adjustments
- Modify: `src/scripts/main.js` — any final adjustments

- [ ] **Step 1: Update index.astro to import all real components**

Ensure all 12 sections are imported and rendered in correct order. Remove any placeholder elements.

- [ ] **Step 2: Full build test**

```bash
npm run build
npx serve dist
```

- [ ] **Step 3: Check page weight budget**

```bash
du -sh dist/
find dist -name "*.js" -exec wc -c {} +
find dist -name "*.css" -exec wc -c {} +
```

Verify: total <500KB (excl demo.gif), JS <50KB.

- [ ] **Step 4: Visual review in browser**

Check all 12 sections render correctly at desktop (1080px+), tablet (768px), and mobile (<768px) widths. Verify:
- Sticky nav with blur
- Hero two-column → single column
- Feature grid 2x2 → 1 column
- API table horizontal scroll on mobile
- Scroll animations trigger
- Copy buttons work
- Mobile hamburger menu works
- No horizontal overflow
- Star field visible and twinkling

- [ ] **Step 5: Check SEO/AI metadata**

View source and verify:
- All meta tags present in `<head>`
- JSON-LD valid (paste into schema.org validator)
- OG image renders in social card preview
- `/llms.txt` and `/openapi.json` accessible
- Semantic HTML (sections, articles, nav, header, footer)

- [ ] **Step 6: Commit final state**

```bash
git add -A
git commit -m "feat: complete ClawDrive landing page — all 12 sections, responsive, SEO-ready"
```

---

## Task Dependency Graph

```
Task 1 (scaffold) ──→ Task 2 (assets) ──→ Task 3 (static files)
      │
      └──→ Task 4 (CSS) ──→ Task 5 (Layout) ──→ Task 6 (CodeBlock + JS)
                                                        │
                                                        └──→ Task 7 (Index + Navbar)
                                                                │
                        ┌───────────────────────────────────────┘
                        │
                        ├──→ Task 8 (Hero)
                        ├──→ Task 9 (SocialProof + Demo)
                        ├──→ Task 10 (WhatIs + Features)
                        ├──→ Task 11 (ForAgents + HowItWorks)
                        ├──→ Task 12 (QuickStart + ApiRef)
                        ├──→ Task 13 (PitchHuman + Footer)
                        │
                        └──→ Task 14 (Hero illustration — can run in parallel)
                                │
                                └──→ Task 15 (Final assembly + verification)
```

Tasks 8-13 can run in parallel (each is an independent section component). Task 14 (image generation) can also run in parallel with section work.
