import { BaseService } from '@/modules/Database/base';
import { SpuEntity } from '@/modules/Mall/entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryRepository, SpuRepository } from '@/modules/Mall/repositories';
import {
  CreateSpuDto,
  PaginateSpuDto,
  UpdateSpuDto,
} from '@/modules/Mall/dtos';
import { omit } from 'lodash';

@Injectable()
export class SpuService extends BaseService<SpuEntity, SpuRepository> {
  constructor(
    protected repository: SpuRepository,
    protected readonly categoryRepository: CategoryRepository,
  ) {
    super(repository);
  }

  async create(data: CreateSpuDto) {
    try {
      return await this.repository.save({
        ...data,
        category: await this.categoryRepository.findOne({
          where: { id: data.category },
        }),
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateData(d: UpdateSpuDto) {
    await super.update(d.id, omit(d, ['id']));
    return super.detail(d.id);
  }

  async detail(id: string) {
    return await super.detail(id, async (qb) =>
      qb.leftJoinAndSelect(`${this.repository.qbName}.spu`, 'spu'),
    );
  }

  async pageData(data: PaginateSpuDto) {
    return await super.page(data, async (qb) =>
      qb.leftJoinAndSelect(`${this.repository.qbName}.category`, 'category'),
    );
  }
}
