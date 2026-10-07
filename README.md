# Fermor — Homepage Redesign

A modern, transparent, and numbers-first redesigned homepage for Fermor, focused on empowering personal financial clarity.

## Overview
Before designing, I thoroughly explored fermor.in. It is a free, India-focused personal finance platform featuring calculators for EMI, SIP, FD, tax, and salary—with no mandatory login wall, math running entirely client-side in the browser, and an uncompromising principle of showing the complete mathematical working rather than obscure black-box numbers.

I built this homepage around those real traits instead of generic fintech tropes: calm, numbers-first, transparent, and genuinely helpful.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Typography**: Inter via `next/font`

## Run Locally
```bash
npm install
npm run dev     # runs dev server on http://localhost:3000 (or 3001)
npm run build   # production build check
```

## Key Features & Contributions

### 1. "Why Us" Section (Conceived & Designed by Me)
- **Concept & Ideation**: I personally conceptualized and suggested the dedicated **"Why Us"** section (`WhyFermor`). Fermor needed a distinct, prominent section directly communicating why users should trust and choose this platform over confusing alternatives.
- **Core Principles**: Emphasizes our three foundational pillars—**Clear**, **Transparent**, and **User-first**—breaking down financial planning into relatable life stages (*Getting started*, *Building wealth*, *Planning ahead*) alongside real user experiences.
- **Visual Prominence**: Features a high-contrast, bold **"Why Us"** indicator badge with clean typography that seamlessly guides visitors into our philosophy.
- **Strategic Placement**: Strategically positioned in the flow right before Market Intelligence to build trust and conviction before diving into macroeconomic data.

### 2. Market Intelligence & Sector Impact
- Translates macroeconomic developments, central bank repo rate decisions, global trade agreements, and fiscal policy into practical sector-level understanding.
- Interactive category filtering (Technology, Sports, Government, Geopolitics) with step-by-step impact chains.

### 3. Precision Financial Calculators
- Interactive compounding simulation across Stocks & Growth, Loan & EMI, and SIP planning with real mathematical formulas printed alongside the results.

### 4. Fermor Junior (Math & Financial Literacy)
- Dedicated module featuring the *Pocket Money Multiplier* and interactive *Needs vs Wants* math challenges to instill smart money habits early.

### 5. Fermor AI Financial Assistant
- An interactive, responsive copilot bot with custom robotic avatar for answering day-to-day financial questions.

### 6. Floating "Back to Top" Quick Navigation
- A smooth, floating navigation button that automatically appears after scrolling down, allowing instant return to the header on long exploratory sessions.

### 7. Dedicated Sample Sign Up & Sign In Pages
- Native `/signup` and `/signin` pages featuring client-side mathematical privacy guarantees, password visibility toggle, responsive design, and quick demo autofill capability.

## Cross-Platform & UI Verification (Personally Tested by Me)
I personally conducted rigorous cross-device testing and manual UI verifications across environments to ensure flawless consistency:
- **Mobile Verification**: Personally tested on mobile viewports (iOS Safari and Android Chrome), verifying touch targets (minimum 44px), zero horizontal overflow, adaptive calculator tab scrolling, responsive modal drawers, and mobile drawer navigation.
- **Mac Verification**: Personally verified on macOS across Safari and Chrome, ensuring crisp font rendering (`antialiased`), WebKit backdrop blur effects, smooth scroll behaviors, and responsive retina layout scaling.
- **Multiple UI & Layout Verifications**: Tested across varied breakpoints (Mobile 360px–480px, Tablet 768px–1024px, Desktop/Mac 1280px–1920px+), validating balanced vertical section spacing, clean divider lines, contrast compliance, and `prefers-reduced-motion` accessibility support.

## Deploy
Push to GitHub, import the repository on Vercel or any Next.js-compatible hosting platform, and deploy. No external environment variables or server configurations are required.
