import { Server } from "socket.io";
import { MsgModel } from "../DAO/models/msgs.model.js";

export function chatSocketServer(httpServer) {
  const socketServer = new Server(httpServer);

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
  });
}
