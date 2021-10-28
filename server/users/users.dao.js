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
      const response = await users
        .find({}, { projection: { username: 1, friends: 1 } })
        .toArray();
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
      return { success: true };
    } catch (err) {
      throw err;
    }
  };
  static getUserById = async (id) => {
    try {
      const response = await users.findOne(
        { _id: ObjectId(id) },
        { projection: { username: 1 } }
      );
      if (response === null) {
        throw new usersError("This user doesn't exist.", 404);
      }
      return { user: response };
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
      throw new usersError("Failed to delete user.", 404);
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
        }
      );
      if (response.value) {
        return { user: response.value };
      }
      throw new usersError("Failed to update user.", 404);
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
          projection: { username: 1 },
        }
      );
      if (response === null) {
        throw new usersError("Incorrect email or password", 404);
      }
      return { id: response._id, username: response.username };
    } catch (err) {
      throw err;
    }
  };
  static postFriend = async (id, friendId) => {
    try {
      const response = await this.getUserById(friendId);
      const added = await users.findOneAndUpdate(
        { _id: ObjectId(id) },
        {
          $push: {
            friends: {
              id: response.user._id,
              username: response.user.username,
            },
          },
        },
        {
          returnDocument: "after",
        }
      );
      if (added.value) {
        return { success: true };
      }
      throw new usersError("Failed to add friend.", 404);
    } catch (err) {
      throw err;
    }
  };
  static deleteFriend = async (id, friendId) => {
    try {
      const response = await users.findOneAndUpdate(
        { _id: ObjectId(id) },
        {
          $pull: { friends: { id: ObjectId(friendId) } },
        }
      );
      if (response.lastErrorObject.updatedExisting) {
        return { response };
      }
      throw new usersError("Failed to delete friend.", 404);
    } catch (err) {
      throw err;
    }
  };
}
