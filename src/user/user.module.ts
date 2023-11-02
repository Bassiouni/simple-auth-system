import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { JwtAccessTokenStrategy } from 'src/auth/strategies/jwt-access-token.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'AuthStrategy',
      useClass: JwtAccessTokenStrategy,
    },
  ],
  exports: [
    UserService,
    {
      provide: 'AuthStrategy',
      useClass: JwtAccessTokenStrategy,
    },
  ],
})
export class UserModule {}
