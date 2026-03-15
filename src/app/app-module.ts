import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
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

@NgModule({
  declarations: [
    App,
    LoginComponent,
    DashboardPageComponent,
    DocumentControlComponent,
    RiskRegisterComponent,
    NonconformityCapaComponent,
    InternalAuditsComponent,
    ManagementReviewsComponent,
    TrainingMatrixComponent,
    KpiDashboardComponent,
    ReportsPageComponent,
    SettingsPageComponent,
    UserManagementComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTableModule,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
