import { Roles, User } from "../user.domain";
import { UserDto } from "../user.dto";
import { UserRepository } from "../user.repos";

export class CreateUserUseCase {
  constructor(public userRepository: UserRepository) {}

  async execute(user: UserDto, userRegister: string) {
    
    const userIsAdm = await this.userRepository.findByRegister(userRegister);

    if (!(await this.userRepository.findByEmail(user.email))) {
      throw new BadRequestError("This email at in use");
    }
    if (userIsAdm?.getRole() !== Roles.admin) {
      throw new BadRequestError("You don't have permission");
    }

    const userInput = new User(user.register, user.name, user.email, user.role);
    const userData = this.userRepository.create(userInput);

    return userData;
  }
}
