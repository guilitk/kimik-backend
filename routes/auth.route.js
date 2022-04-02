import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter
  .post("/login", authController.login)
  .post("/token", authController.refreshToken);

export { authRouter };
