import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    const salt = await genSalt(Math.round(Math.random() * 100));
    const pepper = this.configService.getOrThrow<string>('BCRYPT_SECRET');

    return await this.userRepo.save({
      username: createUserDto.username,
      password: await hash(createUserDto.password + pepper, salt),
      salt,
    });
  }

  public async findAll() {
    return await this.userRepo.find();
  }

  public async findOneByID(id: number) {
    return await this.userRepo.findOneBy({ id });
  }

  public async findByUsername(username: string) {
    return await this.userRepo.findOneBy({ username });
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(id, updateUserDto);
  }

  public async remove(id: number) {
    return await this.userRepo.delete(id);
  }
}
