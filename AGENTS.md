# AGENTS.md

## Repository layout
- `src/` — Angular frontend application (UI, routes, pages, services).
- `backend/` — NestJS backend API (modules, DTOs, entities, guards, config).
- `docs/` — phased delivery artifacts (PRD, RBAC, architecture, schema, workflow, Docker, handoff).
- `deploy/nginx/` — Nginx runtime/reverse-proxy configuration.
- Root infra files:
  - `docker-compose.yml`
  - `Dockerfile.frontend`
  - `Dockerfile.backend`
  - `.env.docker.example`

## Build commands
### Frontend
- Install: `npm install`
- Build: `npm run build`

### Backend
- Install: `npm --prefix backend install`
- Build: `npm --prefix backend run build`

## Test commands
### Frontend
- Unit tests: `npm run test`

### Backend
- Unit tests: `npm --prefix backend run test`
- E2E tests: `npm --prefix backend run test:e2e`
- Lint: `npm --prefix backend run lint`

## Run commands
### Local (split processes)
- Frontend: `npm start`
- Backend (dev): `npm --prefix backend run start:dev`

### Docker
- `cp .env.docker.example .env`
- `docker compose up --build -d`

## Coding conventions
- TypeScript strict mode patterns; avoid `any` unless justified.
- Keep modules cohesive by bounded context (`<module>.module/controller/service/entity/dto`).
- DTO validation must use `class-validator` decorators.
- Controllers remain thin; business rules stay in services.
- Keep workflow transitions explicit and validated against allowed state transitions.
- Never put try/catch around imports.
- Prefer descriptive names aligned to ISO/QMS vocabulary.

## Definition of Done
A change is considered done when:
1. Build/test commands are updated and documented.
2. New APIs include DTO validation and permission guards.
3. Frontend routes/pages are wired into navigation when user-facing.
4. Environment variables are documented in example files.
5. Docker local run path is updated when infra changes.
6. README and docs reflect the implemented behavior.
7. Known limitations are explicitly documented when environment blocks validation.
