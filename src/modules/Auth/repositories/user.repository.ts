import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/modules/Database/base';
import { UserEntity } from '@/modules/Auth/entities';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  protected _qbName = 'user';
  constructor(protected dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
}
