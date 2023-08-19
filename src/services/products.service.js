import { productsRepository } from "../dao/repositories/products.repository.js";
import { mailService } from "./mail.service.js";
class ProductService {
  async getAllProducts(limit, page, category, status, sort) {
    try {
      const products = await productsRepository.getAllProducts(
        limit,
        page,
        category,
        status,
        sort
      );
      return products;
    } catch (error) {
      throw new Error("There are no products registered");
    }
  }

  async getProductById(id) {
    try {
      const product = await productsRepository.getProductById(id);
      if (product) {
        return product;
      } else {
        throw new Error(`Not found this product ID: ${id}`);
      }
    } catch (error) {
      throw new Error(`Not found this product ID: ${id}`);
    }
  }

  async createProduct(product, currentUser, currentRol) {
    
    try {
      if( currentRol == "PREMIUM"){
          product.owner = currentUser       
      }
      if(currentRol == "ADMIN"){
        product.owner = "ADMIN"   
      }
      const createdProduct = await productsRepository.createProduct(product);
      return createdProduct;
    } catch (error) {
      throw new Error("Error creating product");
    }
  }

  async updateProduct(id, product) {
    try {
      const updatedProduct = await productsRepository.updateProduct(
        id,
        product
      );
      return updatedProduct;
    } catch (error) {
      throw new Error("Incomplete values");
    }
  }

  async deleteProduct(id, currentUser, currentRol) {
    try {
      const deletedProduct = await productsRepository.deleteProduct(id,currentUser, currentRol);
      if(deletedProduct && currentRol == "PREMIUM" && currentUser == deletedProduct.payload.owner ){
        await mailService.createTransportEmail(currentUser, `Producto ${deletedProduct.payload.title} Borrado `,`<div> <h1>te notificamos que haz borrado exitosamente tu producto creado</h1></div>`)
        return deletedProduct;
      }
      if(deletedProduct && currentRol == "ADMIN"){
        return deletedProduct;
      }


    
    } catch (error) {
      throw new Error("Product does not exist");
    }
  }


  async getAvailableStock(productId) {

    try {
      const product = await productsRepository.getProductById(productId);
      if (product) {
        return product.payload.stock;
      } else {
        throw new Error(`Product with ID ${productId} not found`);
      }
    } catch (error) {
      throw new Error(`Error retrieving available stock for product with ID ${productId}: ${error.message}`);
    }
  }

  async updateStock(productId, newStock) {
    try {
      const updatedProduct = await productsRepository.updateStock(productId, newStock);
      if (!updatedProduct) {
        throw new Error("Product not found");
      }

      return updatedProduct;
    } catch (error) {
      throw new Error(`Error updating product stock: ${error.message}`);
    }
  }

}



export const productService = new ProductService();
