import { User } from "./user.domain";

export interface UserRepository {
  findByRegister(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}
