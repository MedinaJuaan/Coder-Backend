import { productsService } from "../services/products.service.js";

class ProductsController {
  async getProducts(req, res) {
    try {
      const queryParams = req.query;
      const username = req.session.user.firstName;
      const rol = req.session.user.rol;
      const response = await productsService.getProducts(queryParams);
      const data = {
        products: response.payload.map(product => ({
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
        username,
        rol,
      };
      return res.status(200).render("products-list", data);
    } catch (error) {
      console.error(error);
      return res.status(500).render("server-error");
    }
  }

  async getProductsApi(req, res) {
    try {
      const queryParams = req.query;
      const response = await productsService.getProducts(queryParams);
      return res.status(200).json(response.payload);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        msg: "Error en el servidor",
        payload: {},
      });
    }
  }
  async getProductById(req, res) {
    try {
      const { _id } = req.params;
      const product = await productsService.getProductById(_id);

      if (product) {
        res.status(200).json({
          status: "success",
          msg: "Producto encontrado",
          payload: product,
        });
      } else {
        res.status(404).json({
          status: "error",
          msg: "Producto no encontrado",
          payload: {},
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        msg: "Error en el servidor",
        payload: {},
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { _id } = req.params;
      const deleteProduct = await productsService.deleteProduct(_id);

      if (deleteProduct) {
        res.status(200).json({
          status: "success",
          msg: "Producto eliminado",
          payload: {},
        });
      } else {
        res.status(404).json({
          status: "error",
          msg: "Producto no encontrado",
          payload: {},
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        msg: "Error en el servidor",
        payload: {},
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const { _id } = req.params;
      const update = req.body;
      const productUpdated = await productsService.updateProduct(_id, update);

      if (productUpdated) {
        res.status(200).json({
          status: "success",
          msg: "Producto actualizado",
          payload: productUpdated,
        });
      } else {
        res.status(404).json({
          status: "error",
          msg: "Producto no encontrado",
          payload: {},
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        msg: "Error en el servidor",
        payload: {},
      });
    }
  }

  async createProduct(req, res) {
    const { description, code, price, stock, category, title , image} = req.body;

    try {
      if (!description || !code || !price || !stock || !category || !title || !image) {
        console.log("Error de validación: Por favor completa todos los campos");
        return res.status(400).json({
          status: "error",
          msg: "Por favor completa todos los campos",
          payload: {},
        });
      }

      const newProduct = await productsService.createProduct({
        description,
        code,
        price,
        stock,
        category,
        title,
        image
      });

      return res.status(201).json({
        status: "success",
        msg: "Producto creado",
        payload: newProduct,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "error",
        msg: "Error en el servidor",
        payload: {},
      });
    }
  }
}

export const productsController = new ProductsController();
      