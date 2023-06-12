import express from "express";
export const usersRouter = express.Router();
import { usersService } from "../services/users.service.js";

usersRouter.get("/", async (_, res) => {
  try {
    const users = await usersService.getUsers();
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
    const userCreated = await usersService.createUser({
      firstName,
      lastName,
      email,
    });
    return res.status(201).json({
      status: "success",
      msg: "usuario creado",
      payload: userCreated,
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
  const { _id } = req.params;
  const { firstName, lastName, email } = req.body;
  try {
    if (!firstName || !lastName || !email || !_id) {
      console.log("Error de validacion: Por favor complete todos los campos");
      return res.status(400).json({
        status: "error",
        msg: "Por favor complete todos los campos",
        payload: {},
      });
    }
    const userUptaded = await usersService.updateUser({
      _id,
      firstName,
      lastName,
      email,
    });
    return res.status(201).json({
      status: "success",
      msg: "usuario modificado",
      payload: userUptaded,
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
