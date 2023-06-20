import { connect } from "mongoose";
import faker from 'faker'
import { ProductModel } from "../DAO/models/dbproducts.model.js";
import loremPicsum from "lorem-picsum";
export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://medinajuaan:Isabella2602@cluster0.4qbgeko.mongodb.net/?retryWrites=true&w=majority"
    );
    // (async () => {
    //   const products = [];
    //   for (let i = 0; i < 1000; i++) {
    //     products.push({
    //        title : faker.commerce.productName(),
    //        description : faker.lorem.sentence(),
    //        price : faker.datatype.number({ min: 1, max: 1000 }),
    //        code : faker.random.alphaNumeric(10),
    //        stock : faker.datatype.number({ min: 1, max: 100 }),
    //        category : faker.commerce.department(),
    //        imageUrl : loremPicsum({ width: 640, height: 480 }),
    //     });
    //   }
    //   try {
    //     await ProductModel.insertMany(products);
    //     console.log('Inserted', products.length, 'products');
    //   } catch (error) {
    //     console.error('Error en insert many:', error);
    //   }
    // })();
    console.log("plug to mongo!");
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}
