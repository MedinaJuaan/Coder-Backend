import express from "express";
import { cartService } from "../services/carts.service.js";
export const dbHtmlCarts = express.Router();
import checkLogin from "../middlewares/checklogin.js";

dbHtmlCarts.get("/:cid", checkLogin, async (req, res) => {
  try {
    const cid = req.params.cid;
    const products = await cartService.getCartById(cid);
    return res.status(200).render("carts", { products });
  } catch (error) {
    console.error(error);
    return res.status(500).render("server-error");
  }
});
