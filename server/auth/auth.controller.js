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
      res.json({ token: token });
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
}
