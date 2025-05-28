import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import type { Relation } from 'typeorm';
import { BasicEntity } from '@/modules/Database/base';
import { SpecKeyEntity } from '@/modules/Mall/entities/spec.key.entity';

@Entity('spec_value')
export class SpecValueEntity extends BasicEntity {
  @Column({
    comment: '规格值',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  value: string;

  @ManyToOne(() => SpecKeyEntity, (key) => key.values, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'key_id' })
  key: Relation<SpecKeyEntity>;
}
