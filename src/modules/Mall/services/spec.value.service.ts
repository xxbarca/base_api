import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '@/modules/Database/base';
import { SpecValueEntity } from '@/modules/Mall/entities';
import {
  SpecKeyRepository,
  SpecValueRepository,
} from '@/modules/Mall/repositories';
import { CreateSpecValueDto } from '@/modules/Mall/dtos';

@Injectable()
export class SpecValueService extends BaseService<
  SpecValueEntity,
  SpecValueRepository
> {
  constructor(
    protected repository: SpecValueRepository,
    protected keyRepository: SpecKeyRepository,
  ) {
    super(repository);
  }

  async create(data: CreateSpecValueDto) {
    try {
      const key = await this.keyRepository.findOne({
        where: {
          id: data.key_id,
        },
      });
      return await this.repository.save({ ...data, key });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
