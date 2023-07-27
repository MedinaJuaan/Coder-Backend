import { connect } from "mongoose";
import env from "../config/enviroment.config.js";
export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://medinajuaan:Isabella2602@cluster0.4qbgeko.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("plug to mongo!");
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}
