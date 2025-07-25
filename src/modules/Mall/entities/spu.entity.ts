import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { BasicEntity } from '@/modules/Database/base';
import { OnlineStatus } from '@/modules/Mall/constants';
import { SkuEntity } from '@/modules/Mall/entities/sku.entity';
import { CategoryEntity } from '@/modules/Mall/entities/category.entity';
import { SpecKeyEntity } from '@/modules/Mall/entities/spec.key.entity';

@Entity('spu')
export class SpuEntity extends BasicEntity {
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 800,
    nullable: true,
  })
  subtitle: string;

  @ManyToOne(() => CategoryEntity, (category) => category.spus, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'category_id' })
  category: Relation<CategoryEntity>;

  @Column({
    nullable: true,
  })
  root_category_id: string;

  @Column({
    comment: '是否上线',
    type: 'enum',
    enum: OnlineStatus,
    default: OnlineStatus.ONLINE,
  })
  online: OnlineStatus;

  @Column({
    comment: '价格',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  price: string;

  @Column({
    comment: '某种规格可以直接附加单品图片',
    nullable: true,
  })
  sketch_spec_id: string;

  @Column({
    comment: '默认选中的SKU',
    nullable: true,
  })
  default_sku_id: string;

  @Column({
    comment: '图片',
    nullable: true,
  })
  img: string;

  @Column({
    comment: '价格',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  discount_price: string;

  @Column({
    comment: '描述',
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    comment: 'TAG',
    nullable: true,
  })
  tags: string;

  @OneToMany(() => SkuEntity, (sku) => sku.spu)
  skus: Relation<SkuEntity>[];

  @ManyToMany(() => SpecKeyEntity, (specKey) => specKey.spus)
  @JoinTable({
    name: 'spu_key',
    joinColumn: {
      name: 'spu_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'spec_key_id',
      referencedColumnName: 'id',
    },
  })
  specKeys: Relation<SpecKeyEntity>[];
}
