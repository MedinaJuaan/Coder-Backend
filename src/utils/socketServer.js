import { Server } from "socket.io";
import { ProductManager } from "../DAO/helpers/productManager.js";
import { MsgModel } from "../DAO/models/mongoose/msgs.mongoose.js";

export function socketServer(httpServer) {
  const socketServer = new Server(httpServer);
  const productManager = new ProductManager();

  socketServer.on("connection", (socket) => {
    socket.on("msg_front_to_back", async (msg) => {
      try {
        await MsgModel.create(msg);
      } catch (e) {
        console.log(e);
      }

      try {
        const msgs = await MsgModel.find({});
        socketServer.emit("listado_de_msgs", msgs);
      } catch (e) {
        console.log(e);
      }
    });

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
