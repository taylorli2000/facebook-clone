import Jwt from "jsonwebtoken";
import authError from "../auth/auth.error.js";

const authCheckHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    throw new authError("No token provided", 401);
  }
  try {
    const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    return next();
  } catch (err) {
    throw new authError("Not authorized to access this route", 403);
  }
};

export default authCheckHandler;
