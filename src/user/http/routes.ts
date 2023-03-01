import { Router } from "express";
import { CreateUserController } from "./controller/create-user.controller";

export const UserRoutes = Router();

UserRoutes.post("/create", CreateUserController.execute);
