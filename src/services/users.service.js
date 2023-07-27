import { UserModel } from "../DAO/models/mongoose/users.mongoose.js";
import { CartModel } from "../DAO/models/mongoose/carts.mongoose.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";

class UsersService {
  async findUserByEmailPassword(email, password) {
    const user = await UserModel.findOne(
      { email: email },
      {
        _id: true,
        email: true,
        firstName: true,
        password: true,
        rol: true,
      }
    );

    if (user && isValidPassword(password, user.password)) {
      return user;
    }

    return false;
  }

  async findUserByEmail(email) {
    const user = await UserModel.findOne(
      { email: email },
      {
        _id: true,
        email: true,
        username: true,
        password: true,
        rol: true,
      }
    );
    return user || false;
  }

  async getAll() {
    const users = await UserModel.find(
      {},
      {
        _id: true,
        email: true,
        username: true,
        password: true,
        rol: true,
      }
    );
    return users;
  }

  async create({ firstName, lastName, email, age, password }) {
    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      throw "User already exists";
    }
    const cart = await CartModel.create({});

    const userCreated = await UserModel.create({
      firstName,
      lastName,
      email,
      age,
      password: createHash(password),
      cartID: cart._id,
      rol: "user",
    });

    return userCreated;
  }
  async updateOne({ _id, email, username, password, rol }) {
    const userUptaded = await UserModel.updateOne(
      {
        _id: _id,
      },
      {
        email,
        username,
        password,
        rol,
      }
    );
    return userUptaded;
  }

  async deleteOne(_id) {
    const result = await UserModel.deleteOne({ _id: _id });
    return result;
  }
}
export const usersService = new UsersService();