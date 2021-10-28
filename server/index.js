import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import usersDAO from "./users/users.dao.js";
import usersRouter from "./users/users.route.js";
import usersErrorHandler from "./middleware/usersErrorHandler.js";
import errorLogger from "../../task-manager/server/middleware/errorLogger.js";
import generalErrorHandler from "./middleware/generalErrorHandler.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", usersRouter);
app.use(errorLogger);
app.use(usersErrorHandler);
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
  });

export default app;
