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
import { UserService } from '@/module/Auth/services';
import { PaginateUserDto, UpdateUserDto } from '@/module/Auth/dtos';
import { omit } from 'lodash';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  async detail(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.detail(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.delete(id);
  }

  @Post('paginate')
  async paginate(@Body() dto: PaginateUserDto) {
    return await this.userService.page(dto);
  }

  @Patch()
  async update(@Body() dto: UpdateUserDto) {
    return await this.userService.update(dto.id, omit(dto, 'id'));
  }
}
