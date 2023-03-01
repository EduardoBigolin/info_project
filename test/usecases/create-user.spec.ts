import { describe, expect, it } from "vitest";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { CreateUserUseCase } from "../../src/user/usecases/create-user.use-case";
import { PrismaUserRepos } from "../../src/user/implements/prisma-user.repos";
import { CreateAdmUseCase } from "../../src/user/usecases/create-adm.use-case";
import { Roles } from "../../src/user/user.domain";

describe("Create user Use Case", async () => {
  const repos = new PrismaUserRepos();
  const register = randomUUID();
  await new CreateAdmUseCase(repos).execute({
    register: register,
    email: faker.internet.email(),
    name: "Admin",
    role: Roles.admin,
    password: faker.internet.password(8, true, /^[a-zA-Z]\w{3,14}$/),
  });
  it("Test create new user in DB with all data valid", async () => {
    const input = {
      register: randomUUID(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(8)
    };

    await new CreateUserUseCase(repos).execute(input, register);
    const find = await repos.findByRegister(input.register);
    expect(find?.getRegister()).toBe(input.register);
    expect(find?.getName()).toBe(input.name);
    expect(find?.getEmail()).toBe(input.email);
    expect(find?.getRole()).toBe("USER");
  });
  it("Test return error 'don't have permission' in create new user in DB with account with user role", async () => {
    const input = {
      register: randomUUID(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(8, true, /^[a-zA-Z]\w{3,14}$/)
    };
    await repos.findByRegister(input.register);
    expect(
      async () => await new CreateUserUseCase(repos).execute(input, "")
    ).rejects.toThrow("You don't have permission");
  });
});
