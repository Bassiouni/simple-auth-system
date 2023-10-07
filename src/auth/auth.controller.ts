import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUser } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() newUserDto: CreateUserDto) {
    console.log('hello from controller');

    return await this.authService.register(newUserDto);
  }

  @Post('login')
  public async login(@Body() loginUser: LoginUser) {
    return await this.authService.login(loginUser);
  }
}
