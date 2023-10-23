import { Controller, Post, Body, Put, UseGuards } from '@nestjs/common';
import { JwtTokenIsNotExpiredGuard } from 'src/auth/guards/jwt-token-is-not-expired.guard';
import { RefreshTokenHeaderGuard } from 'src/auth/guards/refresh-token-header.guard';
import { AuthService } from './services/auth.service';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';
import { Role } from 'src/user/enums/role.enum';

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
    @Body('id') id: string,
    @Body('username') username: string,
    @Body('roles') roles: Role[],
  ) {
    const access_token = await this.authService.refresh(id, username, roles);
    return {
      access_token,
    };
  }
}
