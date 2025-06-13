import { Controller, Get } from '@nestjs/common';
import { MenuService } from '@/modules/Access/services';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('list')
  async list() {
    return await this.menuService.menuList();
  }
}
