import { UserModel } from "../DAO/models/users.model.js";

class UsersService {
  async getUsers() {
    const users = await UserModel.find({});
    return users;
  }
  async createUser({ firstName, lastName, email }) {
    const userCreated = await UserModel.create({
      firstName,
      lastName,
      email,
    });

    return userCreated;
  }
  async updateUser({ _id, firstName, lastName, email }) {
    const userUptaded = await UserModel.updateOne(
      {
        _id: _id,
      },
      {
        firstName,
        lastName,
        email,
      }
    );
    return userUptaded;
  }
  async deleteUser(_id) {
    const userDeleted = await UserModel.deleteOne({ _id });
    return userDeleted;
  }
}

export const usersService = new UsersService();
