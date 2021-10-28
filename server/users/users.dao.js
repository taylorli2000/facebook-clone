import { ObjectId } from "mongodb";
import User from "./user.model.js";
import usersError from "./users.error.js";

let users;

export default class usersDAO {
  static injectDB = async (conn) => {
    if (users) {
      return;
    }
    try {
      users = await conn
        .db(process.env.FACEBOOK_DB_NS)
        .collection(process.env.FACEBOOK_DB_USERS_COLLECTION_NS);
    } catch (err) {
      console.error(
        `Unable to establish collection handles in usersDAO: ${err}`
      );
    }
  };
  static getAllUsers = async () => {
    try {
      const response = await users.find().toArray();
      return { users: response };
    } catch (err) {
      throw err;
    }
  };
  static postUser = async (username, email, password) => {
    try {
      const existingUser = await users.findOne({ email: email });
      if (existingUser) {
        throw new usersError("This user already exists.", 409);
      }
      const userDoc = new User(username, email, password);
      const response = await users.insertOne(userDoc);
      return { success: response.acknowledged };
    } catch (err) {
      throw err;
    }
  };
  static getUser = async (id) => {
    try {
      const response = await users.findOne({ _id: ObjectId(id) });
      if (response === null) {
        throw new usersError("This user doesn't exist.", 404);
      }
      return { user: response };
    } catch (err) {
      throw err;
    }
  };
}
