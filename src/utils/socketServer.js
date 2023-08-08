import { Server } from "socket.io";
import { ProductManager } from "../DAO/fileStore/productManager.js";
import { MsgModel } from "../DAO/mongo/mongoose/msgs.mongoose.js";

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
      productManager.create(data);
      const products = await productManager.get();
      socketServer.emit("arrayOfProducts", products);
    });

    socket.on("deleteProduct", async (id) => {
      productManager.delete(id);
      const products = await productManager.get();
      socketServer.emit("arrayOfProducts", products);
    });
  });
}
