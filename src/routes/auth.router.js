import express from "express";
import { usersService } from "../services/users.service.js";
import { createHash } from "../utils/bcrypt.js";
import passport from "passport";

export const authRouter = express.Router();

authRouter.get("/login", async (req, res) => {
  try {
    return res.status(200).render("login");
  } catch (err) {
    console.log(err);
    res
      .status(501)
      .send({ status: "error", msg: "Error en el servidor", error: err });
  }
});

authRouter.post(
	"/login",
	passport.authenticate("login", { failureRedirect: "/error-auth" }),
	async (req, res) => {
	  if (!req.user) {
		res.send("Usuario o contraseña incorrectos");
	  } else {
		req.session.user = { username: req.user.username, rol: req.user.rol };
		return res.redirect("/html/dbproducts");
	  }
	}
  );


authRouter.get("/register", async (req, res) => {
  try {
    return res.status(200).render("register");
  } catch (err) {
    console.log(err);
    res
      .status(501)
      .send({ status: "error", msg: "Error en el servidor", error: err });
  }
});
authRouter.post("/register", 
  passport.authenticate("register", { failureRedirect: "/error-auth" }),
  (req, res) => {
    res.redirect("/home?message=Usuario creado correctamente. Inicie sesión para continuar.");
  }
);


authRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
    }
    res.redirect("/home");
  });
});
