import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/modules/Database/base';
import { MenuEntity } from '@/modules/Access/entities';
import { DataSource } from 'typeorm';

@Injectable()
export class MenuRepository extends BaseRepository<MenuEntity> {
  protected _qbName: string = 'menu';

  constructor(protected dataSource: DataSource) {
    super(MenuEntity, dataSource.createEntityManager());
  }
}
