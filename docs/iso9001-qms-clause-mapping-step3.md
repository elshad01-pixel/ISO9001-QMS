# ISO 9001:2015 QMS SaaS – Step 3 Clause-to-Module & Workflow Mapping

## 1) Purpose
This document maps eAudit QMS modules and workflows to ISO 9001:2015 clauses to ensure:
- traceable compliance implementation,
- evidence-oriented operation,
- audit-readiness for internal and external audits.

It is intended to guide product, engineering, and audit stakeholders during architecture (Step 4) and implementation phases.

---

## 2) Clause Coverage Matrix (Module-Level)

Legend:
- **P** = Primary support (module is core to the clause intent)
- **S** = Secondary support (module contributes evidence/context)

| Module | 4 Context | 5 Leadership | 6 Planning | 7 Support | 8 Operation | 9 Performance Evaluation | 10 Improvement |
|---|---:|---:|---:|---:|---:|---:|---:|
| Dashboard & Executive Overview | S | S | S | S | S | P | S |
| User, Role, Permission Management | S | P | S | P | S | S | S |
| Organization / Department / Site Management | P | S | S | S | P | S | S |
| Document Control | S | S | S | P | P | S | P |
| Records & Evidence Repository | S | S | S | P | P | P | P |
| Process Register / Process Map | P | S | P | S | P | S | S |
| Risk & Opportunity Register | S | S | P | S | S | S | P |
| Nonconformity Management | S | S | S | S | P | S | P |
| Corrective Action / CAPA | S | S | S | S | S | S | P |
| Internal Audit Management | S | S | S | S | S | P | P |
| Management Review Management | S | P | S | S | S | P | P |
| Objectives & KPI Management | S | P | P | S | S | P | P |
| Training & Competency Matrix | S | S | S | P | S | S | P |
| Customer Complaint Management | S | S | S | S | P | S | P |
| Supplier Evaluation & Monitoring | S | S | P | S | P | S | P |
| Change Management | S | S | P | S | P | S | P |
| Notifications & Reminders | S | S | S | P | S | S | S |
| Reporting & Analytics | S | S | S | S | S | P | P |
| Full Audit Trail | S | S | S | P | S | P | P |
| System Settings | S | P | S | P | S | S | S |

---

## 3) Detailed ISO 9001:2015 Clause Mapping

## Clause 4 — Context of the Organization
### 4.1 Understanding the organization and its context
**Primary modules**
- Organization / Department / Site Management
- Process Register / Process Map
- Risk & Opportunity Register

**How software supports compliance**
- Models organization boundaries, functions, sites, and process interactions.
- Maintains context-linked process ownership and interested-party relevant risks/opportunities.

**Typical evidence outputs**
- Organization structure snapshot, site list, process map.
- Context/risk records linked to strategic or operational processes.

### 4.2 Understanding needs and expectations of interested parties
**Primary modules**
- Customer Complaint Management
- Supplier Evaluation & Monitoring
- Management Review

**Evidence outputs**
- Complaint trends and response records.
- Supplier performance/evaluation records.
- Management review inputs summarizing stakeholder expectations.

### 4.3 Determining scope of QMS
**Primary modules**
- Organization / Department / Site Management
- System Settings (tenant-level scope metadata)

**Evidence outputs**
- QMS scope statements and applicable departments/sites.

### 4.4 QMS and its processes
**Primary modules**
- Process Register / Process Map
- Document Control

**Evidence outputs**
- Approved process definitions, interactions, inputs/outputs, owners, linked procedures/forms.

---

## Clause 5 — Leadership
### 5.1 Leadership and commitment
**Primary modules**
- Management Review
- Objectives & KPI Management
- Dashboard & Executive Overview

**Evidence outputs**
- Leadership review minutes and actions.
- Approved quality objectives and monitored KPI performance.

### 5.2 Quality policy
**Primary modules**
- Document Control
- Training & Competency (policy awareness assignment)

**Evidence outputs**
- Approved quality policy revision history.
- Training acknowledgments/awareness records for policy communication.

### 5.3 Organizational roles, responsibilities, authorities
**Primary modules**
- User, Role, Permission Management
- Organization / Department Management

**Evidence outputs**
- Role matrix, user-role assignment records, delegated authorities.

---

## Clause 6 — Planning
### 6.1 Actions to address risks and opportunities
**Primary modules**
- Risk & Opportunity Register
- CAPA
- Change Management

