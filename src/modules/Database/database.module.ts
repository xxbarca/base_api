import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { connectionParams } from '@/data-source';
import { UniqueConstraint } from '@/modules/Database/constraints';

@Module({
  imports: [TypeOrmModule.forRoot(connectionParams)],
  providers: [UniqueConstraint],
})
export class DatabaseModule {}
