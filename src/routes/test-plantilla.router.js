import express from "express"
import ProductManager from "../functions/productManager.js";
const productManager = new ProductManager();
const products = productManager.getProducts();

export const testPantillaProducts= express.Router()

testPantillaProducts.get("/",  (req, res) => {
return res.status(200).render("test-plantilla",{products})
  });
  