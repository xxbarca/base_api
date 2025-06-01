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
import { SkuService } from '@/modules/Mall/services';
import {
  CreateSkuDto,
  PaginateSkuDto,
  UpdateSkuDto,
} from '@/modules/Mall/dtos';

@Controller('sku')
export class SkuController {
  constructor(private service: SkuService) {}

  @Post()
  async create(@Body() dto: CreateSkuDto) {
    return await this.service.create(dto);
  }

  @Patch()
  async update(@Body() dto: UpdateSkuDto) {
    return await this.service.updateData(dto);
  }

  @Get(':id')
  async detail(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.detail(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.delete(id);
  }

  @Post('paginate')
  async paginate(@Body() data: PaginateSkuDto) {
    return await this.service.pageData(data);
  }
}
