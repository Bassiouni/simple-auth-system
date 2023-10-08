import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public readonly username: string;

  @IsString()
  @IsNotEmpty()
  @Exclude()
  public readonly password: string;
}
