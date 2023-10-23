import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from '../enums/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column({ unique: true })
  public readonly username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  public readonly password: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  public readonly salt: string;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  public readonly token: string;

  @Column('enum', { nullable: true, array: true, enum: Role })
  public readonly roles: Role[];

  public constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
