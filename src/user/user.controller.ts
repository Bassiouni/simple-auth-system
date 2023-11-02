import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAccessTokenGuard } from 'src/auth/guards/jwt-access-token.guard';
import { Public } from 'src/decorators/public.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UserType } from 'src/types/user.type';

@Controller('user')
@UseGuards(JwtAccessTokenGuard)
export class UserController {
  @Get('me')
  public profile(@CurrentUser() user: UserType) {
    return user;
  }

  @Public()
  @Get()
  public index() {
    return 'Hi, mom';
  }
}
