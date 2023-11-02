import { ConfigService } from '@nestjs/config';
import { UserType } from 'src/types/user.type';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/services/user.service';
import { Request } from 'express';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token-strategy',
) {
  public constructor(
    readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.getOrThrow('refresh_token_secret'),
      passReqToCallback: true,
    });
  }

  public async validate(req: Request, payload: UserType): Promise<UserType> {
    const refresh_token = req.get('Authorization').replace('Bearer', '').trim();

    const { token, id, username, roles } = await this.userService.findOneByID(
      payload.id,
    );

    if (!Object.is(token, refresh_token)) {
      throw new BadRequestException('incorrect token');
    }

    return { id, username, roles };
  }
}
