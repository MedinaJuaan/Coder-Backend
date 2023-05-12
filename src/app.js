const express = require("express");
const ProductManager = require("./functions/productManager");
const app = express();
const port = 8080;
const productManager = new ProductManager(); 

app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    const products = productManager.getProducts();
    const queryLimit = parseInt(req.query.limit);
    if (queryLimit && queryLimit > 0) {
      res.json(products.slice(0, queryLimit));
    } else {
      res.json(products);
    }
  } catch (error) {
    console.error(error);
    res.send({ error: "Error en el servidor" });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.send({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.send({ error: "Error en el servidor" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
