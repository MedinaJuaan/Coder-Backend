//@ts-check
import express from "express";
import handlebars from "express-handlebars";
import { cartsRouter } from "./routes/carts.router.js";
import { productsRouter } from "./routes/products.router.js";
import { __dirname } from "./utils.js";
import { testPantillaProducts } from "./routes/test-plantilla.router.js";
import { testSocketRouter } from "./routes/test-socket.router.js";
import { Server } from "socket.io";

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/test-plantilla", testPantillaProducts);
app.use("/test-socket", testSocketRouter);
app.get("*", (req, res) => {
  return res
    .status(404)
    .json({ status: "error", msg: "No se encuentra esa ruta", data: {} });
});

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const httpServer = app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`);
});
const socketServer = new Server(httpServer);
socketServer.on("connection", (socket) => {
  setInterval(() => {
    socket.emit("msg_back_front", {
      msg: "Hola desde el back " + Date.now(),
      from: "Server",
    });
  }, 1000);

  socket.on("msg_front_back", (msg) => {
    console.log(msg);
  });
});
