import { Roles, User } from "../user.domain";
import { UserRepository } from "../user.repos";
export class InMemoryRepos implements UserRepository {
  private users: User[] = [
    new User("adminCase", "ADMIN", "admin@admin.com", Roles.admin),
  ];

  async findByRegister(id: string): Promise<User | undefined> {
    return await this.users.find((user) => user.getRegister() === id);
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return await this.users.find((user) => user.getEmail() === email);
  }
  async create(user: User): Promise<void> {
    await this.users.push(user);
  }
  async update(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
