# TypeHeat — Daily Build 2026-03-23

## Idea Source
- **Origin**: HN "Ask HN: What are you working on (March 2026)" — Calens calendar heatmap concept + Reddit analysis showing privacy-first apps are rising
- **URL**: https://news.ycombinator.com/item?id=47230384
- **Why this idea**: Real-time visual keyboard heatmaps are visually stunning and novel. Combines the heatmap trend with typing analytics in a privacy-first, 100% client-side tool. High wow factor — people will screenshot and share their keyboard heatmaps.

## What It Does
TypeHeat is a browser-based typing analytics tool that renders a real-time keyboard heatmap as you type. It tracks WPM, accuracy, key frequency, common bigrams/trigrams, and finger usage patterns — all visualized as beautiful, interactive heatmaps and charts. Zero data leaves the browser.

## Target User
Developers, writers, typists, and keyboard enthusiasts who are curious about their typing patterns. Also useful for typing practice and ergonomic analysis.

## Core Features (MVP Scope)
1. Real-time keyboard heatmap — keys light up with color intensity based on usage frequency (must have)
2. Live WPM and accuracy tracking with sparkline chart (must have)
3. Typing session analytics — bigram frequency, finger usage distribution, key travel patterns (must have)
4. Multiple keyboard layouts (QWERTY/DVORAK/COLEMAK) support (nice to have)

## Tech Stack
- **Frontend**: React + Tailwind CSS (single-page app)
- **Backend**: None — 100% client-side
- **Database**: In-memory (session-based)
- **APIs**: None
- **Deploy**: Vercel (static site)

## Success Criteria
- [ ] App runs locally with one command
- [ ] Core feature works end-to-end
- [ ] Has at least 3 basic tests
- [ ] README with screenshots/demo
- [ ] Vercel deployment config
