import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { connectionParams } from '@/data-source';

@Module({
  imports: [TypeOrmModule.forRoot(connectionParams)],
})
export class DatabaseModule {}
