# ISO 9001:2015 QMS SaaS – Step 5 PostgreSQL Schema Design

## 1) Design Goals
- Support **multi-tenant SaaS isolation** across all business entities.
- Enable **workflow traceability** for ISO evidence (who/what/when/state transitions).
- Provide strong **referential integrity** across linked modules (Audit -> NC -> CAPA -> Effectiveness).
- Support **reporting performance** via targeted indexes and status/date dimensions.

---

## 2) Multi-Tenant Strategy

## 2.1 Tenant boundary model
- Shared PostgreSQL database and schema for MVP.
- Every tenant-owned table includes `tenant_id UUID NOT NULL`.
- All repository queries enforce tenant filter (`WHERE tenant_id = :tenantId`).

## 2.2 Common audit columns (standardized)
All transactional tables include:
- `created_at TIMESTAMPTZ NOT NULL DEFAULT now()`
- `created_by UUID NULL`
- `updated_at TIMESTAMPTZ NOT NULL DEFAULT now()`
- `updated_by UUID NULL`
- optional `deleted_at TIMESTAMPTZ NULL` for soft delete

## 2.3 ID conventions
- Primary keys use `UUID`.
- Reference naming: `<entity>_id`.

---

## 3) Core Enumerations (PostgreSQL enum or lookup tables)
Recommended enums:
- `record_status`: `draft`, `in_review`, `approved`, `released`, `active`, `closed`, `archived`, `obsolete`, `rejected`
- `severity_level`: `low`, `medium`, `high`, `critical`
- `likelihood_level`: `rare`, `unlikely`, `possible`, `likely`, `almost_certain`
- `action_priority`: `low`, `medium`, `high`, `urgent`
- `training_status`: `assigned`, `in_progress`, `completed`, `expired`, `overdue`
- `audit_result`: `conformity`, `observation`, `minor_nc`, `major_nc`
- `approval_decision`: `pending`, `approved`, `rejected`
- `notification_channel`: `in_app`, `email`

---

## 4) Entity Inventory (Required Tables)

## 4.1 Platform and tenant foundation

### `organizations`
- `id PK`
- `name`, `code` (unique)
- `status`
- `subscription_plan`, `subscription_status`
- `created_at`, `updated_at`

Indexes:
- `uq_organizations_code`
- `ix_organizations_status`

### `organization_settings`
- `id PK`
- `tenant_id FK -> organizations.id`
- `timezone`, `date_format`, `currency`
- `branding_logo_url`
- `document_number_prefix`
- `risk_scoring_method`
- `created_at`, `updated_at`

Indexes:
- `uq_org_settings_tenant_id`

### `sites`
- `id PK`
- `tenant_id FK`
- `name`, `code`, `address`
- `status`
- audit columns

Indexes:
- `uq_sites_tenant_code (tenant_id, code)`

### `departments`
- `id PK`
- `tenant_id FK`
- `site_id FK -> sites.id`
- `name`, `code`
- `manager_user_id FK -> users.id`
- `status`
- audit columns

Indexes:
- `uq_departments_tenant_code (tenant_id, code)`
- `ix_departments_tenant_site (tenant_id, site_id)`

---

## 4.2 Identity and access control

### `users`
- `id PK`
- `tenant_id FK` (nullable only for platform sysadmin if needed)
- `email` (unique scoped by tenant)
- `password_hash`
- `first_name`, `last_name`
- `is_active`, `last_login_at`, `failed_login_attempts`, `locked_until`
- `department_id FK -> departments.id` (nullable)
- audit columns

Indexes:
- `uq_users_tenant_email (tenant_id, email)`
- `ix_users_tenant_active (tenant_id, is_active)`

### `roles`
- `id PK`
- `tenant_id FK NULL` (NULL for system roles)
- `name`
- `description`
- `is_system_role BOOLEAN`
- audit columns

Indexes:
- `uq_roles_tenant_name (tenant_id, name)`

