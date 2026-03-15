# ISO 9001:2015 QMS SaaS – Step 12 Automated Tests & Validation Scaffolding

## 1) Test folder structure

```text
backend/
├─ src/
│  ├─ documents/documents.service.spec.ts
│  ├─ corrective-actions/corrective-actions.service.spec.ts
│  ├─ audits/audits.service.spec.ts
│  ├─ common/guards/permissions.guard.spec.ts
│  └─ audit-logs/audit-logs.service.spec.ts
└─ test/
   ├─ unit/README.md
   ├─ integration/README.md
   ├─ integration/workflow.e2e-spec.ts
   ├─ integration/rbac.e2e-spec.ts
   ├─ integration/audit-trail.e2e-spec.ts
   └─ jest-e2e.json

src/
└─ app/
   └─ pages/
      ├─ login/login.component.spec.ts
      └─ qms/dashboard/dashboard.component.spec.ts
```

## 2) Sample test files added

### Backend unit tests
- Document workflow validation
- CAPA lifecycle validation
- Audit findings closure validation
- RBAC permissions guard validation
- Audit log service create-path validation

### Backend integration scaffolding
- Workflow integration e2e placeholders
- RBAC integration e2e placeholder
- Audit trail integration e2e placeholder

### Frontend component test structure
- Login component form validation/submit tests
- Dashboard component initialization tests

## 3) Commands to run tests locally

### Frontend
```bash
npm run test
```

### Backend unit
```bash
npm --prefix backend run test
```

### Backend integration/e2e
```bash
npm --prefix backend run test:e2e
```

## 4) Workflow validation cases included
- Document release requires effective date
- Document invalid transition rejected
- CAPA close blocked until effectiveness verification
- CAPA overdue alert generation creates notifications
- Audit closure blocked with open major findings

## 5) RBAC permission cases included
- Guard allows request when all required permissions exist
- Guard denies request when required permission is missing

## 6) Audit trail test cases included
- Audit log service create operation persists expected payload shape
- Integration scaffold for audit-trail event assertions is included for full implementation

## 7) Untested areas blocked only by environment restrictions
1. Full backend test execution in this Codex run may fail if npm install is blocked by registry policy (HTTP 403).
2. Full frontend test execution in this Codex run may fail for same package registry restriction and Material dependency resolution.
3. Docker-based test execution is blocked in environments without Docker CLI access.

Repository now includes runnable test scaffolding for normal local machines with package access.
