import express from "express";
import { ProductManager } from "../DAO/productManager.js";
export const homeRouter = express.Router();
const productManager = new ProductManager();

homeRouter.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    return res.status(200).render("home", { products });
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});

