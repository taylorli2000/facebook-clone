import customError from "../error/customError.js";

const customErrorHandler = (err, req, res, next) => {
  if (err instanceof customError) {
    return res.status(err.status).json({ error: err.message });
  }
  return next(err);
};

export default customErrorHandler;
