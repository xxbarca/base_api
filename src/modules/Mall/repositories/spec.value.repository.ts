import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/modules/Database/base';
import { SpecValueEntity } from '@/modules/Mall/entities';
import { DataSource } from 'typeorm';

@Injectable()
export class SpecValueRepository extends BaseRepository<SpecValueEntity> {
  protected _qbName: string = 'spec-value';

  constructor(protected dataSource: DataSource) {
    super(SpecValueEntity, dataSource.createEntityManager());
  }
}
