import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@/modules/Database/database.module';
import { MallModule } from '@/modules/Mall/mall.module';
import { ConfigurationModule } from '@/modules/Mall/ConfigurationModule/configuration.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule, MallModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
