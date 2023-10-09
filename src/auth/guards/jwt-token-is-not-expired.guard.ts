import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JsonWebTokenError } from 'jsonwebtoken';
import { Request } from 'express';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class JwtTokenIsNotExpiredGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const refreshTokenFromHeader = req.headers['refresh-token'] as string;

    try {
      const refreshToken = await this.jwtService.verifyAsync(
        refreshTokenFromHeader,
        {
          secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
          ignoreExpiration: false,
        },
      );

      if (!refreshToken) {
        throw new BadRequestException('Unverified Token');
      }

      const { sub: id } = refreshToken;

      req.body = { ...req.body, id };
    } catch (e: unknown) {
      if (e instanceof JsonWebTokenError && e.name === 'TokenExpiredError') {
        const { sub: id } = await this.jwtService.verifyAsync(
          refreshTokenFromHeader,
          {
            secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
            ignoreExpiration: true,
          },
        );

        this.userService.update(id, { token: null });

        return false;
      }
    }

    return true;
  }
}
