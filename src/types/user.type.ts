import { Role } from 'src/user/enums/role.enum';

export type UserType = {
  sub: number;
  username: string;
  roles: Role[];
};
