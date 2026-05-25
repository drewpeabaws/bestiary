# Personas for bestiary

This project uses the following personas. Definitions live in the cross-project orchestrator library at `~/Projects/.orchestrator/personas/`.

| Slug | Display name | Role | Status | Primary | Format | Last defined |
|---|---|---|---|---|---|---|
| pete | Pete Marston | DevOps engineer + homelab tinkerer | draft (operator to promote → active) | true | Sarah-template | 2026-05-24 |
| skylar | Skylar Park | Senior SRE / oncall lead at fintech | draft (operator to promote → active) | true | Sarah-template | 2026-05-24 |

## Path map

- Pete (canonical, Sarah-template): `~/Projects/.orchestrator/personas/pete.md` + `pete.json`
- Pete (legacy, archived): `~/Projects/.orchestrator/personas/archive/pete-2026-05-24-legacy.md`
- Skylar (canonical, Sarah-template): `~/Projects/.orchestrator/personas/skylar.md` + `skylar.json`
- Skylar (legacy, archived): `~/Projects/.orchestrator/personas/archive/skylar-2026-05-24-legacy.md`

## Usage

- `/uat bestiary --persona pete` — drives Pete's UAT walkthrough (Sarah-template ✓ /uat-compatible)
- `/uat bestiary --persona skylar` — drives Skylar's UAT walkthrough (Sarah-template ✓ /uat-compatible)
- Both personas' `visual_preferences` + `reference_apps` will feed `/design-system bestiary` when that skill ships

## Persona contrast (key axes for /design-system to balance)

| Axis | Pete | Skylar | Implication for design |
|---|---|---|---|
| Density | spacious (5-8 services) | dense (30+ services) | dashboard should toggle density mode OR auto-scale |
| Interaction | mobile-first (couch / phone) | desktop-first (4K monitor + keyboard) | responsive + keyboard-first BOTH |
| Tone | casual-Discord, "it just works" | precise-Slack-threads, "defensible internals" | tool's voice must be calm (Pete) without being playful (Skylar wouldn't tolerate) |
| Buying motion | self-serve Free Forever | self-serve evaluation → upgrade trial | no "Schedule a call" anywhere below Enterprise |

## Migration history

- Pete migrated legacy → Sarah-template via `/persona bestiary --persona pete` on 2026-05-24 (run `persona-bestiary-20260524T232721Z-0b0ea9`); seed_account preserved verbatim
- Skylar migrated legacy → Sarah-template via `/persona bestiary --persona skylar` on 2026-05-24 (run `persona-bestiary-20260525T003655Z-3b8637`); seed_account preserved verbatim; v0.1.2 F6 patch verified (no-PRD-project fallback fired cleanly, operator-proxy chose skip)

Updated by `/persona` (run `persona-bestiary-20260525T003655Z-3b8637`) on 2026-05-24.
