import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [() => dotenv.config({ path: '.env' })],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
