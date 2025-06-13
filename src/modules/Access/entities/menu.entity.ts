import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { AccessStatus, AccessType } from '@/modules/Access/enums';

@Entity('menu')
export class MenuEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: '组件', nullable: true })
  component: string;

  @Column({ comment: '权限值, 一般针对按钮', nullable: true, unique: true })
  value: string;

  @Column({ comment: 'icon', nullable: true })
  icon: string;

  @Column({ comment: '名称', nullable: false, unique: true })
  name: string;

  @Column({ comment: '排序', default: 1 })
  orderNo: number;

  @Column({ comment: '路径', nullable: true })
  path: string;

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

  @ManyToOne(() => MenuEntity, (p) => p.children, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'parent_id' })
  parent: Relation<MenuEntity> | null;

  @OneToMany(() => MenuEntity, (p) => p.parent)
  children: Relation<MenuEntity>[] | [];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
