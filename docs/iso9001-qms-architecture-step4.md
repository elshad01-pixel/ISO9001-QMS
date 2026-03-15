# ISO 9001:2015 QMS SaaS – Step 4 High-Level System Architecture

## 1) Architecture Objectives
The architecture is designed to satisfy these priorities:
- **Multi-tenant isolation** for independent organization data.
- **Traceability and auditability** for ISO evidence.
- **Modularity and scalability** for phased MVP-to-full-product growth.
- **Secure-by-default design** with JWT auth, RBAC, and guarded APIs.
- **Cloud-ready containerization** using Docker and Nginx.

---

## 2) High-Level Architecture Diagram (Description)

### 2.1 C4-style Context and Container View (Text Diagram)

```text
[Users: System Admin, Org Admin, Quality Manager, Dept Manager,
        Process Owner, Internal Auditor, Employee, External Auditor]
                                |
                                v
                      [Nginx Reverse Proxy]
                  TLS termination + static hosting
                                |
                 +--------------+--------------+
                 |                             |
                 v                             v
      [Angular 17 SPA + Angular Material]   [/api/*]
      (served by Nginx static files)         routed to NestJS
                 |                             |
                 +-------------+---------------+
                               v
                   [NestJS API Application]
            (Auth, RBAC, QMS domain modules, reporting)
                               |
          +--------------------+--------------------+
          |                    |                    |
          v                    v                    v
 [PostgreSQL]           [Object/File Storage]   [Notification Workers*]
 tenant data + logs     attachments/evidence     in-app + email events

*Worker can run as a NestJS queue process (phase extension).
```

### 2.2 Deployment Topology (Docker)

```text
+-------------------------------------------------------------+
| Docker Network: qms-net                                     |
|                                                             |
|  +----------------+      +------------------+               |
|  | nginx          | ---> | frontend (Angular)|              |
|  | :80/:443       | ---> | backend (NestJS) | ---> postgres |
|  +----------------+      +------------------+      :5432    |
|                                                             |
|  Optional: worker container, pgadmin, monitoring stack      |
+-------------------------------------------------------------+
```

---

## 3) System Components

## 3.1 Frontend (Angular 17 + Angular Material)
**Responsibilities**
- Deliver role-aware enterprise web UI.
- Route users to modules and dashboards.
- Handle authentication flow (login, refresh token lifecycle via interceptor).
- Render forms/tables/charts for ISO workflows.

**Key architectural elements**
- Feature-based module structure (or standalone feature boundaries).
- Shared UI library for tables, dialogs, filters, status chips, and timeline components.
- Route guards for auth + permissions.
- HTTP interceptors for JWT attach, refresh, and centralized error handling.
- Reactive forms with strict validators matching backend DTO rules.

**State approach**
- Service + RxJS for MVP.
- Optional NgRx for cross-module complex state in later phases.

## 3.2 API Backend (NestJS)
**Responsibilities**
- Expose REST APIs for all QMS modules.
- Enforce tenant isolation, RBAC, workflow state transitions.
- Validate DTOs, orchestrate business rules, and persist evidence/audit logs.
- Generate dashboard/reporting aggregates.

**Core layers**
- `Controller` (transport)
- `Service` (business logic)
- `Repository`/ORM access layer
- `Guards` (`JwtAuthGuard`, `TenantGuard`, `PermissionsGuard`)
- `Interceptors` (request correlation, audit logging hooks)
- `Pipes` (validation/transformation)

## 3.3 Data Layer (PostgreSQL)
**Responsibilities**
- Store tenant-scoped transactional records.
- Maintain relational integrity across workflows (NC -> CAPA -> effectiveness).
- Support query performance for dashboards/reports through indexes.

**Data patterns**
- Every major table includes `tenant_id`, status, timestamps, actor fields.
- Foreign keys enforce evidence linkage.
- Audit logs are append-only.

## 3.4 File/Evidence Storage
**Responsibilities**
- Store document attachments, training certificates, audit evidence.
- Persist metadata references in PostgreSQL.

**MVP option**
- Local volume in Docker for development.
- Cloud object storage abstraction (S3/Azure Blob) for production.

## 3.5 Notification Subsystem
**Responsibilities**
- Trigger in-app reminders for due/overdue events.
- Prepare asynchronous email notifications.

**Pattern**
- Domain event emission from services.
- Notification table for in-app feed.
- Optional queue worker for retries and email dispatch.

---

## 4) Core Architectural Flows

## 4.1 Authentication and Authorization Flow (JWT)
1. User submits credentials to `/auth/login`.
2. Auth service validates password hash and tenant membership.
3. Backend returns short-lived access token + refresh token.
4. Frontend stores tokens securely (access in memory; refresh in secure cookie or hardened storage strategy).
5. `JwtAuthGuard` authenticates each request.
6. `TenantGuard` enforces tenant boundary.
7. `PermissionsGuard` verifies `module:action` permission.

