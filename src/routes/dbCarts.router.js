import express from "express";
import { cartService } from "../services/dbCarts.service.js";
export const dbCarts = express.Router();

dbCarts.get("/", async (req, res) => {
  try {
    const carts = await cartService.getAllCarts();
    const cids = carts.map((cart) => cart._id);
    res.status(200).json({
      status: "success",
      msg: "IDs de carritos obtenidos",
      payload: cids,
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

dbCarts.get("/:cid"), async (req, res)=>{
  try {
    const {cid} = req.params;
    const cart = await cartService.get(cid);
    const simplifiedCart = cart.products.map((item) => {
        return {
            title: item.product.title,
            price: item.product.price,
            quantity: item.quantity,
        };
    });
    res.render('carts', {cart: simplifiedCart});
} catch (error) {
    next(error);
}
}

dbCarts.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartService.getCartById(cid);
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

dbCarts.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await cartService.updateProductQuantity(cid, pid, quantity);
    if (cart) {
      res.status(200).json({
        status: "success",
        msg: "Cantidad de producto actualizada en el carrito",
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

dbCarts.post("/", async (req, res) => {
  try {
    const { pid } = req.body;
    const newCart = await cartService.createCart(pid);
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

dbCarts.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartService.addProduct(cid, pid);
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

dbCarts.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartService.deleteCartProducts(cid);
    if (cart) {
      res.status(200).json({
        status: "success",
        msg: "Productos eliminados del carrito",
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

dbCarts.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartService.deleteProduct(cid, pid);
    if (cart) {
      res.status(200).json({
        status: "success",
        msg: "Producto eliminado",
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
