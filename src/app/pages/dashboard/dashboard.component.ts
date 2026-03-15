import { Component } from '@angular/core';
import { DomainService } from '../../services/domain.service';
import { AuthService } from '../../services/auth.service';
import { ActionItem, Inspection } from '../../models';

@Component({
  selector: 'ea-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private domain: DomainService, private auth: AuthService) {}

  // Welcome header helpers
  get displayName(): string {
    return this.auth.currentUser?.name || (this.auth.currentUser?.email?.split('@')[0] ?? 'Inspector');
  }

  get currentDateFormatted(): string {
    const d = new Date();
    return d.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  // Stats
  get totalInspections(): number { return this.domain.listInspections().length; }
  get completedInspections(): number { return this.domain.listInspections().filter(i => i.status === 'submitted').length; }
  get pendingInspections(): number { return this.domain.listInspections().filter(i => i.status === 'in-progress').length; }
  get openActionsCount(): number { return this.domain.listActions().filter(a => a.status !== 'done').length; }

  // Actions KPIs
  get totalActions(): number { return this.domain.listActions().length; }
  get actionsDone(): number { return this.domain.listActions().filter(a => a.status === 'done').length; }
  get overdueActions(): number {
    const today = new Date();
    return this.domain.listActions().filter(a => a.status !== 'done' && !!a.dueDate && new Date(a.dueDate) < today).length;
  }
  get actionsCompletionRate(): number {
    const total = this.totalActions;
    if (!total) return 0;
    return Math.round((this.actionsDone / total) * 100);
  }

  // Recent lists
  get recentInspections(): Array<{
    title: string;
    subtitle: string;
    inspector: string;
    dateLabel: string;
    status: 'completed' | 'progress' | 'urgent';
    chipText: string;
  }> {
    const items = [...this.domain.listInspections()]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
    return items.map((i: Inspection) => {
      const tpl = this.domain.getTemplate(i.templateId);
      const d = new Date(i.createdAt);
      const dateLabel = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      const status = i.status === 'submitted' ? 'completed' : 'progress';
      return {
        title: i.mandatory.location || (tpl?.name ?? 'Inspection'),
        subtitle: tpl?.name || 'Checklist',
        inspector: i.mandatory.inspectorName || '—',
        dateLabel,
        status,
        chipText: status === 'completed' ? 'Completed' : 'In progress',
      };
    });
  }

  get recentActions(): Array<{ title: string; location: string; status: 'completed' | 'progress' | 'urgent' }> {
    const today = new Date();
    const items = [...this.domain.listActions()]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
    return items.map((a: ActionItem) => {
      let status: 'completed' | 'progress' | 'urgent' = 'progress';
      if (a.status === 'done') status = 'completed';
      else if (a.dueDate && new Date(a.dueDate) < today) status = 'urgent';
      return { title: a.problem, location: a.location, status };
    });
  }
}
