# ISO 9001:2015 QMS SaaS – Step 6 Project Folder Structure

This document defines the **complete project folder structure** for a production-style ISO 9001 QMS SaaS platform using:
- Frontend: Angular 17 + Angular Material + TypeScript
- Backend: Node.js + NestJS
- Database: PostgreSQL
- Infrastructure: Docker + Nginx

> Recommended approach: **monorepo** with separate `apps/frontend` and `apps/backend` plus shared infra/docs tooling.

---

## 1) Full Project Folder Structure (Entire System)

```text
iso9001-qms-saas/
├─ .github/
│  ├─ workflows/
│  │  ├─ ci.yml
│  │  ├─ backend-ci.yml
│  │  ├─ frontend-ci.yml
│  │  └─ docker-release.yml
│  ├─ pull_request_template.md
│  └─ ISSUE_TEMPLATE/
│     ├─ bug_report.md
│     ├─ feature_request.md
│     └─ compliance-gap.md
├─ apps/
│  ├─ frontend/
│  │  ├─ angular.json
│  │  ├─ package.json
│  │  ├─ tsconfig.json
│  │  ├─ tsconfig.app.json
│  │  ├─ tsconfig.spec.json
│  │  ├─ src/
│  │  │  ├─ main.ts
│  │  │  ├─ index.html
│  │  │  ├─ styles/
│  │  │  │  ├─ _theme.scss
│  │  │  │  ├─ _variables.scss
│  │  │  │  ├─ _mixins.scss
│  │  │  │  └─ styles.scss
│  │  │  ├─ app/
│  │  │  │  ├─ app.config.ts
│  │  │  │  ├─ app.routes.ts
│  │  │  │  ├─ core/
│  │  │  │  ├─ shared/
│  │  │  │  ├─ layout/
│  │  │  │  └─ features/
│  │  │  ├─ assets/
│  │  │  │  ├─ images/
│  │  │  │  ├─ icons/
│  │  │  │  ├─ i18n/
│  │  │  │  └─ mock/
│  │  │  └─ environments/
│  │  │     ├─ environment.ts
│  │  │     ├─ environment.development.ts
│  │  │     └─ environment.production.ts
│  │  └─ e2e/
│  │     ├─ playwright.config.ts
│  │     └─ tests/
│  └─ backend/
│     ├─ package.json
│     ├─ nest-cli.json
│     ├─ tsconfig.json
│     ├─ tsconfig.build.json
│     ├─ src/
│     │  ├─ main.ts
│     │  ├─ app.module.ts
│     │  ├─ common/
│     │  ├─ config/
│     │  ├─ modules/
│     │  ├─ database/
│     │  ├─ jobs/
│     │  └─ health/
│     ├─ test/
│     │  ├─ unit/
│     │  ├─ integration/
│     │  └─ e2e/
│     └─ prisma-or-typeorm/
├─ database/
│  ├─ migrations/
│  │  ├─ 0001_init_foundation.sql
│  │  ├─ 0002_identity_rbac.sql
│  │  ├─ 0003_documents_processes.sql
│  │  ├─ 0004_risk_nc_capa_audits.sql
│  │  ├─ 0005_management_review_actions.sql
│  │  ├─ 0006_training_competency.sql
│  │  ├─ 0007_objectives_kpis.sql
│  │  ├─ 0008_suppliers_complaints_changes.sql
│  │  ├─ 0009_notifications_audit_logs_reports.sql
│  │  └─ 0010_indexes_views.sql
│  ├─ seeds/
│  │  ├─ 0001_permissions_seed.sql
│  │  ├─ 0002_roles_seed.sql
│  │  ├─ 0003_admin_user_seed.sql
│  │  └─ 0004_demo_tenant_seed.sql
│  ├─ views/
│  │  ├─ v_open_nonconformities.sql
│  │  ├─ v_overdue_capa.sql
│  │  ├─ v_audit_status_summary.sql
│  │  ├─ v_training_completion.sql
│  │  └─ v_kpi_attainment.sql
│  └─ functions/
│     ├─ fn_set_updated_at.sql
│     ├─ fn_enforce_tenant_match.sql
│     └─ fn_audit_log_insert.sql
├─ infra/
│  ├─ docker/
│  │  ├─ Dockerfile.frontend
│  │  ├─ Dockerfile.backend
│  │  ├─ Dockerfile.worker
│  │  └─ .dockerignore
│  ├─ nginx/
│  │  ├─ nginx.conf
│  │  ├─ conf.d/
│  │  │  ├─ qms-web.conf
│  │  │  └─ qms-api.conf
│  │  └─ snippets/
│  │     ├─ security-headers.conf
│  │     └─ gzip-cache.conf
│  ├─ compose/
│  │  ├─ docker-compose.yml
│  │  ├─ docker-compose.dev.yml
│  │  ├─ docker-compose.test.yml
│  │  └─ docker-compose.prod.yml
│  ├─ scripts/
│  │  ├─ migrate.sh
│  │  ├─ seed.sh
│  │  ├─ backup.sh
│  │  ├─ restore.sh
│  │  └─ wait-for-postgres.sh
│  └─ k8s/
│     ├─ namespace.yaml
│     ├─ configmap.yaml
│     ├─ secrets.template.yaml
│     ├─ frontend-deployment.yaml
│     ├─ backend-deployment.yaml
│     ├─ worker-deployment.yaml
│     ├─ postgres-statefulset.yaml
│     ├─ services.yaml
│     └─ ingress.yaml
├─ packages/
│  ├─ shared-types/
│  │  ├─ src/
│  │  │  ├─ api/
│  │  │  ├─ enums/
│  │  │  └─ dto/
│  │  └─ package.json
│  ├─ eslint-config/
│  │  ├─ index.js
│  │  └─ package.json
│  └─ tsconfig/
│     ├─ base.json
│     ├─ angular.json
│     └─ nest.json
├─ docs/
│  ├─ iso9001-qms-prd-step1.md
│  ├─ iso9001-qms-role-permission-matrix-step2.md
│  ├─ iso9001-qms-clause-mapping-step3.md
│  ├─ iso9001-qms-architecture-step4.md
│  ├─ iso9001-qms-postgresql-schema-step5.md
│  ├─ iso9001-qms-folder-structure-step6.md
│  ├─ api/
│  │  ├─ openapi.yaml
│  │  └─ postman-collection.json
│  ├─ adr/
│  │  ├─ ADR-001-tenant-isolation.md
│  │  ├─ ADR-002-auth-token-strategy.md
│  │  └─ ADR-003-audit-log-model.md
│  ├─ runbooks/
│  │  ├─ incident-response.md
│  │  ├─ backup-restore.md
│  │  └─ release-process.md
│  └─ compliance/
│     ├─ iso-clause-evidence-mapping.md
│     ├─ data-retention-policy.md
│     └─ access-control-policy.md
├─ .env.example
├─ .env.development.example
├─ .env.production.example
├─ package.json
├─ pnpm-workspace.yaml
├─ turbo.json
├─ Makefile
├─ README.md
└─ LICENSE
```

