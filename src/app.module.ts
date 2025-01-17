import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { connectionParams } from '@/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionParams),
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
