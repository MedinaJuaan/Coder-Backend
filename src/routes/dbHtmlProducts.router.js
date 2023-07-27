import express from "express";
import { productService } from "../services/dbProducts.service.js";
import checkLogin from "../utils/checklogin.js";
export const dbHtmlProducts = express.Router();
import { cartService } from "../services/dbCarts.service.js";

dbHtmlProducts.get("/", checkLogin, async (req, res) => {
  try {
    const queryParams = req.query;
    const response = await productService.getProducts(queryParams);
    const userId = req.session.user;
    const userCart = await cartService.getCartByUserId(userId);

    const data = {
      products: response.payload.map((product) => ({
        productID: product._id.toString(),
        title: product.title,
        description: product.description,
        price: product.price,
        code: product.code,
        stock: product.stock,
        category: product.category,
        image: product.image,
      })),
      hasPrevPage: response.hasPrevPage,
      prevPage: response.prevPage,
      page: response.page,
      totalPages: response.totalPages,
      hasNextPage: response.hasNextPage,
      nextPage: response.nextPage,
      userId: userId,
      cartId: userCart ? userCart._id.toString() : null,
      username: req.session.user,
      rol: req.session.rol,
    };
    console.log(data);
    return res.status(200).render("products-list", data);
  } catch (e) {
    console.log(e);
    return res.status(500).render("server-error");
  }
});

dbHtmlProducts.post("/dbCarts/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    await cartService.addProduct(cid, pid);
    console.log(cartService);
    res.redirect("/html/dbproducts");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      msg: "Error en el servidor",
      payload: {},
    });
  }
});
