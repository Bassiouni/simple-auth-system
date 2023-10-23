import { UserType } from 'src/types/user.type';

export interface AuthStrategy {
  verify(object: any, options?: unknown): Promise<UserType> | UserType;
}
