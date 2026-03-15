import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface DocumentRow {
  number: string;
  title: string;
  version: string;
  status: string;
  owner: string;
  effectiveDate: string;
}

@Component({
  selector: 'app-document-control',
  templateUrl: './document-control.component.html',
  styleUrl: './document-control.component.css',
  standalone: false,
})
export class DocumentControlComponent {
  displayedColumns = ['number', 'title', 'version', 'status', 'owner', 'effectiveDate'];
  dataSource: DocumentRow[] = [
    { number: 'QMS-P-001', title: 'Document Control Procedure', version: '3.1', status: 'Released', owner: 'Quality Manager', effectiveDate: '2026-02-01' },
    { number: 'QMS-WI-014', title: 'Incoming Inspection WI', version: '1.4', status: 'In Review', owner: 'Process Owner', effectiveDate: '2026-03-01' },
  ];

  readonly form: FormGroup;

  categories = ['Procedure', 'Work Instruction', 'Form', 'Policy'];
  departments = ['Quality', 'Production', 'Maintenance', 'HR'];

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.nonNullable.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      department: ['', Validators.required],
      process: [''],
    });
  }

  createDraft(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.dataSource = [
      {
        number: `QMS-NEW-${this.dataSource.length + 1}`,
        title: value.title,
        version: '0.1',
        status: 'Draft',
        owner: 'Current User',
        effectiveDate: 'Pending',
      },
      ...this.dataSource,
    ];
    this.form.reset();
  }
}
