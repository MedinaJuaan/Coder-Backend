import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./config.js";
import { connectMongo } from "./utils/dbConnection.js";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { usersRouter } from "./routes/usersRouter.js";
import { homeRouter } from "./routes/home.router.js";
import { realTimeProducts } from "./routes/realtimeproducts.js";
import { chatRouter } from "./routes/chat.router.js";
import { chatSocketServer } from "./utils/chatSocketServer.js";
import { productsSocketServer } from "./utils/productsSocketServer.js";
import { dbProducts } from "./routes/dbProducts.router.js";
import { dbCarts } from "./routes/dbCarts.router.js";
const app = express();
const port = 8080;
connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const httpServer = app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`);
});

chatSocketServer(httpServer);
productsSocketServer(httpServer);

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);
app.use("/home", homeRouter);
app.use("/realTimeProducts", realTimeProducts);
app.use("/chat", chatRouter);
app.use("/api/dbproducts", dbProducts);
app.use("/api/dbcarts", dbCarts);
app.get("*", (_, res) => {
  return res
    .status(404)
    .json({ status: "error", msg: "No se encuentra esa ruta", data: {} });
});
