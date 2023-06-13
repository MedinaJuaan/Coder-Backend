import express from "express";
import { cartService } from "../services/dbCarts.service.js";
export const dbCarts = express.Router();

dbCarts.get("/", async (req, res) => {
  try {
    const carts = await cartService.getAllCarts();
    const cartIds = carts.map((cart) => cart._id);
    res.status(200).json({
      status: "success",
      msg: "IDs de carritos obtenidos",
      payload: cartIds,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      msg: "Error en el servidor",
      payload: {},
    });
  }
});

dbCarts.get("/:_cartId", async (req, res) => {
  try {
    const { _cartId } = req.params;
    const cart = await cartService.getCartById(_cartId);
    if (cart) {
      res.status(200).json({
        status: "success",
        msg: "Carrito encontrado",
        payload: cart,
      });
    } else {
      res.status(404).json({
        status: "error",
        msg: "Carrito no encontrado",
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

dbCarts.delete("/:_cartId", async (req, res) => {
  try {
    const { _cartId } = req.params;
    const deletedCart = await cartService.deleteCartById(_cartId);
    if (deletedCart) {
      res.status(200).json({
        status: "success",
        msg: "Carrito eliminado",
        payload: {},
      });
    } else {
      res.status(404).json({
        status: "error",
        msg: "Carrito no encontrado",
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

dbCarts.post("/", async (req, res) => {
  try {
    const { productId } = req.body;
    const newCart = await cartService.createCart(productId);
    res.status(201).json({
      status: "success",
      msg: "Carrito creado",
      payload: newCart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      msg: "Error en el servidor",
      payload: {},
    });
  }
});

dbCarts.post("/:_cartId/products/:_productId", async (req, res) => {
  try {
    const { _cartId, _productId } = req.params;
    const cart = await cartService.addProduct(_cartId, _productId);
    if (cart) {
      res.status(200).json({
        status: "success",
        msg: "Producto agregado al carrito",
        payload: cart,
      });
    } else {
      res.status(404).json({
        status: "error",
        msg: "Carrito no encontrado",
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
