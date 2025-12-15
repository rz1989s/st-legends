# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

**ST Legends** - Superteam Hall of Fame bounty entry. Multi-template portfolio showcasing Solana ecosystem legends.

- **Bounty**: $2K 1st / $1K 2nd, deadline Dec 18, 2025
- **Strategy**: Build 10 live web templates → deploy → export to Figma via html.to.design
- **Deploy Target**: st-legends.rectorspace.com

## Architecture

```
src/app/
├── page.tsx                 # Hub - gallery of all 10 templates with screenshots
├── constellation/           # Template 1: Interactive star map
├── trading-cards/           # Template 2: Collectible cards
├── trophy-wall/             # Template 3: Classic trophies
├── timeline/                # Template 4: Scrollytelling
├── leaderboard/             # Template 5: Gamified rankings
├── museum/                  # Template 6: Exhibit rooms
├── minimalist/              # Template 7: Clean grid
├── glassmorphism/           # Template 8: Frosted glass
├── brutalist/               # Template 9: Raw/bold
└── retro-arcade/            # Template 10: Pixel art
```

**Each template**: Self-contained page, shared data from `lib/data.ts`, reusable components in `components/`.

## Commands

```bash
npm run dev          # Dev server at localhost:3000
npm run build        # Production build
npm run lint         # ESLint check
```

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + Framer Motion
- Lucide React icons
- Vercel deployment

## Categories (from bounty)

1. **Founders** - Project founders in Solana
2. **Contributors** - Open-source contributors
3. **Achievers** - Superteam milestones
4. **Legends** - Personal/career wins

## GitHub Project

25 issues across 4 milestones (M0-M3). Track via `gh issue list --state open`.
