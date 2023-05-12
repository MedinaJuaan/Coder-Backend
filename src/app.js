const express = require("express");
const ProductManager = require("./functions/productManager");
const app = express();
const port = 8080;
const productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    const products = productManager.getProducts();
    const queryLimit = parseInt(req.query.limit);
    if (queryLimit && queryLimit > 0) {
      res.status(200).json({
        status: "success",
        msg: `Todos los productos hasta el ${queryLimit}`,
        data: products.slice(0, queryLimit),
      });
    } else {
      res.status(200).json({
        status: "success",
        msg: "Todos los productos",
        data: products,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "error", msg: "Error en el servidor", data: {} });
  }
});
app.put("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = productManager.getProductById(productId);
    if (product) {
      const productModified = req.body;

      if (id && id !== productId) {
        return res.status(400).json({
          status: "error",
          msg: "No se permite modificar el ID del producto",
          data: {}
        });
      }
      productManager.saveProducts();
      res.status(200).json({
        status: "success",
        msg: "Producto actualizado",
        data: productModified
      });
    } else {
      res.status(400).json({
        status: "error",
        msg: "El producto no existe",
        data: {}
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      msg: "Error en el servidor",
      data: {}
    });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = productManager.getProductById(productId);
    if (product) {
      res.status(200).json({
        status: "success",
        msg: "Producto encontrado",
        data: product
      })
    } else {
      res.status(400).send({ status:"error", msg: "El producto no existe", data: {} });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "error", msg: "Error en el servidor", data: {} });
  }
});

app.delete("/products/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    productManager.deleteProduct(productId);
    res.status(200).json({
      status: "success",
      msg: "Producto eliminado",
      data: {}
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ status: "error", msg: error.message, data: {} });
  }
});
app.post("/products", async (req, res) => {
  try {
    const {title, description, code, price, stock, category} = req.body;
  if (!title || !description || !code || !price || !stock || !category ) {
    
    res.status(400).json({
      status : "error",
      msg: "Todos los campos son obligatorios",
      data : {}
    })
      
    } else {
      const newProduct = {title, description, code, price, status:true, stock, category}
      productManager.addProduct(newProduct);
      res.status(201).json({
        status: "success",
        msg: "Producto creado",
        data: newProduct
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", msg: "Error en el servidor", data: {} });
  }
});


app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`);
});
