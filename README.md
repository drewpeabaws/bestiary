# Bestiary

Homelab service registry + healthcheck monitor. Self-hosters declare what's running (Plex, Sonarr, n8n, photo backup, ...); Bestiary watches uptime + posts LLM-summarized incident reports.

**Status**: Pre-MVP. Cycle 2 of [Codiak](https://github.com/drewpeabaws/codiak) dogfood — Bestiary is the mid-scale validation target for the Codiak skill suite. Real product graduation pending Codiak maturity.

## Why

Uptime Kuma is too neutral. Portainer is too neutral. CasaOS is too casual. A self-hoster running 20-50 services on a homelab needs opinions about which services to monitor, sensible defaults for healthchecks, and LLM-summarized incident reports that say *what just failed and what to try*, not just "Service is down."

See [Bestiary Vision v1.0](https://linear.app/) (Linear BUR team — `Product Requirements` project) for full PRD.

## M1 Service Registry MVP

First milestone (target 2026-07-19) ships:
- FastAPI backend (Python 3.12, SQLAlchemy 2.x, Alembic, APScheduler)
- JWT auth (register/login)
- Service CRUD endpoints
- Healthcheck scheduler (poll → status)
- Minimal Next.js dashboard
- Hetzner production hosting + Cloudflare Tunnel (per ADR-001)
- Custom JWT auth, not Clerk (per ADR-002)

M1 work is tracked in Linear BUR team (`Service Registry MVP` project). 26 implementation-ready issues (BUR-12..33 epic children + BUR-34..37 infra) have refined bodies — see `~/Projects/.orchestrator/` for orchestrator-side artifacts.

## License

MIT — see [LICENSE](./LICENSE).

## Project status: dogfood subject

This is a Codiak dogfood target. The product itself is real (Bestiary will ship); the project's primary value to the wider org **today** is as the substrate for Codiak skill iteration. PRD updates, ADRs, epics, and implementation issues are all real but they double as Codiak test cases.

If you're reading this from outside `drewpeabaws/` — yes, the project is real, no, it's not seeking external contributors yet (M1 is sole-operator scope per Cycle 2 methodology). Watch the repo; M1 ship = the right moment to engage.
