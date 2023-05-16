import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productPath = path.join(__dirname, "products.json");

class ProductManager {
  constructor() {
    this.products = this.loadProducts();
    this.usedIds = this.products.map((product) => product.id);
  }

  addProduct(product) {
    product.id = this.generateId();
    this.products.push(product);
    this.saveProducts();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id == id);
    if (!product) {
      console.log(`No se encontró ningún producto con id: ${id}`);
    }
    return product;
  }

  updateProductById(id, updatedProduct) {
    const productIndex = this.products.findIndex((product) => product.id == id);
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

  deleteProduct(id) {
    const productIndex = this.products.findIndex((product) => product.id == id);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      this.usedIds = this.products.map((product) => product.id);
      this.saveProducts();
      console.log("Producto eliminado");
    } else {
      throw new Error("El producto que quieres eliminar no existe");
    }
  }

  generateId() {
    let id = Math.floor(Math.random() * 30) + 1;
    while (this.usedIds.includes(id)) {
      id = Math.floor(Math.random() * 30) + 1;
    }
    this.usedIds.push(id);
    return id;
  }
  
  loadProducts() {
    try {
      const data = fs.readFileSync(productPath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al cargar los productos",error);
      return [];
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(productPath, JSON.stringify(this.products));
    } catch (error) {
      console.error("Error al guardar los productos",error);
    }
  }
}

export default ProductManager;