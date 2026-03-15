import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { User } from '../../models';

type StoredUser = User & { active: boolean };

@Component({
  selector: 'ea-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  private readonly KEY = 'eaudit.users';
  users: StoredUser[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder, private ls: LocalStorageService) {
    this.form = this.fb.group({
      name: [''],
      position: [''],
      email: [''],
      division: [''],
    });
    this.reload();
  }

  reload(): void {
    this.users = this.ls.getItem<StoredUser[]>(this.KEY, []);
  }

  save(): void {
    const raw = this.form.value as any;
    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name: raw.name?.trim() || undefined,
      position: raw.position?.trim() || undefined,
      email: raw.email?.trim() || '',
      division: raw.division?.trim() || undefined,
      role: 'inspector',
      active: true,
    };
    const all = this.ls.getItem<StoredUser[]>(this.KEY, []);
    all.push(newUser);
    this.ls.setItem(this.KEY, all);
    this.form.reset({ name: '', position: '', email: '', division: '' });
    this.reload();
  }

  toggleActive(u: StoredUser): void {
    const all = this.ls.getItem<StoredUser[]>(this.KEY, []);
    const idx = all.findIndex(x => x.id === u.id);
    if (idx >= 0) {
      all[idx].active = !all[idx].active;
      this.ls.setItem(this.KEY, all);
      this.reload();
    }
  }

  remove(u: StoredUser): void {
    if (!confirm('Delete this user?')) return;
    const all = this.ls.getItem<StoredUser[]>(this.KEY, []);
    this.ls.setItem(this.KEY, all.filter(x => x.id !== u.id));
    this.reload();
  }
}
