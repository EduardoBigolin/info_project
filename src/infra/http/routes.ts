import { Router } from "express";
import { UserRoutes } from "../../user/http/routes";

export const routes = Router();

routes.get("/", async (req, res) => {
  res.json({
    message: "Welcome to my api",
  });
});
routes.use("/user", UserRoutes);
// routes.get("/example", async (req, res) => {
//   const repos = new PrismaUserRepos();
//   await new CreateUserUseCase(repos).execute(
//     {
//       name: "eduardo",
//       email: "eduardo123@hqerwqqwerotmail.com",
//       register: "12312dfqw",
//     },
//     "123123"
//   );
//   res.json({
//     message: "Welcome to my api",
//   });
// });
