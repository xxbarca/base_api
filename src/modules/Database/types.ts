import { SelectQueryBuilder } from 'typeorm';

export type QueryHook<Entity> = (
  qb: SelectQueryBuilder<Entity>,
) => Promise<SelectQueryBuilder<Entity>>;

export type ServiceListQueryOption = Record<string, any>;
