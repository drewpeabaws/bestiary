# Handoff: implement BUR-7 "E2: Frontend foundation"

**Project:** bestiary
**Linear ticket:** BUR-7 (epic; 4 children BUR-17 / 18 / 19 / 20)
**Tier:** mid-scale
**Branch:** `dick/bur-7-e2-frontend-foundation`
**Base:** `main`
**Source of truth:** /mockup approved at `2026-05-25T05:34:32Z` by `operator-proxy as Pete + Skylar` (modality: proxy)
**Edwin run_id:** develop-bestiary-BUR-7-20260525T074054Z-6122f3
**Dispatched by:** /develop v0.1.1 (real-run; first /develop dispatch ever on bestiary; first frontend dispatch ever on bestiary)

---

## The 5-input handoff manifest

1. **Wireframe (structural anchor)**: https://www.figma.com/design/sjbZrDGptofeurxHYiABHT
   - FigJam IA flow: https://www.figma.com/board/TUAWtt0RynApTwBf62Uwa6
   - 4 screens × 2 density pages (Dense + Spacious)
2. **Mockup (APPROVED — pixel target)**: https://www.figma.com/design/mCZeqaqNTsprUA2U1uaAEq
   - 4 hi-fi screens (Sign-in, Dashboard-empty, Dashboard-populated, Register Service modal)
   - Light + Dark mode pages
   - Approved by operator-proxy as Pete + Skylar on 2026-05-25
