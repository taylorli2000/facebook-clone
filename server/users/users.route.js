import { Router } from "express";
import usersController from "./users.controller.js";
import authCheckHandler from "../middleware/authCheckHandler.js";

const usersRouter = Router();

usersRouter
  .route("/")
  .get(usersController.getAllUsers)
  .delete(authCheckHandler, usersController.deleteUser)
  .patch(authCheckHandler, usersController.patchUser);
usersRouter.route("/:id").get(usersController.getUserById);
usersRouter
  .route("/friends")
  .post(authCheckHandler, usersController.postFriend)
  .delete(authCheckHandler, usersController.deleteFriend);
export default usersRouter;
