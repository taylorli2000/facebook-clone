import { Router } from "express";
import authController from "./auth.controller.js";

const authRouter = Router();

authRouter.route("/").post(authController.login);
authRouter.route("/signup").post(authController.signup);

export default authRouter;
