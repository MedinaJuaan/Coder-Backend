import express from "express";
import { usersService } from "../services/users.service.js";
export const usersRouter = express.Router();

usersRouter.get("/", async (_, res) => {
  try {
    const users = await userService.getUsers();
    return res.status(200).json({
      status: "success",
      msg: "listado de usuarios",
      payload: users,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "error en el servidor",
      payload: {},
    });
  }
});

usersRouter.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const user = await usersService.getUserById({_id});
    return res.status(201).json({
      status: "success",
      msg: "usuario encontrado",
      payload: user,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "error en el servidor",
      payload: {},
    });
  }
});

usersRouter.post("/", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    if (!firstName || !lastName || !email) {
      console.log("Error de validacion: Por favor complete todos los campos");
      return res.status(400).json({
        status: "error",
        msg: "Por favor complete todos los campos",
        payload: {},
      });
    }
    const newUser = await usersService.createUser({
      firstName,
      lastName,
      email,
    });
    return res.status(201).json({
      status: "success",
      msg: "usuario creado",
      payload: newUser,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "error en el servidor",
      payload: {},
    });
  }
});

usersRouter.put("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const update = req.body;
    const userUpdated = await usersService.updateUser(_id, update);

    if (userUpdated) {
      res.status(200).json({
        status: "success",
        msg: "usuario actualizado",
        payload: userUpdated,
      });
    } else {
      res.status(404).json({
        status: "error",
        msg: "Usuario no encontrado",
        payload: {},
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      msg: "Error en el servidor",
      payload: {},
    });
  }
});

usersRouter.delete("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const userDeleted = await usersService.deleteUser({ _id });
    return res.status(200).json({
      status: "success",
      msg: "usuario eliminado",
      payload: {},
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "error en el servidor",
      payload: {},
    });
  }
});
