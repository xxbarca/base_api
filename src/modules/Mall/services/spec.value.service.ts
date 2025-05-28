import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '@/modules/Database/base';
import { SpecValueEntity } from '@/modules/Mall/entities';
import { SpecValueRepository } from '@/modules/Mall/repositories';
import { CreateSpecValueDto } from '@/modules/Mall/dtos';

@Injectable()
export class SpecValueService extends BaseService<
  SpecValueEntity,
  SpecValueRepository
> {
  constructor(protected repository: SpecValueRepository) {
    super(repository);
  }

  async create(data: CreateSpecValueDto) {
    try {
      return await this.repository.save(data);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
