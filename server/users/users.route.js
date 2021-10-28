import { Router } from "express";
import usersController from "./users.controller.js";
import authCheckHandler from "../middleware/authCheckHandler.js";

const usersRouter = Router();

usersRouter
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.postUser);
usersRouter
  .route("/:id")
  .get(usersController.getUser)
  .delete(authCheckHandler, usersController.deleteUser)
  .patch(authCheckHandler, usersController.patchUser);

export default usersRouter;
