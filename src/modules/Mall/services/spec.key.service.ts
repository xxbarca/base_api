import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '@/modules/Database/base';
import { SpecKeyEntity } from '@/modules/Mall/entities';
import { SpecKeyRepository } from '@/modules/Mall/repositories';
import { CreateSpecKeyDto } from '@/modules/Mall/dtos';

@Injectable()
export class SpecKeyService extends BaseService<
  SpecKeyEntity,
  SpecKeyRepository
> {
  constructor(protected repository: SpecKeyRepository) {
    super(repository);
  }

  async create(data: CreateSpecKeyDto) {
    try {
      return await this.repository.save(data);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string) {
    return await super.delete(id);
  }

  async detail(id: string) {
    return await super.detail(id, async (qb) =>
      qb.leftJoinAndSelect(`${this.repository.qbName}.values`, 'values'),
    );
  }
}
