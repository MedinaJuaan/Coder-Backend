import { UserModel } from "../DAO/models/users.model.js";
import { isValidPassword } from "../utils/bcrypt.js";
import { cartService } from "./dbCarts.service.js";

class UsersService {
  async findUser(email, password) {
    const user = await UserModel.findOne(
      { email: email },
      {
        _id: true,
        email: true,
        username: true,
        password: true,
        rol: true,
        cart: true,
      }
    );
    if (user && isValidPassword(password, user.password)) {
      return user;
    } else {
      return false;
    }
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
        cart: true,
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
        cart: true,
      }
    );
    return users;
  }

  async create(email, username, password, rol) {
    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      return "El usuario ya se encuentra registrado";
    }

    const newUser = await UserModel.create({
      email,
      username,
      password,
      rol,
    });

    const newCart = await cartService.createCart(newUser._id);

    newUser.cart = newCart._id;
    await newUser.save();

    return newUser;
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