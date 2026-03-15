import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DomainService } from '../../services/domain.service';
import { ChecklistTemplate, User } from '../../models';
import { LocalStorageService } from '../../services/local-storage.service';

type LocationItem = { id: string; name: string };

@Component({
  selector: 'ea-inspection-start',
  standalone: false,
  templateUrl: './inspection-start.component.html',
  styleUrl: './inspection-start.component.css',
})
export class InspectionStartComponent {
  templates: ChecklistTemplate[] = [];
  form!: FormGroup;
  locations: LocationItem[] = [];
  users: (User & { active?: boolean })[] = [];

  constructor(
    private fb: FormBuilder,
    private domain: DomainService,
    private router: Router,
    private ls: LocalStorageService,
  ) {
    this.form = this.fb.group({
      templateId: ['', Validators.required],
      location: ['', Validators.required],
      inspectorName: ['', Validators.required],
      date: [new Date().toISOString().slice(0,10), Validators.required],
      division: ['', Validators.required],
    });
    this.templates = this.domain.listTemplates();
    this.reloadLocations();
    this.reloadUsers();
  }

  private reloadLocations(): void {
    this.locations = this.ls.getItem<LocationItem[]>('eaudit.locations', []);
  }

  private reloadUsers(): void {
    const all = this.ls.getItem<(User & { active?: boolean })[]>('eaudit.users', []);
    this.users = (all || []).filter(u => u && (u as any).active !== false);
  }

  start() {
    if (this.form.invalid) return;
    const raw = this.form.value as any;
    const template = this.domain.getTemplate(raw.templateId);
    if (!template) return;
    const inspection = this.domain.startInspection(template, {
      location: raw.location,
      inspectorName: raw.inspectorName,
      date: raw.date,
      division: raw.division,
    });
    this.router.navigate(['/inspections/run', inspection.id]);
  }
}
