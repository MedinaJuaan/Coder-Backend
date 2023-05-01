const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
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
      const data = fs.readFileSync(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products));
    } catch (error) {
      console.error(error);
    }
  }
}

//Uso

const productManager = new ProductManager("productos.json");

console.log(
  "Obtener los productos que devuelve un array vacio,",
  productManager.getProducts()
);

// Agregar un producto
productManager.addProduct({
  title: 'Mouse',
  description: 'Mouse inalambrico',
  price: 100,
  thumbnail: 'imagen.jpg',
  code: '1234',
  stock: 10
});
productManager.addProduct({
  title: 'Monitor',
  description: 'Monitor 27 pulgadas',
  price: 300,
  thumbnail: 'imagen.jpg',
  code: '12345',
  stock: 10
});
// Obtener todos los productos
console.log("Obtener todos los productos", productManager.getProducts());

// Obtener un producto por ID
const product = productManager.getProductById(1);
if (product) {
  console.log("Obtener producto por ID", product);
} else {
}

// Actualizar un producto por ID

  productManager.updateProductById(2, {
    title: "Teclado",
    description: "Teclado inalambrico",
    price: 300,
  })

console.log(
  "Actualizar producto por ID",
  productManager.getProductById(2)
);

// Eliminar un producto por ID
productManager.deleteProduct(1);
console.log(
  "Obtener todos los productos con el producto ya eliminado",
  productManager.getProducts()
);
