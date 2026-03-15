# ISO 9001:2015 QMS SaaS – Product Requirements Document (Step 1)

## 1) Product Overview

### 1.1 Product Name
**eAudit QMS Cloud** (working title)

### 1.2 Product Vision
Deliver a practical, audit-ready, multi-tenant ISO 9001:2015 Quality Management System (QMS) SaaS platform that helps organizations implement, operate, maintain, and continually improve their quality management systems.

### 1.3 Product Goals
- Enable end-to-end ISO 9001 workflows with traceable records.
- Reduce manual spreadsheet/email-based quality operations.
- Improve visibility of risks, nonconformities, actions, and KPI performance.
- Provide external-auditor-ready evidence and immutable audit history.

### 1.4 Non-Goals (MVP)
- Full ERP integration (planned post-MVP).
- Native mobile apps (web-responsive MVP first).
- Advanced AI analytics (future enhancement).

---

## 2) Problem Statement
Organizations implementing ISO 9001 frequently struggle with fragmented processes: documents in shared drives, actions in email, audits in spreadsheets, and inconsistent evidence. This causes weak traceability, delayed CAPA closure, overdue trainings, and difficult certification audits.

The product must centralize QMS operations with role-based control, tenant isolation, configurable workflows, and complete audit trails.

---

## 3) Target Users and Personas

1. **System Administrator (Platform)**
   - Manages tenants, plans, global settings, user lifecycle.
2. **Organization Admin**
   - Configures organization structure, users, roles, and defaults.
3. **Quality Manager**
   - Owns core QMS operations and ISO evidence quality.
4. **Department Manager**
   - Monitors departmental KPIs, approves/executes actions.
5. **Process Owner**
   - Maintains process controls, risks, KPIs, and linked docs.
6. **Internal Auditor**
   - Plans/executes audits; raises and verifies findings.
7. **Employee**
   - Uses controlled documents, records training, raises issues.
8. **External Auditor (Read-Only)**
   - Reviews authorized records/evidence without edit rights.

---

## 4) Business Requirements

### 4.1 Core Business Capabilities
The platform shall support:
- Document/record control with versioning and approvals.
- Nonconformity and CAPA lifecycle with effectiveness verification.
- Internal audit planning, execution, findings, and closure.
- Risk and opportunity management with scoring and review cycles.
- Management review preparation, decisions, and action tracking.
- KPI/objective definition, performance tracking, and escalation.
- Training/competency assignment and completion/expiry tracking.
- Supplier evaluation and complaint handling.
- Change management and cross-module linkage.
- Reports, dashboards, alerts, and exportable evidence packs.

### 4.2 Multi-Tenant SaaS Requirements
- Strict tenant data separation.
- Tenant-specific branding/configuration.
- Subscription-aware feature control.
- Scalable architecture for concurrent tenant usage.

### 4.3 Compliance and Traceability Requirements
- Every critical transaction logs: actor, timestamp, entity, old/new value.
- Evidence must be searchable and linked to clauses/processes/actions.
- System must retain revision and approval history for controlled documents.

---

## 5) Functional Requirements (FR)

### FR-01 Authentication & Session
- Secure login with JWT + refresh token.
- Password hashing and lock/rate-limit strategy.
- Session invalidation on credential compromise.

### FR-02 Authorization (RBAC)
- Role-based access by module/action (view/create/edit/approve/close/export).
- External auditor role read-only and scope-limited.

### FR-03 Organization Setup
- Create organizations, sites, departments, and process hierarchy.
- Assign users to departments and roles.

### FR-04 Document Control
- Workflow states: Draft → Review → Approve → Release → Revise → Obsolete/Archive.
- Version control with approval and revision history.
- Metadata: owner, department, category, linked process, effective date.
- Access control by role/department/process.

### FR-05 Records & Evidence Repository
- Upload files with metadata and entity links.
- Preview/download with permission checks.
- Immutable history of evidence references.

### FR-06 Process Register
- Process list/map with owner, inputs/outputs, interactions, KPIs.
- Link processes to documents, risks, audits, and objectives.

### FR-07 Risk & Opportunity Register
- Create risk/opportunity; assign owner and scope.
- Score (likelihood × severity), prioritize, and track mitigation.
- Periodic review reminders and carry-forward/closure.

### FR-08 Nonconformity Management
- Raise from audits, complaints, operations, or customer feedback.
- Classification, containment, root cause, status tracking.

### FR-09 CAPA Management
- Corrective action plan, responsibility, due dates, evidence.
- Mandatory effectiveness review before closure.
- Overdue and escalation notifications.

### FR-10 Internal Audit Management
- Annual audit plan and detailed schedules.
- Checklist templates and execution records.
- Findings linked to nonconformities and actions.

