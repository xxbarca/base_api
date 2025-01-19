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
import { Exclude, Expose } from 'class-transformer';
import type { Relation } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity({ name: 'user' })
@Exclude()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({
    comment: '用户名',
    nullable: false,
    unique: true,
  })
  @Expose()
  username: string;

  @Column({
    comment: '密码',
    nullable: false,
  })
  password: string;

  @Column({
    comment: '昵称',
  })
  @Expose()
  nickname: string;

  @Column({
    comment: '邮箱',
    nullable: true,
  })
  email: string;

  @Column({
    comment: '手机',
    nullable: true,
  })
  phone: string;

  @Column({
    comment: '头像',
    nullable: true,
  })
  avatar: string;

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

  @Column({ nullable: true })
  accessToken: string;

  @Column({ nullable: true })
  refreshToken: string;

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Relation<RoleEntity>[];
}
