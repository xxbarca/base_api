import { Module } from '@nestjs/common';
import * as controllers from '@/modules/Mall/controllers';
import * as repositories from '@/modules/Mall/repositories';
import * as services from '@/modules/Mall/services';
@Module({
  controllers: Object.values(controllers),
  providers: [...Object.values(repositories), ...Object.values(services)],
})
export class MallModule {}