### FR-11 Management Review
- Schedule reviews, gather required inputs, capture decisions.
- Assign and track outputs/actions until verified closure.

### FR-12 Objectives and KPI Management
- Define quality objectives and KPIs with targets/frequency.
- Capture actuals, trend status, underperformance alerts.

### FR-13 Training & Competency
- Competency matrix by role.
- Assign training, track completion, expiry, and evidence.

### FR-14 Notifications
- In-app reminders for due/overdue/approval-required events.
- Backend-ready event model for email dispatch.

### FR-15 Reporting & Analytics
- Dashboards and filtered reports by date/department/process/status.
- Export to CSV/Excel/PDF (phased delivery, MVP includes CSV/PDF baseline).

### FR-16 Full Audit Trail
- Track create/update/delete/approve/close actions.
- Queryable logs with filters by user, module, entity, date range.

---

## 6) Workflow Requirements

### 6.1 Document Workflow
- Required transitions and role-based approvals.
- Enforce effective date and archival policy.
- Obsolete versions remain retrievable (read-only, clearly marked).

### 6.2 Nonconformity + CAPA Workflow
- Cannot close CAPA without recorded effectiveness review outcome.
- Link evidence at containment, implementation, and effectiveness stages.

### 6.3 Internal Audit Workflow
- Annual planning → schedule → execute → findings → follow-up → closure.
- Findings can auto-generate nonconformity/CAPA records.

### 6.4 Management Review Workflow
- Inputs checklist validation before meeting closure.
- Decision/action traceability to owners and due dates.

### 6.5 Risk/Opportunity Workflow
- Periodic review due dates mandatory.
- Risk level recalculation after mitigation updates.

### 6.6 Training Workflow
- Role-based mandatory training assignment.
- Expiry reminders and retraining triggers.

### 6.7 KPI/Objectives Workflow
- Baseline, target, reporting frequency, owner mandatory.
- Threshold breach triggers action/escalation workflow.

### 6.8 Supplier & Complaint Workflows
- Complaint may trigger NC/CAPA.
- Supplier reassessment reminders based on cadence and score.

### 6.9 Change Management Workflow
- Impact assessment and approval required before implementation.
- Post-implementation effectiveness review mandatory before closure.

---

## 7) Non-Functional Requirements (NFR)

### 7.1 Security
- Tenant-level isolation in all reads/writes.
- Secure password hashing, JWT best practices, guarded routes.
- File upload validation (type, size, malware-scan-ready hook).

### 7.2 Performance
- P95 API response under 500ms for common list/detail operations (target).
- Dashboard load under 3 seconds for typical tenant dataset.

### 7.3 Scalability
- Stateless backend service instances.
- PostgreSQL indexing strategy for tenant + status + date fields.

### 7.4 Reliability & Availability
- Graceful error handling and retry-safe APIs.
- Backup and restore strategy for tenant-critical data.

### 7.5 Usability
- Enterprise desktop-first responsive UI.
- Clear statuses, due date visibility, and role-tailored dashboards.

### 7.6 Auditability
- Immutable audit logs for critical transitions.
- Deterministic record linkage for ISO evidence extraction.

---

## 8) Data & Record Retention Requirements
- Configurable retention periods for documents, records, and logs.
- Archived content remains searchable with read-only controls.
- Soft-delete with retention safeguards for regulated evidence.

---

## 9) Integration Requirements (MVP + Future)
### MVP
- Internal APIs only.
- CSV import/export for selected masters and reports.

### Post-MVP
- SSO (SAML/OIDC), HRIS for training sync, ERP/CRM integration, email/SMTP provider integration, BI connectors.

---

## 10) MVP Scope Definition
MVP includes:
1. Authentication and user management
2. Organization and department setup
3. Document control
4. Process register
5. Risk register
6. Nonconformity and corrective action
7. Internal audit management
8. Management review
9. KPI dashboard
10. Training matrix
11. Audit trail
12. Notifications

### MVP Out of Scope
- Advanced supplier scoring models
- Full complaint omnichannel intake
- Complex workflow designer
- AI-based root cause recommendation

---

## 11) Success Metrics (KPIs for Product)
- ≥90% of critical records linked to owning process or clause.
- ≥80% of CAPAs closed on or before due date within 6 months.
- ≥95% document approval trail completeness.
- ≥70% reduction in manual spreadsheet-based tracking in pilot tenants.
- External audit preparation time reduced by ≥40% (self-reported).

---

## 12) Assumptions and Constraints

### Assumptions
- Organizations will configure master data (departments/processes/roles).
- Internet-based usage with modern browsers.

### Constraints
- Mandatory stack: Angular 17+, NestJS, PostgreSQL, Docker, Nginx.
- Must support multi-tenant isolation from first release.

