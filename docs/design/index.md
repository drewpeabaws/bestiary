# Design system for bestiary

| Artifact | Path | Status |
|---|---|---|
| Tokens | `docs/design/tokens.json` | **v1.0.0** (W3C Design Tokens spec) |
| Brand guide | `docs/design/brand-guide.md` | draft (Dick → active promotion pending) |
| Figma library | https://www.figma.com/design/DSD7bgSjNHSDfegErejeG1 | active (4 collections + 31 tokens: brand×2 + semantic×4 + neutrals×4 + space×8 + text-styles×7 + elevation×4 + 1 motion-duration collection-only-for-now) |
| Linear brand-guide doc | (skipped — BUR has no PRD project; F6 fallback per /persona v0.1.2 pattern) | skipped |

## Persona anchors

- **Pete Marston** (DevOps engineer + homelab tinkerer) — drove spacious-mode toggle, mobile-first, "Free Forever" pricing voice, Discord-webhook alerting
- **Skylar Park** (Senior SRE at fintech) — drove dense-default, API-first + CLI parity, "Postgres or leave" defensibility, dark-mode default, keyboard-first

## Persona-conflict resolution

| Axis | Conflict | Resolution |
|---|---|---|
| Density | Pete spacious vs Skylar dense | **Option C parallel modes** — dense default + spacious toggle |
| Style | Pete minimalist vs Skylar technical | **Option D operator-decides** — "calm authoritative + technical-when-needed" |
| Theme | Both dark | No conflict |
| Tone | Pete calm/trustworthy vs Skylar authoritative/no-nonsense | Common ground: "calm authoritative" (no playful for either) |
| Interaction | Pete mobile-first vs Skylar desktop-first | Responsive design covers both |

## Downstream skills

This design system is consumed by:
- **/scaffold-project** — when JS target detected, installs `tokens.json` via Tailwind config / CSS custom properties
- **/refine v0.2** — `## Design Notes` section references tokens + brand voice
- **/wireframe** — per-epic IA + low-fi structural screens use tokens
- **/mockup** — per-epic hi-fi screens + user-approval gate validates against THIS visual language
- **/develop** — Howard handoff includes pointer to tokens.json + brand-guide.md + (Figma library URL when created)
- **/review** — generalist review checks "uses tokens, not hardcoded values"
- **/design-review v0.2** — pixel-parity gate

Updated by `/design-system` (v1.0 LOCKED) on 2026-05-24.
