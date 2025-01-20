import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { BaseRepository } from '@/module/Database/base/base.repository';
import {
  PaginateOptions,
  PaginateReturn,
  QueryHook,
  ServiceListQueryOption,
} from '@/module/Database/types';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { paginate } from '@/module/Database/helpers';
import { omit } from 'lodash';

export abstract class BaseService<
  E extends ObjectLiteral,
  R extends BaseRepository<E>,
  P extends ServiceListQueryOption<E> = ServiceListQueryOption<E>,
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
    return callback ? callback(qb) : qb;
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

  async delete(id: string) {
    try {
      const items = await this.repository.find({ where: { id } as any });
      return await this.repository.remove(items);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async list(options?: P, callback?: QueryHook<E>) {
    const qb = await this.buildListQB(
      this.repository.buildBaseQB(),
      options,
      callback,
    );
    return qb.getMany();
  }

  protected async buildListQB(
    qb: SelectQueryBuilder<E>,
    options?: P,
    callback?: QueryHook<E>,
  ) {
    const wheres = Object.fromEntries(
      Object.entries(options).map(([key, value]) => [key, value]),
    );
    qb = qb.where(wheres);
    return callback ? callback(qb) : qb;
  }

  async page(
    options?: PaginateOptions & P,
    callback?: QueryHook<E>,
  ): Promise<PaginateReturn<E>> {
    const o = omit(options, ['page', 'limit']);
    const queryOptions = (o ?? {}) as P;
    const qb = await this.buildListQB(
      this.repository.buildBaseQB(),
      queryOptions,
      callback,
    );
    return paginate(qb, options);
  }

  async update(id: string, other: Record<string, any>): Promise<E> {
    try {
      await this.repository.update(id, other);
      return await this.detail(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
