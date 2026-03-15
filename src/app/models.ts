// Basic domain models for eAudit – kept intentionally minimal for MVP

export type YesNoNA = 'Yes' | 'No' | 'N/A';

export interface User {
  id: string;
  email: string;
  name?: string;
  position?: string;
  division?: string;
  role?: 'admin' | 'inspector' | 'viewer';
}

export interface ChecklistQuestion {
  id: string;
  text: string;
}

export interface ChecklistTemplate {
  id: string;
  name: string;
  description?: string;
  questions: ChecklistQuestion[];
  createdBy?: string; // user id
}

export interface InspectionMandatoryFields {
  location: string;
  inspectorName: string;
  date: string; // ISO string (yyyy-mm-dd)
  division: string;
}

export interface InspectionAnswer {
  questionId: string;
  answer: YesNoNA | '';
  comment?: string;
  photoDataUrl?: string; // stored as data URL for MVP
  actionId?: string; // populated if answer is No and an action is created
  // Extended NC/Action capture when response is "No"
  ncDescription?: string;
  recommendedAction?: string;
  attachments?: Attachment[]; // files/images captured at the time of non-conformity
}

export interface Inspection {
  id: string;
  templateId: string;
  mandatory: InspectionMandatoryFields;
  answers: InspectionAnswer[];
  status: 'in-progress' | 'submitted';
  createdAt: string; // iso
}

export interface ActionItem {
  id: string;
  actionCode?: string; // human-friendly code like ACT-0001
  inspectionId: string;
  questionId: string;
  location: string;
  problem: string;
  actionToTake: string;
  photoDataUrl?: string;
  assignee?: string; // user id or text
  dueDate?: string; // ISO date
  status: 'pending' | 'in-progress' | 'done';
  createdAt: string;
  // Post-completion details
  resolvedDescription?: string; // what corrective action was actually done
  evidenceDataUrl?: string; // attached evidence image for completion
  // Extended fields to support richer NC/action flow
  ncDescription?: string;
  recommendedAction?: string;
  attachmentsFromInspection?: Attachment[]; // all files/images captured in the inspection popup
  evidenceAttachments?: Attachment[]; // additional evidence uploaded in action detail view
  completedAt?: string; // optional date of completion
  responsiblePerson?: string; // optional person who completed
}

// Generic attachment representation stored as Data URL for MVP
export interface Attachment {
  name: string; // original filename
  type: string; // mime type
  dataUrl: string; // data URL payload
}
