import { Controller, Post, Body, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UserType } from 'src/types/user.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const { access_token, refresh_token } = await this.authService.register({
      username,
      password,
    });

    return {
      access_token,
      refresh_token,
    };
  }

  @Post('login')
  public async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const { access_token, refresh_token } = await this.authService.login({
      username,
      password,
    });

    return {
      access_token,
      refresh_token,
    };
  }

  @Put('refresh')
  @UseGuards(JwtRefreshTokenGuard)
  public async refresh(@CurrentUser() user: UserType) {
    const { id, username, roles } = user;

    const access_token = await this.authService.refresh(id, username, roles);

    return {
      access_token,
    };
  }
}
