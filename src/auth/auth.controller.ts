import { Controller, Post, Body, UseGuards, Put } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';
import { JwtTokenIsNotExpiredGuard } from './guards/jwt-token-is-not-expired.guard';
import { RefreshTokenHeaderGuard } from './guards/refresh-token-header.guard';

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
  @UseGuards(
    RefreshTokenHeaderGuard,
    JwtTokenIsNotExpiredGuard,
    JwtRefreshTokenGuard,
  )
  public async refresh(
    @Body('id') id: number,
    @Body('username') username: string,
  ) {
    const access_token = await this.authService.refresh(id, username);
    return {
      access_token,
    };
  }
}
