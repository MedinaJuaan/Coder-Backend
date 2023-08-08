import { usersService } from "../services/users.service.js";

class UsersController {
    async getUsers(req, res) {
      try {
        const users = await usersService.getAll();
        return res.status(200).json({
          status: "success",
          msg: "Listado de usuarios",
          payload: users,
        });
      } catch (e) {
        console.log(e);
        return res.status(500).json({
          status: "error",
          msg: "Error en el servidor",
          payload: {},
        });
      }
    }
  
    async getUserById(req, res) {
      try {
        const { _id } = req.params;
        const user = await usersService.getUserById(_id);
        console.log(user)
        return res.status(200).json({
          status: "success",
          msg: "Usuario encontrado",
          payload: user,
        });
      } catch (e) {
        console.log(e);
        return res.status(500).json({
          status: "error",
          msg: "Error en el servidor",
          payload: {},
        });
      }
    }
  
    async createUser(req, res) {
      const { firstName, lastName, email, age, password } = req.body;
      try {
        if (!firstName || !lastName || !email || !age || !password) {
          console.log("Error de validación: Por favor complete todos los campos");
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
          age,
          password,
        });
  
        return res.status(201).json({
          status: "success",
          msg: "Usuario creado",
          payload: newUser,
        });
      } catch (e) {
        console.log(e);
        return res.status(500).json({
          status: "error",
          msg: "Error en el servidor",
          payload: {},
        });
      }
    }
  
    async updateUser(req, res) {
      try {
        const { _id } = req.params;
        const update = req.body;
        const userUpdated = await usersService.updateUser(_id, update);
  
        if (userUpdated) {
          res.status(200).json({
            status: "success",
            msg: "Usuario actualizado",
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
    }
  
    async deleteUser(req, res) {
      try {
        const { _id } = req.params;
        await usersService.deleteUser(_id);
        return res.status(200).json({
          status: "success",
          msg: "Usuario eliminado",
          payload: {},
        });
      } catch (e) {
        console.log(e);
        return res.status(500).json({
          status: "error",
          msg: "Error en el servidor",
          payload: {},
        });
      }
    }
  }
  
  export const usersController = new UsersController();