import { BaseRepository } from '@/modules/Database/base';
import { SkuEntity } from '@/modules/Mall/entities';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class SkuRepository extends BaseRepository<SkuEntity> {
  protected _qbName: string = 'sku';
  constructor(protected dataSource: DataSource) {
    super(SkuEntity, dataSource.createEntityManager());
  }
}
