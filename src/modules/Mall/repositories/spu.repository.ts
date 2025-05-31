import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/modules/Database/base';
import { SpuEntity } from '@/modules/Mall/entities';
import { DataSource } from 'typeorm';

@Injectable()
export class SpuRepository extends BaseRepository<SpuEntity> {
  protected _qbName: string = 'spu';

  constructor(protected dataSource: DataSource) {
    super(SpuEntity, dataSource.createEntityManager());
  }
}
