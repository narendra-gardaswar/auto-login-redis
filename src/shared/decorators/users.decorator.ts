import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ContextType } from '../guards/api.guard';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    if (ctx.getType() === ContextType.HTTP) {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    }
  },
);
