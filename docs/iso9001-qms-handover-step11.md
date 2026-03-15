# ISO 9001:2015 QMS SaaS – Step 11 Hardening & Handoff

## 1) Hardening actions performed

### Consistency review
- Verified frontend/backend structure alignment with prior step docs.
- Standardized run/build/test command documentation in `README.md` and `AGENTS.md`.

### Dependencies and config review
- Added explicit frontend and backend dependency lists in README.
- Added/updated env templates:
  - `.env.frontend.example`
  - `.env.backend.example`
  - `backend/.env.example`
  - `.env.docker.example` (already present)
- Added missing backend config files:
  - `backend/jest.config.ts`
  - `backend/test/jest-e2e.json`
  - `backend/.eslintrc.cjs`

### Package scripts review
- Updated root `package.json` with frontend/backend/docker helper scripts.
- Updated backend `package.json` with:
  - `start:prod`
  - `test:e2e`
  - migration/seed placeholders
  - lint tooling dependencies

### Documentation and governance
- Added `AGENTS.md` with repo layout, commands, conventions, and definition of done.
- Replaced README with full operational handoff guide.

---

## 2) Final run instructions

### Local split mode
```bash
# frontend
npm install
npm start

# backend
npm --prefix backend install
cp backend/.env.example backend/.env
npm --prefix backend run start:dev
```

### Docker mode
```bash
cp .env.docker.example .env
docker compose up --build -d
```

---

## 3) Final dependency sources
- Frontend dependencies: `package.json` (root)
- Backend dependencies: `backend/package.json`
- Human-readable explicit dependency list: `README.md` section 11

---

## 4) Known limitations in this Codex environment
1. npm registry access may fail with HTTP 403, preventing `npm install` / `npm run build` validation.
2. Docker CLI may be unavailable, preventing `docker compose` runtime verification.
3. Migration/seed scripts are placeholders pending ORM migration wiring.

These are environment constraints; repository content is structured for normal local machine execution.

---

## 5) Final file/folder summary (current system)

```text
.
├─ src/                               # Angular frontend app
│  ├─ app/
│  │  ├─ app-module.ts
│  │  ├─ app-routing-module.ts
│  │  ├─ app.ts
│  │  ├─ shell.html
│  │  └─ pages/
│  │     ├─ login/
│  │     └─ qms/
│  └─ styles.css
├─ backend/                           # NestJS backend app
│  ├─ src/
│  │  ├─ auth/
│  │  ├─ users/
│  │  ├─ organizations/
│  │  ├─ roles/
│  │  ├─ permissions/
│  │  ├─ documents/
│  │  ├─ processes/
│  │  ├─ risks/
│  │  ├─ nonconformities/
│  │  ├─ corrective-actions/
│  │  ├─ audits/
│  │  ├─ management-reviews/
│  │  ├─ training/
│  │  ├─ kpis/
│  │  ├─ notifications/
│  │  ├─ audit-logs/
│  │  ├─ common/
│  │  ├─ config/
│  │  ├─ app.module.ts
│  │  └─ main.ts
│  ├─ .env.example
│  ├─ .eslintrc.cjs
│  ├─ jest.config.ts
│  ├─ test/jest-e2e.json
│  └─ package.json
├─ deploy/nginx/frontend.conf
├─ docker-compose.yml
├─ Dockerfile.frontend
├─ Dockerfile.backend
├─ .env.frontend.example
├─ .env.backend.example
├─ .env.docker.example
├─ AGENTS.md
├─ README.md
└─ docs/
   ├─ iso9001-qms-prd-step1.md
   ├─ iso9001-qms-role-permission-matrix-step2.md
   ├─ iso9001-qms-clause-mapping-step3.md
   ├─ iso9001-qms-architecture-step4.md
   ├─ iso9001-qms-postgresql-schema-step5.md
   ├─ iso9001-qms-folder-structure-step6.md
   ├─ iso9001-qms-frontend-step8.md
   ├─ iso9001-qms-workflow-logic-step9.md
   ├─ iso9001-qms-docker-step10.md
   └─ iso9001-qms-handover-step11.md
```
