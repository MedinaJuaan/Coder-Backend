import MongoStore from "connect-mongo";
import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import passport from "passport";
import { __dirname } from "./config.js";
import { iniPassport } from "./config/passport.config.js";
import { cartsRouter } from "./routes/carts.router.js";
import { chatRouter } from "./routes/chat.router.js";
import { dbCarts } from "./routes/dbCarts.router.js";
import { dbHtmlCarts } from "./routes/dbHtmlCarts.router.js";
import { dbHtmlProducts } from "./routes/dbHtmlProducts.router.js";
import { dbProducts } from "./routes/dbProducts.router.js";
import { homeRouter } from "./routes/home.router.js";
import { authRouter } from "./routes/auth.router.js";
import { productsRouter } from "./routes/products.router.js";
import { realTimeProducts } from "./routes/realtimeproducts.js";
import { usersRouter } from "./routes/usersRouter.js";
import { connectMongo } from "./utils/dbConnection.js";
import { socketServer } from "./utils/socketServer.js";
import MongoSingleton from "./singleton.js";
import env from "./config/enviroment.config.js";

const app = express();
const port = env.port;
// connectMongo();
app.use(
  session({
    secret: "asdee1233sd23321",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: env.mongoUrl,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 99999,
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

socketServer(httpServer);
iniPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);
app.use("/home", homeRouter);
app.use("/realTimeProducts", realTimeProducts);
app.use("/chat", chatRouter);
app.get("/error-auth", (_, res) => {
  return res.status(400).render("error-auth");
});
app.use("/api/dbproducts", dbProducts);
app.use("/html/dbproducts", dbHtmlProducts);
app.use("/html/dbcarts", dbHtmlCarts);
app.use("/api/dbcarts", dbCarts);
app.use("/api/sessions/auth", authRouter);
app.get(
  "/api/sessions/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
app.get(
  "/api/sessions/githubcallback",
  passport.authenticate("github", { failureRedirect: "/error-auth" }),
  (req, res) => {
    req.session.user = {
      email: req.user.email,
      firstName: req.user.firstName,
      rol: req.user.rol,
    };
    console.log(req.session.user);

    res.redirect("/html/dbproducts");
  }
);


import nodemailer from "nodemailer";
const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASS,
  },
});

app.get("/mail", async (req, res) => {
  const result = await transport.sendMail({
    from: process.env.GOOGLE_EMAIL,
    to: "guillermofergnani@gmail.com, francoivangallucio@gmail.com",
    subject: "Hola que tal",
    html: `
              <div>
                  <h1>A ver si llegaa</h1>
                  <img src="cid:image1" />
              </div>
          `,
    attachments: [
      {
        filename: "image1.gif",
        path: __dirname + "/images/image1.gif",
        cid: "image1",
      },
    ],
  });

  console.log(result);
  res.send("Email sent");
});


//TWILIO//

import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.get("/sms", async (req, res) => {
  const result = await client.messages.create({
    body: "que onda che",
    from: process.env.TWILIO_PHONE_NUMBER,
    to: "+541130966859",
  });

  console.log(result);

  res.send("SMS sent");
});


app.get("*", (_, res) => {
  return res
    .status(404)
    .json({ status: "error", msg: "No se encuentra esa ruta", data: {} });
});
