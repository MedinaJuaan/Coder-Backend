import fs from "fs";
import path from "path";
import { __dirname } from "../../config.js";
import shortid from "shortid";
const productPath = path.join(__dirname, "/DAO/helpers/products.json");
const imageDefault = "/imagedefault.png";

export class ProductManager {
  constructor() {
    this.products = this.loadProducts();
    this.usedIds = this.products.map((product) => product.id);
  }

  isCodeUnique(code) {
    return !this.products.some((product) => product.code === code);
  }

  isValidURL(url) {
    const pattern =
      /^(http|https):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-@?^=%&amp;/~\+#])?$/;
    return pattern.test(url);
  }

  generateId() {
    return shortid.generate();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(productPath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al cargar los productos", error);
      return [];
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(productPath, JSON.stringify(this.products));
    } catch (error) {
      console.error("Error al guardar los productos", error);
    }
  }

  async get() {
    return this.products;
    console.log(products)
  }
  
  getById(id) {
    const product = this.products.find((product) => product.id == id);
    if (!product) {
      console.log(`No se encontró ningún producto con id: ${id}`);
    }
    return product;
  }

  delete(id) {
    const productIndex = this.products.find((product) => product.id == id);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      this.usedIds = this.products.map((product) => product.id);
      this.saveProducts();
      console.log("Producto eliminado");
    } else {
      throw new Error("El producto que quieres eliminar no existe");
    }
  }

  update(id, updatedProduct) {
    const productIndex = this.products.find((product) => product.id == id);
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updatedProduct,
        id: this.products[productIndex].id,
      };
      this.saveProducts();
    }
    return null;
  }

  create(product) {
    if (product.code && !this.isCodeUnique(product.code)) {
      console.log(`Ya existe un producto con el código: ${product.code}`);
      return;
    }

    if (product.image && !this.isValidURL(product.image)) {
      product.image = imageDefault;
    }

    product._id = this.generateId();
    this.products.push(product);
    this.saveProducts();
  }
}
