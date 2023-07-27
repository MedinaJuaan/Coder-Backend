import express from "express";
import { productsController } from "../controllers/products.controller.js";
export const dbProducts = express.Router();

dbProducts.get('/', productsController.getProductsApi);

dbProducts.get("/:_id", productsController.getProductById);

dbProducts.delete("/:_id", productsController.deleteProduct);

dbProducts.put("/:_id", productsController.updateProduct);

dbProducts.post("/", productsController.createProduct);