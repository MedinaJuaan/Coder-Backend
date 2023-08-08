import express from "express";
import { productsController } from "../controllers/products.controller.js";
export const dbProducts = express.Router();

dbProducts.get('/', productsController.getApi);

dbProducts.get("/:_id", productsController.getById);

dbProducts.delete("/:_id", productsController.delete);

dbProducts.put("/:_id", productsController.update);

dbProducts.post("/", productsController.create);