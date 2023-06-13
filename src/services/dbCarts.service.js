import { CartModel } from "../DAO/models/dbcarts.model.js";

class CartService {
  async createCart(productId) {
    const newCart = await CartModel.create({ productId });
    return newCart;
  }

  async getAllCarts() {
    const carts = await CartModel.find({});
    return carts;
  }
  async getCartById(cartId) {
    const cart = await CartModel.findById(cartId);
    return cart;
  }
  async deleteCartById(cartId) {
    const deletedCart = await CartModel.findByIdAndDelete(cartId);
    return deletedCart;
  }
  async addProduct(cartId, productId) {
    const cart = await CartModel.findById(cartId);
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

    await cart.save();
    return cart;
  }
}

export const cartService = new CartService();
