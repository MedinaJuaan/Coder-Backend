import express from "express";
export const registerRouter = express.Router();
import { usersService } from "../services/users.service.js";
import { createHash } from "../utils/bcrypt.js";
registerRouter.get("/", async (req, res) => {
  try {
    return res.status(200).render("register");
  } catch (err) {
    console.log(err);
    res
      .status(501)
      .send({ status: "error", msg: "Error en el servidor", error: err });
  }
});

registerRouter.post("/", async (req, res) => {
	try {
	  const { email, username, password, rol } = req.body;
	  const userExist = await usersService.findUserByEmail(email);
	  if (userExist) {
		res.redirect("/home?message=El email ingresado ya existe");
	  } else {
		usersService.create(email, username,createHash(password) , rol);
		res.redirect("/home?message=Usuario creado correctamente. Inicie sesión para continuar.");
	  }
	} catch (error) {
	  console.error(error);
	  res.status(500).send("Ha ocurrido un error en el servidor.");
	}
  });