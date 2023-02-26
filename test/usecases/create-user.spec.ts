import { describe, expect, it } from "vitest";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { InMemoryRepos } from "../../src/user/implements/InMemory.repos";
import { CreateUserUseCase } from "../../src/user/usecases/create-user.use-case";

describe("Create user Use Case", () => {
  it("Test create new user in DB with all data valid", async () => {
    const input = {
      register: randomUUID(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
    };
    const repos = new InMemoryRepos();
    await new CreateUserUseCase(repos).execute(input, "adminCase");
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
    };
    const repos = new InMemoryRepos();

    await repos.findByRegister(input.register);
    expect(
      async () => await new CreateUserUseCase(repos).execute(input, "")
    ).rejects.toThrow("You don't have permission");
  });
});
