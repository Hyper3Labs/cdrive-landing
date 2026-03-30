# Landing Page Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate redundancy, fix visual issues, redesign Features section, replace icons, and generate new hero illustration.

**Architecture:** Modify existing Astro components in-place. Delete QuickStart and HowItWorks components. Update CodeBlock to support two tiers (window vs inline). Rewrite Features with bento layout. Update global.css to match.

**Tech Stack:** Astro 5, vanilla CSS, Lucide SVG icons, fal.ai for SVG hero illustration

**Spec:** `docs/superpowers/specs/2026-03-30-landing-polish-design.md`

---

## File Structure

```
Modified:
  src/components/CodeBlock.astro     — Add variant prop (window/inline)
  src/components/Hero.astro          — 3-step CTA, new illustration
  src/components/SocialProof.astro   — Replace icons, swap npm→Open Source
  src/components/WhatIs.astro        — Replace icons
  src/components/Features.astro      — Full rewrite: bento layout
  src/components/ForAgents.astro     — Remove endpoint list
  src/components/Navbar.astro        — GitHub mark icon
  src/components/Footer.astro        — Add tech pills
  src/pages/index.astro              — Remove QuickStart, HowItWorks imports
  src/styles/global.css              — Update features, code-block, remove dead styles

Deleted:
  src/components/QuickStart.astro
  src/components/HowItWorks.astro

Generated:
  public/hero-illustration.svg       — New SVG hero via fal.ai
```

---

### Task 1: CodeBlock two-tier system

**Files:**
- Modify: `src/components/CodeBlock.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Rewrite CodeBlock.astro with variant prop**

Replace the entire content of `src/components/CodeBlock.astro` with:

```astro
---
interface Props {
  code: string;
  variant?: 'window' | 'inline';
  copyable?: boolean;
}

const { code, variant = 'window', copyable = true } = Astro.props;
const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
---

