import { Module } from '@nestjs/common';
import * as controllers from '@/modules/Mall/controllers';

@Module({
  controllers: Object.values(controllers),
})
export class MallModule {}
