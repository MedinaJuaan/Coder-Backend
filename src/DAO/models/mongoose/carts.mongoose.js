import { Schema, model } from "mongoose";

const cartSchema = new Schema({
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
});

export const MongooseCartModel = model("carts", cartSchema);