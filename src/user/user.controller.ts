import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Public } from 'src/decorators/public.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UserType } from 'src/types/user.type';

@Controller('user')
@UseGuards(AuthGuard)
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
