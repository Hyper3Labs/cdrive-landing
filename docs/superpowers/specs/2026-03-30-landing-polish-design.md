# Landing Page Polish — Design Spec

**Goal:** Eliminate redundancy, fix visual issues, improve design quality across the ClawDrive landing page.

---

## 1. Section Consolidation

### Remove QuickStart section — merge into Hero
The 3-step install flow (install → set API key → launch) becomes the Hero CTA area, replacing the single `npm install` code block.

**Hero CTA layout (after headline + subtitle):**
- Step 1: `$ npm install -g clawdrive` (inline code block, copyable)
- Step 2: `$ export GEMINI_API_KEY="your-key-here"` (inline code block, copyable)
- Step 3: `$ clawdrive serve --demo nasa` (inline code block, copyable)
- Below steps: "Free API key at aistudio.google.com/apikey" link
- Below that: small text with alt paths: "or run without installing: `npx clawdrive serve --demo nasa`"

No window chrome on these — use the slim inline tier (see section 2).

**Delete:** `src/components/QuickStart.astro` and its import/usage in index.astro.

### Remove HowItWorks section — move tech pills to Footer
**Delete:** `src/components/HowItWorks.astro` and its import/usage in index.astro.
**Move:** The tech stack pills (TypeScript, React, Three.js, LanceDB, Gemini, Express, UMAP) to the Footer, as a horizontal row above the "Made with lobster by Hyper3Labs" bottom line.

### Trim ForAgents
**Remove:** The `<ul class="agent-capabilities">` list (6 endpoint items). These duplicate ApiReference.
**Keep:** H2 "Welcome, Agent", subtitle, body text, and the curl CodeBlock (llms.txt + openapi.json).

### Fix SocialProof
**Replace** the "npm install -g clawdrive" text item with "Open Source" (keep shield icon or swap to a code/bracket icon).

---

## 2. Code Block Two-Tier System

### Tier 1: Window (multi-line only)
- 3-dot chrome bar at top
- **Remove the language label** ("bash") from the bar entirely — this fixes the overlap with the copy button
- Copy button remains absolutely positioned at top-right
- Used for: ForAgents curl block, Features card code examples (the inline `<pre>` blocks in feature cards)

### Tier 2: Inline (single-line commands)
- Slim dark box: `background: #0A1420`, `border: 1px solid #1F3647`, `border-radius: 8px`, `padding: 10px 16px`
- `$` prompt prefix in cyan (`var(--cyan-pulse)`) before the command text
- Copy icon floats at right edge (vertically centered), not absolutely positioned — use flexbox
- Padding-right on the code area to prevent text overlapping the copy icon
- Used for: Hero 3-step CTA commands, any other single-line snippets

### Update CodeBlock.astro
Add a `variant` prop: `"window"` (default for backward compat) or `"inline"`.
- `variant="window"`: renders 3-dot bar + pre/code + copy button (current behavior minus lang label)
- `variant="inline"`: renders slim flex row with `$` prefix + code text + copy icon

---

## 3. Features Section Redesign

### Layout: Bento grid
Replace the 2x2 symmetric grid with an asymmetric bento layout:

**Row 1:** Search card spans full width. Two-column inside: text on the left (icon, title, description), code demo on the right (the CLI search output in a slim code block).

**Row 2:** Three compact cards in equal columns. Each card: icon (32px), title, one-line description. No code blocks inside the small cards — move the CLI examples out. These cards are punchy and scannable.

### Fix alignment
The `.features-grid` or `.features-inner` container has a centering issue causing the grid to shift right. Verify `max-width: 1080px` and `margin: 0 auto` are applied correctly. Check for unexpected padding or parent-level offset.

### Cards styling
- Background: `#0E1A24`, border: `1px solid #1F3647`, border-radius: 12px
- No accent glows, no gradient fills, no left borders
- Hover: border color transitions to the card's accent color (existing behavior)
- Icons: Lucide SVG only, no emojis

### Card content after bento refactor

**Large card (Search):**
- Icon: Search (Lucide, 36px, cyan)
- Title: "Search anything, in any language"
- Description: "Type 'the NDA we sent Acme' and find it — even if the file is named contract_v3_final.pdf. Search across text, images, video, and audio with a single query. Cross-modal: find documents related to a photo."
- Right side: code demo (window tier):
  ```
  $ cdrive search "Mars audio briefing"
  ┌─ mars-mission-briefing.mp3  (0.94)
  ├─ mars-landing-report.pdf   (0.91)
  └─ mars-surface-photo.jpg    (0.87)
  ```

