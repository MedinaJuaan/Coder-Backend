import { ProductModel } from "../DAO/models/dbproducts.model.js";

class ProductService {
  async getProducts(pages) {
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
