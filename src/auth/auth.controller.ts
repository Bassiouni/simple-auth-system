import { Controller, Post, Body, UseGuards, Res, Put } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';
import { JwtTokenIsNotExpiredGuard } from './guards/jwt-token-is-not-expired.guard';
import { RefreshTokenHeaderGuard } from './guards/refresh-token-header.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res() response: Response,
  ) {
    const { access_token, refresh_token } = await this.authService.register({
      username,
      password,
    });

    response
      .setHeader('Access-Token', access_token)
      .setHeader('Refresh-Token', refresh_token);

    return {};
  }

  @Post('login')
  public async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res() response: Response,
  ) {
    const { access_token, refresh_token } = await this.authService.login({
      username,
      password,
    });

    response
      .setHeader('Access-Token', access_token)
      .setHeader('Refresh-Token', refresh_token);

    return {};
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
    @Res() response: Response,
  ) {
    const access_token = await this.authService.refresh(id, username);
    response.setHeader('Access-Token', access_token);

    return {};
  }
}
