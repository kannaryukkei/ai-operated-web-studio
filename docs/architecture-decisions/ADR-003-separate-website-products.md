# ADR-003 — Separate Platform from Website Products

- **Status:** Accepted
- **Decision date:** 2026-11-13

## Context
The studio sells Starter, Business, and Custom websites. The platform coordinates their production, but those websites are separate deliverables that must be independently maintained, deployed, and handed over.

## Decision
Keep website blueprints and portfolio demonstrations in `web-studio-template-kit`. Keep platform application code here. Every client website gets its own repository or independently versioned artifact. The platform stores blueprint version and project-repository references.

## Consequences
- Clear product/application boundary.
- Client source does not mix with platform internals.
- Website templates can evolve without coupling the portal to frontend implementation.
- GitHub integration must be added with scoped repository permissions.
