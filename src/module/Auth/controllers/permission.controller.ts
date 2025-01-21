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
import { PermissionService } from '@/module/Auth/services';
import { CreatePermissionDto, UpdatePermissionDto } from '@/module/Auth/dtos';

@Controller('permission')
export class PermissionController {
  constructor(private readonly service: PermissionService) {}

  @Post()
  async create(@Body() dto: CreatePermissionDto) {
    return await this.service.create(dto);
  }

  @Get('/detail/:id')
  async detail(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.getDetail(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.deleteItem(id);
  }

  @Patch()
  async update(@Body() dto: UpdatePermissionDto) {
    return await this.service.update(dto.id, dto as any);
  }

  @Get('/tree')
  async tree() {
    return await this.service.tree();
  }
}
