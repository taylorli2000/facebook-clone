import Jwt from "jsonwebtoken";
import customError from "../error/customError.js";

const authCheckHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    throw new authError("No token provided", 401);
  }
  try {
    const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decoded };
    return next();
  } catch (err) {
    throw new customError("Not authorized to access this route", 403);
  }
};

export default authCheckHandler;
