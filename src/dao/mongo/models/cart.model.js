import mongoose from "mongoose";

const cartCollection = "carts";

const cartproductSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true ,
    ref: "products"
  },
  quantity: { 
    type: Number, 
    required: true 
  },
});

const cartSchema = new mongoose.Schema({
  products: [{ 
    type: cartproductSchema,
    ref: "products"
  }],
});

cartSchema.pre("findOne", function()  {
  this.populate("products.product");
})

const cartModel = mongoose.model(cartCollection, cartSchema);

export { cartModel };






