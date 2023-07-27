import { MongooseProductModel } from "./mongoose/products.mongoose.js";

class ProductsModel {
  async getProducts(queryParams) {
    const { limit = 10, page = 1, sort } = queryParams;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort === "desc" ? "-price" : "price",
    };
  
    const result = await MongooseProductModel.paginate({}, options);
    return result; 
  }

  async getProductById(_id) {
    const product = await MongooseProductModel.findOne({ _id });
    return product;
  }

  async deleteProduct(_id) {
    const deleteProduct = await MongooseProductModel.findOneAndDelete({ _id });
    return deleteProduct;
  }

  async updateProduct(_id, updatedData) {
    const productUpdated = await MongooseProductModel.findOneAndUpdate(
      { _id },
      updatedData,
      { new: true }
    );
    return productUpdated;
  }

  async createProduct(newProduct) {
    const createdProduct = await MongooseProductModel.create(newProduct);
    return createdProduct;
  }
}

export const productsModel = new ProductsModel();