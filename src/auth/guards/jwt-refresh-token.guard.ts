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

    const { id: userid, refresh_token } = req.body;

    const { token, id, username, roles } =
      await this.userService.findOneByID(userid);

    if (!Object.is(token, refresh_token)) {
      throw new BadRequestException('incorrect token');
    }

    req.body = { ...req.body, id, username, roles };

    return true;
  }
}
