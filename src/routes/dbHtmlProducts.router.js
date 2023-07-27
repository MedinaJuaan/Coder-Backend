import express from "express";
import { productsController } from "../controllers/products.controller.js";
import checkLogin from "../middlewares/checklogin.js"
export const dbHtmlProducts = express.Router();


dbHtmlProducts.get('/', checkLogin, productsController.getProducts);