---

## 2) Angular Frontend Structure (Detailed)

```text
apps/frontend/src/app/
├─ core/
│  ├─ auth/
│  │  ├─ auth.service.ts
│  │  ├─ auth.store.ts
│  │  ├─ auth.interceptor.ts
│  │  ├─ refresh-token.interceptor.ts
│  │  ├─ auth.guard.ts
│  │  └─ permission.guard.ts
│  ├─ http/
│  │  ├─ api-client.service.ts
│  │  ├─ error.interceptor.ts
│  │  └─ correlation-id.interceptor.ts
│  ├─ services/
│  │  ├─ notification.service.ts
│  │  ├─ audit-trail.service.ts
│  │  └─ tenant-context.service.ts
│  └─ state/
│     ├─ app-state.service.ts
│     └─ app-initializer.ts
├─ shared/
│  ├─ ui/
│  │  ├─ data-table/
│  │  ├─ status-chip/
│  │  ├─ confirm-dialog/
│  │  ├─ file-upload/
│  │  ├─ page-header/
│  │  └─ kpi-card/
│  ├─ pipes/
│  ├─ directives/
│  ├─ validators/
│  ├─ models/
│  └─ utils/
├─ layout/
│  ├─ shell/
│  ├─ navbar/
│  ├─ sidebar/
│  ├─ breadcrumb/
│  └─ footer/
├─ features/
│  ├─ auth/
│  │  ├─ pages/login/
│  │  ├─ pages/register-organization/
│  │  └─ pages/forgot-password/
│  ├─ dashboard/
│  ├─ users/
│  ├─ organizations/
│  ├─ departments/
│  ├─ documents/
│  │  ├─ pages/document-list/
│  │  ├─ pages/document-detail/
│  │  ├─ pages/document-form/
│  │  └─ components/document-approval-timeline/
│  ├─ processes/
│  ├─ risks/
│  ├─ nonconformities/
│  ├─ capa/
│  ├─ audits/
│  ├─ management-reviews/
│  ├─ training/
│  ├─ kpis/
│  ├─ suppliers/
│  ├─ complaints/
│  ├─ change-management/
│  ├─ notifications/
│  ├─ reports/
│  └─ settings/
├─ app.routes.ts
└─ app.config.ts
```

