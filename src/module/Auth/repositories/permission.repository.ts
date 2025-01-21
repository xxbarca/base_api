import { BaseRepository } from '@/module/Database/base';
import { PermissionEntity } from '@/module/Auth/entities';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class PermissionRepository extends BaseRepository<PermissionEntity> {
  protected _qbName: string = 'permission';

  constructor(protected dataSource: DataSource) {
    super(PermissionEntity, dataSource.createEntityManager());
  }
}
