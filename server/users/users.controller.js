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
      const response = await usersDAO.deleteUser(req.user.id);
      return res.status(200).json(response);
    } catch (err) {
      return next(err);
    }
  };
  static patchUser = async (req, res, next) => {
    try {
      const response = await usersDAO.patchUser(req.user.id, req.body);
      return res.status(200).json(response);
    } catch (err) {
      return next(err);
    }
  };
}
