import { BaseRepository } from '@/modules/Database/base';
import { CategoryEntity } from '@/modules/Mall/entities';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CategoryRepository extends BaseRepository<CategoryEntity> {
  protected _qbName: string = 'category';
  constructor(protected dataSource: DataSource) {
    super(CategoryEntity, dataSource.createEntityManager());
  }
}
