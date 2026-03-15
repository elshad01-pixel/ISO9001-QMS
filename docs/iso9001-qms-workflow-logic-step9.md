# ISO 9001:2015 QMS SaaS – Step 9 Workflow Logic (Backend)

Implemented backend workflow logic and validations in NestJS services/controllers for:

1. Document approval workflow
2. CAPA lifecycle
3. Audit findings tracking
4. Training expiration reminders
5. Risk review reminders
6. Overdue action alerts

## 1) Document approval workflow
- Endpoint: `POST /documents/:id/transition`
- Valid transitions:
  - `draft -> in_review` (`submit_review`)
  - `in_review -> approved` (`approve`)
  - `approved -> released` (`release`)
  - `released|approved -> draft` (`revise`)
  - `released|approved -> obsolete` (`archive`)
- Validation:
  - Transition must be valid from current state.
  - `release` requires `effectiveDate`.
- Traceability:
  - Appends to `metadata.workflowHistory` with actor, from/to, comment, timestamp.

## 2) CAPA lifecycle
- Endpoint: `POST /corrective-actions/:id/transition`
- Valid transitions:
  - `open -> containment`
  - `containment -> root_cause_completed`
  - `root_cause_completed -> plan_approved`
  - `plan_approved -> implementation`
  - `implementation -> effectiveness_review`
  - `effectiveness_review -> effectiveness_review` (`verify_effectiveness`)
  - `effectiveness_review -> closed`
- Validation:
  - Transition guard enforces state machine.
  - `verify_effectiveness` requires `effectivenessVerified=true`.
  - `close` denied unless effectiveness verified.
- Traceability:
  - Writes workflow history and review/closure metadata.

## 3) Audit findings tracking
- Endpoints:
  - `POST /audits/:id/findings`
  - `POST /audits/:id/findings/:findingId/close`
  - `POST /audits/:id/close`
- Validation:
  - Major finding open => audit close is blocked.
- Traceability:
  - Findings and summary (`total/open/closed/majorOpen`) stored in metadata.

## 4) Training expiration reminders
- Endpoints:
  - `GET /training/expiring?days=30`
  - `POST /training/reminders/expiry?days=30`
- Logic:
  - Reads `metadata.expiryDate`.
  - Finds records expiring within threshold.
  - Generates `training.expiry_due` notification rows.

## 5) Risk review reminders
- Endpoints:
  - `GET /risks/reviews/due`
  - `POST /risks/reviews/reminders`
- Logic:
  - Reads `metadata.reviewDate`.
  - Flags due/overdue risks.
  - Generates `risk.review_due` notification rows.

## 6) Overdue action alerts
- Endpoint: `POST /corrective-actions/alerts/overdue`
- Logic:
  - Scans open implementation/effectiveness CAPA states.
  - Reads `metadata.dueDate`.
  - Generates `capa.overdue` notifications for overdue items.

## Notes
- These Step 9 rules are foundational and enforceable now via service-level validation.
- Next hardening steps:
  - Move workflow metadata into dedicated normalized tables.
  - Add tenant-scoped query predicates on all repository calls.
  - Add audit log writes for each transition/reminder event.
