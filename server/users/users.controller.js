import usersDAO from "./users.dao.js";

export default class usersController {
  static getAllUsers = async (req, res, next) => {
    try {
      const response = await usersDAO.getAllUsers();
      return res.status(200).json(response);
    } catch (err) {
      return next(err);
    }
  };
  static getUserById = async (req, res, next) => {
    try {
      const response = await usersDAO.getUserById(req.params.id);
      return res.status(200).json(response);
    } catch (err) {
      return next(err);
    }
  };
  static deleteUser = async (req, res, next) => {
    try {
      const response = await usersDAO.deleteUser(req.user._id);
      return res.status(200).json(response);
    } catch (err) {
      return next(err);
    }
  };
  static patchUser = async (req, res, next) => {
    try {
      const response = await usersDAO.patchUser(req.user._id, req.body);
      return res.status(200).json(response);
    } catch (err) {
      return next(err);
    }
  };
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
}
