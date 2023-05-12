const fs = require("fs");
const path = require("path")
const productPath = path.join(__dirname, "/products.json")
class ProductManager {
  constructor() {
    this.products = this.loadProducts();
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
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      console.log(`No se encontró ningún producto con id: ${id}`);
    }
    return product;
  }

  updateProductById(id, updatedProduct) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updatedProduct,
        id: id,
      };
     return this.saveProducts();
    }
    return ;
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      this.saveProducts();
      console.log("Producto eliminado")
    } else {
        console.log("El producto que quieres eliminar no existe")
    }
  }

  generateId() {
    const ids = this.products.map((product) => product.id);
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    return maxId + 1;
  }
  loadProducts() {
    try {
      const data = fs.readFileSync(productPath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(productPath, JSON.stringify(this.products));
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = ProductManager;
