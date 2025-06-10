import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '@/modules/Auth/entities';

export const ReqUser = createParamDecorator(
  async (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as ClassToPlain<UserEntity>;
  },
);
