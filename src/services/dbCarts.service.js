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
    const cart = await CartModel.findById(cartId).populate({
      path: "products.productId",
      select: "-__v -_id -code -stock "
    });
    return cart;
  }

  async deleteCartProducts(cartId) {
    const cart = await CartModel.findById(cartId);
    if (!cart) {
      return null;
    }
    cart.products = [];
    await cart.save();
    return cart;
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

  async deleteProduct(cartId, productId) {
    const cart = await CartModel.findById(cartId);
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

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await CartModel.findById(cartId);
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

export const cartService = new CartService();