### `permissions`
- `id PK`
- `module` (e.g., documents)
- `action` (view/create/edit/approve/close/export)
- `key` unique (e.g., `documents:approve`)

Indexes:
- `uq_permissions_key`

### `user_roles`
- `id PK`
- `tenant_id FK`
- `user_id FK -> users.id`
- `role_id FK -> roles.id`
- `assigned_at`, `assigned_by`

Indexes:
- `uq_user_roles_tenant_user_role (tenant_id, user_id, role_id)`

### `role_permissions`
- `id PK`
- `tenant_id FK NULL` (for tenant custom roles)
- `role_id FK`
- `permission_id FK`

Indexes:
- `uq_role_permissions_role_perm (role_id, permission_id)`

---

## 4.3 Process and document system

### `processes`
- `id PK`
- `tenant_id FK`
- `department_id FK`
- `owner_user_id FK -> users.id`
- `name`, `code`, `purpose`
- `inputs_text`, `outputs_text`, `interactions_text`
- `status`
- audit columns

Indexes:
- `uq_processes_tenant_code (tenant_id, code)`
- `ix_processes_tenant_dept (tenant_id, department_id)`

### `process_kpis`
- `id PK`
- `tenant_id FK`
- `process_id FK -> processes.id`
- `kpi_id FK -> kpis.id`
- audit columns

Indexes:
- `uq_process_kpis (process_id, kpi_id)`

### `documents`
- `id PK`
- `tenant_id FK`
- `document_no` (tenant sequence)
- `title`
- `category`
- `owner_user_id FK -> users.id`
- `department_id FK -> departments.id`
- `process_id FK -> processes.id NULL`
- `current_version_id FK -> document_versions.id NULL`
- `status` (`draft`, `in_review`, `approved`, `released`, `obsolete`)
- `effective_date`, `next_review_date`
- audit columns

Indexes:
- `uq_documents_tenant_document_no (tenant_id, document_no)`
- `ix_documents_tenant_status (tenant_id, status)`
- `ix_documents_tenant_process (tenant_id, process_id)`

### `document_versions`
- `id PK`
- `tenant_id FK`
- `document_id FK -> documents.id`
- `version_no` (e.g., `1.0`, `1.1`)
- `change_summary`
- `file_attachment_id FK -> attachments.id NULL`
- `status`
- `is_current BOOLEAN`
- `effective_date`
- audit columns

Indexes:
- `uq_doc_versions_doc_version (document_id, version_no)`
- `ix_doc_versions_tenant_status (tenant_id, status)`

### `document_approvals`
- `id PK`
- `tenant_id FK`
- `document_version_id FK`
- `approver_user_id FK -> users.id`
- `decision approval_decision`
- `decision_comment`
- `decided_at`
- audit columns

Indexes:
- `ix_doc_approvals_doc_ver (document_version_id)`

### `document_access`
- `id PK`
- `tenant_id FK`
- `document_id FK`
- `role_id FK NULL`
- `department_id FK NULL`
- `user_id FK NULL`
- `can_view BOOLEAN`
- `can_download BOOLEAN`

Indexes:
- `ix_document_access_tenant_doc (tenant_id, document_id)`

---

## 4.4 Evidence and attachments

### `records`
- `id PK`
- `tenant_id FK`
- `record_type`
- `entity_name`
- `entity_id`
- `title`
- `status`
- audit columns

Indexes:
- `ix_records_tenant_entity (tenant_id, entity_name, entity_id)`

### `attachments`
- `id PK`
- `tenant_id FK`
- `storage_provider` (`local`,`s3`,`azure_blob`)
- `storage_key`
- `file_name`, `mime_type`, `size_bytes`, `checksum_sha256`
- `uploaded_by FK -> users.id`
- `entity_name`, `entity_id`
- `is_malware_scanned`, `malware_scan_status`
- `uploaded_at`

Indexes:
- `ix_attachments_tenant_entity (tenant_id, entity_name, entity_id)`
- `ix_attachments_uploaded_at (uploaded_at)`

