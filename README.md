# TypeHeat

![Daily Webapp](https://img.shields.io/badge/Daily_Webapp-Build_%231-blue)
![Built with Claude](https://img.shields.io/badge/Built_with-Claude_Code-orange)
![Deploy](https://img.shields.io/badge/Deployed_on-Vercel-black)
![License](https://img.shields.io/badge/License-MIT-green)

> Real-time keyboard heatmap and typing analytics that runs entirely in your browser. Scraped from HN/Reddit trends and built autonomously.

**Live Demo: https://typeheat.vercel.app**
**Idea Source: [HN — What are you working on (March 2026)](https://news.ycombinator.com/item?id=47230384)**

## What It Does

TypeHeat renders a real-time keyboard heatmap as you type. Each key lights up with color intensity based on how often you press it, going from cool blues through fiery reds to bright white for your most-used keys.

**Features:**
- Real-time keyboard heatmap with smooth color transitions and glow effects
- Live WPM tracking with sparkline chart over time
- Accuracy tracking in practice mode
- Finger usage distribution bar chart
- Bigram frequency analysis (most common two-letter combos)
- Practice mode with sample texts and per-character correctness
- 100% client-side, zero data sent anywhere

## How to Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:5173 and start typing!

## Tech Stack

- **React 19** + **Vite 8** — Fast dev and builds
- **Tailwind CSS 4** — Utility-first styling
- **Vitest** + **Testing Library** — 10 tests covering core logic
- **Zero backend** — Everything runs in the browser

## How It Works

1. Keyboard events are captured on a textarea
2. Each keypress is mapped to the keyboard layout (QWERTY with finger assignments)
3. Key frequency → heat intensity → color gradient (dark blue → red → orange → white)
4. Statistics computed in real-time: WPM, accuracy, bigrams, finger distribution

## License

MIT - See [LICENSE](./LICENSE)
