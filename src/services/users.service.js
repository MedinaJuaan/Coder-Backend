import { UserModel } from "../DAO/models/users.model.js";

class UsersService {
  async getUsers() {
    const users = await UserModel.find({});
    return users;
  }

  async getUserById(_id) {
    const user = await UserModel.findOne({ _id });
    return user;
  }

  async deleteUser(_id) {
    const deletedUser = await UserModel.findOneAndDelete({ _id });
    return deletedUser;
  }

  async updateUser(_id, updatedData) {
    const updatedUser = await UserModel.findOneAndUpdate({ _id }, updatedData, {
      new: true,
    });
    return updatedUser;
  }

  async createUser(userData) {
    const newUser = await UserModel.create(userData);
    return newUser;
  }
}

export const usersService = new UsersService();