Key frontend conventions:
- Each feature contains `pages/`, `components/`, `services/`, `models/`, `state/`.
- Angular Material components live in shared UI wrappers for consistency.
- Guards enforce RBAC and module-level route access.

---

## 3) NestJS Backend Structure (Detailed)

```text
apps/backend/src/
├─ main.ts
├─ app.module.ts
├─ common/
│  ├─ constants/
│  ├─ decorators/
│  ├─ dto/
│  ├─ enums/
│  ├─ exceptions/
│  ├─ filters/
│  ├─ guards/
│  │  ├─ jwt-auth.guard.ts
│  │  ├─ tenant.guard.ts
│  │  ├─ permissions.guard.ts
│  │  └─ scope.guard.ts
│  ├─ interceptors/
│  │  ├─ audit-log.interceptor.ts
│  │  ├─ transform.interceptor.ts
│  │  └─ timeout.interceptor.ts
│  ├─ pipes/
│  └─ utils/
├─ config/
│  ├─ configuration.ts
│  ├─ validation.ts
│  └─ swagger.config.ts
├─ database/
│  ├─ data-source.ts
│  ├─ migrations/
│  ├─ seeds/
│  └─ repositories/
├─ modules/
│  ├─ auth/
│  │  ├─ auth.module.ts
│  │  ├─ auth.controller.ts
│  │  ├─ auth.service.ts
│  │  ├─ strategies/
│  │  ├─ dto/
│  │  └─ entities/
│  ├─ users/
│  ├─ organizations/
│  ├─ departments/
│  ├─ roles-permissions/
│  ├─ documents/
│  ├─ document-versions/
│  ├─ processes/
│  ├─ risks/
│  ├─ nonconformities/
│  ├─ corrective-actions/
│  ├─ audits/
│  ├─ audit-findings/
│  ├─ management-reviews/
│  ├─ actions/
│  ├─ training/
│  ├─ competencies/
│  ├─ objectives/
│  ├─ kpis/
│  ├─ complaints/
│  ├─ suppliers/
│  ├─ change-requests/
│  ├─ notifications/
│  ├─ attachments/
│  ├─ audit-logs/
│  └─ reports/
├─ jobs/
│  ├─ notification-dispatch.job.ts
│  ├─ training-expiry-reminder.job.ts
│  ├─ risk-review-reminder.job.ts
│  └─ overdue-actions.job.ts
└─ health/
   ├─ health.module.ts
   ├─ health.controller.ts
   └─ health.service.ts
```

