import Jwt from "jsonwebtoken";
import usersDAO from "../users/users.dao.js";

export default class authController {
  static login = async (req, res, next) => {
    const response = await usersDAO.getUser(req.body.email, req.body.password);
    const token = Jwt.sign(response, process.env.JWT_SECRET);
    res.json({ token: token });
  };
}
