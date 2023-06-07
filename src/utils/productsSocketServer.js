import { Server } from "socket.io";
import { ProductManager } from "../DAO/productManager.js";
const productManager = new ProductManager();

export function productsSocketServer(httpServer) {
   const socketServer = new Server(httpServer);
socketServer.on("connection", (socket) => {
  socket.on("newProduct", async (data) => {
    productManager.addProduct(data);
    const products = await productManager.getProducts();
    socketServer.emit("arrayOfProducts", products);
  });
  socket.on("deleteProduct", async (id) => {
    productManager.deleteProduct(id);
    const products = await productManager.getProducts();
    socketServer.emit("arrayOfProducts", products);
  });
});

    
} 