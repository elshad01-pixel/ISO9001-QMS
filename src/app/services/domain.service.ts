import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import {
  ActionItem,
  ChecklistQuestion,
  ChecklistTemplate,
  Inspection,
  InspectionAnswer,
  InspectionMandatoryFields,
  YesNoNA,
} from '../models';

@Injectable({ providedIn: 'root' })
export class DomainService {
  private readonly TEMPLATES_KEY = 'eaudit.templates';
  private readonly INSPECTIONS_KEY = 'eaudit.inspections';
  private readonly ACTIONS_KEY = 'eaudit.actions';

  constructor(private ls: LocalStorageService) {
    this.ensureSeedData();
  }

  // Templates
  listTemplates(): ChecklistTemplate[] {
    return this.ls.getItem<ChecklistTemplate[]>(this.TEMPLATES_KEY, []);
  }

  getTemplate(id: string): ChecklistTemplate | undefined {
    return this.listTemplates().find(t => t.id === id);
  }

  saveTemplate(t: ChecklistTemplate): void {
    const all = this.listTemplates();
    const idx = all.findIndex((x) => x.id === t.id);
    if (idx >= 0) all[idx] = t; else all.push(t);
    this.ls.setItem(this.TEMPLATES_KEY, all);
  }

  deleteTemplate(id: string): void {
    const all = this.listTemplates().filter((t) => t.id !== id);
    this.ls.setItem(this.TEMPLATES_KEY, all);
  }

  // Inspections
  listInspections(): Inspection[] {
    return this.ls.getItem<Inspection[]>(this.INSPECTIONS_KEY, []);
  }

  getInspection(id: string): Inspection | undefined {
    return this.listInspections().find((i) => i.id === id);
  }

  startInspection(template: ChecklistTemplate, mandatory: InspectionMandatoryFields): Inspection {
    const inspection: Inspection = {
      id: crypto.randomUUID(),
      templateId: template.id,
      mandatory,
      answers: template.questions.map((q) => ({ questionId: q.id, answer: '' } as InspectionAnswer)),
      status: 'in-progress',
      createdAt: new Date().toISOString(),
    };
    const all = this.listInspections();
    all.push(inspection);
    this.ls.setItem(this.INSPECTIONS_KEY, all);
    return inspection;
  }

  updateInspection(inspection: Inspection): void {
    const all = this.listInspections();
    const idx = all.findIndex((i) => i.id === inspection.id);
    if (idx >= 0) all[idx] = inspection; else all.push(inspection);
    this.ls.setItem(this.INSPECTIONS_KEY, all);
  }

  setAnswer(
    inspectionId: string,
    questionId: string,
    answer: YesNoNA | '',
    comment?: string,
    photoDataUrl?: string
  ): Inspection | undefined {
    const insp = this.getInspection(inspectionId);
    if (!insp) return undefined;
    const ans = insp.answers.find((a) => a.questionId === questionId);
    if (!ans) return undefined;
    ans.answer = answer;
    ans.comment = comment;
    ans.photoDataUrl = photoDataUrl;
    this.updateInspection(insp);
    return insp;
  }

  submitInspection(inspectionId: string): void {
    const insp = this.getInspection(inspectionId);
    if (!insp) return;
    insp.status = 'submitted';
    this.updateInspection(insp);
  }

  // Actions
  listActions(): ActionItem[] {
    return this.ls.getItem<ActionItem[]>(this.ACTIONS_KEY, []);
  }

  saveAction(a: ActionItem): void {
    const all = this.listActions();
    const idx = all.findIndex((x) => x.id === a.id);

    // If this is a new action (not yet in storage) and it doesn't have an actionCode,
    // generate one in the format: YYYY-#### where the sequence resets each calendar year.
    if (idx < 0 && !a.actionCode) {
      const created = a.createdAt ? new Date(a.createdAt) : new Date();
      const year = created.getFullYear();
      // Find max sequence for this year among existing actions that already have the new format
      const re = new RegExp(`^${year}-\\d{4}$`);
      const maxSeq = all
        .map(x => x.actionCode)
        .filter((code): code is string => !!code && re.test(code))
        .map(code => parseInt(code.split('-')[1], 10))
        .reduce((max, n) => isNaN(n) ? max : Math.max(max, n), 0);
      const nextSeq = String(maxSeq + 1).padStart(4, '0');
      a.actionCode = `${year}-${nextSeq}`;
    }

    if (idx >= 0) all[idx] = a; else all.push(a);
    this.ls.setItem(this.ACTIONS_KEY, all);
  }

  updateActionStatus(id: string, status: ActionItem['status']): void {
    const all = this.listActions();
    const target = all.find((a) => a.id === id);
    if (target) {
      target.status = status;
      this.ls.setItem(this.ACTIONS_KEY, all);
    }
  }

  private ensureSeedData(): void {
    const existing = this.listTemplates();
    if (existing.length > 0) return;
    const sampleQuestions: ChecklistQuestion[] = [
      { id: crypto.randomUUID(), text: 'Is the work area clean and organized?' },
      { id: crypto.randomUUID(), text: 'Are emergency exits unobstructed?' },
      { id: crypto.randomUUID(), text: 'Are safety signs clearly visible?' },
    ];
    const seed: ChecklistTemplate = {
      id: crypto.randomUUID(),
      name: 'General Safety Checklist',
      description: 'Basic safety inspection template',
      questions: sampleQuestions,
    };
    this.saveTemplate(seed);
  }
}
