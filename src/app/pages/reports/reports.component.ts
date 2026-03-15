import { Component } from '@angular/core';
import { DomainService } from '../../services/domain.service';

@Component({
  selector: 'ea-reports',
  standalone: false,
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent {
  constructor(private domain: DomainService) {}
  get inspectionsCount() { return this.domain.listInspections().length; }
  get submittedInspections() { return this.domain.listInspections().filter(i => i.status === 'submitted').length; }
  get actionsTotal() { return this.domain.listActions().length; }
  get actionsDone() { return this.domain.listActions().filter(a => a.status === 'done').length; }
}
