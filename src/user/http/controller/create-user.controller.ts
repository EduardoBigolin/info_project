import { Request, Response } from "express";
import { PrismaUserRepos } from "../../implements/prisma-user.repos";
import { CreateUserUseCase } from "../../usecases/create-user.use-case";

export class CreateUserController {
  static async execute(req: Request, res: Response) {
    // Create auth user ....

    try {
      const user = {
        register: "123123",
      };
      const input = req.body;
      const repos = new PrismaUserRepos();
      const useCase = await new CreateUserUseCase(repos).execute(
        input,
        user.register
      );
      res.json({
        ok: "User Created with success",
      });
    } catch (error: any) {
      res.status(400).json({
        error: error.message,
      });
    }
  }
}
