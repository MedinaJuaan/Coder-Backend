import express from "express";
export const loginRouter = express.Router();
import { usersService } from "../services/users.service.js";

loginRouter.get("/", async (req, res) => {
	try {
		return res.status(200).render("login");
	} catch (err) {
		console.log(err);
		res
			.status(501)
			.send({ status: "error", msg: "Error en el servidor", error: err });
	}
});

loginRouter.post("/", async (req, res) => {
	const { email, password } = req.body;
  
	if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
	  req.session.user = "AdminCoder";
	  req.session.rol = "admin";
	  res.redirect("/html/dbproducts");
	} else {
	  const userExist = await usersService.findUser(email, password);
	  if (userExist) {
		req.session.user = userExist.username;
		req.session.rol = userExist.rol;
		res.redirect("/html/dbproducts");
	  } else {
		res.send("Usuario Inexistente");
	  }
	}
  });