# ISO 9001:2015 QMS SaaS – Step 2 Role–Permission Matrix

## 1) Role–Permission Matrix (MVP + Foundation Modules)

Legend:
- ✅ = allowed
- ◐ = conditional (scoped/limited by ownership, assignment, workflow state, or explicit grant)
- ❌ = not allowed

| Module | Permission | System Administrator | Organization Admin | Quality Manager | Department Manager | Process Owner | Internal Auditor | Employee | External Auditor |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Documents | view | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ |
| Documents | create | ✅ | ✅ | ✅ | ◐ | ◐ | ❌ | ❌ | ❌ |
| Documents | edit | ✅ | ✅ | ✅ | ◐ | ◐ | ❌ | ❌ | ❌ |
| Documents | approve | ✅ | ✅ | ✅ | ◐ | ❌ | ❌ | ❌ | ❌ |
| Documents | close (obsolete/archive) | ✅ | ✅ | ✅ | ◐ | ❌ | ❌ | ❌ | ❌ |
| Documents | export | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ | ◐ |
| Processes | view | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ |
| Processes | create | ✅ | ✅ | ✅ | ◐ | ✅ | ❌ | ❌ | ❌ |
| Processes | edit | ✅ | ✅ | ✅ | ◐ | ✅ | ❌ | ❌ | ❌ |
| Processes | approve | ✅ | ✅ | ✅ | ◐ | ❌ | ❌ | ❌ | ❌ |
| Processes | close | ✅ | ✅ | ✅ | ◐ | ❌ | ❌ | ❌ | ❌ |
| Processes | export | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ◐ |
| Risks | view | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ | ◐ |
| Risks | create | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ◐ | ❌ |
| Risks | edit | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ◐ | ❌ |
| Risks | approve | ✅ | ✅ | ✅ | ◐ | ◐ | ❌ | ❌ | ❌ |
| Risks | close | ✅ | ✅ | ✅ | ◐ | ◐ | ❌ | ❌ | ❌ |
| Risks | export | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ◐ |
| Nonconformities | view | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ | ◐ |
| Nonconformities | create | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Nonconformities | edit | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ | ❌ |
| Nonconformities | approve | ✅ | ✅ | ✅ | ◐ | ❌ | ◐ | ❌ | ❌ |
| Nonconformities | close | ✅ | ✅ | ✅ | ◐ | ❌ | ◐ | ❌ | ❌ |
| Nonconformities | export | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ◐ |
| CAPA | view | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ | ◐ |
| CAPA | create | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| CAPA | edit | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ | ❌ |
| CAPA | approve | ✅ | ✅ | ✅ | ◐ | ❌ | ◐ | ❌ | ❌ |
| CAPA | close | ✅ | ✅ | ✅ | ❌ | ❌ | ◐ | ❌ | ❌ |
| CAPA | export | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ◐ |
| Audits | view | ✅ | ✅ | ✅ | ✅ | ◐ | ✅ | ◐ | ◐ |
| Audits | create | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Audits | edit | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Audits | approve | ✅ | ✅ | ✅ | ❌ | ❌ | ◐ | ❌ | ❌ |
| Audits | close | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Audits | export | ✅ | ✅ | ✅ | ✅ | ◐ | ✅ | ❌ | ◐ |
| Management Reviews | view | ✅ | ✅ | ✅ | ✅ | ◐ | ✅ | ◐ | ◐ |
| Management Reviews | create | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Management Reviews | edit | ✅ | ✅ | ✅ | ◐ | ❌ | ❌ | ❌ | ❌ |
| Management Reviews | approve | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Management Reviews | close | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Management Reviews | export | ✅ | ✅ | ✅ | ✅ | ◐ | ✅ | ❌ | ◐ |
| Training | view | ✅ | ✅ | ✅ | ✅ | ◐ | ◐ | ✅ | ◐ |
| Training | create | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Training | edit | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ◐ | ❌ |
| Training | approve | ✅ | ✅ | ✅ | ◐ | ❌ | ❌ | ❌ | ❌ |
| Training | close | ✅ | ✅ | ✅ | ◐ | ❌ | ❌ | ❌ | ❌ |
| Training | export | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ◐ |
| KPIs | view | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ | ◐ | ◐ |
| KPIs | create | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| KPIs | edit | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| KPIs | approve | ✅ | ✅ | ✅ | ◐ | ❌ | ❌ | ❌ | ❌ |
| KPIs | close | ✅ | ✅ | ✅ | ◐ | ❌ | ❌ | ❌ | ❌ |
| KPIs | export | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ◐ |
| Suppliers | view | ✅ | ✅ | ✅ | ✅ | ◐ | ◐ | ❌ | ◐ |
| Suppliers | create | ✅ | ✅ | ✅ | ◐ | ❌ | ❌ | ❌ | ❌ |
| Suppliers | edit | ✅ | ✅ | ✅ | ◐ | ❌ | ❌ | ❌ | ❌ |
| Suppliers | approve | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Suppliers | close | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Suppliers | export | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ◐ |
| Complaints | view | ✅ | ✅ | ✅ | ✅ | ◐ | ◐ | ◐ | ◐ |
| Complaints | create | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| Complaints | edit | ✅ | ✅ | ✅ | ✅ | ◐ | ❌ | ◐ | ❌ |
| Complaints | approve | ✅ | ✅ | ✅ | ◐ | ❌ | ❌ | ❌ | ❌ |
| Complaints | close | ✅ | ✅ | ✅ | ◐ | ❌ | ❌ | ❌ | ❌ |
| Complaints | export | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ◐ |
| Change Management | view | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ | ◐ | ◐ |
| Change Management | create | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ◐ | ❌ |
| Change Management | edit | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ◐ | ❌ |
| Change Management | approve | ✅ | ✅ | ✅ | ◐ | ❌ | ❌ | ❌ | ❌ |
| Change Management | close | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Change Management | export | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ◐ |
| Reports | view | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ◐ | ◐ |
| Reports | create | ✅ | ✅ | ✅ | ◐ | ◐ | ◐ | ❌ | ❌ |
| Reports | edit | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Reports | approve | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Reports | close | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Reports | export | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Settings | view | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Settings | create | ✅ | ✅ | ◐ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Settings | edit | ✅ | ✅ | ◐ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Settings | approve | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Settings | close | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Settings | export | ✅ | ✅ | ◐ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Users | view | ✅ | ✅ | ✅ | ◐ | ❌ | ❌ | ❌ | ❌ |
| Users | create | ✅ | ✅ | ◐ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Users | edit | ✅ | ✅ | ◐ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Users | approve | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Users | close (deactivate) | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Users | export | ✅ | ✅ | ◐ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 2) Permission Logic Explanation

