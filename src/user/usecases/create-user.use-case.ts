import { RebbitmqServer } from "../../infra/rabbitmq/Server";
import { Roles, User } from "../user.domain";
import { UserDto } from "../user.dto";
import { BadRequestError } from "../User.error";
import { UserRepository } from "../user.repos";

export class CreateUserUseCase {
  constructor(public userRepository: UserRepository) { }

  async execute(user: UserDto, userRegister: string) {
    const userIsAdm = await this.userRepository.findByRegister(userRegister);
    console.log("senha", user.password);

    const userInput = new User(user.register, user.name, user.email, user.role, user.password);


    if (await this.userRepository.findByEmail(user.email)) {
      throw new BadRequestError("This email at in use");
    }
    if (await this.userRepository.findByRegister(user.register)) {
      throw new BadRequestError("This register at in use");
    }
    if (userIsAdm?.getRole() !== Roles.admin) {
      throw new BadRequestError("You don't have permission");
    }

    const userData = await this.userRepository.create(userInput);
    const emailForm = {
      from: userData.getEmail(),
      body: `
      Hello, your account is authenticated,
      Your password is ${userData.getRegister()}
       `,
    };
    const server = new RebbitmqServer("amqp://admin:admin@localhost:5672");
    await server.start();
    await server.publishInQueue("email", JSON.stringify(emailForm));

    return userData;
  }
}
