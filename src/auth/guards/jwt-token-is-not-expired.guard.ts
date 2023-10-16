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

    const { refresh_token } = req.body;

    try {
      const refreshTokenValue = await this.jwtService.verifyAsync(refresh_token, {
        secret: this.configService.getOrThrow('refresh_token_secret'),
        ignoreExpiration: false,
      });

      if (!refreshTokenValue) {
        throw new BadRequestException('Unverified Token');
      }

      const { sub: id } = refreshTokenValue;

      req.body = { ...req.body, id };
    } catch (e: unknown) {
      if (e instanceof JsonWebTokenError && e.name === 'TokenExpiredError') {
        const { sub: id } = await this.jwtService.verifyAsync(refresh_token, {
          secret: this.configService.getOrThrow('refresh_token_secret'),
          ignoreExpiration: true,
        });

        await this.userService.update(id, { token: null });

        return false;
      }
    }

    return true;
  }
}
