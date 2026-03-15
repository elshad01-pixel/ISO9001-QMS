import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';

@Entity('documents')
export class Document extends BaseEntity {
  @Column({ type: 'uuid' })
  tenantId!: string;

  @Column()
  name!: string;

  @Column({ default: 'active' })
  status!: string;

@Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, unknown>;
}
