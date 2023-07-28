import mongoose, { Schema, model } from "mongoose";
export const MongooseUsersModel = model(
  "users",
  new Schema({
    firstName: { type: String, required: false, max: 100 },
    lastName: { type: String, required: false, max: 100 },
    email: { type: String, required: true, max: 100 },
    age: { type: Number, required: false },
    password: { type: String, required: true, max: 100 },
    cartID: {
      type: Schema.Types.ObjectId,
      ref: "carts",
      required: true,
      default: () => new mongoose.Types.ObjectId(),
    },
    rol: { type: String, default: "user", required: true },
  })
);
