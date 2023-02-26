import { BadRequestError } from "./User.error";
export enum Roles {
  "admin" = "ADMIN",
  "user" = "USER",
}

export class User {
  private register: string;
  private name: string;
  private email: string;
  private role: string;

  constructor(
    register: string,
    name: string,
    email: string,
    role: Roles = Roles.user
  ) {
    this.register = register;
    this.name = name;
    this.email = email;
    this.role = role;
    this.validate();
  }

  public getRegister(): string {
    return this.register;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getRole(): string {
    return this.role;
  }

  public getUser() {
    return {
      email: this.email,
      name: this.name,
      register: this.register,
      role: this.role,
    };
  }

  private validate(): void {
    if (!this.register || this.register.trim().length === 0) {
      throw new BadRequestError("User register is required");
    }

    if (!this.name || this.name.trim().length === 0) {
      throw new BadRequestError("User name is required");
    }

    if (!this.email || this.email.trim().length === 0) {
      throw new BadRequestError("User email is required");
    }

    if (!this.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new BadRequestError("Invalid email format");
    }
    if (!this.role) {
      throw new BadRequestError("Invalid user role");
    }
  }
}
