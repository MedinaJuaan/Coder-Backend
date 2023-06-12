import { ProductModel } from "../DAO/models/dbproducts.model.js";

class ProductService {
async getProducts(){
    const products = await ProductModel.find({})
    return products
}
async getProductById(_id){
    const product = await ProductModel.findOne({_id})
    return product
}
async deleteProduct(_id){
    const deleteProduct = await ProductModel.findOneAndDelete({_id})
    return deleteProduct
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

export const productService = new ProductService