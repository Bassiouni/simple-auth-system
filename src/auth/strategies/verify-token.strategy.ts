import { JwtService } from '@nestjs/jwt';
import { AuthStrategy, UserToken } from './auth.strategy';
import { ConfigService } from '@nestjs/config';

export class VerifyTokenStrategy implements AuthStrategy {
  private tokenObject: UserToken;

  public constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.tokenObject = null;
  }

  public async verifyToken(token: string): Promise<void> {
    this.tokenObject = await this.jwtService.verifyAsync<UserToken>(token, {
      secret: this.configService.getOrThrow('refresh_token_secret'),
      ignoreExpiration: false,
    });
  }

  public getTokenValue(): UserToken {
    return this.tokenObject;
  }
}
