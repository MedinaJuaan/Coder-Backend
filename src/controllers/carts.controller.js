import { cartsService } from "../services/carts.service.js";

class CartsController {
  async createCart(req, res) {
    try {
      const { productId } = req.body;

      const newCart = await cartsService.createCart(productId);
      res.status(201).json({
        status: "success",
        msg: "Carrito creado",
        data: newCart,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        msg: "Error en el servidor",
        data: {},
      });
    }
  }

  async getAllCarts(req, res) {
    try {
      const carts = await cartsService.getAllCarts();
      res.status(200).json({
        status: "success",
        msg: "Carritos encontrados",
        data: carts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        msg: "Error en el servidor",
        data: {},
      });
    }
  }

  async getCartById(req, res) {
    try {
      const {cid} = req.params;
      const cartProducts = await cartsService.getCartById(cid);
      if (cartProducts.length > 0) {
        return res.status(200).render("carts", cartProducts);
      } else {
        res.status(404).json({
          status: "error",
          msg: "El carrito no existe o no tiene productos",
          data: {},
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        msg: "Error en el servidor",
        data: {},
      });
    }
  }

  async deleteCartProducts(req, res) {
    try {
      const { cid } = req.params;
      const cart = await cartsService.deleteCartProducts(cid);
      if (cart) {
        res.status(200).json({
          status: "success",
          msg: "Productos del carrito eliminados",
          data: cart,
        });
      } else {
        res.status(404).json({
          status: "error",
          msg: "El carrito no existe",
          data: {},
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        msg: "Error en el servidor",
        data: {},
      });
    }
  }

  async getCartByUserId(req, res) {
    try {
      const { userId } = req.params;
      const cart = await cartsService.getCartByUserId(userId);
      if (cart) {
        res.status(200).json({
          status: "success",
          msg: "Carrito encontrado",
          data: cart,
        });
      } else {
        res.status(404).json({
          status: "error",
          msg: "El carrito no existe",
          data: {},
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        msg: "Error en el servidor",
        data: {},
      });
    }
  }

  async addProduct(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const cart = await cartsService.addProduct(cid, pid, quantity);
      if (cart) {
        return res.redirect(`/api/dbCarts/${cid}`);
      } else {
        res.status(404).json({
          status: "error",
          msg: "El carrito no existe",
          data: {},
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        msg: "Error en el servidor",
        data: {},
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { cid, pid } = req.params;
      const cart = await cartsService.deleteProduct(cid, pid);
      if (cart) {
        res.status(200).json({
          status: "success",
          msg: "Producto eliminado del carrito",
          data: cart,
        });
      } else {
        res.status(404).json({
          status: "error",
          msg: "El carrito o el producto no existe",
          data: {},
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        msg: "Error en el servidor",
        data: {},
      });
    }
  }

  async updateProductQuantity(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const cart = await cartsService.updateProductQuantity(cid, pid, quantity);
      if (cart) {
        res.status(200).json({
          status: "success",
          msg: "Cantidad de producto actualizada",
          data: cart,
        });
      } else {
        res.status(404).json({
          status: "error",
          msg: "El carrito o el producto no existe",
          data: {},
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        msg: "Error en el servidor",
        data: {},
      });
    }
  }
}

export const cartsController = new CartsController();
