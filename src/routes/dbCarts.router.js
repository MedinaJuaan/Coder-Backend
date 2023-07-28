import express from "express";
import { cartsController } from "../controllers/carts.controller.js";
export const dbCarts = express.Router();

dbCarts.post("/", cartsController.createCart);
dbCarts.get("/", cartsController.getAllCarts);
dbCarts.get("/:cid", cartsController.getCartById);
dbCarts.delete("/:cid", cartsController.deleteCartProducts);
dbCarts.get("/user/:userId", cartsController.getCartByUserId);
dbCarts.post("/:cid/product/:pid", cartsController.addProduct);
dbCarts.delete("/:cid/product/:pid", cartsController.deleteProduct);
dbCarts.put("/:cid/product/:pid", cartsController.updateProductQuantity);
