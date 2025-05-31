import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '@/modules/Database/base';
import { SkuEntity } from '@/modules/Mall/entities';
import { SkuRepository, SpuRepository } from '@/modules/Mall/repositories';
import { CreateSkuDto } from '@/modules/Mall/dtos';

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
        where: { id: data.spu_id },
      });
      return this.repository.save({ ...data, spu });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
