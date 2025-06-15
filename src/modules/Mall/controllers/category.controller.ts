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
import {
  CreateCategoryDto,
  PaginateCategoryDto,
  UpdateCategoryDto,
} from '@/modules/Mall/dtos';

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

  @Patch('switchStatus/:id')
  async switchStatus(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.switchStatus(id);
  }

  @Get('/all/list')
  async list() {
    return await this.service.all();
  }

  @Post('paginate')
  async paginate(@Body() data: PaginateCategoryDto) {
    return await this.service.paginate(data);
  }
}
