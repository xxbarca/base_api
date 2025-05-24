import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getConfigService(): ConfigService {
    return this.configService;
  }

  @Get('host')
  getMysqlHost(): string {
    return this.configService.get('MYSQL_PORT');
  }
}
