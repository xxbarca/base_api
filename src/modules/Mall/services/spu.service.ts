import { BaseService } from '@/modules/Database/base';
import { SpuEntity } from '@/modules/Mall/entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SpuRepository } from '@/modules/Mall/repositories';
import { CreateSpuDto, UpdateSpuDto } from '@/modules/Mall/dtos';
import { omit } from 'lodash';

@Injectable()
export class SpuService extends BaseService<SpuEntity, SpuRepository> {
  constructor(protected repository: SpuRepository) {
    super(repository);
  }

  async create(data: CreateSpuDto) {
    try {
      return await this.repository.save(data);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateData(d: UpdateSpuDto) {
    await super.update(d.id, omit(d, ['id']));
    return super.detail(d.id);
  }
}
