import { User } from "../user.domain";
import { UserDto } from "../user.dto";
import { BadRequestError } from "../User.error";
import { UserRepository } from "../user.repos";

export class CreateAdmUseCase {
  constructor(public userRepository: UserRepository) { }

  async execute(user: UserDto) {
    if (await this.userRepository.findByEmail(user.email)) {
      throw new BadRequestError("This email at in use");
    }
    if (await this.userRepository.findByRegister(user.register)) {
      throw new BadRequestError("This register at in use");
    }
    const userInput = new User(user.register, user.name, user.email, user.role, user.password);

    const userData = this.userRepository.create(userInput);

    return userData;
  }
}
