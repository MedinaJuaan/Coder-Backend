const express = require("express");
const fs = require("fs/promises");
const app = express();
const port = 8080;
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    const data = await fs.readFile("../products.json", "utf8");
    const products = JSON.parse(data);
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
    const data = await fs.readFile("../products.json", "utf8");
    const products = JSON.parse(data);
    const product = products.find((p) => p.id === parseInt(req.params.pid));
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
