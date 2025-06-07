import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from '@/modules/Database/base';
import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserEntity extends BasicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    comment: '用户名',
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    comment: '密码',
    nullable: false,
  })
  @Exclude()
  password: string;

  @Column({
    comment: '昵称',
  })
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

  @BeforeInsert()
  async beforeInsert() {
    this.password = await argon2.hash(this.password);
  }
}
