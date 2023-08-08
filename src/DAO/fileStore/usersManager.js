import fs from "fs";
import path from "path";
import { __dirname } from "../../config.js";
import CartManager from "./cartManager.js";
const cartManager = new CartManager
const usersPath = path.join(__dirname, "/DAO/helpers/users.json");

export class UsersManager {
  constructor() {
    this.users = this.loadUsers();
  }

  loadUsers() {
    try {
      const data = fs.readFileSync(usersPath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al cargar los usuarios", error);
      return [];
    }
  }

  saveUsers() {
    try {
      fs.writeFileSync(usersPath, JSON.stringify(this.users));
    } catch (error) {
      console.error("Error al guardar los usuarios", error);
    }
  }

  getAll() {
    return this.users.map((user) => ({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      rol: user.rol,
      cartID: user.cartID,
    }));
  }

  createUser({ firstName, lastName, email, age, password }) {
    const existingUser = this.findUserByEmail(email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const newUser = {
      _id: this.generateId(),
      firstName,
      lastName,
      email,
      age,
      password,
      rol: "user",
      cartID: null, 
    };
    this.users.push(newUser);

    const newCart = cartManager.createCart(newUser._id);
    newUser.cartID = newCart._id;

    this.saveUsers();

    return {
      ...newUser,
    };
  }

  updateUser(_id, update) {
    const userIndex = this.users.findIndex((user) => user._id === _id);

    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...update,
        _id: this.users[userIndex]._id,
      };

      this.saveUsers();
      return {
        ...this.users[userIndex],
      };
    }

    return null;
  }

  deleteUser(_id) {
    const userIndex = this.users.findIndex((user) => user._id === _id);

    if (userIndex !== -1) {
      const deletedUser = this.users.splice(userIndex, 1)[0];
      this.saveUsers();
      return {
        ...deletedUser,
      };
    }

    return null;
  }

  async findUserByEmail(email) {
    const userEmail = String(email);
    const userData = this.users.find((user) => user.email === userEmail);

    if (userData) {
      return {
        _id: userData._id,
        email: userData.email,
        firstName: userData.firstName,
        password: userData.password,
        rol: userData.rol,
        cartID: userData.cartID,
      };
    } else {
      return null;
    }
  }


  getUserById(_id) {
    return this.users.find((user) => user._id === _id) || null;
  }

  generateId() {
    let id = Math.floor(Math.random() * 100) + 1;
    while (this.users.some((user) => user._id === id)) {
      id = Math.floor(Math.random() * 100) + 1;
    }
    return id;
  }
}

export const usersManager = new UsersManager();