Module internal pattern (repeatable):
```text
modules/<module>/
├─ <module>.module.ts
├─ <module>.controller.ts
├─ <module>.service.ts
├─ dto/
├─ entities/
├─ repositories/
├─ mappers/
└─ policies/
```

---

## 4) Database Migration Folder Structure

```text
database/
├─ migrations/
│  ├─ 0001_init_foundation.sql
│  ├─ 0002_identity_rbac.sql
│  ├─ 0003_documents_processes.sql
│  ├─ 0004_risk_opportunities.sql
│  ├─ 0005_nonconformities_capa.sql
│  ├─ 0006_audits_findings.sql
│  ├─ 0007_management_reviews_actions.sql
│  ├─ 0008_training_competencies.sql
│  ├─ 0009_objectives_kpis.sql
│  ├─ 0010_suppliers_complaints.sql
│  ├─ 0011_change_requests_notifications.sql
│  ├─ 0012_audit_logs_reports.sql
│  └─ 0013_indexes_views_constraints.sql
├─ seeds/
│  ├─ permissions.seed.sql
│  ├─ roles.seed.sql
│  ├─ admin.seed.sql
│  └─ demo.seed.sql
├─ rollback/
│  ├─ 0001_rollback.sql
│  ├─ 0002_rollback.sql
│  └─ ...
└─ checks/
   ├─ integrity-check.sql
   ├─ tenant-isolation-check.sql
   └─ reporting-view-check.sql
```

Migration principles:
- One concern per migration file.
- Forward-compatible additive changes.
- Explicit indexes for tenant/status/date query paths.

---

## 5) Docker + Nginx Configuration Structure

```text
infra/
├─ docker/
│  ├─ Dockerfile.frontend
│  ├─ Dockerfile.backend
│  ├─ Dockerfile.worker
│  └─ .dockerignore
├─ compose/
│  ├─ docker-compose.yml
│  ├─ docker-compose.dev.yml
│  ├─ docker-compose.test.yml
│  └─ docker-compose.prod.yml
├─ nginx/
│  ├─ nginx.conf
│  ├─ conf.d/
│  │  ├─ qms-web.conf
│  │  └─ qms-api.conf
│  └─ snippets/
│     ├─ security-headers.conf
│     └─ gzip-cache.conf
└─ scripts/
   ├─ start-dev.sh
   ├─ start-prod.sh
   ├─ migrate.sh
   ├─ seed.sh
   ├─ backup.sh
   └─ restore.sh
```

Expected compose services:
- `nginx`
- `frontend`
- `backend`
- `worker` (optional in MVP, recommended)
- `postgres`
- `pgadmin` (dev only)

---

## 6) README Structure (Recommended)

```text
README.md
├─ 1. Project Overview
├─ 2. ISO 9001 Scope and MVP Modules
├─ 3. Architecture Summary (links to Step 1–6 docs)
├─ 4. Monorepo Layout
├─ 5. Prerequisites
├─ 6. Environment Variables
├─ 7. Local Development Setup
│  ├─ 7.1 Run with Docker Compose
│  ├─ 7.2 Run frontend/backend separately
│  └─ 7.3 Run database migrations and seeds
├─ 8. Authentication and Default Users
├─ 9. RBAC and Tenant Isolation Notes
├─ 10. Running Tests
│  ├─ Frontend unit/e2e
│  ├─ Backend unit/integration/e2e
│  └─ DB checks
├─ 11. Build and Deployment
│  ├─ Docker images
│  ├─ Nginx config
│  └─ Production checklist
├─ 12. API Documentation (OpenAPI link)
├─ 13. Reporting and Evidence Export
├─ 14. Troubleshooting
├─ 15. Contribution Guidelines
└─ 16. License
```

---

## 7) Notes for Step 7+ Implementation
- Use this tree as the baseline for generating API contracts (Step 7).
- Create backend modules and migrations in lockstep with schema dependencies.
- Ensure docs and folder names stay consistent with RBAC matrix and clause mapping docs.
