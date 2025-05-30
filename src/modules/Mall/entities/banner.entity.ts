import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from '@/modules/Database/base';

@Entity('banner')
export class BannerEntity extends BasicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;
}
