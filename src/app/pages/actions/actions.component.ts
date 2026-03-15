import { Component } from '@angular/core';
import { DomainService } from '../../services/domain.service';
import { ActionItem } from '../../models';

@Component({
  selector: 'ea-actions',
  standalone: false,
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css',
})
export class ActionsComponent {
  actions: ActionItem[] = [];
  // Simple filter state
  filter = {
    status: 'all' as 'all' | 'pending' | 'in-progress' | 'done' | 'overdue',
    q: '' as string,
  };

  // Modal state for opening and updating an action with corrective details and evidence
  detailsOpen = false;
  current?: ActionItem;
  draft: { status: ActionItem['status']; resolvedDescription: string; evidenceDataUrl?: string; problem: string } = {
    status: 'pending',
    resolvedDescription: '',
    problem: '',
  };

  constructor(private domain: DomainService) {
    this.reload();
  }

  private reload() { this.actions = this.domain.listActions(); }

  // Computed filtered list for template
  get filteredActions(): ActionItem[] {
    const q = (this.filter.q || '').toLowerCase().trim();
    return this.actions.filter(a => {
      // Status filter (including virtual Overdue)
      if (this.filter.status !== 'all') {
        if (this.filter.status === 'overdue') {
          if (!this.isOverdue(a)) return false;
        } else {
          if (a.status !== this.filter.status) return false;
        }
      }
      if (!q) return true;
      // Text search across several fields
      const hay = [
        a.problem,
        a.actionToTake,
        a.location,
        a.assignee,
        a.actionCode,
      ]
        .filter(Boolean)
        .join(' \n ')
        .toLowerCase();
      return hay.includes(q);
    });
  }

  // --- Status helpers (for color coding & labels) ---
  isOverdue(a: ActionItem): boolean {
    if (!a.dueDate) return false;
    if (a.status === 'done') return false;
    try {
      const due = new Date(a.dueDate);
      // Compare at date precision (ignore timezones by using yyyy-mm-dd)
      const todayIso = new Date().toISOString().slice(0,10);
      const dueIso = new Date(Date.UTC(due.getFullYear(), due.getMonth(), due.getDate())).toISOString().slice(0,10);
      return dueIso < todayIso;
    } catch {
      return false;
    }
  }

  statusLabel(a: ActionItem): string {
    if (this.isOverdue(a)) return 'Overdue';
    switch (a.status) {
      case 'pending': return 'Open';
      case 'in-progress': return 'In progress'; // kept for backward compatibility if existing data has it
      case 'done': return 'Complete';
      default: return a.status;
    }
  }

  statusClass(a: ActionItem): string {
    if (this.isOverdue(a)) return 'red';
    switch (a.status) {
      case 'pending': return 'orange';
      case 'in-progress': return 'blue'; // backward compatibility
      case 'done': return 'green';
      default: return '';
    }
  }

  updateStatus(a: ActionItem, status: ActionItem['status']) {
    // Persist status change from list dropdown
    this.domain.saveAction({ ...a, status });
    this.reload();
  }

  updateAssignee(a: ActionItem, assignee: string) {
    this.domain.saveAction({ ...a, assignee });
    this.reload();
  }

  updateDue(a: ActionItem, dueDate: string) {
    this.domain.saveAction({ ...a, dueDate });
    this.reload();
  }

  // --- Details modal ---
  openDetails(a: ActionItem) {
    this.current = a;
    this.draft = {
      status: a.status,
      resolvedDescription: a.resolvedDescription || '',
      evidenceDataUrl: a.evidenceDataUrl,
      problem: a.problem,
    };
    this.detailsOpen = true;
  }

  closeDetails() {
    this.detailsOpen = false;
    this.current = undefined;
  }

  onEvidenceSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.draft.evidenceDataUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  saveDetails() {
    if (!this.current) return;
    const updated: ActionItem = {
      ...this.current,
      status: this.draft.status,
      resolvedDescription: this.draft.resolvedDescription?.trim() || undefined,
      evidenceDataUrl: this.draft.evidenceDataUrl,
      problem: this.draft.problem?.trim() || this.current.problem,
    };
    this.domain.saveAction(updated);
    this.closeDetails();
    this.reload();
  }
}
