import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';

@Entity('permissions')
export class Permission extends BaseEntity {
  @Column()
  module!: string;

  @Column()
  action!: string;

  @Column({ unique: true })
  key!: string;
}
