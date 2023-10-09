import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class RefreshTokenHeaderGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const refreshTokenFromHeader = req.headers['refresh-token'] as string;

    if (!refreshTokenFromHeader) {
      throw new BadRequestException(
        'Please provide a proper Refresh-Token header',
      );
    }

    return true;
  }
}
