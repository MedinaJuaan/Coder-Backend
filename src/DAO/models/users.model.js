import mongoose, { Schema, model } from "mongoose";
export const UserModel = model(
  "users",
  new Schema({
    email: { type: String, required: true, max: 100 },
    username: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
    rol: { type: String, default: "user", required: false, max: 100 },
  })
);