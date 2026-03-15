# ISO 9001:2015 QMS SaaS – Step 13 First Local Release Readiness

This document finalizes release-readiness planning for the **first local release** and clearly separates what is already complete from what is still placeholder.

---

## 1) Production-ready `docker-compose.yml` review

### Current strengths
- Uses pinned major images (`postgres:16-alpine`) and dedicated services for DB, backend, frontend.
- Includes Postgres healthcheck and startup ordering for backend.
- Uses named volume (`postgres_data`) for DB persistence.
- Uses environment-variable based configuration with sane local defaults.

### Hardening updates applied in this step
- Added `NODE_ENV=production` for backend runtime in Compose.
- Added backend container healthcheck using a lightweight Node HTTP probe.
- Updated frontend dependency condition to wait for backend healthcheck.
- Added explicit bridge network (`eaudit_net`) for service isolation/clarity.

### Remaining recommendations (next release)
- Add secrets management for JWT and DB password (Vault/secret manager) instead of plaintext `.env`.
- Add resource limits (`cpus`, `memory`) for each service.
- Add centralized logging driver and retention policy.

---

## 2) Dockerfiles review

### `Dockerfile.backend`
#### Current strengths
- Multi-stage build (deps/build/runtime).
- Runtime image exposes only app artifact and `node_modules`.

#### Hardening updates applied in this step
- Runtime stage now installs **production-only dependencies** via `npm ci --omit=dev`.
- Runtime stage runs as non-root `node` user.

#### Remaining recommendations
- Add image scanning in CI (Trivy/Grype).
- Pin Node patch versions once release cadence is defined.

### `Dockerfile.frontend`
#### Current strengths
- Multi-stage build and static Nginx runtime.
- Frontend assets copied from Angular build output.

#### Hardening updates applied in this step
- None required for first local release.

#### Remaining recommendations
- Consider build args for API base URL if later moving away from Nginx reverse-proxy pattern.

---

## 3) Nginx config review

### Current strengths
- SPA fallback routing (`try_files ... /index.html`).
- Reverse-proxy pass-through for `/api/` to backend service.

### Hardening updates applied in this step
- Added `/healthz` endpoint for container/platform probes.
- Added conservative security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`).
- Added `client_max_body_size 10m` for controlled uploads.

### Remaining recommendations
- Add TLS termination in front of this Nginx (or managed ingress) for non-local environments.
- Tune caching headers for static assets once fingerprinting strategy is finalized.

---

## 4) Migration and seed command checklist

> Status: **placeholder scripts currently exist** in backend `package.json` and still require implementation.

### Existing commands
- `npm --prefix backend run migration:run` → placeholder (`TODO: wire TypeORM migrations`)
- `npm --prefix backend run migration:revert` → placeholder
- `npm --prefix backend run seed:run` → placeholder

### Checklist to complete before non-local release
1. Add TypeORM DataSource file for CLI migrations.
2. Add scripts:
   - `migration:generate`
   - `migration:run`
   - `migration:revert`
3. Add seed runner with deterministic baseline data:
   - organization
   - admin role
   - permissions matrix
   - initial admin user
4. Ensure seed is idempotent (safe to re-run).
5. Add CI gate that runs migrations against ephemeral DB.

---

## 5) Release checklist (first local release)

1. Confirm env file exists:
   - `cp .env.docker.example .env`
2. Set non-default secrets in `.env` (`JWT_SECRET`, DB password).
3. Build containers:
   - `docker compose build --no-cache`
4. Start stack:
   - `docker compose up -d`
5. Verify health:
   - Postgres healthy
   - Backend healthy
   - Frontend served
6. Smoke-test core routes:
   - `/` (frontend)
   - `/api/auth/login` (backend)
7. Execute backend tests (if deps installed locally):
   - `npm --prefix backend run test`
8. Capture release notes and known limitations.

---

## 6) First-run checklist (developer machine)

1. Prerequisites:
   - Docker + Compose plugin installed
   - Ports 8080/3000/5432 available
2. Bootstrap:
   - `cp .env.docker.example .env`
   - edit secrets
3. Start:
   - `docker compose up --build -d`
4. Validate:
   - `docker compose ps`
   - `docker compose logs backend --tail=100`
   - open `http://localhost:8080`
5. Optional local non-Docker run:
   - frontend: `npm install && npm start`
   - backend: `npm --prefix backend install && npm --prefix backend run start:dev`

---

## 7) Git commit plan with recommended commit messages

Recommended split for follow-up work:

1. **infra(release): harden compose healthchecks and runtime defaults**
   - Compose healthchecks/dependency conditions/network/runtime env.
2. **infra(docker): reduce backend runtime image and drop root user**
   - Production-only deps and non-root runtime.
3. **infra(nginx): add health endpoint and baseline security headers**
   - `/healthz`, request-size cap, secure headers.
4. **docs(release): add Step 13 local release and operational checklists**
   - This document and README links.
5. **backend(migrations): wire TypeORM migrations and seed runner**
   - Replace placeholder commands with real implementation.

---

## 8) Final summary — complete vs placeholder

### Complete in repository now
- Core Dockerized local stack (Postgres + NestJS backend + Angular+Nginx frontend).
- Backend and frontend module scaffolding for QMS domains.
- Base workflow and RBAC logic scaffolding.
- Unit/integration test scaffolding and Step 12 documentation.
- Step 13 release-readiness review + local release checklists.

### Placeholder / pending before broader release
- Migration and seed scripts are still TODO placeholders.
- Full CI validation (tests/lint/build) not enforced in repository automation yet.
- Production-grade secrets management and TLS termination not integrated.
- E2E/integration tests still mostly placeholders and need real API assertions.

