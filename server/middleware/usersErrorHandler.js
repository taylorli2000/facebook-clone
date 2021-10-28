import usersError from "../users/users.error.js";

const usersErrorHandler = (err, req, res, next) => {
  if (err instanceof usersError) {
    return res.status(err.status).json({ error: err.message });
  }
  return next(err);
};

export default usersErrorHandler;
