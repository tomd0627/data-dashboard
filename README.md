# Pulse Analytics Dashboard

An animated, accessible SaaS analytics dashboard built as a front-end portfolio project. Demonstrates data visualization, accessibility patterns, responsive design, and modern React practices.

## Tech Stack

- [Next.js 15](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript 5](https://www.typescriptlang.org) (strict mode)
- [Recharts 3](https://recharts.org) — chart library
- [Framer Motion 12](https://www.framer.com/motion/) — entrance animations
- [Lucide React](https://lucide.dev) — icon set
- [Tailwind CSS v4](https://tailwindcss.com) — utility layout
- CSS custom properties — full design token system

## Charts

| Chart                | Type                            | Notes                                                  |
| -------------------- | ------------------------------- | ------------------------------------------------------ |
| Revenue Trend        | Multi-series line               | MRR / New MRR / Expansion MRR over 12 months           |
| Acquisition Channels | Horizontal grouped bar          | 5 channels × 3 quarters                                |
| Plan Distribution    | Donut                           | Free / Growth / Pro / Enterprise with ARR center label |
| Cohort Retention     | Custom SVG heatmap              | 8×8 cohort matrix with ARIA grid keyboard navigation   |
| User Engagement      | Stacked area with gradient fill | MAU + WAU stickiness trend                             |

## Features

- **5 chart types** with smooth enter animations
- **Animated KPI counters** using `requestAnimationFrame` with easing
- **Dark / light mode** — system-preference aware, `localStorage`-persisted
- **Time range filter** — 7D / 30D / 90D / 1Y
- **Fully responsive** — mobile-first grid layout
- **SVG favicon** — amber bar chart mark
- **Zero external API calls** — all data is typed TypeScript mock files

## Accessibility

WCAG 2.1 AA target throughout:

- Skip-to-content link
- Semantic landmark structure (`<header>`, `<main>`, `<footer>`, `<section aria-labelledby>`)
- Every chart has a screen-reader summary via `<figcaption class="sr-only">`
- Retention heatmap implements the [ARIA grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) with arrow-key navigation
- All interactive elements use `focus-visible` with a visible amber focus ring
- Color is never the sole means of conveying information (delta badges use icon + text + color)
- Full `prefers-reduced-motion` support — all animations are disabled or instant when requested

## Mock Data Domain

Fictitious B2B SaaS company ("Pulse Analytics") metrics over 12 months in 2024. The data tells a coherent story:

- MRR grew 181% YoY ($42K → $118K)
- A product fix in September improved Week 4–8 cohort retention
- SEO overtook paid search as the top acquisition channel in Q3
- Enterprise accounts (9% of customers) drive ~39% of MRR

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Design Decisions

**Color palette:** Deep indigo-black base (`#09090f`) with amber (`#f59e0b`) as the primary accent. Chosen to be visually distinct from the portfolio site's navy + teal palette. The amber-on-dark combination gives a "data terminal" aesthetic appropriate for an analytics tool.

**Recharts over raw D3:** Recharts provides accessible SVG output, built-in React animations, and a declarative API that reads clearly in code review. Raw D3 in React typically requires imperative `useEffect` manipulation — a dated pattern for a portfolio piece. The cohort retention heatmap is the one component using manual SVG, which demonstrates SVG fluency without over-engineering.

**`requestAnimationFrame` counters:** KPI values count up from zero on viewport entry using a custom `useAnimatedCounter` hook with `easeOutExpo`. This is a single focused hook rather than a library dependency, keeping the bundle lean.

**Typography:** Inter (body) and JetBrains Mono (numeric values) are chosen to differ from the portfolio site's Plus Jakarta Sans, while remaining professional and legible at small data-dense sizes.
