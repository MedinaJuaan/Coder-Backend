import { productsModel } from "../DAO/models/products.model.js";

class ProductsService {
  async getProducts(queryParams) {
    const products = await productsModel.getProducts(queryParams);

    const response = {
      status: "success",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.hasPrevPage ? products.prevPage : null,
      nextPage: products.hasNextPage ? products.nextPage : null,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.hasPrevPage
        ? `http://localhost:8080/api/dbproducts?limit=${products.limit}&page=${products.prevPage}`
        : null,
      nextLink: products.hasNextPage
        ? `http://localhost:8080/api/dbproducts?limit=${products.limit}&page=${products.nextPage}`
        : null,
    };
    return response;
  }

  async getProductById(id) {
    const product = await productsModel.getProductById(id);
    return product;
  }

  async deleteProduct(id) {
    const deletedProduct = await productsModel.deleteProduct(id);
    return deletedProduct;
  }

  async updateProduct(id, updatedData) {
    const updatedProduct = await productsModel.updateProduct(id, updatedData);
    return updatedProduct;
  }

  async createProduct(newProduct) {
    const createdProduct = await productsModel.createProduct(newProduct);
    return createdProduct;
  }
}

export const productsService = new ProductsService();