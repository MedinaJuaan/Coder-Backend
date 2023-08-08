import { Schema, model } from "mongoose";


const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
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