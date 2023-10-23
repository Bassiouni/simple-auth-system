import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { JwtTokenStrategy } from 'src/auth/strategies/verify-access-token.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'AuthStrategy',
      useClass: JwtTokenStrategy,
    },
  ],
  exports: [
    UserService,
    {
      provide: 'AuthStrategy',
      useClass: JwtTokenStrategy,
    },
  ],
})
export class UserModule {}
