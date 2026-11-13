# ADR-001 — Modular Laravel Monolith

- **Status:** Accepted
- **Decision date:** 2026-11-13

## Context
The product needs a client portal, studio console, project records, approvals, AI execution, artifacts, and GitHub/deployment integrations. These capabilities share one project lifecycle and authorization boundary. The owner is already using Laravel locally and wants to minimize operational complexity.

## Decision
Build the initial platform as a modular Laravel 13 monolith with the official React + Inertia starter kit. Keep module boundaries in the application structure. Use separate queue workers for background jobs when required, but do not split into microservices.

## Consequences
- One codebase and deployable application for the MVP.
- One authorization and project-state model.
- Lower deployment/monitoring complexity.
- Modules can be extracted later if measured load or security boundaries require it.
- Frontend uses React through Inertia rather than a separately deployed SPA/API in the initial version.

## References
- https://laravel.com/framework/docs/13.x/starter-kits
- https://laravel.com/framework/docs/13.x/releases
