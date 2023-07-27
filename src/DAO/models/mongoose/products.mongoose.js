import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 100 },
  price: { type: Number, required: true, max: 10000 },
  code: { type: String, required: true, max: 100 },
  stock: { type: Number, required: true, max: 100 },
  category: { type: String, required: true, max: 100 },
  image: { type: String, required: true },
});

productSchema.plugin(mongoosePaginate);

export const MongooseProductModel = model("products", productSchema);