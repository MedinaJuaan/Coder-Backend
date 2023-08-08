import { cartsModel } from "../DAO/mongo/carts.model.js";

class CartsService {
  async createCart(productId) {
    return cartsModel.createCart(productId);
  }

  async getAllCarts() {
    return cartsModel.getAllCarts();
  }

  async getCartById(cid) {
    return cartsModel.getCartById(cid);
  }

  async deleteCartProducts(cid) {
    return cartsModel.deleteCartProducts(cid);
  }

  async getCartByUserId(userId) {
    return cartsModel.getCartByUserId(userId);
  }

  async addProduct(cid, productId) {
    return cartsModel.addProduct(cid, productId);
  }

  async deleteProduct(cid, productId) {
    return cartsModel.deleteProduct(cid, productId);
  }

  async updateProductQuantity(cid, productId, quantity) {
    return cartsModel.updateProductQuantity(cid, productId, quantity);
  }
}

export const cartsService = new CartsService();