---

## 13) Risks and Mitigations
- **Risk:** Overly broad first release.  
  **Mitigation:** Strict MVP scope and phased module rollout.
- **Risk:** Poor user adoption due to process complexity.  
  **Mitigation:** Guided workflows, defaults, role-specific dashboards.
- **Risk:** Data quality issues.  
  **Mitigation:** Required fields, validations, controlled vocabularies.
- **Risk:** Audit evidence gaps.  
  **Mitigation:** Mandatory links and closure checks in workflows.

---

## 14) Acceptance Criteria (Step 1 PRD Baseline)
This PRD is complete when it clearly defines:
- Product vision, scope, users, workflows, and constraints.
- Functional + non-functional requirements for MVP delivery.
- Compliance-driven traceability expectations.
- Measurable success criteria and phased implementation direction.

---

## 15) Phase Alignment Reference
- **Step 1 (this document):** Complete PRD.
- **Upcoming steps:** Role-permission matrix, ISO clause mapping, architecture, schema, APIs, MVP code, dashboards/reporting, audit trail/notifications, tests, deployment.

---

## 16) Detailed MVP Epics and Acceptance Signals

### Epic A: Tenant and Access Foundation
- Tenant onboarding creates isolated organization workspace with default roles.
- Users authenticate with JWT access + refresh token flow.
- Access checks enforce role + tenant constraints on every API request.

**Acceptance signals**
- Cross-tenant data access attempts are denied and logged.
- Session refresh issues new access token without re-login.

### Epic B: Controlled Documentation
- Controlled documents must follow lifecycle transitions and maintain immutable revision trail.
- Released versions are read-only and visible by access rules.

**Acceptance signals**
- System blocks invalid transitions (e.g., draft directly to release without approvals).
- Obsolete versions remain searchable with clear status marking.

### Epic C: Nonconformity and CAPA Control
- Nonconformities can be raised from audits, operations, complaints.
- CAPA closure requires effectiveness verification.

**Acceptance signals**
- CAPA cannot be closed if effectiveness review is missing.
- Overdue CAPAs generate notification events.

### Epic D: Internal Audit Execution
- Annual plan supports planned audits with schedule, scope, and assignees.
- Findings link to NC/CAPA records for closure tracking.

**Acceptance signals**
- Audit closure is blocked while major findings remain unresolved.
- Follow-up verification result is recorded and traceable.

### Epic E: Management Review Governance
- Management review captures required inputs, meeting minutes, outputs, and actions.

**Acceptance signals**
- Review closure requires mandatory input checklist completeness.
- Review actions are assigned with owner/due date and tracked to closure.

### Epic F: KPI and Training Visibility
- KPI/objective tracking provides target vs actual trend and underperformance flags.
- Training matrix tracks assignment, completion, evidence, and expiry.

**Acceptance signals**
- KPI breach can generate improvement action.
- Expired training records appear on dashboard widgets and reminders.

---

## 17) User Journey Summaries (MVP)

### Journey 1: Quality Manager – Document Release
1. Creates draft with owner/department/process metadata.
2. Submits for review and approval.
3. Receives approval decision.
4. Releases effective version and notifies relevant users.
5. Later revises and supersedes prior version.

### Journey 2: Internal Auditor – Finding to Closure
1. Executes checklist during planned audit.
2. Records finding with evidence.
3. Converts finding to NC/CAPA.
4. Tracks corrective action implementation.
5. Verifies effectiveness and closes.

### Journey 3: Department Manager – KPI Deviation
1. Reviews KPI dashboard and deviation alert.
2. Opens related objective and trend.
3. Assigns corrective/improvement action.
4. Monitors due date and closure evidence.

### Journey 4: Employee – Training Compliance
1. Receives assigned training requirement.
2. Completes training and uploads certificate.
3. Supervisor verifies completion.
4. System sets expiry and reminder cycle.

---

## 18) Reporting Baseline for Step 1 Scope
MVP reporting outputs must include:
- Open NC count by department/process.
- CAPA overdue summary by owner.
- Audit status (planned/in-progress/closed) by period.
- Training completion and expiry status by department.
- KPI target-attainment summary.
- Document state distribution (draft/review/released/obsolete).

Each report must support date-range filtering and tenant-safe export.

---

## 19) Glossary
- **NC:** Nonconformity.
- **CAPA:** Corrective and Preventive Action (MVP focuses corrective action with effectiveness verification).
- **Controlled Document:** Document under version/approval/release governance.
- **Effectiveness Review:** Verification that corrective action eliminated root cause and prevented recurrence.
- **Tenant:** Isolated organization data boundary in SaaS platform.
- **Evidence Record:** File or data artifact supporting compliance demonstration.
