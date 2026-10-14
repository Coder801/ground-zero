# Tapotik AI — Premium AI SaaS & Startup Next.js Template

The ultimate AI SaaS & startup template for modern businesses. Futuristic, immersive and production-ready — built for AI startups, SaaS products, workflow automation platforms, enterprise AI tools and creative agencies.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript) ![React](https://img.shields.io/badge/React-19-61dafb?logo=react)

## ✨ Highlights

- **40+ pages** — marketing, product, dashboard, docs, auth, blog, legal
- **150+ components** — design-system primitives, effects, sections, app UI
- **Dark & light mode** — dark-first futuristic aesthetic, token-driven theming
- **Immersive animations** — aurora backgrounds, spotlight cards, magnetic buttons, typewriter, marquees, scroll reveals, 3D tilt
- **Glassmorphism & bento grids** — modern layout language throughout
- **Fully responsive** — mobile-first, tested across breakpoints
- **SEO optimized** — per-page metadata, Open Graph, sitemap.xml, robots.txt
- **Accessible** — semantic markup, focus states, reduced-motion support, ARIA labels

## 🧰 Tech Stack

| Layer      | Tool                                                                                                                                                                         |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework  | [Next.js 16](https://nextjs.org) (App Router, Turbopack)                                                                                                                     |
| UI         | [React 19](https://react.dev), [Tailwind CSS v4](https://tailwindcss.com)                                                                                                    |
| Components | shadcn/ui `new-york` primitives on [Base UI](https://base-ui.com)                                                                                                            |
| Animation  | [Framer Motion](https://www.framer.com/motion/), [Lenis](https://lenis.darkroom.engineering/) smooth scroll, [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css) |
| Charts     | [Recharts](https://recharts.org)                                                                                                                                             |
| Forms      | [React Hook Form](https://react-hook-form.com)                                                                                                                               |
| Command ⌘K | [cmdk](https://cmdk.paco.me)                                                                                                                                                 |
| Icons      | [Lucide](https://lucide.dev)                                                                                                                                                 |
| Fonts      | Space Grotesk (headings), Inter (body), JetBrains Mono (code)                                                                                                                |

## 🚀 Getting Started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# production build
npm run build && npm start
```

Open [http://localhost:4000](http://localhost:4000).

## 📁 Project Structure

```
src/
├── app/
│   ├── (marketing)/        # public site — navbar + footer layout
│   │   ├── page.tsx        # homepage (15 sections)
│   │   ├── about/ features/ pricing/ blog/ careers/ contact/
│   │   ├── changelog/ integrations/ docs/ privacy/ terms/
│   │   └── ai-chat/ ai-image/ ai-video/ ai-voice/ ai-agents/
│   ├── (auth)/             # split-screen auth layout
│   │   └── login/ signup/ forgot-password/
│   ├── (app)/              # dashboard shell (sidebar + topbar)
│   │   └── dashboard/      # overview, chat, image, voice, agents,
│   │                       # settings, billing
│   ├── layout.tsx          # root: fonts, theme, toaster
│   ├── globals.css         # design tokens + utilities + keyframes
│   └── sitemap.ts robots.ts icon.svg not-found.tsx
├── components/
│   ├── ui/                 # primitives (button, card, dialog, table, …)
│   ├── effects/            # aurora, reveal, marquee, spotlight, tilt, …
│   ├── sections/           # homepage sections (hero, bento, pricing, …)
│   ├── site/               # navbar, footer, command menu, headings
│   └── docs/               # documentation blocks
├── config/site.ts          # site meta + navigation
└── lib/                    # data, utils, clipboard + simulated-submit helpers
```

## 🎨 Design System

Design tokens live in `src/app/globals.css` as CSS variables mapped into Tailwind v4 via `@theme inline`:

| Token          | Dark      | Light     |
| -------------- | --------- | --------- |
| `--primary`    | `#5B5BF7` | `#5B5BF7` |
| `--secondary`  | `#8B5CF6` | `#8B5CF6` |
| `--accent`     | `#00F5D4` | `#00C7AC` |
| `--pink`       | `#FF4ECD` | `#FF4ECD` |
| `--background` | `#050816` | `#F7F8FC` |
| `--card`       | `#0E1325` | `#FFFFFF` |

Custom utilities: `glass`, `glass-strong`, `text-gradient`, `text-gradient-pink`, `bg-grid`, `bg-dots`, `border-gradient`, `shimmer-text`, `container-wide`, plus a full animation set (`animate-aurora`, `animate-float`, `animate-marquee`, …).

### Changing the brand

1. Edit the color variables in `src/app/globals.css` (`:root` and `.dark`).
2. Update `siteConfig` in `src/config/site.ts` (name, URL, socials).
3. Replace the logo mark in `src/components/logo.tsx` and `src/app/icon.svg`.
4. Swap fonts in `src/app/layout.tsx` (any Google font via `next/font`).

## 📄 Pages

**Marketing** — Home, About, Features, Pricing, Integrations, Changelog, Careers (+ job details), Contact, Blog (+ 6 articles), Docs (10 pages), Privacy, Terms, 404.

**AI Products** — AI Chat, AI Image, AI Video, AI Voice, AI Agents — each with unique interactive demo visuals.

**App** — Dashboard overview, Chat studio, Image studio, Voice studio, Agents, Settings (profile / workspace / API keys / notifications), Billing.

**Auth** — Login, Sign up, Forgot password.

## ⚡ Performance & A11y

- Static / SSG prerendering across the site (`next build` → `○ Static` / `●`); the blog index (`/blog`) is server-rendered (`ƒ`) to support `?category=` filtering
- `prefers-reduced-motion` respected globally
- Focus-visible rings, keyboard navigable menus, semantic landmarks
- Zero third-party scripts, zero image CDN dependencies (all visuals are CSS/SVG)

## 📜 License

For use per your marketplace license (ThemeForest regular / extended). Fonts are Google Fonts (OFL). Icons are Lucide (ISC).
