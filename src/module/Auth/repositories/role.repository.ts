import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/module/Database/base';
import { RoleEntity } from '@/module/Auth/entities';
import { DataSource } from 'typeorm';

@Injectable()
export class RoleRepository extends BaseRepository<RoleEntity> {
  protected _qbName: string = 'role';

  constructor(protected dataSource: DataSource) {
    super(RoleEntity, dataSource.createEntityManager());
  }
}
