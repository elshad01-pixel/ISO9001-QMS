import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainService } from '../../services/domain.service';
import { ActionItem, Attachment, ChecklistTemplate, Inspection, YesNoNA, User } from '../../models';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'ea-inspection-run',
  standalone: false,
  templateUrl: './inspection-run.component.html',
  styleUrl: './inspection-run.component.css',
})
export class InspectionRunComponent {
  inspection?: Inspection;
  template?: ChecklistTemplate;
  users: (User & { active?: boolean })[] = [];

  // Action modal state
  actionModalOpen = false;
  actionForQuestionId: string | null = null;
  actionDraft: { assignee: string; dueDate: string; description: string; recommended?: string; attachments: Attachment[]; photoDataUrl?: string } = {
    assignee: '',
    dueDate: '',
    description: '',
    recommended: '',
    attachments: [],
  };

  constructor(private route: ActivatedRoute, private router: Router, private domain: DomainService, private ls: LocalStorageService, private zone: NgZone) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.inspection = this.domain.getInspection(id);
      if (this.inspection) {
        this.template = this.domain.getTemplate(this.inspection.templateId);
      }
    }
    this.reloadUsers();
  }

  findAnswer(questionId: string) {
    return this.inspection?.answers.find(a => a.questionId === questionId);
  }

  answer(questionId: string): YesNoNA | '' {
    return this.findAnswer(questionId)?.answer ?? '';
  }

  comment(questionId: string): string {
    return this.findAnswer(questionId)?.comment || '';
  }

  photo(questionId: string): string | undefined {
    return this.findAnswer(questionId)?.photoDataUrl;
  }

  setAnswer(questionId: string, answer: YesNoNA | '') {
    const current = this.findAnswer(questionId);
    this.inspection = this.domain.setAnswer(this.inspection!.id, questionId, answer, current?.comment, current?.photoDataUrl);
    // If the answer is set to 'No', prompt to create an action
    if (answer === 'No') {
      this.openActionModal(questionId);
    }
  }

  updateComment(questionId: string, comment: string) {
    const current = this.findAnswer(questionId);
    this.inspection = this.domain.setAnswer(this.inspection!.id, questionId, current?.answer ?? '', comment, current?.photoDataUrl);
  }

  onPhotoSelected(questionId: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const current = this.findAnswer(questionId);
      // Persist as the legacy photo field
      this.inspection = this.domain.setAnswer(this.inspection!.id, questionId, current?.answer ?? '', current?.comment, dataUrl);
      // Also append to attachments on the answer
      const ansNow = this.findAnswer(questionId);
      if (ansNow) {
        const att: Attachment = { name: file.name, type: file.type || 'image/*', dataUrl };
        ansNow.attachments = [...(ansNow.attachments || []), att];
        this.domain.updateInspection(this.inspection!);
      }
      // If there is a linked action for this answer, sync the photo to the action log as well
      const ans = this.findAnswer(questionId);
      const aId = ans?.actionId;
      if (aId) {
        const actions = this.domain.listActions();
        const existing = actions.find(a => a.id === aId);
        if (existing) {
          const att: Attachment = { name: file.name, type: file.type || 'image/*', dataUrl };
          const merged = [...(existing.attachmentsFromInspection || []), att];
          this.domain.saveAction({ ...existing, photoDataUrl: dataUrl, attachmentsFromInspection: merged });
        }
      }
    };
    reader.readAsDataURL(file);
  }

  allAnswered(): boolean {
    return !!this.inspection && this.inspection.answers.every(a => a.answer === 'Yes' || a.answer === 'No' || a.answer === 'N/A');
  }

  submit() {
    if (!this.inspection) return;
    if (!this.allAnswered()) return;
    this.domain.submitInspection(this.inspection.id);
    this.router.navigateByUrl('/reports');
  }

  // --- Action creation flow ---
  openActionModal(questionId: string) {
    this.actionForQuestionId = questionId;
    // reset draft
    this.actionDraft = { assignee: '', dueDate: '', description: '', recommended: '', attachments: [], photoDataUrl: undefined };
    this.actionModalOpen = true;
  }

  closeActionModal() {
    this.actionModalOpen = false;
    this.actionForQuestionId = null;
  }

  onActionPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files ? Array.from(input.files) : [];
    if (!files.length) return;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        // Ensure state updates run inside Angular zone and use new array reference
        this.zone.run(() => {
          const dataUrl = reader.result as string;
          const att: Attachment = { name: file.name, type: file.type || 'application/octet-stream', dataUrl };
          const next = [...(this.actionDraft.attachments || []), att];
          this.actionDraft.attachments = next;
          // For backward compatibility keep the first image also in photoDataUrl
          if (!this.actionDraft.photoDataUrl && file.type.startsWith('image/')) {
            this.actionDraft.photoDataUrl = dataUrl;
          }
        });
      };
      reader.readAsDataURL(file);
    });
    // Allow selecting the same file again later
    input.value = '';
  }

  // Enable Save when at least one of the core fields is provided
  canSaveAction(): boolean {
    const hasDesc = !!this.actionDraft.description?.trim();
    const hasReco = !!this.actionDraft.recommended?.trim();
    const hasAtt = (this.actionDraft.attachments?.length || 0) > 0;
    return hasDesc || hasReco || hasAtt;
  }

  saveActionFromModal() {
    if (!this.inspection || !this.template || !this.actionForQuestionId) return;
    // Guard: do not save empty actions
    if (!this.canSaveAction()) return;
    const qId = this.actionForQuestionId;
    const qText = this.template.questions.find(q => q.id === qId)?.text || 'Checklist item';
    // Use existing checklist photo if action has none
    const ans = this.inspection.answers.find(a => a.questionId === qId);
    const inheritedPhoto = this.actionDraft.photoDataUrl || ans?.photoDataUrl;
    // Persist NC texts and attachments on the answer
    if (ans) {
      ans.ncDescription = this.actionDraft.description?.trim() || undefined;
      ans.recommendedAction = this.actionDraft.recommended?.trim() || undefined;
      const currentAtt = ans.attachments || [];
      const merged = [...currentAtt, ...this.actionDraft.attachments];
      ans.attachments = merged;
      this.domain.updateInspection(this.inspection);
    }
    const action: ActionItem = {
      id: crypto.randomUUID(),
      inspectionId: this.inspection.id,
      questionId: qId,
      location: this.inspection.mandatory.location,
      problem: qText,
      actionToTake: this.actionDraft.recommended?.trim() || this.actionDraft.description,
      photoDataUrl: inheritedPhoto,
      assignee: this.actionDraft.assignee,
      dueDate: this.actionDraft.dueDate || undefined,
      status: 'pending',
      createdAt: new Date().toISOString(),
      ncDescription: this.actionDraft.description?.trim() || undefined,
      recommendedAction: this.actionDraft.recommended?.trim() || undefined,
      attachmentsFromInspection: [...(this.actionDraft.attachments || [])],
    };
    this.domain.saveAction(action);
    // Link the action to the answer and persist the inspection
    if (ans) {
      ans.actionId = action.id;
      this.domain.updateInspection(this.inspection);
    }
    this.closeActionModal();
  }

  private reloadUsers(): void {
    const all = this.ls.getItem<(User & { active?: boolean })[]>('eaudit.users', []);
    this.users = (all || []).filter(u => u && (u as any).active !== false);
  }
}
