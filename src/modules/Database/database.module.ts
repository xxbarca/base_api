import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { connectionParams } from '@/data-source';
import {
  DataExistConstraint,
  UniqueConstraint,
} from '@/modules/Database/constraints';

@Module({
  imports: [TypeOrmModule.forRoot(connectionParams)],
  providers: [UniqueConstraint, DataExistConstraint],
})
export class DatabaseModule {}
