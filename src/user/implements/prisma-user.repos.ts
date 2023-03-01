import { PrismaClient } from "@prisma/client";
import { Roles, User } from "../user.domain";
import { UserRepository } from "../user.repos";

const prisma = new PrismaClient();
export class PrismaUserRepos implements UserRepository {
  async findByRegister(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        register: id,
      },
    });
    if (!user) {
      return null;
    }
    return new User(user.register, user.name, user.email, user.role as Roles, user.password);
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return null;
    }
    return new User(user.register, user.name, user.email, user.role as Roles, user.password);
  }
  async create(user: User): Promise<User> {
    await prisma.user.create({
      data: {
        register: user.getRegister(),
        name: user.getName(),
        email: user.getEmail(),
        role: user.getRole(),
        password: await user.getPassword(),
      },
    });
    return user;
  }
  update(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
