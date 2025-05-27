import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export type QueryHook<Entity> = (
  qb: SelectQueryBuilder<Entity>,
) => Promise<SelectQueryBuilder<Entity>>;

export type ServiceListQueryOption<E extends ObjectLiteral> = Record<
  string,
  any
>;
