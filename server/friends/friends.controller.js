import friendsDAO from "./friends.dao.js";

export default class friendsController {
  static getAllFriends = async (req, res, next) => {
    try {
      const response = await friendsDAO.getAllFriends(req.user._id);
      return res.status(200).json(response);
    } catch (err) {
      return next(err);
    }
  };
  static postFriend = async (req, res, next) => {
    try {
      const response = await friendsDAO.postFriend(req.user._id, req.body);
      return res.status(200).json(response);
    } catch (err) {
      return next(err);
    }
  };
  static deleteFriend = async (req, res, next) => {
    try {
      const response = await friendsDAO.deleteFriend(req.user._id, req.body);
      return res.status(200).json(response);
    } catch (err) {
      return next(err);
    }
  };
}
