import { ProductModel } from "../DAO/models/dbproducts.model.js";

class ProductService {

  async getProductsPaginated(pages) {
    try {
      const products = await ProductModel.paginate(
        {},
        { limit: 20, page: pages }
      );
      const {
        totalPages,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        docs: productsDocs,
      } = products;

      const productsPages = productsDocs.map((product) => ({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        imageUrl: product.imageUrl,
      }));
      return {
        totalPages,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        productsPages,
      };
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      throw error;
    }
  }

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
