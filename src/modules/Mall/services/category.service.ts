import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from '@/modules/Database/base';
import { CategoryEntity } from '@/modules/Mall/entities';
import { CategoryRepository } from '@/modules/Mall/repositories';
import { CreateCategoryDto, UpdateCategoryDto } from '@/modules/Mall/dtos';
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
    return await this.detail(item.id);
  }

  async updateData(data: UpdateCategoryDto) {
    if (data.parent) {
      if (data.parent === data.id) {
        throw new HttpException('父分类不能是自己', HttpStatus.BAD_REQUEST);
      }
      const parent = await this.repository.findOne({
        where: { id: data.parent },
      });
      await super.update(data.id, { ...omit(data, ['parent']), parent });
    } else {
      await super.update(data.id, omit(data, ['parent']));
    }
    return await this.detail(data.id);
  }

  async detail(id: string) {
    return await super.detail(id, async (qb) =>
      qb.leftJoinAndSelect(`${this.repository.qbName}.parent`, 'parent'),
    );
  }
}
