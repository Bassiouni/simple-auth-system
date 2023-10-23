import { JwtService } from '@nestjs/jwt';
import { AuthStrategy } from './auth.strategy.interface';
import { ConfigService } from '@nestjs/config';
import { UserType } from 'src/types/user.type';
import { Injectable } from '@nestjs/common';

type Options = {
  config_name: 'access_token_secret' | 'refresh_token_secret';
};

@Injectable()
export class JwtTokenStrategy implements AuthStrategy {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async verify(token: string, options: Options): Promise<UserType> {
    return await this.jwtService.verifyAsync<UserType>(token, {
      secret: this.configService.getOrThrow(options.config_name),
      ignoreExpiration: false,
    });
  }
}
