import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, IsString } from 'class-validator';
import { Role } from '../enums/role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  @Exclude()
  public readonly token?: string;

  @IsNotEmpty()
  @IsNotEmptyObject({ nullable: true })
  @Exclude()
  public readonly roles?: Role[];
}
