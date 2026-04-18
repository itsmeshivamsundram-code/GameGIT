# GameCrit HQ — Technical Specification

## Dependencies

### Runtime

| Package | Version | Purpose |
|---------|---------|---------|
| None | — | Pure HTML/CSS/JS project as specified. No runtime dependencies. |

### Development

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | `^6.3` | Build tool with dev server, auto-reload, and production bundling |
| `@tailwindcss/vite` | `^4.1` | Tailwind CSS Vite integration for JIT compilation |
| `tailwindcss` | `^4.1` | Utility-first CSS framework |

---

## Component Inventory

### Layout

| Component | Source | Reuse | Notes |
|-----------|--------|-------|-------|
| NavigationBar | Custom | Shared (fixed, single instance) | Fixed top nav with mobile hamburger overlay. Contains scrollspy logic. |
| Footer | Custom | Shared | 4-column brand/links grid. |
| LoginModal | Custom | Shared | Overlay + modal card. Opens from nav login button. |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Full-viewport with canvas particle background. |
| LatestReviewsSection | Custom | Filterable card grid. |
| PlatformsSection | Custom | 3 platform cards + genre tag pills. |
| TopRatedSection | Custom | 3 large landscape editorial cards with score badges. |
| CommunitySection | Custom | Stats counter + newsletter form + trust badges. |

### Reusable Components

| Component | Source | Used By | Notes |
|-----------|--------|---------|-------|
| GameReviewCard | Custom | LatestReviewsSection (×6), TopRatedSection (×3) | Two visual modes: portrait (3/4, reviews) and landscape (4/3, top-rated). Accepts mode prop or uses CSS modifier. |
| ReviewCard | Custom | — | **REMOVED** — consolidated into GameReviewCard. |
| PlatformCard | Custom | PlatformsSection (×3) | Icon + title + description + stat + CTA. |
| SectionHeader | Custom | All 4 content sections | Heading + subtext pair with consistent scroll-triggered reveal. |

### Hooks / Utilities

| Utility | Purpose |
|---------|---------|
| useScrollReveal | Shared scroll-triggered entrance animation using IntersectionObserver. All section headers and grids call this. |
| useScrollspy | Nav active-link highlighting. Single IntersectionObserver on all sections. |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Hero canvas particles | Canvas 2D | Vanilla `requestAnimationFrame` loop. 80 particles (40 mobile), drift upward, opacity flicker, mouse parallax (max 15px offset). | Medium |
| Page load sequence | CSS + JS | Timed class additions on DOMContentLoaded (nav → heading → subtext → CTAs). CSS transitions handle the actual opacity/transform. | Low |
| Scroll indicator pulse | CSS `@keyframes` | `translateY(0 → 8px)` infinite, 1.5s ease-in-out. Pure CSS. | Low |
| Scroll-triggered reveals (headings, subtext, grids) | JS (IntersectionObserver) | `useScrollReveal` utility toggles a class. CSS transitions handle `opacity` + `translateY`. Per-card stagger via CSS `transition-delay` set by `nth-child` or inline style. | Low |
| Nav scroll shadow | JS | Scroll listener toggles class at 100px threshold. CSS transition on `box-shadow`. | Low |
| Score badge pop-in | CSS `cubic-bezier` | `scale(0 → 1.1 → 1)` with `cubic-bezier(0.34, 1.56, 0.64, 1)` overshoot curve. Triggered by scroll-reveal class. | Low |
| Stats count-up | JS (requestAnimationFrame) | Animate number from 0 to target over 1.5s with ease-out. Parse suffix (K+, +) and apply after animation. | Low |
| Modal open/close | CSS + JS | Overlay `opacity` transition. Modal `opacity` + `scale(0.95 → 1)` with `cubic-bezier(0.25, 0.46, 0.45, 0.94)`. JS toggles visibility class. | Low |
| Card hover lifts | CSS `transition` | `translateY` + `box-shadow` change on hover. Pure CSS. | Low |
| Image zoom on card hover | CSS `transition` | `transform: scale(1.05)` on image element, container has `overflow: hidden`. Pure CSS. | Low |

---

## Other Key Decisions

**Canvas over WebGL**: The hero particle effect is specified as Canvas 2D, not WebGL — this is intentional for student-project accessibility. 80 `arc()` calls per frame at 60fps is well within Canvas 2D performance limits. No Three.js or other 3D library needed.

**No SPA routing**: Single HTML file with anchor links (`#reviews`, `#platforms`, etc.). Each "page" requested by the user is a scrollable section. This satisfies the multi-page requirement while keeping it a single file for simplicity.

**Filter implementation**: Latest Reviews platform filter is simple class-based show/hide (add/remove `.hidden`), not a reactive filtered list. This keeps the JavaScript minimal and understandable.

**Login auth**: Fully client-side demo. "LOG IN" stores a flag in `localStorage`; "CONTINUE AS GUEST" also stores a flag. Nav button text changes accordingly. No backend or actual authentication.