---

## 4.5 Risk and opportunity

### `risks`
- `id PK`
- `tenant_id FK`
- `process_id FK`
- `department_id FK`
- `owner_user_id FK`
- `title`, `cause`, `impact`
- `likelihood likelihood_level`
- `severity severity_level`
- `risk_score INTEGER`
- `mitigation_plan`
- `review_date`, `status`
- audit columns

Indexes:
- `ix_risks_tenant_status (tenant_id, status)`
- `ix_risks_tenant_score (tenant_id, risk_score DESC)`
- `ix_risks_review_date (tenant_id, review_date)`

### `opportunities`
- `id PK`
- `tenant_id FK`
- `process_id FK`
- `department_id FK`
- `owner_user_id FK`
- `title`, `potential_benefit`, `action_plan`
- `status`, `review_date`
- audit columns

Indexes:
- `ix_opportunities_tenant_status (tenant_id, status)`

---

## 4.6 Nonconformity and corrective action

### `nonconformities`
- `id PK`
- `tenant_id FK`
- `source_type` (`audit`, `complaint`, `operation`, `supplier`, `other`)
- `source_ref_id UUID NULL`
- `department_id FK`
- `process_id FK NULL`
- `reported_by FK -> users.id`
- `owner_user_id FK -> users.id`
- `title`, `description`
- `classification`, `severity`
- `containment_action_text`
- `root_cause_text`
- `status`
- `due_date`, `closed_at`
- audit columns

Indexes:
- `ix_nc_tenant_status (tenant_id, status)`
- `ix_nc_tenant_due (tenant_id, due_date)`
- `ix_nc_source (tenant_id, source_type, source_ref_id)`

### `corrective_actions`
- `id PK`
- `tenant_id FK`
- `nonconformity_id FK -> nonconformities.id`
- `action_no`
- `owner_user_id FK`
- `plan_text`, `implementation_text`
- `priority action_priority`
- `target_date`, `completed_at`
- `status`
- `is_effectiveness_verified BOOLEAN DEFAULT false`
- audit columns

Indexes:
- `uq_ca_tenant_action_no (tenant_id, action_no)`
- `ix_ca_tenant_status_due (tenant_id, status, target_date)`

### `corrective_action_effectiveness_reviews`
- `id PK`
- `tenant_id FK`
- `corrective_action_id FK -> corrective_actions.id`
- `reviewed_by FK -> users.id`
- `review_date`
- `result` (`effective`, `partially_effective`, `ineffective`)
- `evidence_summary`
- `comments`
- `approved_by FK -> users.id NULL`
- `approved_at NULL`
- audit columns

Indexes:
- `ix_ca_effectiveness_ca_id (corrective_action_id)`

Constraint note:
- CAPA closure transition requires at least one approved effectiveness review row.

---

## 4.7 Internal audits

### `audits`
- `id PK`
- `tenant_id FK`
- `audit_no`
- `audit_type` (`internal`, `supplier`, `process`, `department`)
- `department_id FK NULL`
- `process_id FK NULL`
- `lead_auditor_user_id FK -> users.id`
- `planned_start_date`, `planned_end_date`
- `actual_start_date`, `actual_end_date`
- `scope_text`, `criteria_text`
- `status`
- audit columns

Indexes:
- `uq_audits_tenant_audit_no (tenant_id, audit_no)`
- `ix_audits_tenant_status_dates (tenant_id, status, planned_start_date)`

### `audit_checklists`
- `id PK`
- `tenant_id FK`
- `audit_id FK -> audits.id`
- `clause_ref`
- `question_text`
- `expected_evidence`
- `sort_order`
- audit columns

Indexes:
- `ix_audit_checklists_audit (audit_id)`

### `audit_findings`
- `id PK`
- `tenant_id FK`
- `audit_id FK -> audits.id`
- `checklist_id FK -> audit_checklists.id NULL`
- `finding_no`
- `result audit_result`
- `description`
- `evidence_text`
- `nonconformity_id FK -> nonconformities.id NULL`
- `status`
- audit columns

