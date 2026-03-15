# eAudit ISO 9001:2015 QMS Platform

Enterprise-oriented, multi-tenant Quality Management System (QMS) foundation for ISO 9001:2015 implementation and maintenance.

This repository contains:
- Angular frontend (QMS pages, shell, routing, Material UI foundation)
- NestJS backend (auth, RBAC, domain modules, workflow logic)
- PostgreSQL-oriented model guidance and Docker local deployment setup
- Structured product/architecture/schema/handoff documentation

---

## 1. Project overview

Primary goals:
- Controlled document lifecycle with approvals and traceability
- Nonconformity/CAPA lifecycle with effectiveness-gated closure
- Internal audit planning and finding tracking
- Risk/training reminder workflows
- Role-based access with JWT authentication
- Multi-tenant-ready architecture and deployment model

---

## 2. Architecture summary

- **Frontend**: Angular + TypeScript + Reactive Forms + Angular Material
- **Backend**: NestJS + TypeORM + JWT + RBAC guard primitives
- **Database**: PostgreSQL
- **Deployment**: Docker Compose + Nginx reverse proxy

References:
- `docs/iso9001-qms-architecture-step4.md`
- `docs/iso9001-qms-postgresql-schema-step5.md`
- `docs/iso9001-qms-workflow-logic-step9.md`

---

## 3. Repository structure

```text
.
├─ src/                     # Angular frontend
├─ backend/                 # NestJS backend
├─ docs/                    # Product + technical handoff docs
├─ deploy/nginx/            # Nginx config
├─ docker-compose.yml
├─ Dockerfile.frontend
├─ Dockerfile.backend
├─ .env.docker.example
└─ AGENTS.md
```

---

## 4. Prerequisites

Local (non-Docker):
- Node.js 20+
- npm 10+
- PostgreSQL 15+

Docker path:
- Docker Engine / Docker Desktop with Compose v2

---

## 5. Environment variables

### Frontend
- `.env.frontend.example` (optional runtime/dev hints)

### Backend
- `backend/.env.example`

### Docker Compose
- `.env.docker.example` copied to `.env`

---

## 6. Local setup (non-Docker)

### 6.1 Frontend
```bash
npm install
npm start
```
Frontend URL: `http://localhost:4200`

### 6.2 Backend
```bash
npm --prefix backend install
cp backend/.env.example backend/.env
npm --prefix backend run start:dev
```
Backend URL: `http://localhost:3000/api`

### 6.3 PostgreSQL
- Create database and credentials matching `backend/.env`.

---

## 7. Docker setup

```bash
cp .env.docker.example .env
docker compose up --build -d
```

Services:
- Frontend: `http://localhost:8080`
- Backend API: `http://localhost:3000/api`
- PostgreSQL: `localhost:5432`

Stop:
```bash
docker compose down
```

Remove volumes:
```bash
docker compose down -v
```

---

## 8. Database migrations and seeds

Current state:
- Migration/seed strategy is documented and prepared for implementation phases.
- SQL migration plan is documented in `docs/iso9001-qms-postgresql-schema-step5.md`.

Recommended commands once migration tooling is wired:
```bash
# backend (example placeholders)
npm --prefix backend run migration:run
npm --prefix backend run seed:run
```

---

## 9. Frontend run commands

```bash
npm start
npm run build
npm run test
```

---

## 10. Backend run commands

```bash
npm --prefix backend run start:dev
npm --prefix backend run build
npm --prefix backend run start:prod
npm --prefix backend run lint
npm --prefix backend run test
npm --prefix backend run test:e2e
```

---

## 11. Explicit dependency list

### Frontend required packages
- `@angular/common`
- `@angular/compiler`
- `@angular/core`
- `@angular/forms`
- `@angular/platform-browser`
- `@angular/router`
- `@angular/animations`
- `@angular/material`
- `@angular/cdk`
- `rxjs`
- `tslib`
- `zone.js`
- Dev: `@angular/cli`, `@angular/compiler-cli`, `typescript`, `karma`, `jasmine`

### Backend required packages
- `@nestjs/common`
- `@nestjs/core`
- `@nestjs/platform-express`
- `@nestjs/config`
- `@nestjs/typeorm`
- `@nestjs/jwt`
- `@nestjs/passport`
- `@nestjs/mapped-types`
- `typeorm`
- `pg`
- `passport`
- `passport-jwt`
- `bcryptjs`
- `class-validator`
- `class-transformer`
- `reflect-metadata`
- `rxjs`
- Dev: `@nestjs/cli`, `@nestjs/testing`, `jest`, `ts-jest`, `typescript`, `eslint`

---

## 12. Troubleshooting

### `npm install` fails with 403 in restricted environments
- Cause: registry/network policy in sandbox.
- Action: run the same commands on a normal local machine with npm registry access.

### Angular build errors for Material imports
- Ensure Material/CDK/Animations packages are installed.
- Re-run `npm install` and then `npm run build`.

### Backend cannot connect to DB
- Validate `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
- If Docker, ensure `postgres` healthcheck is passing.

### Nginx API proxy not working
- Confirm backend container is reachable at `backend:3000` inside Compose network.

---

## 13. Known limitations (current repository state)

1. This Codex environment blocks npm registry access intermittently (`403`), so full install/build/test validation was not always possible in-session.
2. Backend migration/seed CLI scripts are documented but not fully wired into executable commands yet.
3. Workflow history currently relies on metadata JSON fields; normalized workflow tables are recommended for production hardening.
4. Tenant filtering is scaffolded conceptually and must be enforced consistently on all repository queries in future hardening.

---

## 14. Handoff references

- `AGENTS.md` – build/run/test conventions and DoD
- `docs/iso9001-qms-prd-step1.md`
- `docs/iso9001-qms-role-permission-matrix-step2.md`
- `docs/iso9001-qms-clause-mapping-step3.md`
- `docs/iso9001-qms-architecture-step4.md`
- `docs/iso9001-qms-postgresql-schema-step5.md`
- `docs/iso9001-qms-folder-structure-step6.md`
- `docs/iso9001-qms-frontend-step8.md`
- `docs/iso9001-qms-workflow-logic-step9.md`
- `docs/iso9001-qms-docker-step10.md`
- `docs/iso9001-qms-tests-step12.md`
- `docs/iso9001-qms-release-step13.md`
