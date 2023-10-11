import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser, CurrentUserType } from './user.decorator';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  @Get('me')
  public profile(@CurrentUser() user: CurrentUserType) {
    return user;
  }

  @Public()
  @Get()
  public index() {
    return 'Hi, mom';
  }
}
