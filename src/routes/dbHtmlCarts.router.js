import express from "express";
import { cartService } from "../services/dbCarts.service.js";
export const dbHtmlCarts = express.Router();

dbHtmlCarts.get("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid; 
    const products = await cartService.getCartById(cid);
    return res.status(200).render("carts", { products }); 
  } catch (error) {
    console.error(error);
    return res.status(500).render("server-error");
  }
});