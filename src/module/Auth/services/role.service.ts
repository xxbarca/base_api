import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '@/module/Database/base';
import { RoleEntity } from '@/module/Auth/entities';
import { RoleRepository } from '@/module/Auth/repositories';
import { CreateRoleDto } from '@/module/Auth/dtos';

@Injectable()
export class RoleService extends BaseService<RoleEntity, RoleRepository> {
  constructor(protected roleRepository: RoleRepository) {
    super(roleRepository);
  }

  async create(dto: CreateRoleDto) {
    try {
      return await this.roleRepository.save(dto);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
