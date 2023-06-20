import express from "express";
import { productService } from "../services/dbProducts.service.js";
export const dbHtmlProducts = express.Router();

dbHtmlProducts.get("/", async (req, res) => {
  try {
    const query = req.query;
    const pages = query.pages;
    const products = await productService.getProducts(pages);
    return res.status(200).render("products-list", products);
  } catch (error) {
    console.error(error);
    return res.status(500).render("server-error");
  }
});

dbHtmlProducts.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById({ id });

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

dbHtmlProducts.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await productService.deleteProduct({ id });

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

dbHtmlProducts.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const productUpdated = await productService.updateProduct(id, update);

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

dbHtmlProducts.post("/", async (req, res) => {
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
