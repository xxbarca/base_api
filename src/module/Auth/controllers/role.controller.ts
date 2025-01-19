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
  UpdateRoleDto,
} from '@/module/Auth/dtos';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return await this.roleService.create(dto);
  }

  @Patch()
  async update(@Body() dto: UpdateRoleDto) {
    return await this.roleService.update(dto);
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
}
