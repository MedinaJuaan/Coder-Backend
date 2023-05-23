import express from "express";
import handlebars from "express-handlebars";
import { cartsRouter } from "./routes/carts.router.js";
import { productsRouter } from "./routes/products.router.js";
import { __dirname } from "./utils.js";
import { homeRouter } from "./routes/home.router.js";
import { realTimeProducts } from "./routes/realtimeproducts.js";
import { Server } from "socket.io";
import ProductManager from "./functions/productManager.js";

const productManager = new ProductManager();
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Handlebars engine
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const httpServer = app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`);
});

//Socket Server
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

//Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/home", homeRouter);
app.use("/realTimeProducts", realTimeProducts);

app.get("*", (req, res) => {
  return res
    .status(404)
    .json({ status: "error", msg: "No se encuentra esa ruta", data: {} });
});
