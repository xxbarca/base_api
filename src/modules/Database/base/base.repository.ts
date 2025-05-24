import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';

export abstract class BaseRepository<
  E extends ObjectLiteral,
> extends Repository<E> {
  protected abstract _qbName: string;

  get qbName(): string {
    return this._qbName;
  }

  buildBaseQB(): SelectQueryBuilder<E> {
    return this.createQueryBuilder(this._qbName);
  }
}
