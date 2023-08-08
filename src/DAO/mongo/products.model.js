import { MongooseProductModel } from "./mongoose/products.mongoose.js";

class ProductsModel {
  async get(queryParams) {
    const { limit = 10, page = 1, sort } = queryParams;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort === "desc" ? "-price" : "price",
    };
  
    const result = await MongooseProductModel.paginate({}, options);
    return result; 
  }

  async getById(_id) {
    const product = await MongooseProductModel.findOne({ _id });
    return product;
  }

  async delete(_id) {
    const deleteProduct = await MongooseProductModel.findOneAndDelete({ _id });
    return deleteProduct;
  }

  async update(_id, updatedData) {
    const productUpdated = await MongooseProductModel.findOneAndUpdate(
      { _id },
      updatedData,
      { new: true }
    );
    return productUpdated;
  }

  async create(newProduct) {
    const createdProduct = await MongooseProductModel.create(newProduct);
    return createdProduct;
  }
}

export const productsModel = new ProductsModel();