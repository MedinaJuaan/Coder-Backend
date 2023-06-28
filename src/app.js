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
import { dbHtmlProducts } from "./routes/dbHtmlProducts.router.js";
import { dbHtmlCarts } from "./routes/dbHtmlCarts.router.js";
import { loginRouter } from "./routes/login.router.js";
import { logoutRouter } from "./routes/logout.router.js";
import { registerRouter } from "./routes/register.router.js";
import MongoStore from "connect-mongo";
import session from "express-session";

const app = express();
const port = 8080;
connectMongo();
app.use(
  session({
    secret: "asdee1233sd23321",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://medinajuaan:Isabella2602@cluster0.4qbgeko.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 15,
    }),
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const httpServer = app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}/home`);
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
app.use("/html/dbproducts", dbHtmlProducts);
app.use("/html/dbcarts", dbHtmlCarts);
app.use("/api/dbcarts", dbCarts);
app.use("/api/sessions/login", loginRouter);
app.use("/api/sessions/register", registerRouter);
app.use("/api/sessions/logout", logoutRouter);



app.get("*", (_, res) => {
  return res
    .status(404)
    .json({ status: "error", msg: "No se encuentra esa ruta", data: {} });
});
