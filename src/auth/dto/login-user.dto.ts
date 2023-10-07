import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUser {
  @IsString()
  @IsNotEmpty()
  public readonly username: string;

  @IsString()
  @IsNotEmpty()
  public readonly password: string;

  public constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
