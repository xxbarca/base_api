import { Module } from '@nestjs/common';
import * as controllers from '@/modules/Access/controllers';
import * as services from '@/modules/Access/services';
import * as repositories from '@/modules/Access/repositories';
@Module({
  controllers: Object.values(controllers),
  providers: [...Object.values(services), ...Object.values(repositories)],
})
export class AccessModule {}
