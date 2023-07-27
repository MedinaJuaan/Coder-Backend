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

  async getCartById(cid) {
    const cart = await CartModel.findById(cid).populate("products.productId");
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
    const cart = await CartModel.findById(cid);
    if (!cart) {
      return null;
    }
    cart.products = [];
    await cart.save();
    return cart;
  }
  async getCartByUserId(userId) {
    const cart = await CartModel.findOne({ user: userId });
    return cart;
  }
  async addProduct(cid, productId) {
    const cart = await CartModel.findById(cid);
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

  async deleteProduct(cid, productId) {
    const cart = await CartModel.findById(cid);
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
    const cart = await CartModel.findById(cid);
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
