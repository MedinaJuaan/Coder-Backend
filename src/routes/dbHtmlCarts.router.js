import express from "express";
import checkLogin from "../middlewares/checklogin.js";
import { cartsController } from "../controllers/carts.controller.js";
export const dbHtmlCarts = express.Router();

dbHtmlCarts.get("/:cid", checkLogin, async (req, res) => {
  try {
    const uid = req.params.uid;
    const products = await cartsController.getCartByUserId(uid);
    return res.status(200).render("carts", { products });
  } catch (error) {
    console.error(error);
    return res.status(500).render("server-error");
  }
});
