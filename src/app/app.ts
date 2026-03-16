import { Component, computed, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './shell.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('eAudit QMS');
  protected readonly sidebarPinned = signal(true);
  protected readonly pageTitle = signal('ISO 9001:2015 Quality Management System');
  protected readonly isAuthPage = computed(() => this.router.url.startsWith('/login'));

  protected readonly navigation = [
    { route: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { route: '/documents', icon: 'description', label: 'Documents' },
    { route: '/risks', icon: 'warning', label: 'Risks' },
    { route: '/nonconformities', icon: 'rule', label: 'Nonconformities / CAPA' },
    { route: '/audits', icon: 'fact_check', label: 'Internal Audits' },
    { route: '/management-reviews', icon: 'groups', label: 'Management Review' },
    { route: '/kpis', icon: 'monitoring', label: 'KPIs' },
    { route: '/training', icon: 'school', label: 'Training' },
    { route: '/reports', icon: 'bar_chart', label: 'Reports' },
    { route: '/users', icon: 'people', label: 'Users' },
    { route: '/settings', icon: 'settings', label: 'Settings' },
  ];

  constructor(private readonly router: Router) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        const item = this.navigation.find((n) => event.urlAfterRedirects.startsWith(n.route));
        this.pageTitle.set(item ? item.label : 'ISO 9001:2015 Quality Management System');
      });
  }

  protected toggleSidebarPin(): void {
    this.sidebarPinned.update((v) => !v);
  }
}
