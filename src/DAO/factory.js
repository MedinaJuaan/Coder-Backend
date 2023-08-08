import mongoose from "mongoose";
import env from "../config/enviroment.config.js";
import CartManager from "./fileStore/cartManager.js";
import { ProductManager } from "./fileStore/productManager.js";
import { usersManager } from "./fileStore/usersManager.js";
import { cartsModel } from "./mongo/carts.model.js";
import { productsModel } from "./mongo/products.model.js";
import { usersModel } from "./mongo/users.model.js";
const cartManager = new CartManager();
const productManager = new ProductManager();

async function importModels() {
  let models;

  switch (env.PERSISTENCE) {
    case "MONGO":
      console.log("Database: Mongo");
      mongoose.connect(env.mongoUrl);
      models = {
        products: productsModel,
        users: usersModel,
        carts: cartsModel,
      };
      break;

    case "FILESTORE":
      console.log("Database: FileStore");
      models = {
        products: productManager,
        users: usersManager,
        carts: cartManager,
      };
      break;

    default:
      throw new Error(
        `El tipo de persistencia "${env.PERSISTENCE}" no es válido.`
      );
  }

  return models;
}

export default importModels;
