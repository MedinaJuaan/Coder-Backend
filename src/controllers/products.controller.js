import { productsService } from "../services/products.service.js";
import { cartsService } from "../services/carts.service.js";
import ProductsDTO from "../DTO/products.dto.js";
class ProductsController {
  async get(req, res) {
    try {
      const queryParams = req.query;
      const username = req.session.user.firstName;
      const rol = req.session.user.rol;
      const userId = req.session.user._id;
      const cart = await cartsService.getCartByUserId(userId);
      let cartId = null;
      if (cart) {
        cartId = cart._id.toString();
      }
      const response = await productsService.get(queryParams);
      const data = {
        products: response.payload.map((product) => ({
          title: product.title,
          description: product.description,
          price: product.price,
          code: product.code,
          stock: product.stock,
          category: product.category,
          image: product.image,
          productId: product._id.toString(),
        })),
        hasPrevPage: response.hasPrevPage,
        prevPage: response.prevPage,
        page: response.page,
        totalPages: response.totalPages,
        hasNextPage: response.hasNextPage,
        nextPage: response.nextPage,
        username,
        rol,
        cartId,
      };
      // console.log(data);
      return res.status(200).render("products-list", data);
    } catch (error) {
      console.error(error);
      return res.status(500).render("server-error");
    }
  }

  async getApi(req, res) {
    try {
      const queryParams = req.query;
      const response = await productsService.get(queryParams);
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

  async getById(req, res) {
    try {
      const { _id } = req.params;
      const product = await productsService.getById(_id);

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

  async delete(req, res) {
    try {
      const { _id } = req.params;
      const deleteProduct = await productsService.delete(_id);

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

  async update(req, res) {
    try {
      const { _id } = req.params;
      const update = req.body;
      const productUpdated = await productsService.update(_id, update);

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

  async create(req, res) {
    const { description, code, price, stock, category, title, image } =
      req.body;

    try {
      if (
        !description ||
        !code ||
        !price ||
        !stock ||
        !category ||
        !title ||
        !image
      ) {
        console.log("Error de validación: Por favor completa todos los campos");
        return res.status(400).json({
          status: "error",
          msg: "Por favor completa todos los campos",
          payload: {},
        });
      }

      const newProduct = await productsService.create({
        description,
        code,
        price,
        stock,
        category,
        title,
        image,
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
