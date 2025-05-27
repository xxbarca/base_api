import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { BaseRepository } from '@/modules/Database/base/base.repository';
import { QueryHook, ServiceListQueryOption } from '@/modules/Database/types';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

export abstract class BaseService<
  E extends ObjectLiteral,
  R extends BaseRepository<E>,
  P extends ServiceListQueryOption = ServiceListQueryOption,
> {
  protected repository: R;

  protected constructor(repository: R) {
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

  async detail(id: string, callback?: QueryHook<E>): Promise<E> {
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

  async update(id: string, other: Record<string, any>) {
    try {
      return await this.repository.update(id, other);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string) {
    const cate = await this.repository.findOne({
      where: { id: id } as any,
    });
    if (!cate) {
      throw new NotFoundException(
        `${this.repository.qbName} ${id} not exists!`,
      );
    }
    try {
      return await this.repository.remove(cate);
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
      Object.entries(options || {}).map(([key, value]) => [key, value]),
    );
    qb = qb.where(wheres);
    return callback ? callback(qb) : qb;
  }
}
