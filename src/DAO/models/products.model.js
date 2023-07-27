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
  }
  
  export const productsModel = new ProductsModel();