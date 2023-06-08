import express from "express";
import { ProductModel } from "../DAO/models/product.model.js";
import { Types } from "mongoose";
export const productsMongoRouter = express.Router();

productsMongoRouter.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find({});
    const queryLimit = parseInt(req.query.limit);
    if (queryLimit && queryLimit > 0) {
      res.status(200).json({
        status: "success",
        msg: `Todos los productos hasta el ${queryLimit}`,
        data: products.slice(0, queryLimit),
      });
    } else {
      res.status(200).json({
        status: "success",
        msg: "Todos los productos",
        data: products,
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: "error", msg: "Error en el servidor", data: {} });
  }
});

productsMongoRouter.get("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;

    if (!Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        status: "error",
        msg: "El ID del producto no es válido",
        data: {},
      });
    }

    const product = await ProductModel.findOne({ _id: productId });

    if (product) {
      res.status(200).json({
        status: "success",
        msg: "Producto encontrado",
        data: product,
      });
    } else {
      res.status(404).json({
        status: "error",
        msg: "Producto no encontrado",
        data: {},
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      msg: "Error en el servidor",
      data: {},
    });
  }
});

productsMongoRouter.delete("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;

    if (!Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        status: "error",
        msg: "El ID del producto no es válido",
        data: {},
      });
    } else {
      const product = await ProductModel.findOneAndDelete({ _id: productId });

      if (product) {
        res.status(200).json({
          status: "success",
          msg: "Producto eliminado",
          data: {},
        });
      } else {
        res.status(404).json({
          status: "error",
          msg: "Producto no encontrado",
          data: {},
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      msg: "Error en el servidor",
      data: {},
    });
  }
});

productsMongoRouter.put("/:pid", async (req, res) => {
    try {
      const productId = req.params.pid;
  
      if (!Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
          status: "error",
          msg: "El ID del producto no es válido",
          data: {},
        });
      }
      const update = req.body;
      const product = await ProductModel.findOneAndUpdate(
        { _id: productId },
        update,
        { new: true }
      );
  
      if (product) {
        res.status(200).json({
          status: "success",
          msg: "Producto actualizado",
          data: product,
        });
      } else {
        res.status(404).json({
          status: "error",
          msg: "Producto no encontrado",
          data: {},
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        msg: "Error en el servidor",
        data: {},
      });
    }
  });

productsMongoRouter.post("/", async (req, res) => {
  const { description, code, price, stock, category, title } = req.body;

  try {
    if (!description || !code || !price || !stock || !category || !title) {
      console.log("Error de validacion: Por favor completa todos los campos");
      return res.status(400).json({
        status: "error",
        msg: "Por favor completa todos los campos",
        data: {},
      });
    }

    const newProduct = await ProductModel.create({
      description,
      code,
      price,
      stock,
      category,
      title,
    });

    return res.status(201).json({
      status: "success",
      msg: "Producto creado",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      msg: "error en el servidor",
      data: {},
    });
  }
});