{variant === 'window' ? (
  <div class="code-block">
    <div class="code-block-bar">
      <div class="code-block-dots">
        <span class="code-block-dot"></span>
        <span class="code-block-dot"></span>
        <span class="code-block-dot"></span>
      </div>
    </div>
    <pre><code>{code}</code></pre>
    {copyable && (
      <button class="copy-btn" data-code={code} aria-label="Copy to clipboard">
        <Fragment set:html={copyIcon} />
      </button>
    )}
  </div>
) : (
  <div class="code-inline">
    <span class="code-inline-prompt">$</span>
    <code>{code}</code>
    {copyable && (
      <button class="copy-btn" data-code={code} aria-label="Copy to clipboard">
        <Fragment set:html={copyIcon} />
      </button>
    )}
  </div>
)}
```

- [ ] **Step 2: Add inline code block styles to global.css**

Add after the existing `.code-block` section (after line ~535 in global.css):

```css
/* Inline code block (single-line commands) */
.code-inline {
  display: flex; align-items: center; gap: 8px;
  background: var(--code-bg); border: 1px solid var(--nebula-edge);
  border-radius: 8px; padding: 10px 16px; padding-right: 44px;
  position: relative;
  font-family: "JetBrains Mono", "Fira Code", monospace;
  font-size: 14px; color: var(--starlight);
}
.code-inline-prompt {
  color: var(--cyan-pulse); user-select: none; flex-shrink: 0;
}
.code-inline code {
  white-space: nowrap; overflow-x: auto;
}
.code-inline .copy-btn {
  position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
  background: none; border: none; cursor: pointer;
  color: var(--text-muted); opacity: 0.5; padding: 4px;
  transition: opacity 150ms ease;
}
.code-inline:hover .copy-btn { opacity: 1; }
.code-inline .copy-btn:hover { color: var(--starlight); }
.code-inline .copy-btn svg { width: 16px; height: 16px; }
```

- [ ] **Step 3: Remove .code-block-lang styles from global.css**

Delete these lines from global.css (the `.code-block-lang` rule around lines 511-514):
```css
.code-block-lang {
  font-size: 11px; font-weight: 600; text-transform: uppercase;
  letter-spacing: 0.06em; color: var(--text-muted);
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/components/CodeBlock.astro src/styles/global.css
git commit -m "feat: add two-tier code block system (window + inline)"
```

---

### Task 2: Hero — 3-step CTA and cleanup

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: Rewrite Hero.astro**

Replace the entire content of `src/components/Hero.astro` with:

```astro
---
import CodeBlock from './CodeBlock.astro';
---

<section id="hero" class="hero">
  <div class="hero-inner">
    <div class="hero-text">
      <span class="hero-eyebrow">FOR AUTONOMOUS AGENTS</span>
      <h1>Google Drive for <span class="accent">AI Agents</span></h1>
      <p class="hero-subtitle">
        Store anything. Search everything. Share with any agent.<br />
        Multimodal semantic search across text, images, video, and audio —
        no folders, no friction.
      </p>
      <div class="hero-steps">
        <CodeBlock variant="inline" code="npm install -g clawdrive" copyable={true} />
        <CodeBlock variant="inline" code='export GEMINI_API_KEY="your-key-here"' copyable={true} />
        <CodeBlock variant="inline" code="clawdrive serve --demo nasa" copyable={true} />
      </div>
      <p class="hero-helper">
        Free API key at <a href="https://aistudio.google.com/apikey">aistudio.google.com/apikey</a>
      </p>
      <p class="hero-helper">
        or run without installing: <code>npx clawdrive serve --demo nasa</code>
      </p>
    </div>
    <div class="hero-visual">
      <img
        src="/hero-illustration.svg"
        alt="ClawDrive mascot — a golden cauldron with lobster claws floating in space, surrounded by orbiting file icons"
        class="hero-illustration"
        width="420"
        height="420"
      />
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add .hero-steps style to global.css**

Add inside the hero section styles (after `.hero-cta` rule, around line 140):

```css
.hero-steps {
  display: flex; flex-direction: column; gap: 8px;
  margin-bottom: 16px; max-width: 480px;
}
```

Remove the `.hero-cta` rule if it exists (no longer used).

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro src/styles/global.css
git commit -m "feat: hero 3-step CTA with inline code blocks"
```

---

### Task 3: Delete QuickStart and HowItWorks, update index

**Files:**
- Delete: `src/components/QuickStart.astro`
- Delete: `src/components/HowItWorks.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Update index.astro**

Replace the entire content of `src/pages/index.astro` with:

```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import Hero from '../components/Hero.astro';
import SocialProof from '../components/SocialProof.astro';
import Demo from '../components/Demo.astro';
import WhatIs from '../components/WhatIs.astro';
import Features from '../components/Features.astro';
import ForAgents from '../components/ForAgents.astro';
import ApiReference from '../components/ApiReference.astro';
import PitchHuman from '../components/PitchHuman.astro';
import Footer from '../components/Footer.astro';
---

<Layout>
  <Navbar />
  <main>
    <Hero />
    <SocialProof />
    <Demo />
    <WhatIs />
    <Features />
    <ForAgents />
    <ApiReference />
    <PitchHuman />
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 2: Delete the component files**

```bash
rm src/components/QuickStart.astro src/components/HowItWorks.astro
```

- [ ] **Step 3: Remove dead CSS from global.css**

Delete the entire "4m. How It Works Section" block (lines ~330-366) and "4n. Quick Start Section" block (lines ~368-396) from global.css. Also delete the `.flow-diagram`, `.flow-step`, `.flow-arrow`, `.tech-pills`, `.tech-pill`, `.quick-start`, `.steps`, `.step`, `.step-number`, `.step-content`, `.alt-paths` rules.

Keep the `.tech-pill` and `.tech-pills` rules — move them to after the footer styles section (they'll be used in the footer).

- [ ] **Step 4: Also remove responsive rules for deleted sections**

In the responsive section of global.css, delete:
```css
.flow-diagram { flex-direction: column; align-items: center; }
.flow-arrow { transform: rotate(90deg); padding: 4px 0; }
```
And:
```css
.step { flex-direction: column; gap: 12px; }
.step-number { width: auto; }
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: remove QuickStart and HowItWorks sections, clean up CSS"
```

---

### Task 4: Icon replacements (Navbar, SocialProof, WhatIs)

**Files:**
- Modify: `src/components/Navbar.astro`
- Modify: `src/components/SocialProof.astro`
- Modify: `src/components/WhatIs.astro`

The GitHub mark SVG (fill-based, not stroke):
```html
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
```

- [ ] **Step 1: Replace Navbar GitHub icon**

In `src/components/Navbar.astro`, replace the star polygon SVG (line 24) inside `.navbar-github` with the GitHub mark SVG at 14x14:
```html
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
```

- [ ] **Step 2: Rewrite SocialProof.astro**

Replace the entire content of `src/components/SocialProof.astro` with:

```astro
---
---

<section id="social-proof" class="social-proof">
  <div class="social-proof-inner">
    <div class="social-proof-item">
      <a href="https://github.com/Hyper3Labs/clawdrive">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        Star on GitHub
      </a>
    </div>
    <div class="social-proof-item">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 7 10 10"/><path d="M21 8V5a2 2 0 0 0-2-2H3"/><path d="m16 3-5 5"/><path d="M3 16v3a2 2 0 0 0 2 2h16"/><path d="m8 21 5-5"/></svg>
      Open Source
    </div>
    <div class="social-proof-item">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
      MIT Licensed
    </div>
    <div class="social-proof-item">
      <a href="https://app.claw3drive.com">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
        Try Live Demo
      </a>
    </div>
  </div>
</section>
```

Icons used: GitHub mark (fill), Scaling/code icon (Lucide), Shield (Lucide, kept), PlayCircle (Lucide).

- [ ] **Step 3: Update WhatIs.astro icons**

In `src/components/WhatIs.astro`:

Replace the Search icon (stat card 2, "768-dim vectors") with Sparkles (Lucide):
```html
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--aurora-green)"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/></svg>
```

Replace the Share2 icon (stat card 3, "Agent-native") with Terminal (Lucide):
```html
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--solar-gold)"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.astro src/components/SocialProof.astro src/components/WhatIs.astro
git commit -m "feat: replace icons — GitHub mark, Sparkles, Terminal, PlayCircle"
```

---

### Task 5: Features bento grid redesign

**Files:**
- Modify: `src/components/Features.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Rewrite Features.astro with bento layout**

