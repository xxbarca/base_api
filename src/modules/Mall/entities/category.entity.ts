import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from '@/modules/Database/base';

@Entity('category')
export class CategoryEntity extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    comment: '名称',
    unique: true,
  })
  name: string;
}
