import { Component } from '@angular/core';

interface UserRow {
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'Invited' | 'Inactive';
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
  standalone: false,
})
export class UserManagementComponent {
  displayedColumns = ['name', 'email', 'role', 'department', 'status'];
  dataSource: UserRow[] = [
    { name: 'Mariam Khan', email: 'mariam@acme.com', role: 'Quality Manager', department: 'Quality', status: 'Active' },
    { name: 'Jared Cole', email: 'jared@acme.com', role: 'Internal Auditor', department: 'Operations', status: 'Active' },
    { name: 'Eva Lin', email: 'eva@acme.com', role: 'Department Manager', department: 'Production', status: 'Invited' },
  ];
}