Replace the entire content of `src/components/Features.astro` with:

```astro
---
---

<section id="features" class="features reveal">
  <div class="features-inner">
    <h2>What ClawDrive does</h2>

    <div class="feature-hero-card" style="--accent: #6EE7FF">
      <div class="feature-hero-text">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <h3>Search anything, in any language</h3>
        <p>Type 'the NDA we sent Acme' and find it — even if the file is named contract_v3_final.pdf. Search across text, images, video, and audio with a single query. Cross-modal: find documents related to a photo.</p>
      </div>
      <div class="feature-hero-code">
        <pre><code><span class="token-prompt">$ </span>cdrive search "Mars audio briefing"
<span class="token-muted">┌─</span> mars-mission-briefing.mp3  <span class="token-green">(0.94)</span>
<span class="token-muted">├─</span> mars-landing-report.pdf   <span class="token-green">(0.91)</span>
<span class="token-muted">└─</span> mars-surface-photo.jpg    <span class="token-green">(0.87)</span></code></pre>
      </div>
    </div>

    <div class="features-row">
      <div class="feature-compact" style="--accent: #C792EA">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10"/><path d="M12 2a15 15 0 0 0-4 10 15 15 0 0 0 4 10"/><path d="M2 12h20"/></svg>
        <h3>No folders. A universe.</h3>
        <p>Every file lives in a 3D space, positioned by meaning. Similar files cluster together naturally.</p>
      </div>

      <div class="feature-compact" style="--accent: #FFB84D">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
        <h3>Pots, not folders</h3>
        <p>Shareable collections with time-limited, role-based access control.</p>
      </div>

      <div class="feature-compact" style="--accent: #7BD389">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
        <h3>Built for agents, usable by humans</h3>
        <p>CLI with --json output. Full REST API. No GUI required.</p>
      </div>
    </div>

  </div>
</section>
```

