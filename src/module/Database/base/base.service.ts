import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { BaseRepository } from '@/module/Database/base/base.repository';
import { QueryHook } from '@/module/Database/types';
import { NotFoundException } from '@nestjs/common';

export abstract class BaseService<
  E extends ObjectLiteral,
  R extends BaseRepository<E>,
> {
  protected repository: R;

  protected constructor(repository: R) {
    this.repository = repository;
  }

  /**
   * 获取查询单个项目的QueryBuilder
   * @param id 查询数据的ID
   * @param qb SelectQueryBuilder
   * @param callback 查询回调
   */
  protected async buildItemQB(
    id: string,
    qb: SelectQueryBuilder<E>,
    callback?: QueryHook<E>,
  ) {
    qb.where(`${this.repository.qbName}.id = :id`, { id });
    if (callback) return callback(qb);
    return qb;
  }

  async detail(id: string, callback?: QueryHook<E>) {
    const qb = await this.buildItemQB(
      id,
      this.repository.buildBaseQB(),
      callback,
    );
    const item = await qb.getOne();
    if (!item)
      throw new NotFoundException(
        `${this.repository.qbName} ${id} not exists!`,
      );
    return item;
  }
}
