import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@/modules/Database/database.module';
import { MallModule } from '@/modules/Mall/mall.module';
import { ConfigurationModule } from '@/modules/ConfigurationModule/configuration.module';
import { CoreModule } from '@/modules/Core/core.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import {
  AppFilter,
  AppInterceptor,
  AppPipe,
  TransformInterceptor,
} from '@/modules/Core/providers';
import { AuthModule } from '@/modules/Auth/auth.module';
import { JwtAuthGuard } from '@/modules/Auth/guards';
import { AccessModule } from '@/modules/Access/access.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    MallModule,
    CoreModule,
    AuthModule,
    AccessModule,
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
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
