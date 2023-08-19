import mongoose from "mongoose";
import { cartModel } from "./cart.model.js";
const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  rol: String,
  documents: [
    {
      name: String,
      reference: String,
    },
  ],
  last_connection: String,
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: cartModel
  }
});


const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
