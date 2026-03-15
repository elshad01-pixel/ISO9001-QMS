import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  standalone: false,
})
export class SettingsPageComponent {
  readonly form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.nonNullable.group({
      companyName: ['Acme Manufacturing', Validators.required],
      timezone: ['UTC', Validators.required],
      riskMethod: ['Likelihood x Severity', Validators.required],
      documentPrefix: ['QMS', Validators.required],
    });
  }

  save(): void {
    this.form.markAllAsTouched();
  }
}
