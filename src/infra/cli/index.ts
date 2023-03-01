import inquire from "inquirer";
import { Roles } from "../../user/user.domain";
import { CreateAdmUseCase } from "../../user/usecases/create-adm.use-case";
import { PrismaUserRepos } from "../../user/implements/prisma-user.repos";
import { randomUUID } from "crypto";

const answers = inquire.prompt([
  {
    message: "Digite o nome do ADM: ",
    type: "input",
    default: "ADM",
    name: "name",
  },
  {
    message: "Digite o email do ADM: ",
    type: "input",
    default: "test@hotmail.com",
    name: "email",
  },
  {
    message: "Digite o password do ADM: ",
    type: "input",
    default: "your password",
    name: "password",
  },
]);

answers.then(async (answers) => {
  try {
    const repos = new PrismaUserRepos();
    const input = {
      name: answers.name as string,
      email: answers.email as string,
      register: randomUUID(),
      role: Roles.admin,
      password: answers.password as string
    };
    await new CreateAdmUseCase(repos).execute(input);
    console.log(`
    User Created with success,
    Your credential for login is  email: ${input.email} and your register 
    `);
  } catch (error: any) {
    console.error(`
      Fatal Error: ${error.message}
  `);
  }
});
