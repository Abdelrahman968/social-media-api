import { Router } from "express";
import * as authController from "./auth.controller.js";
import { validate } from "@/app/middleware/zod/validate.middleware.js";
import { userRegisterSchema } from "@/app/module/auth/auth.zod.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validate(userRegisterSchema),
  authController.registerController,
);

export default authRouter;
