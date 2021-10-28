import { Router } from "express";
import usersController from "./users.controller.js";

const usersRouter = Router();

usersRouter
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.postUser);
usersRouter.route("/:id").get(usersController.getUser);

export default usersRouter;
