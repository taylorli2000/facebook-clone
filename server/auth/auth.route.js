import { Router } from "express";
import authController from "./auth.controller.js";
import authCheckHandler from "../middleware/authCheckHandler.js";

const authRouter = Router();

authRouter
  .route("/")
  .post(authController.login)
  .delete(authCheckHandler, authController.deleteUser)
  .patch(authCheckHandler, authController.patchUser);
authRouter.route("/signup").post(authController.signup);

export default authRouter;
