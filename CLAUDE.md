# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # tsc -b, then Vite bundle → dist/
npm run lint     # ESLint across the codebase
npm run preview  # Serve the production build locally
```

No test runner is configured.

## Architecture

Lumo is a voice assistant UI prototype — a single-page React + TypeScript + Vite app with no backend integration. All data is hardcoded in `src/data/index.ts`.

**State machine** (`src/types/index.ts`): `AssistantState` cycles through `idle → listening → thinking → speaking → idle` (also `muted`). Global state lives in `src/App.tsx` (useState) and is prop-drilled to children. Space/Esc keyboard shortcuts in `App.tsx` drive the cycle.

The bottom floating toolbar in `App.tsx` is a **dev-only widget** — it lets you jump to any state and toggle view/theme without interacting with the actual UI controls.

**Component responsibilities:**
- `src/App.tsx` — top-level layout; splits into `DesktopApp` and `MobileFrame` based on `viewMode`
- `src/components/Orb.tsx` — animated waveform visualization; uses `requestAnimationFrame` to drive 18 bar heights with per-state math (idle = slow sine breathe, listening = jitter, thinking = travelling pulse wave, speaking = dual sine). State-specific CSS animations are applied via `.state-{stateName}` classes on `.orb-stage`
- `src/components/Chrome.tsx` — `TopBar`, `PermissionBanner`, `SettingsDrawer`
- `src/components/VoiceStage.tsx` — `StatusLabel`, `ControlsDock`, `Suggestions`, `Transcript`, `StreamingMessage`, `TextInput`
- `src/components/MobileApp.tsx` — phone-frame mockup wrapping a mobile layout of the assistant
- `src/components/Icons.tsx` — inline SVG icon components

**Styling approach:** Inline styles are the primary styling mechanism for layout. `src/index.css` defines CSS custom properties for the design system — all colors use the **oklch color space** (avoid converting to hex/rgb). Theming is driven by the `data-theme` attribute (`light`/`dark`) on container elements, not a class. The three font families (Instrument Serif for display headings, Inter for UI, JetBrains Mono for labels/mono) are loaded from Google Fonts. Shared widget styles (`.icon-btn`, `.bubble`, `.chip`, `.pill`, `.seg`, `.toggle`, `.orb-*`) are defined in `index.css`.

**View modes:** The floating bottom bar toggles between `desktop` and `mobile` views — this is a prototype demo feature, not responsive CSS.