**Evidence outputs**
- Risk scoring, treatment plans, due dates, and review history.
- Preventive/corrective action linkage from risk decisions.

### 6.2 Quality objectives and planning to achieve them
**Primary modules**
- Objectives & KPI Management
- Actions (via CAPA / improvement actions)

**Evidence outputs**
- Objective definitions, KPI targets, baselines, periodic actuals, action plans.

### 6.3 Planning of changes
**Primary modules**
- Change Management
- Document Control
- Training (if change requires competency update)

**Evidence outputs**
- Change requests with impact assessment and approvals.
- Revised controlled documents and rollout training records.

---

## Clause 7 — Support
### 7.1 Resources
**Primary modules**
- Training & Competency
- Supplier Evaluation (external providers)
- Organization management (resource ownership context)

**Evidence outputs**
- Competence/training coverage, supplier capability records.

### 7.2 Competence
**Primary modules**
- Training & Competency Matrix

**Evidence outputs**
- Competency requirements by role, training completion and certification records.

### 7.3 Awareness
**Primary modules**
- Training
- Notifications & Reminders

**Evidence outputs**
- Awareness assignment logs, reminders, completion acknowledgments.

### 7.4 Communication
**Primary modules**
- Notifications
- Management Review
- Complaints

**Evidence outputs**
- Notification/event logs, communication records in complaints/reviews.

### 7.5 Documented information
**Primary modules**
- Document Control
- Records & Evidence Repository
- Full Audit Trail

**Evidence outputs**
- Versioned documents, approval trails, immutable audit logs, attached evidence records.

---

## Clause 8 — Operation
### 8.1 Operational planning and control
**Primary modules**
- Process Register
- Document Control
- Risk Register
- Change Management

**Evidence outputs**
- Process controls, applicable procedures, operational risks, approved changes.

### 8.2 Requirements for products and services (customer communication/feedback)
**Primary modules**
- Customer Complaint Management

**Evidence outputs**
- Complaint intake, classification, investigation, response and closure records.

### 8.4 Control of externally provided processes/products/services
**Primary modules**
- Supplier Evaluation & Monitoring

**Evidence outputs**
- Supplier approvals, periodic evaluations, conditional status rationale.

### 8.5 Production/service provision control
**Primary modules**
- Process Register
- Documents
- Records repository

**Evidence outputs**
- Controlled work instructions, execution records, retained evidence.

### 8.7 Control of nonconforming outputs
**Primary modules**
- Nonconformity Management
- CAPA

**Evidence outputs**
- NC records, containment actions, disposition decisions, corrective action links.

---

## Clause 9 — Performance Evaluation
### 9.1 Monitoring, measurement, analysis, evaluation
**Primary modules**
- Objectives & KPI
- Dashboard
- Reporting & Analytics

**Evidence outputs**
- KPI trend reports, target-vs-actual dashboards, filtered analytics exports.

### 9.2 Internal audit
**Primary modules**
- Internal Audit Management
- Audit findings linkage to NC/CAPA

**Evidence outputs**
- Annual audit plan, schedules, checklists, findings, follow-up and closure evidence.

### 9.3 Management review
**Primary modules**
- Management Review Management

**Evidence outputs**
- Inputs, agenda, attendees, decisions, action assignments, closure status.

---

## Clause 10 — Improvement
### 10.1 General
**Primary modules**
- CAPA
- Nonconformities
- KPI/Reporting

**Evidence outputs**
- Improvement pipeline, trend-driven actions, verified closures.

### 10.2 Nonconformity and corrective action
**Primary modules**
- Nonconformity Management
- CAPA
- Effectiveness Review records

**Evidence outputs**
- Root cause analysis, corrective plans, implementation evidence, effectiveness verification.

### 10.3 Continual improvement
**Primary modules**
- Management Review
- KPIs/Objectives
- Internal Audits
- Change Management

**Evidence outputs**
- Continual improvement decisions, objective revisions, recurring issue reduction trends.

---

## 4) Workflow-to-Clause Mapping

