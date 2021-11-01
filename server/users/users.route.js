import { Router } from "express";
import usersController from "./users.controller.js";

const usersRouter = Router();

usersRouter.route("/").get(usersController.getAllUsers);
usersRouter.route("/:id").get(usersController.getUserById);

export default usersRouter;
