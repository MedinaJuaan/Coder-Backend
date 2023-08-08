import { MongooseCartModel } from "./mongoose/carts.mongoose.js";
import mongoose from "mongoose";

class CartsModel {
  async createCart(userId) {
    const newCart = await MongooseCartModel.create({ userId });
    return newCart;
  }

  async getAllCarts() {
    const carts = await MongooseCartModel.find({});
    return carts;
  }

  async getCartById(cid) {
    const cart = await MongooseCartModel.findById(cid).populate(
      "products.productId"
    );
    const cartProducts = cart.products.map((product) => ({
      _id: product.productId._id.toString(),
      title: product.productId.title,
      description: product.productId.description,
      price: product.productId.price,
      category: product.productId.category,
      image: product.productId.image,
    }));
    return cartProducts;
  }

  async deleteCartProducts(cid) {
    const cart = await MongooseCartModel.findById(cid);
    if (!cart) {
      return null;
    }
    cart.products = [];
    await cart.save();
    return cart;
  }

  async getCartByUserId(userId) {
    const cart = await MongooseCartModel.findOne({ userId });
    return cart;
  }

  async addProduct(cid, productId) {
    try {
      if (
        !mongoose.isValidObjectId(cid) ||
        !mongoose.isValidObjectId(productId)
      ) {
        return null;
      }
      const cart = await MongooseCartModel.findById(cid);
      if (!cart) {
        return null;
      }
      const existingProduct = cart.products.find((product) =>
        product.productId.equals(productId)
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ productId, quantity: 1 });
      }
      const updatedCart = await MongooseCartModel.findByIdAndUpdate(cid, cart, {
        new: true,
      });

      return updatedCart;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async deleteProduct(cid, productId) {
    const cart = await MongooseCartModel.findById(cid);
    if (!cart) {
      return null;
    }
    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );
    if (productIndex !== -1) {
      cart.products.splice(productIndex, 1);
      await cart.save();
    }
    return cart;
  }

  async updateProductQuantity(cid, productId, quantity) {
    const cart = await MongooseCartModel.findById(cid);
    if (!cart) {
      return null;
    }

    const product = cart.products.find(
      (product) => product.productId.toString() === productId
    );

    if (product) {
      product.quantity = quantity;
      await cart.save();
    }

    return cart;
  }
}

export const cartsModel = new CartsModel();