import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class RefreshTokenHeaderGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const refreshTokenFromHeader = req.body['refresh_token'] as string;

    if (!refreshTokenFromHeader) {
      throw new BadRequestException(
        'Please provide a proper Refresh-Token header',
      );
    }

    return true;
  }
}
