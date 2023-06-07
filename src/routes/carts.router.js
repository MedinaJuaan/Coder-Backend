import express from "express";
import CartManager from "../DAO/cartManager.js";
export const cartsRouter = express.Router();

const cartManager = new CartManager();

cartsRouter.post("/", async (req, res) => {
  try {
    const newCart = cartManager.createCart();
    res.status(201).json({
      status: "success",
      msg: "Carrito creado",
      data: newCart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      msg: "Error en el servidor",
      data: {},
    });
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = cartManager.getCartById(cartId);
    if (cart) {
      res.status(200).json({
        status: "success",
        msg: "Productos del carrito",
        data: cart.products,
      });
    } else {
      res.status(404).json({
        status: "error",
        msg: "El carrito no existe",
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

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;
    const product = cartManager.addProductToCart(cartId, productId, quantity);
    if (product) {
      res.status(201).json({
        status: "success",
        msg: "Producto agregado al carrito",
        data: product,
      });
    } else {
      res.status(404).json({
        status: "error",
        msg: "El carrito no existe",
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
