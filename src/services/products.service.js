import { productsModel } from "../DAO/models/products.model.js";

class ProductsService {
  async getProducts(queryParams) {
    const { limit = 10, page = 1, sort } = queryParams;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort === "desc" ? "-price" : "price",
    };

    const result = await productsModel.getProducts(options);

    const response = {
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.hasPrevPage ? result.prevPage : null,
      nextPage: result.hasNextPage ? result.nextPage : null,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `http://localhost:8080/api/dbproducts?limit=${limit}&page=${result.prevPage}`
        : null,
      nextLink: result.hasNextPage
        ? `http://localhost:8080/api/dbproducts?limit=${limit}&page=${result.nextPage}`
        : null,
    };

    return response;
  }
}

export const productsService = new ProductsService();