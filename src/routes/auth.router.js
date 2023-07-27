import express from "express";
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
      return res.json({ error: "invalid credentials" });
    }
    req.session.user = {
      _id: req.user._id.toString(),
      email: req.user.email,
      firstName: req.user.firstName,
      rol: req.user.rol,
    };
    return res.redirect("/html/dbproducts");
  }
);

authRouter.get("/current", (req, res) => {
  try {
    return res.status(200).json({ user: req.session.user });
  } catch (err) {
    console.log(err);
    res
      .status(501)
      .send({ status: "error", msg: "Error en el servidor", error: err });
  }
});

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
authRouter.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/error-auth" }),
  (req, res) => {
    if (!req.user) {
      return res.json({ error: "something went wrong" });
    }
    req.session.user = {
      _id: req.user._id.toString(),
      email: req.user.email,
      firstName: req.user.firstName,
      rol: req.user.rol,
    };
    return res.redirect("/html/dbproducts");
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