3. **Tokens**: `docs/design/tokens.json` (W3C Design Tokens spec; CSS-var binding via Tailwind config required)
4. **Brand guide**: `docs/design/brand-guide.md` (voice anchors: warm + reassuring for empty states, keyboard-explicit for Skylar's surfaces)
5. **Personas** (excerpts; you cannot read full files from your mount):
   - **Pete** — homelab tinkerer; SPACIOUS density default; mobile-friendly (iPhone Safari first-class); 48px touch targets; large CTAs; quiet defaults (no LLM noise unless enabled); warm reassuring empty-state copy
   - **Skylar** — small-team SRE; DENSE density default; desktop 1440 baseline; keyboard-first nav; ~32px rows for 30+ services visible; "Tab to nav · R refresh" keyboard hint footer; modal tab-order discipline (host → URL → type → path → submit)

---

## Children to implement (per /refine v0.1 enrichment in each child's `## Implementation Notes` section — read each individually via `mcp__claude_ai_Linear__get_issue id: BUR-NN` for full AC + Files + Library + Test Approach)

| # | ID | Title | Tier | Status |
|---|---|---|---|---|
| F2.1 | BUR-17 | Next.js 14 + Tailwind scaffold + dark/light toggle | tier-S | Backlog → Howard |
| F2.2 | BUR-18 | /sign-in + /dashboard routes wired to JWT auth | (check label) | Backlog → Howard |
| F2.3 | BUR-19 | Service registration form | (check label) | Backlog → Howard |
| F2.4 | BUR-20 | Service status display | (check label) | Backlog → Howard |

Order: BUR-17 (foundational; blocks others) → BUR-18 (auth routes) → BUR-19 (registration form; consumes auth) → BUR-20 (status display; consumes registration data shape).

---

## Pre-approved scope

- Create branch `dick/bur-7-e2-frontend-foundation` from `main`
- Create `web/` subdirectory at repo root (this is bestiary's first frontend dispatch; `web/` does not yet exist)
- Scaffold Next.js 14 App Router project per BUR-17's `## Files`:
  - `web/app/layout.tsx`, `web/app/page.tsx`, `web/components/theme-toggle.tsx`, `web/lib/theme-provider.tsx`, `web/tailwind.config.ts`, `web/package.json`, `web/tsconfig.json`
- Use **`pnpm`** as the package manager (per BUR-17 AC #1 + the project Howard overlay)
- Install per BUR-7 epic body's aggregated `## Library`: `next ^14.2`, `react ^18.3`, `tailwindcss ^3.4`, `typescript ^5.5`, `next-themes`, `zod ^3.23`, `react-hook-form ^7.53`, `@radix-ui/react-dialog`, `swr ^2.2`, `date-fns ^3.6`
- Bind Tailwind config to `docs/design/tokens.json` via CSS vars (color tokens light/dark + space + radius + font-size)
- Implement screens per the APPROVED mockup (Figma URL above) — opening the Figma file via `mcp__claude_ai_Figma__get_screenshot` for visual reference per screen is encouraged
- For each child issue's AC: implement + run `pnpm typecheck` (must pass 0 errors per BUR-17 AC #5) + `pnpm build` (must pass clean) before considering it complete
- Open one PR titled "E2: Frontend foundation (BUR-7)" with body referencing this handoff + the 5 inputs + Linear ticket + mockup URL + screenshot of UI for each of the 4 primary screens
- Flip Linear `BUR-7` Todo → In Progress at task-start (universal template step 5)
- Flip Linear `BUR-7` In Progress → In Review on `gh pr create` (universal template step 8)
- Also flip each child issue (BUR-17, BUR-18, BUR-19, BUR-20) Backlog → In Progress at start; In Progress → In Review on PR open
- Fire `@codex review` backstop per universal template step 8 if not auto-fired within ~10s

---

## Out of scope (HARD WALL)

- **Pushing to `main` directly** — bestiary AGENTS.md exempted ONLY first-time scaffolding; that boundary is "the FIRST `gh pr create` on this repo." This dispatch IS that first PR. There are no prior PRs (verified via `gh pr list --repo drewpeabaws/bestiary --state all --limit 1` returning 0). Open the PR via the standard branch + PR flow.
- Pushing release tags
- Modifying GitHub Actions secrets / any credential store
- Modifying production state
- Touching files outside `web/` subdirectory + `docs/design/index.md` (the latter only to append a "Frontend implementation" pointer if /design-review v0.1.x later requires it)
- Adding deps NOT listed in BUR-7 epic body's `## Library` aggregate OR any child's `## Library` listing (surface as anomaly if a missing dep would block AC; do not auto-add)
- Pixel-parity tweaks beyond what the approved mockup shows (that's /design-review v0.1's downstream gate)
- Editing `docs/design/tokens.json` or `docs/design/brand-guide.md` (those are /design-system's domain; surface drift as anomaly)
- Backend changes (this is FRONTEND scope; if you discover that auth requires a backend endpoint that doesn't exist, surface as anomaly — do not implement backend opportunistically)
- Refactoring existing `backend/` code (cascade-pattern memory: PR #572 lesson — strict scope discipline)

---

## Stop-and-ask triggers (universal + bestiary-specific)

Stop and write `Stopped-for-approval` result file when:

- Any universal Howard stop-and-ask trigger fires (see your prompt-inlined universal template)
- A child issue's `## Files` references a file that doesn't exist AND `## Implementation Notes` doesn't clearly say "create from scratch" (most foundational dispatch — most files DO need creation; the gate is "ambiguity," not absence)
- Mockup Figma file shows a screen that doesn't have a corresponding child issue OR the screen's structure differs from what BUR-17/18/19/20 imply (IA gap; not Howard's call to invent issues)
- Tokens.json missing a token referenced in the mockup design (surface; do not invent)
- Persona conflict: e.g., Pete (spacious) and Skylar (dense) imply conflicting layout decisions on the SAME screen. Mockup's parallel-density-pages pattern (Dense + Spacious as separate pages) resolves this — both modes get implemented + the toggle exposes choice. If the implementation path is unclear, surface.
- Codex round 5 inflection point reached and same defect class persists (per universal template § Iteration discipline)
- Auth endpoint required by BUR-18 doesn't exist in `backend/` — surface; do NOT implement backend-side opportunistically
- pnpm not installed on the dispatch host — surface; do NOT auto-install Node.js / pnpm via Homebrew or curl (system-level changes outside Howard scope)
- Any file write outside `web/` (except the explicit `docs/design/index.md` append exception above)

---

## Steps

1. **Capture Started timestamp** via `Bash date -u +"%Y-%m-%dT%H:%M:%SZ"` (universal template step 0)
2. **Read the universal Howard template in full** (already in your prompt)
3. **Read `.claude/orchestrator/howard.md` from your mount** (the bestiary project overlay; covers pnpm + first-scaffold exemption + persona context)
4. **Read `AGENTS.md` at the project root** (covers reporting line + dogfood discipline + Howard discipline + persona context)
5. **Read `docs/design/tokens.json` + `docs/design/brand-guide.md`** — design-system outputs
6. **Claim the Linear epic** — flip `BUR-7` Todo → In Progress via `mcp__claude_ai_Linear__save_issue id: BUR-7 state: "In Progress"`. ALSO flip the 4 children (BUR-17/18/19/20) Backlog → In Progress.
7. **Branch + worktree decision**: bestiary tier=mid-scale — worktree is OPTIONAL (overlay § Branch + release model). Recommend branching directly in main checkout. `git checkout -b dick/bur-7-e2-frontend-foundation`
8. **Per child issue, in dependency order** (BUR-17 → BUR-18 → BUR-19 → BUR-20):
   - `mcp__claude_ai_Linear__get_issue id: BUR-NN` to read the child's full body (AC + Implementation Notes + Test Approach)
   - Open the child's `## Files` listing — create each file per the child's AC
   - Open the child's `## Library` listing — add deps to `web/package.json` (use `pnpm add <dep>@<version>` semantics; do NOT add deps not listed)
   - Implement the file(s) per child's AC + Implementation Notes
   - Bind tokens via Tailwind config + CSS vars per `tokens.json` shape
   - Open the corresponding screen in Figma (mockup URL above) for visual reference via `mcp__claude_ai_Figma__get_screenshot` if needed
   - Run `cd web && pnpm typecheck` (must pass 0 errors) + `cd web && pnpm build` (must pass clean) after the child's implementation lands
9. **Verify all 4 child issues' AC pass observably** — `cd web && pnpm typecheck` + `cd web && pnpm build` + `cd web && pnpm dev` boots in ≤5s + theme toggle works (per BUR-17 AC); capture command output for the result file
10. **`gh pr create`** with:
    - Title: "E2: Frontend foundation (BUR-7)"
    - Body: link to this handoff + bullet list of 4 children implemented + mockup URL + wireframe URL + screenshot of UI matching each of the 4 primary mockup screens (use `mcp__claude_ai_Figma__get_screenshot` semantics — or local Playwright if you can spin up the dev server briefly)
11. **Step 8 backstop**: wait ~10s + `gh api repos/drewpeabaws/bestiary/issues/<PR>/comments --jq '[.[] | select(.body | startswith("@codex review"))] | length'` — if count is 0, fire manually with `gh pr comment <PR> --body "@codex review"`
12. **Flip Linear** `BUR-7` In Progress → In Review (universal template step 8b). Also flip the 4 children to In Review.
13. **Write result file** per universal template § Result file format

---

## Acceptance criteria

- Branch `dick/bur-7-e2-frontend-foundation` exists on origin
- PR open at `drewpeabaws/bestiary` (Howard reports PR URL in result file)
- Each of 4 child issue's per-issue AC observably satisfied (captured in result file's `## Done` section with verification command + output)
- `web/` directory exists with the full Next.js 14 scaffold per BUR-17 → BUR-20 file listings
- `cd web && pnpm typecheck` passes (0 errors per BUR-17 AC #5)
- `cd web && pnpm build` passes clean
- `cd web && pnpm dev` boots within 5s per BUR-17 AC #1 (capture timestamps in result file)
- Theme toggle works + persists across page reloads per BUR-17 AC #2-3
- UI screens match the approved mockup at https://www.figma.com/design/mCZeqaqNTsprUA2U1uaAEq (Howard captures screenshots in `## Artifacts created`; pixel-parity gate happens later at /design-review v0.1)
- Linear `BUR-7` flipped to In Review; all 4 children flipped to In Review
- `@codex review` confirmed fired (auto OR Howard-fired backstop)
- Result file at `.claude/handoffs/2026-05-25-BUR-7-develop-result.md`

---

## Output format

Per universal template § Result file format. Specifically:

- `Status`: Success / Partial / Failed / Stopped-for-approval
- `## Done`: per-child outcome + verification command output (paste actual pnpm typecheck/build output; show pnpm dev boot timestamp)
- `## Artifacts created`: PR URL + commit SHAs + UI screenshots (one per primary mockup screen) + Linear comment URLs
- `## Observations for the optimization loop`: anything noteworthy about this dispatch — pnpm vs npm gotchas, Tailwind+CSS-var binding patterns that worked, persona-driven layout decisions, Figma → code translation friction points. Tag as **first-frontend-dispatch-bestiary** with originSessionId pointing at this run_id. Frictionless capture is the goal; over-capture is better than under-capture.

---

## Cross-references

- **Edwin's run state**: `~/Projects/.orchestrator/develop-runs/develop-bestiary-BUR-7-20260525T074054Z-6122f3/state.json` (READ-ONLY for Howard; outside your `--add-dir` mount; do not attempt to read)
- **/mockup state**: `~/Projects/.orchestrator/mockup-runs/mockup-bestiary-BUR-7-20260525T050819Z-5673c0/state.json` (same — outside your mount; the relevant excerpts are in this handoff's manifest above)
- **Personas (excerpts in handoff above; full files outside mount)**: `~/Projects/.orchestrator/personas/{pete,skylar}.md`
- **Universal Howard template**: `~/Projects/.orchestrator/templates/howard.md` (inlined in your prompt at dispatch)
- **Project Howard overlay**: `.claude/orchestrator/howard.md` (in your mount; read it)
- **Project AGENTS.md**: `./AGENTS.md` (in your mount; read it)

---

*Dispatched by Edwin via /develop v0.1.1 (FIRST real-run; the v0.1.1 patches landed during this dispatch from real-finding F1 state-init-ordering + F2 howard-overlay-missing-bestiary). Iter findings F1-F3 captured in run state.json `real_findings_so_far` array. Howard: surface ANY additional findings in your result file's `## Observations` section so /develop v0.1.x patches can codify them.*