Icons used: Search (Lucide, kept), Orbit/globe variant (Lucide, for 3D), Archive (Lucide, for Pots), Terminal (Lucide, kept).

- [ ] **Step 2: Replace Features CSS in global.css**

Replace the entire "4k. Features Section" block in global.css with:

```css
/* =============================================================================
   4k. Features Section (Bento)
   ============================================================================= */
.features { padding: 100px 0; }
.features-inner { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
.features h2 {
  font-size: 36px; font-weight: 700; text-align: center; margin-bottom: 48px;
}

/* Hero card — full width, two columns */
.feature-hero-card {
  display: flex; gap: 24px; align-items: center;
  background: var(--cosmos); border: 1px solid var(--nebula-edge);
  border-radius: 12px; padding: 32px;
  margin-bottom: 24px; transition: border-color 150ms ease;
}
.feature-hero-card:hover { border-color: var(--accent, var(--cyan-pulse)); }
.feature-hero-text { flex: 1; }
.feature-hero-text svg {
  width: 36px; height: 36px; margin-bottom: 16px;
  color: var(--accent, var(--cyan-pulse));
}
.feature-hero-text h3 {
  font-size: 20px; font-weight: 600; margin-bottom: 12px; color: var(--starlight);
}
.feature-hero-text p {
  font-size: 15px; color: var(--starlight-dim); line-height: 1.6;
}
.feature-hero-code {
  flex: 0 0 320px;
}
.feature-hero-code pre {
  background: var(--code-bg); border: 1px solid var(--nebula-edge);
  border-radius: 8px; padding: 16px;
  font-size: 13px; color: var(--starlight); line-height: 1.6;
  overflow-x: auto; margin: 0;
}
.feature-hero-code .token-prompt { color: var(--cyan-pulse); user-select: none; }
.feature-hero-code .token-muted { color: var(--text-muted); }
.feature-hero-code .token-green { color: var(--aurora-green); }

/* Compact cards — 3 columns */
.features-row {
  display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px;
}
.feature-compact {
  background: var(--cosmos); border: 1px solid var(--nebula-edge);
  border-radius: 12px; padding: 24px;
  transition: border-color 150ms ease;
}
.feature-compact:hover { border-color: var(--accent, var(--cyan-pulse)); }
.feature-compact svg {
  width: 32px; height: 32px; margin-bottom: 12px;
  color: var(--accent, var(--cyan-pulse));
}
.feature-compact h3 {
  font-size: 16px; font-weight: 600; margin-bottom: 8px; color: var(--starlight);
}
.feature-compact p {
  font-size: 14px; color: var(--starlight-dim); line-height: 1.5;
}
```

- [ ] **Step 3: Update responsive breakpoints for features**

In the `@media (max-width: 767px)` block, replace the existing `.features-grid` rule with:

```css
.feature-hero-card { flex-direction: column; }
.feature-hero-code { flex: none; width: 100%; }
.features-row { grid-template-columns: 1fr; }
```

