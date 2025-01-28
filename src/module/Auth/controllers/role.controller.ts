import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { RoleService } from '@/module/Auth/services';
import {
  CreateRoleDto,
  PaginateRoleDto,
  SetPermissionsDto,
  UpdateRoleDto,
} from '@/module/Auth/dtos';
import { omit } from 'lodash';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return await this.roleService.create(dto);
  }

  @Patch()
  async update(@Body() dto: UpdateRoleDto) {
    return await this.roleService.update(dto.id, omit(dto, 'id'));
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.roleService.delete(id);
  }

  @Get()
  async list() {
    return await this.roleService.list();
  }

  @Post('paginate')
  async paginate(@Body() dto: PaginateRoleDto) {
    return await this.roleService.page(dto);
  }

  @Get(':id')
  async detail(@Param('id', ParseUUIDPipe) id: string) {
    return await this.roleService.detail(id);
  }

  @Post('setPermissions')
  async setPermissions(@Body() dto: SetPermissionsDto) {
    return await this.roleService.setPermissions(dto);
  }
}
