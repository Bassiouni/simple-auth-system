import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { VerifyTokenStrategy } from './strategies/verify-token.strategy';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'AuthStrategy',
      useClass: VerifyTokenStrategy,
    },
  ],
})
export class AuthModule {}
