# ISO 9001:2015 QMS SaaS – Step 8 Angular Frontend Implementation

## Implemented frontend structure

```text
src/app/
├─ app-module.ts
├─ app-routing-module.ts
├─ app.ts
├─ shell.html
├─ pages/
│  ├─ login/
│  └─ qms/
│     ├─ dashboard/
│     ├─ document-control/
│     ├─ risk-register/
│     ├─ nonconformity-capa/
│     ├─ internal-audits/
│     ├─ management-reviews/
│     ├─ training-matrix/
│     ├─ kpi-dashboard/
│     ├─ reports/
│     ├─ settings/
│     └─ user-management/
└─ services/
```

## Routes
- `/login`
- `/dashboard`
- `/documents`
- `/risks`
- `/nonconformities`
- `/audits`
- `/management-reviews`
- `/training`
- `/kpis`
- `/reports`
- `/settings`
- `/users`

## Core layout
- Sidebar + topbar shell
- Material icon-based navigation menu
- Route-driven page title updates

## Dashboard UI
- KPI summary cards
- Compliance progress bars
- Upcoming events list

## Example module page
- `Document Control` page includes reactive draft form + Material data table for controlled documents.
