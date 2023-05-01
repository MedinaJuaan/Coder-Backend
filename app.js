class Product {
 constructor(title, description, price, thumbnail, code, stock) {
   this.title = title;
   this.description = description;
   this.price = price;
   this.thumbnail = thumbnail;
   this.code = code;
   this.stock = stock;
 }
}

class ProductManager {
 constructor() {
   this.products = [];
 }

 getProducts() {
   return this.products;
 }

 addProduct(title, description, price, thumbnail, code, stock) {
   const existingProduct = this.products.find(
     (product) => product.code === code
   );

   if (existingProduct) {
     console.log("El codigo del producto ya esta en uso");
     return null
   }

   const id = this.generateId();

   const product = new Product(
     title,
     description,
     price,
     thumbnail,
     code,
     stock
   );
   product.id = id;
   this.products.push(product);

   return product;
 }

 generateId() {
   return this.products.length + 1;
 }

 getProductById(id) {
   const product = this.products.find((product) => product.id === id);
 
   if (!product) {
     return "Producto no encontrado!";
   }
 
   return product;
 }
}

const productManager = new ProductManager();

//Se llama a Get Products y devuelve el array vacio
console.log("GetProducts", productManager.getProducts());

//Se agrega un producto
const product1 = productManager.addProduct(
 "producto prueba",
 "Este es un producto prueba",
 200,
 "Sin imagen",
 "abc123",
 25
);

//Se llama al producto agregado recientemente
console.log("Product1", product1);

//Se vuelve a llamar a GetProducts y devuelve el array con el producto
console.log("GetProducts", productManager.getProducts());

//Se intenta agregar un producto con el mismo code
const product2 = productManager.addProduct(
 "producto prueba",
 "Este es un producto prueba",
 200,
 "Sin imagen",
 "abc123",
 25
);

//Se llama a un producto con id valido
console.log("Id valido", productManager.getProductById(1));

//Se llama a un producto con un id no valido
console.log("Id no valido", productManager.getProductById(2));