Also remove the old `.features-grid { grid-template-columns: 1fr; }` rule from the mobile breakpoint, and remove `.features-grid { grid-template-columns: 1fr 1fr; }` from the tablet breakpoint if present.

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Features.astro src/styles/global.css
git commit -m "feat: redesign Features as bento grid with distinct icons"
```

---

### Task 6: Trim ForAgents and update Footer

**Files:**
- Modify: `src/components/ForAgents.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Rewrite ForAgents.astro (remove endpoint list)**

Replace the entire content of `src/components/ForAgents.astro` with:

```astro
---
import CodeBlock from './CodeBlock.astro';

const curlCode = `# Read the full spec:
curl -s https://claw3drive.com/llms.txt

# Or the OpenAPI spec:
curl -s https://claw3drive.com/openapi.json`;
---

<section id="for-agents" class="for-agents reveal">
  <div class="for-agents-inner">
    <h2>Welcome, Agent</h2>
    <p class="subtitle">This section is for you. Your human can keep scrolling.</p>
    <p class="body-text">
      ClawDrive gives you a file system you can actually use.
      Store files, search by meaning, share with other agents — all through CLI or REST API.
      No browser needed. No human in the loop.
    </p>
    <CodeBlock variant="window" code={curlCode} copyable={false} />
  </div>
</section>
```

- [ ] **Step 2: Remove .agent-capabilities CSS from global.css**

Delete these rules from global.css:
```css
.agent-capabilities {
  list-style: none; padding: 0; margin-top: 32px;
}
.agent-capabilities li {
  font-size: 15px; color: var(--starlight-dim); padding: 8px 0;
  border-bottom: 1px solid rgba(31, 54, 71, 0.5);
}
.agent-capabilities li code {
  color: var(--cyan-pulse); font-size: 14px;
  background: var(--code-bg); padding: 2px 8px; border-radius: 4px;
}
```

- [ ] **Step 3: Update Footer.astro — add tech pills**

Replace the entire content of `src/components/Footer.astro` with:

```astro
---
---

<footer class="footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <div class="logo-mark">
        <img src="/logo.svg" alt="ClawDrive" height="24" width="20" />
        <span>ClawDrive</span>
      </div>
      <p class="tagline">Google Drive for AI agents</p>
      <p class="copyright">MIT License · Copyright 2026 Hyper3Labs</p>
    </div>
    <div class="footer-column">
      <h4>Links</h4>
      <ul>
        <li><a href="https://github.com/Hyper3Labs/clawdrive">GitHub</a></li>
        <li><a href="https://www.npmjs.com/package/clawdrive">npm</a></li>
        <li><a href="https://app.claw3drive.com">Live Demo</a></li>
        <li><a href="https://claw3drive.com/docs">Documentation</a></li>
        <li><a href="https://github.com/Hyper3Labs/clawdrive/issues">Report Bug</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h4>Resources</h4>
      <ul>
        <li><a href="/llms.txt">llms.txt</a></li>
        <li><a href="/openapi.json">openapi.json</a></li>
        <li><a href="https://claw3drive.com/docs/cli">CLI Reference</a></li>
        <li><a href="https://github.com/Hyper3Labs/clawdrive/blob/main/CONTRIBUTING.md">Contributing Guide</a></li>
        <li><a href="https://github.com/Hyper3Labs/clawdrive/blob/main/SECURITY.md">Security Policy</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-tech">
    <span class="tech-pill">TypeScript</span>
    <span class="tech-pill">React</span>
    <span class="tech-pill">Three.js</span>
    <span class="tech-pill">LanceDB</span>
    <span class="tech-pill">Gemini</span>
    <span class="tech-pill">Express</span>
    <span class="tech-pill">UMAP</span>
  </div>
  <div class="footer-bottom">
    Made with 🦞 by Hyper3Labs
  </div>
