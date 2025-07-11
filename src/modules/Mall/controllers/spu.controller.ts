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
import { SpuService } from '@/modules/Mall/services';
import {
  CreateSpuDto,
  PaginateSpuDto,
  SetDefaultSkuDto,
  UpdateSpuDto,
} from '@/modules/Mall/dtos';

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

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.delete(id);
  }

  @Post('paginate')
  async paginate(@Body() data: PaginateSpuDto) {
    return await this.service.pageData(data);
  }

  @Patch('switchStatus/:id')
  async switchStatus(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.switchStatus(id);
  }

  @Get('/all/list')
  async list() {
    return await this.service.all();
  }

  @Post('setDefaultSku')
  async setDefaultSku(@Body() data: SetDefaultSkuDto) {
    return await this.service.setDefaultSku(data);
  }
}
