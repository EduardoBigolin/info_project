import { Roles } from "./user.domain";

export interface UserDto {
  register: string;
  name: string;
  email: string;
  role?: Roles;
  password: string;
}
