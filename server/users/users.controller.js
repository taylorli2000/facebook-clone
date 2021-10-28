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
  static postUser = async (req, res, next) => {
    try {
      const response = await usersDAO.postUser(
        req.body.username,
        req.body.email,
        req.body.password
      );
      return res.status(200).json(response);
    } catch (err) {
      return next(err);
    }
  };
  static getUser = async (req, res, next) => {
    try {
      const response = await usersDAO.getUser(req.params.id);
      return res.status(200).json(response);
    } catch (err) {
      return next(err);
    }
  };
  static deleteUser = async (req, res, next) => {
    try {
      const response = await usersDAO.deleteUser(req.params.id);
      return res.status(200).json(response);
    } catch (err) {
      return next(err);
    }
  };
  static patchUser = async (req, res, next) => {
    try {
      const response = await usersDAO.patchUser(req.params.id, req.body);
      return res.status(200).json(response);
    } catch (err) {
      return next(err);
    }
  };
}
