import express from "express";
import { usersController } from "../controllers/users.controller.js";

export const usersRouter = express.Router();

usersRouter.get("/", usersController.getUsers);
usersRouter.get("/:_id", usersController.getUserById);
usersRouter.post("/", usersController.createUser);
usersRouter.put("/:_id", usersController.updateUser);
usersRouter.delete("/:_id", usersController.deleteUser);