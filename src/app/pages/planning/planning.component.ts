import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DomainService } from '../../services/domain.service';
import { Inspection } from '../../models';

// Repurposed as Inspection Planner: show scheduled inspections from storage

@Component({
  selector: 'ea-planning',
  standalone: false,
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.css',
})
export class PlanningComponent {
  inspections: Inspection[] = [];

  constructor(public domain: DomainService, private router: Router) {
    this.reload();
  }

  reload() { this.inspections = this.domain.listInspections(); }

  open(insp: Inspection) { this.router.navigate(['/inspections/run', insp.id]); }
}
