import { describe, expect, it } from "vitest";
import { Roles, User } from "../../src/user/user.domain";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

describe("User Domain", () => {
  it("Test create new user instance", () => {
    const input = {
      register: randomUUID(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
      role: Roles.admin,
    };
    const user = new User(
      input.register,
      input.name,
      input.email,
      input.role
    ).getUser();
    expect(user.role).toBe("ADMIN");
    expect(user.name).toBe(input.name);
    expect(user.email).toBe(input.email);
    expect(user.register).toBe(input.register);
  });

  it("Test create new user with invalid name", () => {
    expect(() => {
      new User(randomUUID(), "", faker.internet.email(), Roles.admin).getUser();
    }).toThrow("User name is required");
  });

  it("Test create new user with invalid email", () => {
    expect(() => {
      new User(
        randomUUID(),
        faker.name.fullName(),
        "john",
        Roles.admin
      ).getUser();
    }).toThrow("Invalid email format");
    expect(() => {
      new User(randomUUID(), faker.name.fullName(), "", Roles.admin).getUser();
    }).toThrow("User email is required");
  });
});
