import inquire from "inquirer";
import { Roles } from "../../user/user.domain";
import { CreateAdmUseCase } from "../../user/usecases/create-adm.use-case";
import { PrismaUserRepos } from "../../user/implements/prisma-user.repos";

const answers = inquire.prompt([
  {
    message: "Digite o nome do ADM: ",
    type: "input",
    default: "ADM",
    name: "name",
  },
  {
    message: "Digite o registro do ADM: ",
    type: "input",
    default: "123123",
    name: "register",
  },
  {
    message: "Digite o email do ADM: ",
    type: "input",
    default: "test@hotmail.com",
    name: "email",
  },
]);

answers.then(async (answers) => {
  try {
    const repos = new PrismaUserRepos();
    const input = {
      name: answers.name as string,
      email: answers.email as string,
      register: answers.register as string,
      role: Roles.admin,
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
