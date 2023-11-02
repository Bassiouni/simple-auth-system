import { Role } from 'src/user/enums/role.enum';

export type UserType = {
  id: string;
  username: string;
  roles: Role[];
};
