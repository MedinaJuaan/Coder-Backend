import { ProductModel } from "../DAO/models/dbproducts.model.js";

class ProductService {
  async getProducts(queryParams) {
    const { limit = 10, page = 1, sort } = queryParams;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort === "desc" ? "-price" : "price",
    };

    const result = await ProductModel.paginate({}, options);

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

  async getProductById(_id) {
    const product = await ProductModel.findOne({ _id });
    return product;
  }

  async deleteProduct(_id) {
    const deleteProduct = await ProductModel.findOneAndDelete({ _id });
    return deleteProduct;
  }

  async updateProduct(_id, updatedData) {
    const productUpdated = await ProductModel.findOneAndUpdate(
      { _id },
      updatedData,
      { new: true }
    );
    return productUpdated;
  }

  async createProduct(newProduct) {
    const createdProduct = await ProductModel.create(newProduct);
    return createdProduct;
  }
}

export const productService = new ProductService();
