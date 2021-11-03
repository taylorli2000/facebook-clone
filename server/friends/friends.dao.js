import { ObjectId } from "mongodb";
import customError from "../error/customError.js";
import usersDAO from "../users/users.dao.js";

let friends;

export default class friendsDAO {
  static injectDB = async (conn) => {
    if (friends) {
      return;
    }
    try {
      friends = await conn
        .db(process.env.FACEBOOK_DB_NS)
        .collection(process.env.FACEBOOK_DB_FRIENDS_COLLECTION_NS);
    } catch (err) {
      console.error(
        `Unable to establish collection handles in friendsDAO: ${err}`
      );
    }
  };
  static postUser = async (id) => {
    try {
      const response = await friends.insertOne({ id: id, friends: [] });
      return { success: true };
    } catch (err) {
      throw err;
    }
  };
  static deleteUser = async (id) => {
    try {
      const response = await friends.deleteOne({ id: ObjectId(id) });
      if (response.deletedCount) {
        return { success: true };
      }
      throw new customError("Failed to delete user.", 404);
    } catch (err) {
      throw err;
    }
  };
  static getAllFriends = async (id) => {
    try {
      const userFriends = await friends.findOne(
        { id: ObjectId(id) },
        { projection: { _id: 0, id: 0 } }
      );
      if (userFriends === null) {
        throw new customError("This user doesn't exist.", 404);
      }
      const friendIds = userFriends.friends.map((friend) => {
        return friend.id;
      });
      const response = await usersDAO.getAllUsersById(friendIds);
      return { friends: response.users };
    } catch (err) {
      throw err;
    }
  };
  static postFriend = async (id, friend) => {
    try {
      const response = await friends.findOneAndUpdate(
        { id: ObjectId(id) },
        {
          $push: {
            friends: {
              id: ObjectId(friend.id),
            },
          },
        },
        {
          returnDocument: "after",
        }
      );
      return { friends: response.value.friends };
    } catch (err) {
      throw err;
    }
  };
  static deleteFriend = async (id, friend) => {
    try {
      const response = await friends.findOneAndUpdate(
        { id: ObjectId(id) },
        {
          $pull: {
            friends: {
              id: ObjectId(friend.id),
            },
          },
        },
        { returnDocument: "after" }
      );
      return { friends: response.value.friends };
    } catch (err) {
      throw err;
    }
  };
}
