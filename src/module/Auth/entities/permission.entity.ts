import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { AccessStatus, AccessType } from '../enums';
@Entity({ name: 'permission' })
export class PermissionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: '组件', default: 'LAYOUT' })
  component: string;

  @Column({ comment: 'icon', nullable: true })
  icon: string;

  @Column({ comment: '名称', nullable: false, unique: true })
  name: string;

  @Column({ comment: '排序', default: 1 })
  orderNo: number;

  @Column({ comment: '路径', nullable: false })
  path: string;

  @ManyToOne(() => PermissionEntity, (p) => p.children, {
    onDelete: 'NO ACTION',
  })
  parent: Relation<PermissionEntity> | null;

  @OneToMany(() => PermissionEntity, (p) => p.parent)
  children: Relation<PermissionEntity>[] | [];

  @Column({
    type: 'enum',
    enum: AccessStatus,
    default: AccessStatus.ENABLED,
    comment: '是否禁用',
  })
  status: AccessStatus;

  @Column({
    type: 'enum',
    enum: AccessType,
    default: AccessType.FOLDER,
    comment: '组件类型',
  })
  type: AccessType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
