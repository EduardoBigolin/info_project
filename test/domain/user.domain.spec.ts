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
      password: faker.internet.password(10, true, /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    };
    const user = new User(
      input.register,
      input.name,
      input.email,
      input.role,
      input.password
    ).getUser();
    expect(user.role).toBe("ADMIN");
    expect(user.name).toBe(input.name);
    expect(user.email).toBe(input.email);
    expect(user.register).toBe(input.register);
  });

  it("Test create new user with invalid name", () => {
    expect(() => {
      new User(randomUUID(), "", faker.internet.email(), Roles.admin, faker.internet.password(10, true, /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)).getUser();
    }).toThrow("User name is required");
  });

  it("Test create new user with invalid email", () => {
    expect(() => {
      new User(
        randomUUID(),
        faker.name.fullName(),
        "john",
        Roles.admin,
        faker.internet.password(10, true, /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      ).getUser();
    }).toThrow("Invalid email format");
    console.log(faker.internet.password(10, true, /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/));

    expect(() => {
      new User(randomUUID(), faker.name.fullName(), "", Roles.admin, faker.internet.password(10, true, /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)).getUser();
    }).toThrow("User email is required");
  });
});


