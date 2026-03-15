import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomainService } from '../../services/domain.service';
import { ChecklistTemplate } from '../../models';

@Component({
  selector: 'ea-templates',
  standalone: false,
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.css',
})
export class TemplatesComponent {
  templates: ChecklistTemplate[] = [];
  editId: string | null = null;

  form!: FormGroup;

  constructor(private fb: FormBuilder, private domain: DomainService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      questions: this.fb.array([] as any[]),
    });
    this.reload();
  }

  get questions() { return this.form.get('questions') as FormArray; }

  reload() { this.templates = this.domain.listTemplates(); }

  addQuestion(text: string = '') {
    this.questions.push(this.fb.group({ id: [crypto.randomUUID()], text: [text, Validators.required] }));
  }

  removeQuestion(index: number) { this.questions.removeAt(index); }

  edit(t: ChecklistTemplate) {
    this.editId = t.id;
    this.form.patchValue({ name: t.name, description: t.description || '' });
    this.questions.clear();
    t.questions.forEach(q => this.addQuestion(q.text));
  }

  remove(t: ChecklistTemplate) {
    if (!confirm('Delete template?')) return;
    this.domain.deleteTemplate(t.id);
    if (this.editId === t.id) this.reset();
    this.reload();
  }

  reset() {
    this.editId = null;
    this.form.reset({ name: '', description: '' });
    this.questions.clear();
  }

  // Show a confirmation before clearing the form to avoid accidental resets
  resetWithConfirm() {
    if (confirm('Are you sure you want to reset the checklist form?')) {
      this.reset();
    }
  }

  save() {
    if (this.form.invalid) return;
    const raw = this.form.value as any;
    const template: ChecklistTemplate = {
      id: this.editId ?? crypto.randomUUID(),
      name: raw.name,
      description: raw.description,
      questions: (raw.questions || []).map((q: any) => ({ id: q.id || crypto.randomUUID(), text: q.text })),
    };
    this.domain.saveTemplate(template);
    this.reload();
    this.reset();
  }
}
