import { Column, Entity, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm';
import { BasicEntity } from '@/modules/Database/base';
import { SpecValueEntity } from '@/modules/Mall/entities/spec.value.entity';

@Entity('spec_key')
export class SpecKeyEntity extends BasicEntity {
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  unit: string;

  @OneToMany(() => SpecValueEntity, (value) => value.key)
  values: Relation<SpecValueEntity>[];
}
