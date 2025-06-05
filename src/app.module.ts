import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@/modules/Database/database.module';
import { MallModule } from '@/modules/Mall/mall.module';
import { ConfigurationModule } from '@/modules/ConfigurationModule/configuration.module';
import { CoreModule } from '@/modules/Core/core.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AppFilter, AppPipe } from '@/modules/Core/providers';
import { AuthModule } from '@/modules/Auth/auth.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    MallModule,
    CoreModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new AppPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        validationError: { target: false },
      }),
    },
    {
      provide: APP_FILTER,
      useClass: AppFilter,
    },
  ],
})
export class AppModule {}
