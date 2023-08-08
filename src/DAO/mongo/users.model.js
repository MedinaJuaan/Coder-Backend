import { MongooseUsersModel } from "./mongoose/users.mongoose.js";
import { cartsModel } from "./carts.model.js";
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
        cartID: true
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
    const newCart = await cartsModel.createCart(newUser._id);
    newUser.cart = newCart._id;
    await newUser.save();
  
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
        cartID : true
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
      cartID : true
    });
    return user || false;
  }
}

export const usersModel = new UsersModel();
