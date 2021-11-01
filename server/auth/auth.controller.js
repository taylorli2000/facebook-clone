import Jwt from "jsonwebtoken";
import usersDAO from "../users/users.dao.js";

export default class authController {
  static login = async (req, res, next) => {
    try {
      const response = await usersDAO.getUserByEmailPassword(
        req.body.email,
        req.body.password
      );
      const token = Jwt.sign(response, process.env.JWT_SECRET);
      return res.status(200).json({ token: token });
    } catch (err) {
      return next(err);
    }
  };
  static signup = async (req, res, next) => {
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
