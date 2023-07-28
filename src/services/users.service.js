import { usersModel } from "../DAO/models/users.model.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";

class UsersService {
  async getUserById(_id) {
    const user = await usersModel.getUserById(_id);
    return user;
  }

  async getAll() {
    const users = await usersModel.getAll({}, { password: false });
    return users;
  }

  async create({ firstName, lastName, email, age, password }) {
    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      throw "User already exists";
    }

    const userCreated = await usersModel.createUser({
      firstName,
      lastName,
      email,
      age,
      password: createHash(password),
      rol: "user",
    });

    return userCreated;
  }

  async updateUser(_id, update) {
    const userUpdated = await usersModel.updateUser(_id, update, {
      new: true,
      runValidators: true,
    });

    return userUpdated;
  }

  async deleteUser(_id) {
    await usersModel.deleteUser(_id);
  }

  async findUserByEmail(email) {
    const user = await usersModel.findUserByEmail({ email });
    return user;
  }

  async findUserByEmailPassword(email, password) {
    const user = await usersModel.findUserByEmail(
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
}

export const usersService = new UsersService();