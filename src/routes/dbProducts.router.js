import express from "express";
import { productService } from "../services/dbProducts.service.js";
export const dbProducts = express.Router();

dbProducts.get("/", async (req, res) => {
  try {
    const products = await productService.getProducts({});
    const queryLimit = parseInt(req.query.limit);
    if (queryLimit && queryLimit > 0) {
      res.status(200).json({
        status: "success",
        msg: `Todos los productos hasta el ${queryLimit}`,
        payload: products.slice(0, queryLimit),
      });
    } else {
      res.status(200).json({
        status: "success",
        msg: "Todos los productos",
        payload: products,
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: "error", msg: "Error en el servidor", payload: {} });
  }
});

dbProducts.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const product = await productService.getProductById({ _id });

    if (product) {
      res.status(200).json({
        status: "success",
        msg: "Producto encontrado",
        payload: product,
      });
    } else {
      res.status(404).json({
        status: "error",
        msg: "Producto no encontrado",
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

dbProducts.delete("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteProduct = await productService.deleteProduct({ _id });

    if (deleteProduct) {
      res.status(200).json({
        status: "success",
        msg: "Producto eliminado",
        payload: {},
      });
    } else {
      res.status(404).json({
        status: "error",
        msg: "Producto no encontrado",
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

dbProducts.put("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const update = req.body;
    const productUpdated = await productService.updateProduct(_id, update);

    if (productUpdated) {
      res.status(200).json({
        status: "success",
        msg: "Producto actualizado",
        payload: productUpdated,
      });
    } else {
      res.status(404).json({
        status: "error",
        msg: "Producto no encontrado",
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

dbProducts.post("/", async (req, res) => {
  const { description, code, price, stock, category, title } = req.body;

  try {
    if (!description || !code || !price || !stock || !category || !title) {
      console.log("Error de validacion: Por favor completa todos los campos");
      return res.status(400).json({
        status: "error",
        msg: "Por favor completa todos los campos",
        payload: {},
      });
    }

    const newProduct = await productService.createProduct({
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
      payload: newProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      msg: "error en el servidor",
      payload: {},
    });
  }
});
