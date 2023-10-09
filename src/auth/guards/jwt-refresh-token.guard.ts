import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class JwtRefreshTokenGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const refreshToken = req.headers['refresh-token'] as string;

    const { id: userid } = req.body;

    const { token, id, username } = await this.userService.findOneByID(userid);

    if (!Object.is(token, refreshToken)) {
      throw new BadRequestException('incorrect token');
    }

    req.body = { ...req.body, id, username };

    return true;
  }
}
