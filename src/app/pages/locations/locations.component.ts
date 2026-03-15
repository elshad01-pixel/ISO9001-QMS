import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';

type LocationItem = { id: string; name: string };

@Component({
  selector: 'ea-locations',
  standalone: false,
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css',
})
export class LocationsComponent {
  private readonly KEY = 'eaudit.locations';

  locations: LocationItem[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder, private ls: LocalStorageService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
    this.reload();
  }

  reload(): void {
    this.locations = this.ls.getItem<LocationItem[]>(this.KEY, []);
  }

  save(): void {
    if (this.form.invalid) return;
    const name = (this.form.value.name as string).trim();
    if (!name) return;
    const all = this.ls.getItem<LocationItem[]>(this.KEY, []);
    // Prevent exact duplicate names (case-insensitive)
    if (all.some(l => l.name.toLowerCase() === name.toLowerCase())) {
      this.form.reset({ name: '' });
      return;
    }
    all.push({ id: crypto.randomUUID(), name });
    this.ls.setItem(this.KEY, all);
    this.form.reset({ name: '' });
    this.reload();
  }

  remove(item: LocationItem): void {
    if (!confirm('Delete this location?')) return;
    const all = this.ls.getItem<LocationItem[]>(this.KEY, []);
    const filtered = all.filter(l => l.id !== item.id);
    this.ls.setItem(this.KEY, filtered);
    this.reload();
  }
}
