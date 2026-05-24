# Agent context — Bestiary

Howard / Edwin / Grace context for this repo.

## Reporting line

- **Dick** → Edwin (Cross-Project Orchestrator) → Howard (per-PR executor) + Grace (Linear status-flow daemon)
- Edwin governs cross-project; Howard is dispatched per-issue via `claude -p` from Zapdos with this AGENTS.md mounted
- Grace runs autonomously on Zapdos (launchd); reads Linear + GitHub webhook events; advances ticket status

## Project shape

- Python 3.12 backend (FastAPI + SQLAlchemy 2.x + Alembic + APScheduler) — being scaffolded by `/env-setup` + first Howard dispatch in Cycle 2 Session 2
- Next.js frontend (minimal dashboard for M1; substantial UI deferred to M2)
- Linear team `BUR` (Bestiary); team key + IDs in `~/Projects/.orchestrator/projects/registry.json` under `projects.bestiary`
- GitHub: `drewpeabaws/bestiary` (public, MIT)
- Default branch: `main`
- Branch convention: `dick/bur-NN-<slug>` per registry

## Codiak dogfood discipline

Bestiary is a Cycle 2 Codiak skill-iteration target. M1 == validation substrate for /env-setup, /autonomous, /unblock, /review (+ sec/perf/a11y), /uat, /migrate, /rollback, /release, /copy, /docs-publish, /announcement, /pricing, /launch, /analytics, /feedback.

- Iter handoffs go to `~/Projects/.orchestrator/handoffs/2026-MM-DD-bestiary-iter-<skill>-NNN-<slug>.md`
- Skill patches DEFER until session end (per memory `feedback_defer_patches_during_dogfood`) unless truly blocked
- Cycle 2 methodology: interactive one-skill-at-a-time WITH Dick (per memory `feedback_cycle_2_skill_iteration_methodology`)

## Howard / autonomous discipline

When Howard is dispatched against a BUR issue:
- Branch: `dick/bur-NN-<slug>` (matches registry convention)
- Always create new commits (never amend); always create PR (no direct main pushes for feature work)

**Direct-main-push exemption — first-time scaffolding only**: initial repo scaffold (this commit + any subsequent `/env-setup`-driven scaffold) MAY land via direct push to `main` because there's no prior content to gate against. Once M1 implementation begins (BUR-12 dispatch onward), the no-direct-main rule applies strictly. Boundary: the exemption ends at the FIRST `gh pr create` against this repo. Past that point, all changes are PR-gated.
- Codex review auto-fires on PR open + ready-for-review; respond to Codex iter feedback via push commits
- Grace handles `In Progress → In Review` on `gh pr create`; auto-merges to main after Codex clean per `feedback_auto_merge_policy`
- Production tag-push (M1 cutover) still requires explicit Dick GO

## Stop-and-ask (Howard side)

Howard stops + writes `Status: Stopped-for-approval` to result file when:
- Architectural decision needs ratification (touches ADR-001/002 surfaces; needs new ADR)
- Touches Hetzner / production / secret rotation surfaces
- Linear status flip beyond the standard `In Review` (Grace handles forward flow)
- Adds external dependency NOT pre-approved in /spike or ADR
- Destructive git ops (force-push, branch delete, history rewrite)

Grace handles the Howard-Blocked → Linear-Blocked + structured comment routing per her template.

## Persona context

- **Pete** — Solo-tier self-hoster (5-15 services). Wants quiet defaults, no LLM noise unless explicitly enabled.
- **Skylar** — Team-tier homelab operator (20-50 services, dependents). LLM-summarized incidents are her would-pay-extra differentiator.

Personas live at `~/Projects/.orchestrator/personas/{pete,skylar}.md`. UAT runs (Phase 3 Quality) walk through both.

## What's already shipped (Cycle 2 Session 1, 2026-05-24)

- 3 Linear initiatives (one per Vision §3 Bet), all attached to Service Registry MVP project
- M1 milestone (Service Registry MVP; target 2026-07-19)
- 6 epic shells (BUR-6..11) with `## UAT Test Plan` YAML authored by /epic-breakdown v0.2
- 22 child issues (BUR-12..33) with /refine v0.1-enriched bodies (files / libs / AC / test-approach / cross-refs)
- 4 net-new infra issues (BUR-34..37) from /adr-sync (Hetzner provision, domain register, CF Tunnel staging, secret rotation runbook)
- 2 ADRs (ADR-001 Hetzner production hosting, ADR-002 Custom JWT auth) as Linear documents
- 4 PRD docs (Vision, PRD-current, PRD Index, PRD Changelog) — managed via `/prd` skill

## Howard overlay status

`howard_overlay: null` in registry as of 2026-05-24. Overlay creation pending — will likely happen during Cycle 2 Session 2 when /env-setup + first /autonomous dispatch land. Until then, Howard inherits universal template at `~/Projects/.orchestrator/templates/howard.md`.