## 4.2 Request Lifecycle (Typical)
1. Angular sends API call with correlation ID header.
2. NestJS validates DTO and user context.
3. Service performs workflow-state checks and business rules.
4. Repository writes data in transaction.
5. Audit log entry created for critical mutation.
6. Optional domain event publishes notification trigger.
7. Response returned to frontend; UI updates state.

## 4.3 Evidence Traceability Flow
1. User performs action (e.g., CAPA closure attempt).
2. System verifies prerequisites (effectiveness review exists and approved).
3. On success, status transitions and audit log is persisted with old/new snapshot.
4. Linked evidence artifacts remain retrievable by clause/module/report filters.

---

## 5) Multi-Tenant Architecture Strategy

## 5.1 Isolation Model
- **Shared database, shared schema, tenant discriminator** (`tenant_id`) for MVP.
- Row-level ownership validation in all repository queries.
- Optional evolution path to schema-per-tenant for high-regulation clients.

## 5.2 Tenant Safety Controls
- Never query mutable entities without mandatory tenant filter.
- Composite indexes starting with `tenant_id` on high-volume tables.
- Audit denied access attempts (`scope_mismatch`, `tenant_mismatch`).

---

## 6) Security Architecture

## 6.1 Controls
- Password hashing (Argon2 or bcrypt with strong cost factor).
- JWT signing with key rotation support.
- Refresh token revocation and reuse-detection strategy.
- RBAC + scoped permissions.
- Input validation at DTO boundary.
- File upload validation (size/type/extension/content checks).
- Rate limiting and account lock strategy for auth endpoints.

## 6.2 API Protection
- Public endpoints: login/refresh/health only.
- All domain endpoints protected by guard chain.
- Sensitive operations require elevated permissions and are always audited.

---

## 7) Reporting and Dashboard Architecture

## 7.1 Analytics Approach
- Use operational tables + targeted aggregate queries for MVP.
- Add materialized views for heavy dashboards in scale phase.

## 7.2 KPI Tiles and Charts
- Open NCs, overdue CAPA, audit status, training completion, KPI trends, supplier scores, complaint trends.
- Filter dimensions: date range, department, process, status.

## 7.3 Export Pipeline
- Backend report endpoints generate CSV/PDF streams.
- Export metadata logged (who, when, filters).

---

## 8) Infrastructure and Deployment (Docker + Nginx)

## 8.1 Containers
- `frontend`: Angular build artifacts served by Nginx static config.
- `backend`: NestJS API service.
- `postgres`: PostgreSQL database with persistent volume.
- optional `worker`: async notifications/email.

## 8.2 Nginx Responsibilities
- Serve frontend static assets.
- Reverse proxy `/api` requests to NestJS.
- Enforce HTTPS, compression, cache headers, and security headers.

## 8.3 Environment Configuration
- `.env`-driven secrets and runtime settings.
- Separate environments: `dev`, `staging`, `prod`.
- No secrets committed to source control.

---

## 9) Observability and Operability

## 9.1 Logging
- Structured JSON logs with correlation IDs.
- Security/audit events segregated and retained per policy.

## 9.2 Health and Reliability
- `/health` endpoint for readiness/liveness.
- Graceful shutdown hooks.
- Database migration checks during startup pipeline.

## 9.3 Backups
- Scheduled PostgreSQL backups with restore drills.
- Evidence storage lifecycle and retention policies.

---

## 10) Component List by Stack Requirement

## Frontend (Angular 17 + Angular Material)
- Auth module (login/session handling)
- Shell + navigation module
- Feature modules (documents, risks, audits, CAPA, management review, training, KPI, reports, settings)
- Shared module/components
- Guards/interceptors/services

## Backend (NestJS)
- Auth module
- Users/Roles/Permissions modules
- Organizations/Departments modules
- Documents/Versions/Approvals modules
- Processes/Risks modules
- NC/CAPA modules
- Audits/Findings modules
- Management Review module
- Training/Competency module
- KPI/Objectives module
- Notifications module
- Reports module
- Audit Logs module

## Data (PostgreSQL)
- Tenant-aware relational schema
- Indexed status/date/owner dimensions
- Audit and reporting support tables/views

## Edge (Nginx)
- TLS + static hosting + reverse proxy

## Runtime (Docker)
- Compose orchestration for local/dev and cloud-compatible deployment patterns

---

## 11) Architecture Decisions (ADRs) to Record Next
1. Tenant isolation strategy (`tenant_id` shared schema) and migration path.
2. Token storage and refresh strategy for Angular app.
3. File storage provider abstraction (local vs S3/Azure Blob).
4. Audit log schema and retention period.
5. Reporting query strategy (live aggregates vs materialized views).

---

## 12) Definition of Done for Step 4
Step 4 is complete when:
- The target architecture clearly describes frontend, backend, data, and infrastructure components.
- Security, tenant isolation, RBAC, and auditability controls are explicitly defined.
- Deployment topology with Docker and Nginx is documented.
- Flows for auth, request handling, and evidence traceability are clear enough to implement Step 5+ artifacts.
