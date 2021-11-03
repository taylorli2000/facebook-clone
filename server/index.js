import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import authRouter from "./auth/auth.route.js";
import friendsRouter from "./friends/friends.route.js";
import usersRouter from "./users/users.route.js";
import errorLogger from "../../task-manager/server/middleware/errorLogger.js";
import customErrorHandler from "./middleware/customErrorHandler.js";
import generalErrorHandler from "./middleware/generalErrorHandler.js";
import friendsDAO from "./friends/friends.dao.js";
import usersDAO from "./users/users.dao.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/friends", friendsRouter);
app.use(errorLogger);
app.use(customErrorHandler);
app.use(generalErrorHandler);

MongoClient.connect(process.env.FACEBOOK_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .then(async (client) => {
    await usersDAO.injectDB(client);
    await friendsDAO.injectDB(client);
  });

export default app;
