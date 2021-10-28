import authError from "../auth/auth.error.js";

const authErrorHandler = (err, req, res, next) => {
  if (err instanceof authError) {
    return res.status(err.status).json({ error: err.message });
  }
  return next(err);
};

export default authErrorHandler;
