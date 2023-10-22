import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JsonWebTokenError } from 'jsonwebtoken';
import { Request } from 'express';
import { UserService } from 'src/user/services/user.service';
import { AuthStrategy } from '../strategies/auth.strategy';

@Injectable()
export class JwtTokenIsNotExpiredGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @Inject('AuthStrategy')
    private readonly authStrategy: AuthStrategy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const { refresh_token } = req.body;

    try {
      await this.authStrategy.verifyToken(refresh_token);

      const refreshTokenValue = this.authStrategy.getTokenValue();

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