Indexes:
- `uq_audit_findings_no (tenant_id, finding_no)`
- `ix_audit_findings_audit (audit_id)`

---

## 4.8 Management reviews and actions

### `management_reviews`
- `id PK`
- `tenant_id FK`
- `review_no`
- `scheduled_at`, `held_at`
- `chair_user_id FK -> users.id`
- `status`
- `summary_text`
- audit columns

Indexes:
- `uq_mr_tenant_review_no (tenant_id, review_no)`
- `ix_mr_tenant_status_date (tenant_id, status, scheduled_at)`

### `management_review_inputs`
- `id PK`
- `tenant_id FK`
- `management_review_id FK`
- `input_type` (audit results, KPI, complaints, supplier performance, etc.)
- `input_ref_entity`, `input_ref_id`
- `notes`
- audit columns

Indexes:
- `ix_mr_inputs_review (management_review_id)`

### `management_review_minutes`
- `id PK`
- `tenant_id FK`
- `management_review_id FK`
- `agenda_text`
- `attendees_json`
- `decisions_text`
- `evidence_attachment_id FK -> attachments.id NULL`
- audit columns

Indexes:
- `uq_mr_minutes_review (management_review_id)`

### `actions`
- `id PK`
- `tenant_id FK`
- `action_no`
- `source_entity` (management_review, risk, kpi, audit, complaint, change_request)
- `source_id`
- `title`, `description`
- `owner_user_id FK`
- `priority action_priority`
- `due_date`, `completed_at`
- `status`
- audit columns

Indexes:
- `uq_actions_tenant_action_no (tenant_id, action_no)`
- `ix_actions_tenant_owner_due (tenant_id, owner_user_id, due_date)`

---

## 4.9 Training and competency

### `competencies`
- `id PK`
- `tenant_id FK`
- `name`, `description`
- `role_id FK -> roles.id NULL`
- `department_id FK -> departments.id NULL`
- `is_mandatory`
- audit columns

Indexes:
- `ix_competencies_tenant_role_dept (tenant_id, role_id, department_id)`

### `training_courses`
- `id PK`
- `tenant_id FK`
- `code`, `title`, `provider`
- `validity_months`
- `status`
- audit columns

Indexes:
- `uq_training_courses_tenant_code (tenant_id, code)`

### `training_assignments`
- `id PK`
- `tenant_id FK`
- `course_id FK -> training_courses.id`
- `user_id FK -> users.id`
- `assigned_by FK -> users.id`
- `assigned_at`
- `due_date`
- `status training_status`
- audit columns

Indexes:
- `ix_training_assignments_user_status (tenant_id, user_id, status)`
- `ix_training_assignments_due (tenant_id, due_date)`

### `training_records`
- `id PK`
- `tenant_id FK`
- `assignment_id FK -> training_assignments.id`
- `completion_date`
- `score NUMERIC(5,2) NULL`
- `certificate_attachment_id FK -> attachments.id NULL`
- `expiry_date`
- `verified_by FK -> users.id NULL`
- `status training_status`
- audit columns

Indexes:
- `ix_training_records_expiry (tenant_id, expiry_date)`

---

## 4.10 Objectives and KPI

### `objectives`
- `id PK`
- `tenant_id FK`
- `objective_no`
- `title`, `description`
- `owner_user_id FK`
- `department_id FK NULL`
- `target_date`
- `status`
- audit columns

Indexes:
- `uq_objectives_tenant_no (tenant_id, objective_no)`
- `ix_objectives_owner_status (tenant_id, owner_user_id, status)`

### `kpis`
- `id PK`
- `tenant_id FK`
- `objective_id FK -> objectives.id NULL`
- `name`
- `unit`
- `owner_user_id FK`
- `target_value NUMERIC(12,4)`
- `warning_threshold NUMERIC(12,4) NULL`
- `critical_threshold NUMERIC(12,4) NULL`
- `frequency` (`weekly`,`monthly`,`quarterly`,`yearly`)
- `status`
- audit columns

