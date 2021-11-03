import { ObjectId } from "mongodb";
import customError from "../error/customError.js";

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
      const response = await users
        .find({}, { projection: { password: 0 } })
        .toArray();
      return { users: response };
    } catch (err) {
      throw err;
    }
  };
  static getAllUsersById = async (ids) => {
    try {
      const response = await users
        .find({ _id: { $in: ids } }, { projection: { password: 0 } })
        .toArray();
      return { users: response };
    } catch (err) {
      throw err;
    }
  };
  static getUserById = async (id) => {
    try {
      const response = await users.findOne(
        { _id: ObjectId(id) },
        { projection: { password: 0 } }
      );
      if (response === null) {
        throw new customError("This user doesn't exist.", 404);
      }
      return { user: response };
    } catch (err) {
      throw err;
    }
  };
  static getUserByEmailPassword = async (email, password) => {
    try {
      const response = await users.findOne(
        {
          email: email,
          password: password,
        },
        {
          projection: { password: 0 },
        }
      );
      if (response === null) {
        throw new customError("Incorrect email or password", 404);
      }
      const _id = response._id.toString();
      delete response._id;
      return { _id: _id, user: response };
    } catch (err) {
      throw err;
    }
  };
  static postUser = async (username, email, password) => {
    try {
      const existingUser = await users.findOne({ email: email });
      if (existingUser) {
        throw new customError("This user already exists.", 409);
      }
      const response = await users.insertOne({
        username: username,
        email: email,
        password: password,
      });
      return { success: true, insertedId: response.insertedId };
    } catch (err) {
      throw err;
    }
  };
  static deleteUser = async (id) => {
    try {
      const response = await users.deleteOne({ _id: ObjectId(id) });
      if (response.deletedCount) {
        return { success: true };
      }
      throw new customError("Failed to delete user.", 404);
    } catch (err) {
      throw err;
    }
  };
  static patchUser = async (id, patches) => {
    try {
      const response = await users.findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: patches },
        {
          returnDocument: "after",
          projection: { _id: 0, password: 0 },
        }
      );
      return { user: response.value };
    } catch (err) {
      throw err;
    }
  };
}
