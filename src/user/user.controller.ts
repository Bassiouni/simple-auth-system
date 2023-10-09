import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  profile() {}
}
