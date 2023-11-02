import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtAccessTokenStrategy } from './strategies/jwt-access-token.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
})
export class AuthModule {}
