import express from "express";
export const usersRouter = express.Router();
import { UserModel } from "../DAO/models/users.model.js";

usersRouter.get("/", async (_, res) => {
  try {
    const users = await UserModel.find({});
    return res.status(200).json({
      status: "success",
      msg: "listado de usuarios",
      data: users,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "error en el servidor",
      data: {},
    });
  }
});

usersRouter.post("/", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    if (!firstName || !lastName || !email) {
      console.log(
        "Error de validacion: Por favor complete todos los campos"
      );
      return res.status(400).json({
        status: "error",
        msg: "Por favor complete todos los campos",
        data: {},
      });
    }
    const userCreated = await UserModel.create({ firstName, lastName, email });
    return res.status(201).json({
      status: "success",
      msg: "usuario creado",
      data: userCreated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "error en el servidor",
      data: {},
    });
  }
});

usersRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  try {
    if (!firstName || !lastName || !email || !id) {
      console.log(
        "Error de validacion: Por favor complete todos los campos"
      );
      return res.status(400).json({
        status: "error",
        msg: "Por favor complete todos los campos",
        data: {},
      });
    }
    const userUptaded = await UserModel.updateOne(
      { _id: id },
      { firstName, lastName, email }
    );
    return res.status(201).json({
      status: "success",
      msg: "usuario modificado",
      data: userUptaded,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "error en el servidor",
      data: {},
    });
  }
});

usersRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await UserModel.deleteOne({ _id: id });
    return res.status(200).json({
      status: "success",
      msg: "usuario eliminado",
      data: {},
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "error en el servidor",
      data: {},
    });
  }
});
