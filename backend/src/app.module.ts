import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { Organization } from './organizations/organization.entity';
import { OrganizationsModule } from './organizations/organizations.module';
import { Role } from './roles/role.entity';
import { RolesModule } from './roles/roles.module';
import { Permission } from './permissions/permission.entity';
import { PermissionsModule } from './permissions/permissions.module';
import { Document } from './documents/document.entity';
import { DocumentsModule } from './documents/documents.module';
import { ProcessEntity } from './processes/process.entity';
import { ProcessesModule } from './processes/processes.module';
import { Risk } from './risks/risk.entity';
import { RisksModule } from './risks/risks.module';
import { Nonconformity } from './nonconformities/nonconformity.entity';
import { NonconformitiesModule } from './nonconformities/nonconformities.module';
import { CorrectiveAction } from './corrective-actions/corrective-action.entity';
import { CorrectiveActionsModule } from './corrective-actions/corrective-actions.module';
import { Audit } from './audits/audit.entity';
import { AuditsModule } from './audits/audits.module';
import { ManagementReview } from './management-reviews/management-review.entity';
import { ManagementReviewsModule } from './management-reviews/management-reviews.module';
import { TrainingRecord } from './training/training.entity';
import { TrainingRecordsModule } from './training/training.module';
import { Kpi } from './kpis/kpi.entity';
import { KpisModule } from './kpis/kpis.module';
import { Notification } from './notifications/notification.entity';
import { NotificationsModule } from './notifications/notifications.module';
import { AuditLog } from './audit-logs/audit-log.entity';
import { AuditLogsModule } from './audit-logs/audit-logs.module';

const entities = [
  User,
  Organization,
  Role,
  Permission,
  Document,
  ProcessEntity,
  Risk,
  Nonconformity,
  CorrectiveAction,
  Audit,
  ManagementReview,
  TrainingRecord,
  Kpi,
  Notification,
  AuditLog,
];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port'),
        username: config.get<string>('database.username'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.database'),
        entities,
        synchronize: false,
      }),
    }),
    AuthModule,
    UsersModule,
    OrganizationsModule,
    RolesModule,
    PermissionsModule,
    DocumentsModule,
    ProcessesModule,
    RisksModule,
    NonconformitiesModule,
    CorrectiveActionsModule,
    AuditsModule,
    ManagementReviewsModule,
    TrainingRecordsModule,
    KpisModule,
    NotificationsModule,
    AuditLogsModule,
  ],
})
export class AppModule {}
