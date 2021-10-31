usersRouter
  .route("/friends")
  .post(authCheckHandler, usersController.postFriend)
  .delete(authCheckHandler, usersController.deleteFriend);