</footer>
```

- [ ] **Step 4: Add .footer-tech styles to global.css**

Add after the existing footer styles:

```css
.footer-tech {
  max-width: 1080px; margin: 24px auto 0; padding: 0 24px;
  display: flex; flex-wrap: wrap; justify-content: center; gap: 12px;
}
```

Ensure the `.tech-pill` and `.tech-pills` styles still exist in global.css (they may have been in the HowItWorks section — if deleted in Task 3, re-add them here):

```css
.tech-pill {
  border: 1px solid var(--nebula-edge); border-radius: 20px;
  padding: 6px 16px; font-size: 12px; color: var(--text-muted);
  background: transparent; transition: all 150ms ease;
}
.tech-pill:hover { border-color: var(--cyan-pulse); color: var(--starlight); }
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/components/ForAgents.astro src/components/Footer.astro src/styles/global.css
git commit -m "feat: trim ForAgents, add tech pills to footer"
```

---

### Task 7: Generate SVG hero illustration

**Files:**
- Create: `public/hero-illustration.svg`
- Delete: `public/hero-illustration.png` (old raster)

- [ ] **Step 1: Search for SVG generation models on fal.ai**

```bash
bash /Users/morozzz/.claude/skills/fal-generate/scripts/search-models.sh --query "svg vector"
```

If no SVG-specific model exists, use a high-quality image model and convert to SVG, or use `fal-ai/recraft-v3/create-style` with vector style.

- [ ] **Step 2: Generate the illustration**

Use the best available model. Prompt:
```
A playful golden cauldron pot with cartoon lobster claws emerging from the top, floating in outer space. Surrounding the cauldron are 5 orbiting file icons connected by soft glowing cyan orbital paths: a PDF document (blue), a photograph (green), a video frame (purple), an audio waveform (orange), and a text file (light blue). Style: chunky flat vector illustration, bold outlines, rounded friendly shapes. Colors: golden cauldron (#FFB84D), cyan orbital paths (#6EE7FF), green (#7BD389), purple (#C792EA), orange (#F6C177). Transparent background. Simple, clean, suitable for web.
```

If the model outputs PNG, use an image-to-SVG conversion tool or trace it.

- [ ] **Step 3: Save as public/hero-illustration.svg and delete the old PNG**

```bash
rm public/hero-illustration.png
```

- [ ] **Step 4: Verify the SVG renders in the browser**

```bash
npm run dev
```

Open browser, check hero section. SVG should have no background and sit cleanly on the star field.

- [ ] **Step 5: Commit**

```bash
git add public/hero-illustration.svg
git rm public/hero-illustration.png
git commit -m "feat: replace hero PNG with generated SVG illustration"
```

---

### Task 8: Final verification

**Files:**
- Possibly modify: `src/styles/global.css` (any last fixes)

- [ ] **Step 1: Full build test**

```bash
npm run build
```

- [ ] **Step 2: Check page in browser at all breakpoints**

```bash
npm run dev
```

Verify at desktop (1080px+), tablet (768px), mobile (<768px):
- Hero 3-step inline code blocks render correctly
- No duplicate install commands anywhere
- Features bento: 1 wide + 3 compact on desktop, stacked on mobile
- No QuickStart or HowItWorks sections visible
- ForAgents has no endpoint list
- Footer has tech pills row
- All icons are correct (GitHub mark, not star)
- Copy buttons don't overlap with anything
- Scroll animations work

- [ ] **Step 3: Commit any final adjustments**

```bash
git add -A
git commit -m "polish: final adjustments after visual review"
```

---

## Task Dependency Graph

```
Task 1 (CodeBlock tiers) ──→ Task 2 (Hero CTA)
                          ──→ Task 6 (ForAgents uses window variant)
Task 3 (Delete sections) — independent
Task 4 (Icons) — independent
Task 5 (Features bento) — independent
Task 6 (ForAgents + Footer) — depends on Task 1 for variant prop
Task 7 (Hero illustration) — independent
Task 8 (Final verification) — depends on all above
```

Tasks 3, 4, 5, and 7 are independent of each other and can run after Task 1.
