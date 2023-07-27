import { Schema, model } from "mongoose";

export const CartModel = model(
  "carts",
  new Schema({
    productId: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: false,
    },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "products" },
        quantity: { type: Number, default: 0 },
      },
    ],
  })
);