### 2.1 Role hierarchy and governance intent
- **System Administrator** has full platform authority across tenants for operations, support, and compliance administration.
- **Organization Admin** has full tenant-level authority (excluding platform-wide controls) and is the final gatekeeper for tenant settings/users.
- **Quality Manager** is the operational owner of QMS modules and core approvals/closures inside the tenant.
- **Department Manager** has departmental ownership rights for execution and limited approvals where policy allows.
- **Process Owner** can create/edit operational content for assigned processes, but final approvals/closures generally remain with Quality/Org governance.
- **Internal Auditor** can perform audit operations, create findings/NC links, and close audit records per procedure.
- **Employee** has participation rights (raise issues/complaints, update assigned items, consume controlled content).
- **External Auditor** is read-only and evidence-scoped.

### 2.2 Meaning of conditional permissions (◐)
Conditional rights are enforced by one or more of:
1. **Scope**: department, process, site, or assigned record.
2. **Workflow state**: only specific transitions permitted at specific states.
3. **Policy flag**: tenant configuration enables/disables delegated approval.
4. **Data class**: sensitive records require higher role (e.g., critical NC, high-risk CAPA).

### 2.3 Workflow-specific enforcement highlights
- **Documents**: only designated approvers can transition to Approved/Released; archive requires authorized role.
- **CAPA**: closure is blocked until effectiveness review record is completed and approved.
- **Audits**: closure blocked when major findings are still open.
- **Management Reviews**: closure blocked when mandatory inputs/actions are incomplete.
- **Settings/Users**: controlled by admin roles to avoid privilege escalation.

---

## 3) Notes for RBAC Implementation

### 3.1 Permission model
Use normalized permission keys:
- `module`: `documents`, `processes`, `risks`, `nonconformities`, `capa`, `audits`, `management_reviews`, `training`, `kpis`, `suppliers`, `complaints`, `change_management`, `reports`, `settings`, `users`
- `action`: `view`, `create`, `edit`, `approve`, `close`, `export`
- canonical key: `<module>:<action>` (e.g., `documents:approve`)

### 3.2 Data model recommendation (NestJS + PostgreSQL)
Core tables:
- `roles` (tenant-scoped except system roles)
- `permissions` (global catalog)
- `role_permissions` (role-to-permission mapping)
- `user_roles` (user-to-role mapping)
- `permission_scopes` (optional constraints: department/process/site/record ownership)

Suggested scope fields:
- `scope_type` (`tenant`, `department`, `process`, `site`, `self`, `assigned`)
- `scope_ref_id` (nullable for global within tenant)
- `conditions_json` (workflow-state constraints)

### 3.3 Enforcement architecture
- **JWT claims**: `sub`, `tenant_id`, `roles`, `permission_version`.
- **Guards**:
  1. `JwtAuthGuard` validates token/session.
  2. `TenantGuard` ensures tenant context and row-level isolation.
  3. `PermissionsGuard` validates `<module>:<action>`.
  4. `ScopeGuard` evaluates conditional (◐) constraints.
- **Policy service** evaluates dynamic checks (ownership, assignment, workflow state).

### 3.4 API and UI alignment
- Backend remains source of truth for authorization.
- Frontend uses permission endpoints/claims to hide unavailable actions.
- Never rely on UI hiding as security control.

### 3.5 Auditability requirements
For every protected mutation (create/edit/approve/close):
- Log `tenant_id`, `user_id`, `entity`, `entity_id`, `action`, `old_value`, `new_value`, `timestamp`, `ip`, `user_agent`.
- Log denied authorization attempts with reason code (`missing_permission`, `scope_mismatch`, `invalid_state`).

### 3.6 Implementation defaults for MVP
- Start with predefined system roles mapped as in this matrix.
- Allow Organization Admin to clone/customize roles within tenant boundaries.
- Protect immutable baseline roles with a `is_system_role` flag.
- Add migration seeds for all permissions and default role mappings.

---

## 4) Recommended Next-Step Outputs (Step 3 dependency)
- Convert this matrix into a machine-readable seed (`permissions.seed.ts` + SQL migration).
- Produce ISO clause-to-module mapping using this authorization baseline.
- Add `GET /auth/me/permissions` endpoint contract for frontend guard/menu rendering.
