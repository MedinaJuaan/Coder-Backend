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

  isCodeUnique(code) {
    return !this.products.some((product) => product.code === code);
  }
 
  isValidURL(url) {
    const pattern = /^(http|https):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-@?^=%&amp;/~\+#])?$/;
    return pattern.test(url);
  }

  addProduct(product) {
    if (product.code && !this.isCodeUnique(product.code)) {
      console.log(`Ya existe un producto con el código: ${product.code}`);
      return;
    }
  
    if (product.image && !this.isValidURL(product.image)) {
      product.image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Oo36VlX72uvK1izFe7dCb3Vk8SUEACrzLSPaMEiEdQ&s'; 
    }
  
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