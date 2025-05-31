import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SpuService } from '@/modules/Mall/services';
import { CreateSpuDto, UpdateSpuDto } from '@/modules/Mall/dtos';

@Controller('spu')
export class SpuController {
  constructor(private readonly service: SpuService) {}

  @Post()
  async create(@Body() dto: CreateSpuDto) {
    return await this.service.create(dto);
  }

  @Patch()
  async update(@Body() dto: UpdateSpuDto) {
    return await this.service.updateData(dto);
  }

  @Get(':id')
  async detail(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.detail(id);
  }
}
