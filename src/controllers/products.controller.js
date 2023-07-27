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
            console.log(data);

            return res.status(200).render("products-list", data);
          } catch (e) {
            console.log(e);
            return res.status(500).render('server-error');
          }
        }
      }
      
      export const productsController = new ProductsController();