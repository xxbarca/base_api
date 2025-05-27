import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '@/modules/Database/base';
import { CategoryEntity } from '@/modules/Mall/entities';
import { CategoryRepository } from '@/modules/Mall/repositories';
import { CreateCategoryDto } from '@/modules/Mall/dtos';
import { omit } from 'lodash';

@Injectable()
export class CategoryService extends BaseService<
  CategoryEntity,
  CategoryRepository
> {
  constructor(protected repository: CategoryRepository) {
    super(repository);
  }

  async create(data: CreateCategoryDto) {
    let item: CategoryEntity;
    if (data.parent) {
      const parent = await this.repository.findOne({
        where: { id: data.parent },
      });
      if (parent) {
        item = await this.repository.save({
          ...data,
          parent,
        });
      } else {
        throw new NotFoundException('Parent does not exist');
      }
    } else {
      item = await this.repository.save(omit(data, ['parent']));
    }
    return await super.detail(item.id, async (qb) =>
      qb.leftJoinAndSelect(`${this.repository.qbName}.parent`, 'parent'),
    );
  }
}
