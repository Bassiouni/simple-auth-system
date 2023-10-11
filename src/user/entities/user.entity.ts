import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column({ unique: true })
  public readonly username: string;

  @Column()
  @Exclude()
  public readonly password: string;

  @Column()
  @Exclude()
  public readonly salt: string;

  @Column({ nullable: true })
  @Exclude()
  public readonly token: string;

  public constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
