import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '@/module/Database/base';
import { RoleEntity } from '@/module/Auth/entities';
import { RoleRepository } from '@/module/Auth/repositories';
import { CreateRoleDto, UpdateRoleDto } from '@/module/Auth/dtos';
import { omit } from 'lodash';

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

  async update(dto: UpdateRoleDto) {
    try {
      await this.roleRepository.update(dto.id, omit(dto, 'id'));
      return await this.detail(dto.id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
