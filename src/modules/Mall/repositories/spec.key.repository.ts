import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/modules/Database/base';
import { SpecKeyEntity } from '@/modules/Mall/entities';
import { DataSource } from 'typeorm';

@Injectable()
export class SpecKeyRepository extends BaseRepository<SpecKeyEntity> {
  protected _qbName: string = 'spec-key';

  constructor(protected dataSource: DataSource) {
    super(SpecKeyEntity, dataSource.createEntityManager());
  }
}
