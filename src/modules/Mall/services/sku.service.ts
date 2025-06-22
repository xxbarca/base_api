import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '@/modules/Database/base';
import { SkuEntity } from '@/modules/Mall/entities';
import { SkuRepository, SpuRepository } from '@/modules/Mall/repositories';
import {
  CreateSkuDto,
  PaginateSkuDto,
  UpdateSkuDto,
} from '@/modules/Mall/dtos';
import { omit } from 'lodash';

@Injectable()
export class SkuService extends BaseService<SkuEntity, SkuRepository> {
  constructor(
    protected repository: SkuRepository,
    protected spuRepository: SpuRepository,
  ) {
    super(repository);
  }

  async create(data: CreateSkuDto) {
    try {
      const spu = await this.spuRepository.findOne({
        where: { id: data.spu },
      });
      return this.repository.save({ ...data, spu });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateData(d: UpdateSkuDto) {
    await super.update(d.id, {
      ...omit(d, ['spu_id']),
      spu: this.spuRepository.findOne({
        where: { id: d.spu },
      }),
    });
    return await this.detail(d.id);
  }

  async detail(id: string) {
    return await super.detail(id, async (qb) =>
      qb.leftJoinAndSelect(`${this.repository.qbName}.spu`, 'spu'),
    );
  }

  async pageData(data: PaginateSkuDto) {
    return await super.page(data, async (qb) =>
      qb
        .leftJoinAndSelect(`${this.repository.qbName}.spu`, 'spu')
        .leftJoinAndSelect('spu.specKeys', 'specKeys')
        .leftJoinAndSelect('specKeys.values', 'values'),
    );
  }
}
