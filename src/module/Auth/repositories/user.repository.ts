import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/module/Database/base';
import { UserEntity } from '@/module/Auth/entities';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  protected _qbName: string = 'user';
  constructor(protected dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
}
