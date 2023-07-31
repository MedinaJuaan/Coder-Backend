import { MongooseUsersModel } from "../models/mongoose/users.mongoose.js";

class UsersModel {
  async getAll() {
    const users = await MongooseUsersModel.find(
      {},
      {
        _id: true,
        email: true,
        firstName: true,
        lastName: true,
        age: true,
        rol: true,
      }
    );
    return users;
  }

  async createUser({ firstName, lastName, email, age, password }) {
    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      throw "User already exists";
    }

    const newUser = await MongooseUsersModel.create({
      firstName,
      lastName,
      email,
      age,
      password,
      rol: "user",
    });

    return newUser;
  }

  async updateUser(_id, update) {
    const userUpdated = await MongooseUsersModel.findByIdAndUpdate(
      _id,
      update,
      {
        new: true,
      }
    );

    return userUpdated;
  }

  async deleteUser(_id) {
    const result = await MongooseUsersModel.findByIdAndDelete(_id);
    return result;
  }

  async findUserByEmail(email) {
    const userEmail = String(email);
  
    const user = await MongooseUsersModel.findOne(
      { email: userEmail }, 
      {
        _id: true,
        email: true,
        firstName: true,
        password: true,
        rol: true,
      }
    );
    return user || false;
  }

  async getUserById(_id) {
    const user = await MongooseUsersModel.findById(_id, {
      _id: true,
      email: true,
      firstName: true,
      lastName: true,
      age: true,
      rol: true,
    });
    return user || false;
  }
}

export const usersModel = new UsersModel();
