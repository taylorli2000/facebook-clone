static postFriend = async (req, res, next) => {
    try {
      const response = await usersDAO.postFriend(req.user.id, req.body.id);
      return res.status(200).json(response);
    } catch (err) {
      return next(err);
    }
  };
  static deleteFriend = async (req, res, next) => {
    try {
      const response = await usersDAO.deleteFriend(req.user.id, req.body.id);
      return res.status(200).json(response);
    } catch (err) {
      return next(err);
    }
  };