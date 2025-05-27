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
import { CategoryService } from '@/modules/Mall/services';
import { CreateCategoryDto, UpdateCategoryDto } from '@/modules/Mall/dtos';

@Controller('category')
export class CategoryController {
  constructor(private service: CategoryService) {}

  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    return await this.service.create(dto);
  }

  @Patch()
  async update(@Body() dto: UpdateCategoryDto) {
    return await this.service.updateData(dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.delete(id);
  }

  @Get(':id')
  async detail(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.detail(id);
  }
}
