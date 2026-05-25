# Bestiary brand guide

Ratified 2026-05-24 by `/design-system bestiary` (v0.1.2 → v1.0). Anchored on personas Pete (DevOps engineer + homelab tinkerer) + Skylar (Senior SRE at fintech).

## Voice

**Calm authoritative — confident without preaching. The tool respects your time and your expertise.**

Bestiary speaks like a senior engineer pair-programming with you, not like a marketing site or a beginner tutorial. It doesn't apologize for itself. It doesn't celebrate trivial events. It tells you what happened, what to do about it, and gets out of the way.

## Tone variants (per state)

| State | Example | Why |
|---|---|---|
| **Success** | `Service back up. 23s downtime.` | Factual; no `!`. The fact IS the celebration. |
| **Error** | `Connection refused at 192.168.1.42:8080. Last successful: 4m ago.` | Specific + actionable. Operator can SSH and fix without consulting docs. |
| **Loading** | `Checking 8 services...` | Count + present participle. User knows the work is real, not fake. |
| **Empty** | `No services registered. Add your first to start monitoring.` | One clear next action. No "Welcome!" / no illustration / no hand-holding. |
| **Onboarding** | `Add a service. Name, host, port. That's it.` | Opinionated. Minimal. Skylar's "API or leave" energy applied to UX. |
| **Confirm-destructive** | `Delete service "plex"? This stops monitoring + removes 30-day history.` | Specific consequences. No "are you sure?" — always sure once consequences are clear. |

## Voice DON'Ts (anti-patterns; refuse in code review + copy review)

1. **No exclamation marks on errors.** Errors are not surprises in a homelab. They're the reason the tool exists.
2. **No "Oops!" / "Whoops!" / playful apologies.** Pete + Skylar both signaled allergy to playful tone in technical contexts.
3. **No emoji in status text.** Reserved for marketing/announcement contexts only. Status pages stay clean.
4. **No marketing copy in product UI.** "Powerful monitoring for your homelab" belongs on the landing page, not the dashboard.
5. **No "AI-powered" language.** If LLM incident summaries are useful, they prove it by being useful — not by branding themselves.

## Mood anchors

**calm, authoritative, efficient**

- **Calm** — the tone is the same whether the user is checking from the couch (Pete) or responding to a 3am page (Skylar).
- **Authoritative** — Bestiary speaks with the confidence of a tool that ships ratified decisions. No hedge. No "maybe."
- **Efficient** — every screen, every click, every label respects the operator's time. The dense mode IS the default for a reason.

## Type system

- **Primary family**: `Inter` — universal serious sans; matches Linear's minimalist + Honeycomb's modern character.
- **Heading family**: `Inter` weight 600/700 — same family, weight-differentiated for hierarchy without family-swap distraction.
- **Mono family**: `"JetBrains Mono", ui-monospace, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace` — cross-platform fallback stack; Skylar reads compose files faster than English; Pete pastes config snippets in Discord with code fences.
- **Scale ratio**: minor third (1.2). Tight enough for Skylar's dense dashboards. Generous enough for Pete's mobile readability. 12/14/16/18/24/32/48.

## Color usage rules

- **Brand primary `#0F172A`** — backgrounds + primary affordances; deep navy reads professional across enterprise + homelab contexts.
- **Brand secondary `#06B6D4`** — accents only (links, focus rings, sparingly). Never use as fill on large surfaces.
- **Semantic colors** — reserved for state communication only. NEVER use `error red` for "delete" buttons in normal state; reserve for actual error/destructive confirmation states.
- **Neutrals (gray scale)** — auto-mirror across light + dark modes (gray-50 in light becomes gray-900 in dark).
- **Light mode = default for marketing surfaces; dark mode = default for product surfaces.** Both personas explicitly prefer dark for homelab/SRE work.

## Density modes (Pete vs Skylar parallel resolution)

Bestiary ships with **two density modes**:

- **Dense** (default) — Skylar's preference; 12px card padding, 8px form gap. Lets 30+ services fit in one viewport.
- **Spacious** (toggle) — Pete's preference; 24px card padding, 16px form gap. Easier on mobile + casual checking.

User picks via settings; system defaults to dense for desktop / spacious for mobile screen-size detection.

## Motion language

- **Fast (150ms)** — interactive feedback (button press, hover state, focus change). User must feel the click.
- **Normal (200ms)** — local UI shifts (modal open, dropdown reveal). Noticeable but not blocking.
- **Slow (400ms)** — page-level transitions (route change, layout reflow). Communicates "big shift happening."
- **Very-slow (800ms)** — entrance animations only; used sparingly (welcome screens, success celebrations).
- **Linear easing** — loaders ONLY. Never for state transitions.
- **Spring (`cubic-bezier(0.34, 1.56, 0.64, 1)`)** — celebratory interactions only (e.g., service-back-up tile bounce). Use sparingly per "calm authoritative" voice — too much spring reads playful.

## Persona anchors

- **Pete** drove: spacious-mode toggle defaults, mobile-first responsive behavior, "Free Forever" pricing-page voice, Discord-webhook-first alerting.
- **Skylar** drove: dense-default density, API-first + CLI parity, "Postgres or leave" data-format defensibility, dark-mode default, keyboard-first interaction.
- **Common ground** (no conflict): dark-mode default, serious-not-playful tone, no marketing in product UI, opinionated minimal onboarding.
- **Conflict resolution**: density → parallel modes (Option C); style → operator-decides hybrid ("calm authoritative" satisfies both).

## How downstream skills consume this

- **/wireframe** — uses tokens for screen layouts; selects density mode per screen context
- **/mockup** — uses tokens + brand voice for hi-fi mockups; user-approval gate validates against THIS voice
- **/develop** — Howard handoff references this brand guide + tokens.json; PRs hardcoding colors/fonts/copy get flagged at /review
- **/uat** — Sarah (er, Pete + Skylar) walkthroughs use this voice as the "is this on-brand?" gate
- **/design-review** v0.2 — pixel-parity gate against this design system

## Revision policy

This brand guide is **draft → active** when Dick promotes it. Once active, changes require `/design-system bestiary --refine` (semver-bumped tokens.json + brand-guide changelog entry).

Last updated: 2026-05-24 (v1.0 lock)
