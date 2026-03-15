import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly USER_KEY = 'eaudit.currentUser';

  constructor(private ls: LocalStorageService, private router: Router) {}

  get currentUser(): User | null {
    return this.ls.getItem<User | null>(this.USER_KEY, null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(email: string, password: string): User {
    // MVP: accept any email/password and create a basic user profile
    const user: User = {
      id: crypto.randomUUID(),
      email,
      name: email.split('@')[0],
      role: 'inspector',
    };
    this.ls.setItem(this.USER_KEY, user);
    return user;
  }

  logout(): void {
    this.ls.remove(this.USER_KEY);
    this.router.navigateByUrl('/login');
  }
}
