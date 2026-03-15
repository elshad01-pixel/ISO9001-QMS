import { Component } from '@angular/core';

interface MetricCard {
  title: string;
  value: string;
  trend: string;
  status: 'good' | 'warn' | 'critical';
}

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: false,
})
export class DashboardPageComponent {
  metrics: MetricCard[] = [
    { title: 'Open Nonconformities', value: '14', trend: '-2 vs last month', status: 'warn' },
    { title: 'Overdue CAPA', value: '3', trend: 'Needs action', status: 'critical' },
    { title: 'Training Completion', value: '92%', trend: '+4%', status: 'good' },
    { title: 'KPI On Target', value: '11/14', trend: '79%', status: 'warn' },
  ];

  upcoming = [
    { type: 'Audit', name: 'Production Process Audit', due: '2026-03-22' },
    { type: 'Review', name: 'Q1 Management Review', due: '2026-03-25' },
    { type: 'Training', name: 'Internal Auditor Refresher', due: '2026-03-28' },
  ];
}
