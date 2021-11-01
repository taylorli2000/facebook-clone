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
}
