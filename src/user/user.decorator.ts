import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export type CurrentUserType = {
  sub: number;
  username: string;
};

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request['user'] as CurrentUserType;
    return data ? user?.[data] : user;
  },
);
