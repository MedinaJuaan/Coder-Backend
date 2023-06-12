import { Schema, model } from "mongoose";

export const ProductModel = model(
  "products",
  new Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    price: { type: Number, required: true, max: 10000 },
    code: { type: String, required: true, max: 100 },
    stock: { type: Number, required: true, max: 100 },
    category: { type: String, required: true, max: 100 },
  })
);
