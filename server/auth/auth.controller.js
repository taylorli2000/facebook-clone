import Jwt from "jsonwebtoken";
import friendsDAO from "../friends/friends.dao.js";
import usersDAO from "../users/users.dao.js";

export default class authController {
  static login = async (req, res, next) => {
    try {
      const response = await usersDAO.getUserByEmailPassword(
        req.body.email,
        req.body.password
      );
      const token = Jwt.sign(response._id, process.env.JWT_SECRET);
      return res.status(200).json({ token: token, user: response.user });
    } catch (err) {
      return next(err);
    }
  };
  static signup = async (req, res, next) => {
    try {
      const usersResponse = await usersDAO.postUser(
        req.body.username,
        req.body.email,
        req.body.password
      );
      const friendsResponse = await friendsDAO.postUser(
        usersResponse.insertedId
      );
      if (usersResponse.success && friendsResponse.success) {
        return res.status(200).json({ success: true });
      }
      return res.status(500).json({ success: false });
    } catch (err) {
      return next(err);
    }
  };
  static deleteUser = async (req, res, next) => {
    try {
      const usersResponse = await usersDAO.deleteUser(req.user._id);
      const friendsResponse = await friendsDAO.deleteUser(req.user._id);
      if (usersResponse.success && friendsResponse.success) {
        return res.status(200).json({ success: true });
      }
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
}
