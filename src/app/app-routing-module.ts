import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardPageComponent } from './pages/qms/dashboard/dashboard.component';
import { DocumentControlComponent } from './pages/qms/document-control/document-control.component';
import { RiskRegisterComponent } from './pages/qms/risk-register/risk-register.component';
import { NonconformityCapaComponent } from './pages/qms/nonconformity-capa/nonconformity-capa.component';
import { InternalAuditsComponent } from './pages/qms/internal-audits/internal-audits.component';
import { ManagementReviewsComponent } from './pages/qms/management-reviews/management-reviews.component';
import { TrainingMatrixComponent } from './pages/qms/training-matrix/training-matrix.component';
import { KpiDashboardComponent } from './pages/qms/kpi-dashboard/kpi-dashboard.component';
import { ReportsPageComponent } from './pages/qms/reports/reports.component';
import { SettingsPageComponent } from './pages/qms/settings/settings.component';
import { UserManagementComponent } from './pages/qms/user-management/user-management.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'documents', component: DocumentControlComponent },
  { path: 'risks', component: RiskRegisterComponent },
  { path: 'nonconformities', component: NonconformityCapaComponent },
  { path: 'audits', component: InternalAuditsComponent },
  { path: 'management-reviews', component: ManagementReviewsComponent },
  { path: 'training', component: TrainingMatrixComponent },
  { path: 'kpis', component: KpiDashboardComponent },
  { path: 'reports', component: ReportsPageComponent },
  { path: 'settings', component: SettingsPageComponent },
  { path: 'users', component: UserManagementComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
