import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { BasicEntity } from '@/modules/Database/base';
import { OnlineStatus } from '@/modules/Mall/constants';

@Entity('category')
export class CategoryEntity extends BasicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    comment: '名称',
    unique: true,
  })
  name: string;

  @Column({
    comment: '描述',
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    comment: '排序',
    default: 0,
  })
  index: number;

  @Column({
    comment: '图片',
    nullable: true,
  })
  img: string;

  @Column({
    comment: '是否上线',
    type: 'enum',
    enum: OnlineStatus,
    default: OnlineStatus.ONLINE,
  })
  online: OnlineStatus;

  @OneToMany(() => CategoryEntity, (cate) => cate.parent)
  children: Relation<CategoryEntity>[];

  @ManyToOne(() => CategoryEntity, (cate) => cate.children)
  @JoinColumn({ name: 'parent_id' })
  parent: Relation<CategoryEntity> | null;
}