Indexes:
- `ix_kpis_tenant_owner (tenant_id, owner_user_id)`

### `kpi_measurements`
- `id PK`
- `tenant_id FK`
- `kpi_id FK -> kpis.id`
- `period_start`, `period_end`
- `actual_value NUMERIC(12,4)`
- `comment`
- `entered_by FK -> users.id`
- `entered_at`

Indexes:
- `ix_kpi_measurements_kpi_period (kpi_id, period_start, period_end)`

---

## 4.11 Customer complaints and suppliers

### `complaints`
- `id PK`
- `tenant_id FK`
- `complaint_no`
- `customer_name`, `customer_contact`
- `channel` (`email`,`phone`,`portal`,`in_person`,`other`)
- `received_at`
- `description`
- `classification`
- `owner_user_id FK`
- `resolution_text`
- `linked_nonconformity_id FK -> nonconformities.id NULL`
- `status`
- `due_date`, `closed_at`
- audit columns

Indexes:
- `uq_complaints_tenant_no (tenant_id, complaint_no)`
- `ix_complaints_tenant_status_due (tenant_id, status, due_date)`

### `suppliers`
- `id PK`
- `tenant_id FK`
- `supplier_no`
- `name`, `category`, `contact_email`
- `approval_status` (`approved`,`conditional`,`rejected`)
- `approved_at`
- `next_reassessment_date`
- `status`
- audit columns

Indexes:
- `uq_suppliers_tenant_no (tenant_id, supplier_no)`
- `ix_suppliers_reassessment (tenant_id, next_reassessment_date)`

### `supplier_evaluations`
- `id PK`
- `tenant_id FK`
- `supplier_id FK -> suppliers.id`
- `evaluation_date`
- `criteria_json`
- `score NUMERIC(6,2)`
- `result` (`approved`,`conditional`,`rejected`)
- `evaluator_user_id FK`
- `notes`
- audit columns

Indexes:
- `ix_supplier_evals_supplier_date (supplier_id, evaluation_date DESC)`

---

## 4.12 Change management and notifications

### `change_requests`
- `id PK`
- `tenant_id FK`
- `change_no`
- `title`, `description`
- `requester_user_id FK -> users.id`
- `owner_user_id FK -> users.id`
- `impact_assessment_text`
- `implementation_plan_text`
- `effectiveness_review_text`
- `status`
- `requested_at`, `approved_at`, `closed_at`
- audit columns

Indexes:
- `uq_changes_tenant_no (tenant_id, change_no)`
- `ix_changes_tenant_status (tenant_id, status)`

### `notifications`
- `id PK`
- `tenant_id FK`
- `user_id FK -> users.id`
- `channel notification_channel`
- `event_type`
- `title`, `message`
- `entity_name`, `entity_id`
- `is_read BOOLEAN DEFAULT false`
- `sent_at`, `read_at`
- audit columns

Indexes:
- `ix_notifications_user_read (tenant_id, user_id, is_read)`
- `ix_notifications_event (tenant_id, event_type, sent_at DESC)`

---

## 4.13 Audit and reporting support

### `audit_logs`
- `id PK`
- `tenant_id FK`
- `user_id FK -> users.id NULL`
- `action` (`create`,`update`,`delete`,`approve`,`close`,`login`,`export`,`deny`)
- `entity_name`
- `entity_id`
- `old_value JSONB NULL`
- `new_value JSONB NULL`
- `ip_address`
- `user_agent`
- `reason_code NULL`
- `created_at`

Indexes:
- `ix_audit_logs_tenant_entity_time (tenant_id, entity_name, created_at DESC)`
- `ix_audit_logs_tenant_user_time (tenant_id, user_id, created_at DESC)`
- `ix_audit_logs_action (tenant_id, action, created_at DESC)`

