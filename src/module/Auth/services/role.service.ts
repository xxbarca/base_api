import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '@/module/Database/base';
import { RoleEntity } from '@/module/Auth/entities';
import { RoleRepository } from '@/module/Auth/repositories';
import { CreateRoleDto, SetPermissionsDto } from '@/module/Auth/dtos';

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

  async setPermissions(data: SetPermissionsDto) {
    const role = await this.detail(data.id, async (qb) =>
      qb.leftJoinAndSelect(
        `${this.roleRepository.qbName}.permissions`,
        'permissions',
      ),
    );
    try {
      await this.roleRepository
        .buildBaseQB()
        .relation(RoleEntity, 'permissions')
        .of(role)
        .addAndRemove(data.permissions, role.permissions);
      return this.detail(data.id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
