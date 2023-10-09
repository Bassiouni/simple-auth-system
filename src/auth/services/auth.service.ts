import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUser } from '../dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  public async register(createUserDto: CreateUserDto) {
    const { id, username } = await this.userService.create(createUserDto);

    return await this.getTokensObject(id, username);
  }

  public async login(loginUser: LoginUser) {
    const userFromDB = await this.userService.findByUsername(
      loginUser.username,
    );

    if (Object.is(userFromDB, null)) {
      throw new NotFoundException('User not found');
    }

    const pepper = this.configService.getOrThrow<string>('BCRYPT_SECRET');

    const { id, username, salt, password } = userFromDB;

    const authPassword = await hash(loginUser.password + pepper, salt);

    if (authPassword !== password) {
      throw new BadRequestException('incorrect username or password');
    }

    return await this.getTokensObject(id, username);
  }

  public async refresh(id: number, username: string) {
    return await this.genAccessToken(id, username);
  }

  private async getTokensObject(id: number, username: string) {
    const { access_token, refresh_token } = await this.generateTokens(
      id,
      username,
    );

    await this.userService.update(id, { token: refresh_token });

    return { access_token, refresh_token };
  }

  private async generateTokens(id: number, username: string) {
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
