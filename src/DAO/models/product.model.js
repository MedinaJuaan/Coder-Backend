import { Schema, model } from "mongoose";

export const ProductModel = model(
  "products",
  new Schema({
    description: { type: String, required: true, max: 100 },
    code: { type: String, required: true, max: 100 },
    price: { type: Number, required: true, max: 100 },
    stock: { type: Number, required: true, max: 100 },
    category: { type: String, required: true, max: 100 },
    title: { type: String, required: true, max: 100 },
  })
);
