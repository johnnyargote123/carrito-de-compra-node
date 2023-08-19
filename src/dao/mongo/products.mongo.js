import { productModel } from "../mongo/models/product.model.js";
import { sessionMongo } from "../mongo/session.mongo.js";
import socket from "../../socket.js";
import mongoose from 'mongoose';
 class Producs {
  constructor() {}

  getProduct = async () => {
    try {
      const products = await productModel.find();
      return products;
    } catch (error) {
      console.error(error);
    }
  };

  getProductPage = async (page, limit, category, status, sort) => {
    try {
      let products

      const query = {};
      if (category) {
        query.category = category;
      }
  
      if (status) {
        query.status = status;
      }

      const option = {}

      if(sort){
        const sortBy= "price"
        option.limit = limit
        option.page = page
        option.sort =  { [sortBy]: sort }
      }
      else{
        option.limit = limit
        option.page = page
      }

      products = await productModel.paginate(query, option);
         
 
      
  
      return products;
    } catch (error) {
      console.error(error);
    }
  };

  


  addProduct = async (
    title,
    description,
    code,
    price,
    thumbnail,
    status,
    stock,
    category,
    owner
  ) => {
    try {
      const productos = await productModel.find();
      const findCode = productos.find((v) => v.code === code);
      if (!findCode && (owner || owner == 'admin')) {
        const newProduct = new productModel({
          title,
          description,
          code,
          price,
          thumbnail,
          status,
          stock,
          category,
          owner
        });

  


        await newProduct.save();
        socket.io.emit("add-product", newProduct);
      } else {
        req.logger.error("No se puede repetir el codigo:", code);
      }
    } catch (error) {
      console.error(error);
    }
  };

  getProductById = async (codeId) => {
    try {
        const objectId = new mongoose.Types.ObjectId(codeId);
      const product = await productModel.findById(objectId);

      if (product) {
        return product;
      } else {
        throw new Error(`Producto ${codeId} no encontrado`);
      }
    } catch (error) {
      console.error(error);
    }
  };



  getProductsByCategoryAndStatus = async (category, status) => {
    try {
      const products = await productModel.find({ category: category });
  
      if (products.length > 0) {
        return products;
      } else {
        throw new Error(`No se encontraron productos para la categoría "${category}" y disponibilidad "${status}"`);
      }
    } catch (error) {
      console.error(error);
    }
  }

   updateProductById = async (codeId, title, description, code, price, thumbnail, status, stock, category) => {
    try {
      const objectId = new mongoose.Types.ObjectId(codeId);
      const product = await productModel.findById(objectId);
      if (!product) {
        throw new Error(`El producto con id ${codeId} no se encontró`);
      }
 


      // valores que se desean cambiar
      product.title = title === undefined ? product.title: title;
      product.description = description === undefined ? product.description : description;
      product.code = code === undefined ?  product.code : code;
      product.price = price === undefined ?  product.price: price;
      product.thumbnail = thumbnail === undefined ? product.thumbnail: thumbnail ;
      product.status = status === undefined ?  product.status: status;
      product.stock = stock === undefined ? product.stock: stock;
      product.category = category === undefined ? product.category: category;

      // actualiza el producto
      const updatedProduct = await product.save();
      return updatedProduct;
    } catch (error) {
      console.error(error);
    }
  };


  deleteProductId = async (codeId) => {

    const objectId = new mongoose.Types.ObjectId(codeId);
    const deletedProduct = await productModel.findById(objectId);
    
    if (!deletedProduct) {
      throw new Error(`El producto ${codeId} no existe, no se puede borrar.`);
    }
    else{
       await productModel.findByIdAndDelete(objectId);
       socket.io.emit("remove-product", objectId)
    }
    
    return deletedProduct;
  };

  async updateStock(productId, newStock) {
    try {
      const updatedProduct = await productModel.findOneAndUpdate(
        { _id: productId },
        { $set: { stock: newStock } },
        { new: true }
      );
        
      if (!updatedProduct) {
        throw new Error("Product not found");
      }
      return updatedProduct
    } catch (error) {
      console.error(error);
    }
  }

}
export  const productMongo = new Producs()