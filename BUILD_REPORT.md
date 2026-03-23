# Build Report — TypeHeat — 2026-03-23

## Metrics
- **Build time**: ~20 minutes
- **Lines of code**: ~550
- **Tests passing**: 10/10
- **Technologies used**: React 19, Vite 8, Tailwind CSS 4, Vitest
- **Complexity**: moderate

## What Went Well
- Keyboard layout data structure was clean and extensible (code-based mapping)
- Heat color gradient function produces visually striking results
- Custom hook (useTypingStats) cleanly separates state logic from UI
- Tailwind v4 with @theme for custom colors worked smoothly
- All tests passed on first run

## What Was Hard / Bottlenecks
- Getting the keyboard key widths right for realistic proportions — solved with a unit-based system (1u = 52px)
- Bigram tracking needed careful handling of the "last character" reference across re-renders — solved with useRef

## Learnings for Future Builds
- React 19 + Vite 8 + Tailwind 4 is a very fast stack for single-page tools
- SVG sparklines are trivial to build from scratch — no chart library needed
- Key event code (e.code) is more reliable than e.key for keyboard layout mapping
- Testing hooks with renderHook from @testing-library is cleaner than testing through components

## Idea Quality Assessment
- **Was the idea good?** Yes — visual keyboard heatmaps are inherently shareable and the privacy angle is timely
- **Would someone use this?** Typing enthusiasts and developers would find it fun and mildly useful
- **What would make it production-ready?** Add session history persistence, more keyboard layouts (DVORAK/COLEMAK), heat map export as image, and typing test leaderboard
