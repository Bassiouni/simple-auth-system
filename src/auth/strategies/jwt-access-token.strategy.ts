import { ConfigService } from '@nestjs/config';
import { UserType } from 'src/types/user.type';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-token-strategy',
) {
  public constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('access_token_secret'),
    });
  }

  public async validate(payload: UserType): Promise<UserType> {
    return payload;
  }
}
