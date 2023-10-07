import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUser } from './dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import assert from 'assert';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  public async register(createAuthDto: CreateUserDto) {
    const { id, username } = await this.userService.create(createAuthDto);

    return await this.getTokensObject(id, username);
  }

  public async login(loginUser: LoginUser) {
    const { id, username, salt, password } =
      await this.userService.findByUsername(loginUser.username);

    const pepper = this.configService.getOrThrow<string>('BCRYPT_SECRET');

    const authPassword = await hash(loginUser.password + pepper, salt);

    if (authPassword !== password) {
      throw new BadRequestException('incorrect username or password');
    }

    return await this.getTokensObject(id, username);
  }

  private async getTokensObject(id: number, username: string) {
    const { access_token, refresh_token } =
      await this.updateUserWithRefreshToken(id, username);

    return {
      access_token,
      refresh_token,
    };
  }

  private async updateUserWithRefreshToken(id: number, username: string) {
    const { access_token, refresh_token } = await this.genTokens(id, username);

    await this.userService.update(id, { token: refresh_token });

    return { access_token, refresh_token };
  }

  private async genTokens(id: number, username: string) {
    return {
      access_token: await this.genAccessToken(id, username),

      refresh_token: await this.genRefreshToken(id, username),
    };
  }

  private async genAccessToken(id: number, username: string) {
    return await this.jwtService.signAsync(
      { sub: id, username },
      {
        secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      },
    );
  }

  private async genRefreshToken(id: number, username: string) {
    return await this.jwtService.signAsync(
      { sub: id, username },
      {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      },
    );
  }
}