| Workflow | Primary Clauses | Supporting Clauses | Compliance Contribution |
|---|---|---|---|
| A. Document Control | 7.5, 8.1 | 5.2, 10.3 | Ensures documented information is controlled, current, approved, and traceable. |
| B. Nonconformity & CAPA | 8.7, 10.2 | 9.1, 10.3 | Enforces issue control, root cause correction, effectiveness verification, and recurrence prevention. |
| C. Internal Audit | 9.2 | 9.1, 10.2 | Provides systematic audit evidence and drives corrective actions. |
| D. Management Review | 9.3 | 5.1, 6.2, 10.3 | Demonstrates leadership oversight and strategic improvement decisions. |
| E. Risk & Opportunity | 6.1 | 4.1, 6.3, 10.3 | Formalizes risk-based thinking and planned mitigation/opportunity actions. |
| F. Training | 7.2, 7.3 | 7.1, 7.4 | Demonstrates competence and awareness for effective QMS operation. |
| G. KPI / Objectives | 6.2, 9.1 | 5.1, 10.3 | Links objectives to measurable performance and improvement triggers. |
| H. Supplier Evaluation | 8.4 | 7.1, 6.1 | Controls external providers and monitors supplier quality performance. |
| I. Customer Complaint | 8.2, 8.7 | 9.1, 10.2 | Captures customer dissatisfaction and ensures controlled resolution/improvement linkage. |
| J. Change Management | 6.3, 8.1 | 6.1, 7.5, 10.3 | Controls planned changes, impacts, approvals, and post-change effectiveness. |

---

## 5) Evidence Model by Module (What auditors can verify)

| Module | Key records generated | Typical auditor checks |
|---|---|---|
| Documents | versions, approvals, release dates, obsolete archive | document control compliance, approved current versions in use |
| Processes | process owners, interactions, linked SOPs | defined process approach and accountability |
| Risks | risk scores, treatments, review dates | risk-based planning and review cadence |
| Nonconformities | issue classifications, containment, status history | nonconforming output control and timely disposition |
| CAPA | root cause, actions, due dates, effectiveness results | 10.2 compliance and effectiveness before closure |
| Audits | plans, checklists, findings, follow-up | audit program effectiveness and closure discipline |
| Management Reviews | inputs, minutes, decisions, actions | leadership review frequency and action tracking |
| Training | competency matrix, assignments, completions, expiries | competence and awareness evidence |
| KPIs | targets, actuals, trend statuses | objective monitoring and data-driven decisions |
| Suppliers | approvals, evaluations, reassessment logs | external provider control |
| Complaints | complaint lifecycle records, linked NC/CAPA | customer feedback handling and corrective linkage |
| Change Management | impact assessments, approvals, validation | controlled change planning and execution |
| Reports | scheduled/filtered exports | evidence consolidation and management visibility |
| Audit Trail | who/when/what changed (old/new) | integrity and traceability of critical records |

---

## 6) Traceability Rules (Implementation Guidance)
To preserve audit-ready traceability across clauses:
1. Every transactional entity includes `tenant_id`, `created_by`, `created_at`, `updated_by`, `updated_at`.
2. Critical transitions (`approve`, `close`, `release`, `archive`) require workflow-state validation.
3. Every critical transition writes an `audit_log` entry with old/new payload snapshot.
4. Cross-entity links are mandatory where defined:
   - audit finding -> nonconformity -> CAPA -> effectiveness review,
   - risk -> mitigation action -> KPI/objective impact,
   - complaint -> nonconformity/CAPA (when escalation criteria met),
   - change request -> revised document version -> training assignment.
5. Exports include metadata (generated-by, generated-at, filters) to support evidence authenticity.

---

## 7) Minimum ISO Evidence Pack (Per Audit Cycle)
The platform should be able to generate a clause-oriented evidence pack containing at least:
- QMS scope and process map (Clause 4).
- Quality policy, objectives, role assignments (Clause 5/6).
- Controlled document index + revision/approval logs (Clause 7.5).
- Risk register and treatment status (Clause 6.1).
- NC/CAPA register with effectiveness outcomes (Clause 8.7/10.2).
- Internal audit plan/results and closure status (Clause 9.2).
- Management review minutes and actions (Clause 9.3).
- KPI performance summaries and trend analyses (Clause 9.1/10.3).
- Training competence records and expiry compliance (Clause 7.2/7.3).
- Supplier evaluation records and complaint trend reports (Clause 8.4/8.2).

---

## 8) Gaps to Watch During Step 4+ Implementation
- Ensure module workflows enforce clause-critical gates (e.g., CAPA effectiveness before closure).
- Avoid “document upload only” behavior without stateful control and approvals.
- Ensure external auditor role is evidence-scoped and strictly read-only.
- Ensure reporting exports remain tenant-isolated and filter-auditable.
- Maintain mapping metadata to clauses on templates/forms/reports for fast audit retrieval.
