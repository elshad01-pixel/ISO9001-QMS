import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainService } from '../../services/domain.service';
import { ActionItem, Attachment, Inspection, User } from '../../models';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'ea-action-detail',
  standalone: false,
  templateUrl: './action-detail.component.html',
  styleUrl: './action-detail.component.css',
})
export class ActionDetailComponent {
  action?: ActionItem;
  inspection?: Inspection;
  users: (User & { active?: boolean })[] = [];

  // Edit draft for corrective details
  draft: {
    status?: ActionItem['status'];
    resolvedDescription: string;
    completedAt?: string;
    responsiblePerson?: string;
    evidenceAttachments: Attachment[];
  } = {
    status: 'pending',
    resolvedDescription: '',
    evidenceAttachments: [],
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private domain: DomainService,
    private ls: LocalStorageService,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const found = this.domain.listActions().find(a => a.id === id);
      if (found) {
        this.action = found;
        this.inspection = this.domain.getInspection(found.inspectionId);
        this.draft = {
          status: found.status,
          resolvedDescription: found.resolvedDescription || '',
          completedAt: found.completedAt,
          responsiblePerson: found.responsiblePerson,
          evidenceAttachments: [...(found.evidenceAttachments || [])],
        };
      }
    }
    this.reloadUsers();
  }

  get templateName(): string {
    if (!this.inspection) return '—';
    const tpl = this.domain.getTemplate(this.inspection.templateId);
    return tpl?.name || 'Checklist';
  }

  private reloadUsers() {
    const all = this.ls.getItem<(User & { active?: boolean })[]>('eaudit.users', []);
    this.users = (all || []).filter(u => u && (u as any).active !== false);
  }

  onAddEvidence(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files ? Array.from(input.files) : [];
    if (!files.length) return;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const att: Attachment = { name: file.name, type: file.type || 'application/octet-stream', dataUrl };
        this.draft.evidenceAttachments.push(att);
      };
      reader.readAsDataURL(file);
    });
    // reset input value to allow re-uploading same file name
    input.value = '';
  }

  removeEvidence(idx: number) {
    this.draft.evidenceAttachments.splice(idx, 1);
  }

  save() {
    if (!this.action) return;
    const updated: ActionItem = {
      ...this.action,
      status: (this.draft.status as ActionItem['status']) || this.action.status,
      resolvedDescription: this.draft.resolvedDescription?.trim() || undefined,
      completedAt: this.draft.completedAt || undefined,
      responsiblePerson: this.draft.responsiblePerson || undefined,
      evidenceAttachments: [...(this.draft.evidenceAttachments || [])],
    };
    this.domain.saveAction(updated);
    // refresh action state
    this.action = updated;
  }

  backToList() {
    this.router.navigate(['/actions']);
  }

  // Helpers
  isImage(att: Attachment): boolean { return !!att.type && att.type.startsWith('image/'); }
}