### `reports`
- `id PK`
- `tenant_id FK`
- `report_type`
- `filters_json`
- `generated_by FK -> users.id`
- `file_attachment_id FK -> attachments.id NULL`
- `generated_at`

Indexes:
- `ix_reports_tenant_type_time (tenant_id, report_type, generated_at DESC)`

---

## 5) Relationship Highlights (Critical Traceability)
- `audits (1) -> (N) audit_findings`
- `audit_findings (0..1) -> (1) nonconformities`
- `nonconformities (1) -> (N) corrective_actions`
- `corrective_actions (1) -> (N) corrective_action_effectiveness_reviews`
- `complaints (0..1) -> (1) nonconformities`
- `change_requests -> documents/document_versions/training_assignments` via source links
- `management_reviews (1) -> (N) actions`
- `objectives (1) -> (N) kpis -> (N) kpi_measurements`

This chain enables “show me full lifecycle evidence” queries for internal/external audits.

---

## 6) Recommended Constraints and Business Rules
1. **Tenant FK integrity**: child rows must match parent `tenant_id`.
2. **Document current version**: exactly one `document_versions.is_current = true` per document.
3. **CAPA closure gate**: forbid `corrective_actions.status='closed'` unless approved effectiveness review exists.
4. **Audit closure gate**: forbid `audits.status='closed'` while open major findings exist.
5. **Management review closure gate**: required inputs/minutes/actions present before closure.
6. **Soft-delete policy**: prohibited for evidence-critical entities unless archived first.

---

## 7) Partitioning and Performance Strategy (Scale Phase)
- Partition `audit_logs` by month (`created_at`) and optionally by tenant class.
- Consider partitioning `notifications` and `kpi_measurements` for high-volume tenants.
- Add materialized views for dashboard metrics:
  - open NC count by department,
  - overdue CAPA by owner,
  - audit status by month,
  - training completion percentage,
  - KPI attainment summary.

---

## 8) Initial Migration Ordering
1. Foundation: organizations, settings, sites, departments.
2. Identity/RBAC: users, roles, permissions, user_roles, role_permissions.
3. Core QMS: processes, documents, versions, approvals, attachments, records.
4. Risk/NC/CAPA/audits.
5. Management review/actions.
6. Training/competency.
7. Objectives/KPIs/measurements.
8. Complaints/suppliers/evaluations.
9. Change requests/notifications.
10. Audit logs/reports.

---

## 9) Seed Data Requirements (MVP)
- System roles and baseline permissions.
- Default statuses/lookups.
- Demo tenant with sample departments/processes.
- Minimal sample records for each workflow to validate dashboard/report queries.

---

## 10) Example DDL Snippets (Reference)

```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  code VARCHAR(50) NOT NULL UNIQUE,
  status VARCHAR(30) NOT NULL,
  subscription_plan VARCHAR(50),
  subscription_status VARCHAR(30),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES organizations(id),
  email VARCHAR(255) NOT NULL,
  password_hash TEXT NOT NULL,
  first_name VARCHAR(120) NOT NULL,
  last_name VARCHAR(120) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  failed_login_attempts INTEGER NOT NULL DEFAULT 0,
  locked_until TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID NULL,
  CONSTRAINT uq_users_tenant_email UNIQUE (tenant_id, email)
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES organizations(id),
  user_id UUID NULL REFERENCES users(id),
  action VARCHAR(30) NOT NULL,
  entity_name VARCHAR(100) NOT NULL,
  entity_id UUID NULL,
  old_value JSONB NULL,
  new_value JSONB NULL,
  ip_address INET NULL,
  user_agent TEXT NULL,
  reason_code VARCHAR(100) NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

## 11) Definition of Done for Step 5
Step 5 is complete when:
- All required entities are mapped with PK/FK, status, audit fields, and tenant reference.
- Index strategy supports core workflows and dashboard/report filters.
- Critical workflow constraints for CAPA/audits/reviews are defined.
- Schema is ready to be translated into migrations in the next implementation step.
