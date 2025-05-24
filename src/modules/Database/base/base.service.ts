import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { BaseRepository } from '@/modules/Database/base/base.repository';
import { QueryHook } from '@/modules/Database/types';

export abstract class BaseService<
  E extends ObjectLiteral,
  R extends BaseRepository<E>,
> {
  private repository: R;

  private constructor(repository: R) {
    this.repository = repository;
  }

  protected async buildItemQB(
    id: string,
    qb: SelectQueryBuilder<E>,
    callback?: QueryHook<E>,
  ) {
    qb.where(`${this.repository.qbName}.id = :id`, { id });
    return callback ? callback(qb) : qb;
  }
}
