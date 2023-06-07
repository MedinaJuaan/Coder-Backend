import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {ProductManager} from "../DAO/productManager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cartPath = path.join(__dirname, "carts.json");

class CartManager {
  constructor() {
    this.carts = this.loadCarts();
    this.productManager = new ProductManager();
  }

  createCart() {
    const cartId = this.generateCartId();
    const newCart = {
      id: cartId,
      products: [],
    };
    this.carts.push(newCart);
    this.saveCarts();
    return newCart;
  }

  getCartById(cartId) {
    return this.carts.find((cart) => cart.id === parseInt(cartId));
  }

  addProductToCart(cartId, productId, quantity = 1) {
    const cart = this.getCartById(cartId);
    if (cart) {
      const existingProduct = cart.products.find(
        (product) => product.id === productId
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
        this.saveCarts();
        return existingProduct;
      } else {
        const product = {
          id: productId,
          quantity: quantity,
        };
        cart.products.push(product);
        this.saveCarts();
        return product;
      }
    }
    return null;
  }

  loadCarts() {
    try {
      const data = fs.readFileSync(cartPath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al cargar los carritos:", error);
      return [];
    }
  }

  saveCarts() {
    try {
      fs.writeFileSync(cartPath, JSON.stringify(this.carts));
    } catch (error) {
      console.error("Error al guardar los carritos:", error);
    }
  }

  generateCartId() {
    const usedIds = this.carts.map((cart) => cart.id);
    let id = Math.floor(Math.random() * 30) + 1;
    while (usedIds.includes(id)) {
      id = Math.floor(Math.random() * 30) + 1;
    }
    return id;
  }
}

export default CartManager;