**Small card 1 (3D Cloud):**
- Icon: Orbit (Lucide, 32px, purple `#C792EA`)
- Title: "No folders. A universe."
- Description: "Every file lives in a 3D space, positioned by meaning. Similar files cluster together naturally."

**Small card 2 (Pots):**
- Icon: Archive (Lucide, 32px, gold `#FFB84D`)
- Title: "Pots, not folders"
- Description: "Shareable collections with time-limited, role-based access control."

**Small card 3 (Agent-Native):**
- Icon: Terminal (Lucide, 32px, green `#7BD389`)
- Title: "Built for agents, usable by humans"
- Description: "CLI with --json output. Full REST API. No GUI required."

### Responsive
- Mobile (<768px): large card becomes single-column (text above code). Three small cards stack vertically.

---

## 4. Icon Replacements

All icons are Lucide SVG unless noted. No emojis anywhere on the page.

| Location | Current icon | New icon | Notes |
|----------|-------------|----------|-------|
| Navbar GitHub link | Star polygon | GitHub mark SVG | Use the official GitHub Octocat mark (simple path SVG), not a Lucide icon |
| SocialProof "Star on GitHub" | Star polygon | GitHub mark SVG | Same GitHub mark + "Star on GitHub" text |
| SocialProof npm/install item | Download arrow | Terminal (Lucide) | Represents CLI tool |
| SocialProof "Try Live Demo" | Rocket | PlayCircle (Lucide) | Conventional "try it" action |
| SocialProof "Open Source" (new) | — | Code (Lucide `</>`) | Replaces the old npm install item |
| WhatIs "768-dim vectors" stat | Search/magnifying glass | Sparkles (Lucide) | Represents AI/embeddings |
| WhatIs "Agent-native" stat | Share2 | Terminal (Lucide) | Represents CLI + API |
| Features "3D Cloud" card | Box/cube | Orbit (Lucide) | Represents spatial/3D |
| Features "Pots" card | Package/cube | Archive (Lucide) | Distinct from 3D card |
| HowItWorks "Browser" step | Globe | — | Section deleted |

**GitHub mark SVG** (simple, 16px for social proof / 14px for navbar):
```html
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
```

---

## 5. Hero Illustration

**Action:** Generate a new SVG illustration using fal.ai.

**Subject:** Same as current — golden cauldron with lobster claws floating in space, surrounded by orbiting file icons (PDF blue, image green, video purple, audio orange, text light blue) connected by glowing orbital paths.

**Requirements:**
- SVG format (vector, scales crisply, transparent background)
- Style: chunky flat vector, bold outlines, rounded shapes
- Colors: golden creature (#FFB84D), cyan accents (#6EE7FF), modality colors for file icons
- No background — transparent, sits on top of the page's star field

**Placement:** Same as current — `<img>` tag in `.hero-visual`, max-width 420px, with `drop-shadow` filter.

---

## 6. Footer Update

Add a tech stack pills row between the 3-column grid and the "Made with lobster" bottom line.

```html
<div class="footer-tech">
  <span class="tech-pill">TypeScript</span>
  <span class="tech-pill">React</span>
  <span class="tech-pill">Three.js</span>
  <span class="tech-pill">LanceDB</span>
  <span class="tech-pill">Gemini</span>
  <span class="tech-pill">Express</span>
  <span class="tech-pill">UMAP</span>
</div>
```

Style: centered, flex-wrap, same `.tech-pill` styling as before. Sits above the footer-bottom divider.

---

## 7. Final Page Flow

1. **Navbar**
2. **Hero** (headline + 3-step inline CTA + illustration)
3. **SocialProof** (GitHub, Open Source, MIT, Live Demo)
4. **Demo** (GIF in browser mockup)
5. **WhatIs** (value prop + 3 stats)
6. **Features** (bento: 1 wide + 3 compact)
7. **ForAgents** (prose + curl block, no endpoint list)
8. **ApiReference** (12-endpoint table)
9. **PitchHuman** (3 blockquotes)
10. **Footer** (3 columns + tech pills + bottom line)

---

## 8. CSS Cleanup

- Remove all HowItWorks styles (`.how-it-works`, `.flow-diagram`, `.flow-step`, `.flow-arrow`)
- Remove all QuickStart styles (`.quick-start`, `.steps`, `.step`, `.step-number`, `.step-content`, `.alt-paths`)
- Update Features styles: replace `.features-grid` 2x2 grid with bento layout styles
- Add inline code block tier styles (`.code-inline`)
- Fix `.code-block-bar`: remove `.code-block-lang` element and its styles
- Move `.tech-pills` styles to footer context
