import importModels from "../DAO/factory.js";
const models = await importModels()
const productsModel = models.products
class ProductsService {
  async get(queryParams) {
    const products = await productsModel.get(queryParams);

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

  async getById(id) {
    const product = await productsModel.getById(id);
    return product;
  }

  async delete(id) {
    const deletedProduct = await productsModel.delete(id);
    return deletedProduct;
  }

  async update(id, updatedData) {
    const updatedProduct = await productsModel.update(id, updatedData);
    return updatedProduct;
  }

  async create(newProduct) {
    const createdProduct = await productsModel.create(newProduct);
    return createdProduct;
  }
}

export const productsService = new ProductsService();