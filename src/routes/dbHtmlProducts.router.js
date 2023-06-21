import express from "express";
import { productService } from "../services/dbProducts.service.js";
export const dbHtmlProducts = express.Router();

dbHtmlProducts.get("/", async (req, res) => {
  try {
    const query = req.query;
    const pages = query.pages;
    const products = await productService.getProductsPaginated(pages);
    return res.status(200).render("products-list", products);
  } catch (error) {
    console.error(error);
    return res.status(500).render("server-error");
  }
});

