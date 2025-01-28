import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { UserEntity } from './user.entity';
import { RoleStatus } from '../enums';
import { PermissionEntity } from './permission.entity';

@Entity({ name: 'role' })
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    comment: '角色名称',
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    comment: '角色值',
    nullable: true,
  })
  value: string;

  @Column({
    comment: '描述',
    nullable: true,
  })
  description: string;

  @CreateDateColumn({
    comment: '创建时间',
  })
  created_at: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updated_at: Date;

  @Column({
    comment: '状态',
    type: 'enum',
    enum: RoleStatus,
    default: RoleStatus.ENABLED,
  })
  status: RoleStatus;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: Relation<UserEntity>[];

  @ManyToMany(() => PermissionEntity, (p) => p.roles)
  @JoinTable({
    name: 'permissions_roles',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Relation<PermissionEntity>[];
}
