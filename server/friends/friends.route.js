import { Router } from "express";
import authCheckHandler from "../middleware/authCheckHandler.js";
import friendsController from "./friends.controller.js";

const friendsRouter = Router();

friendsRouter
  .route("/")
  .get(authCheckHandler, friendsController.getAllFriends)
  .post(authCheckHandler, friendsController.postFriend)
  .delete(authCheckHandler, friendsController.deleteFriend);

export default friendsRouter;
