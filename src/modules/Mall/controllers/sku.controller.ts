import { Body, Controller, Post } from '@nestjs/common';
import { SkuService } from '@/modules/Mall/services';
import { CreateSkuDto } from '@/modules/Mall/dtos';

@Controller('sku')
export class SkuController {
  constructor(private service: SkuService) {}

  @Post()
  async create(@Body() dto: CreateSkuDto) {
    return await this.service.create(dto);
  }
}
