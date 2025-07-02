import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { SpecKeyService, SpecValueService } from '@/modules/Mall/services';
import {
  CreateSpecKeyDto,
  CreateSpecValueDto,
  PaginateKeyDto,
} from '@/modules/Mall/dtos';

@Controller('spec')
export class SpecController {
  constructor(
    private keyService: SpecKeyService,
    private valueService: SpecValueService,
  ) {}

  @Post('key')
  async createKey(@Body() data: CreateSpecKeyDto) {
    return await this.keyService.create(data);
  }

  @Post('value')
  async createValue(@Body() data: CreateSpecValueDto) {
    return await this.valueService.create(data);
  }

  @Delete('key/:id')
  async deleteKey(@Param('id', ParseUUIDPipe) id: string) {
    return await this.keyService.delete(id);
  }

  @Get('key/detail/:id')
  async keyDetail(@Param('id', ParseUUIDPipe) id: string) {
    return await this.keyService.detail(id);
  }

  @Delete('value/:id')
  async deleteValue(@Param('id', ParseUUIDPipe) id: string) {
    return await this.valueService.delete(id);
  }

  @Get('key/list')
  async specKeyList() {
    return await this.keyService.list();
  }

  @Post('paginate/key')
  async paginateKey(@Body() data: PaginateKeyDto) {
    return await this.keyService.page(data);
  }
}
