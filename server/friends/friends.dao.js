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