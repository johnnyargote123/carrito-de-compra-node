import { cartsRepository } from "../dao/repositories/cart.repository.js";
import {productsRepository} from "../dao/repositories/products.repository.js"

class CartService {
  async getAllCarts() {
    try {
      const carts = await cartsRepository.getAllCarts();

      if (carts.length === 0) {
        throw new Error("There are no carts registered");
      }

      return carts;
    } catch (error) {
      throw new Error("Internal server error");
    }
  }

  async getCartById(id) {
    try {
      const cart = await cartsRepository.getCartById(id);

      if (cart && cart.id !== -1) {
        return cart;
      }

      throw new Error(`Cart not found: ${id}`);
    } catch (error) {
      throw new Error("Internal server error");
    }
  }

  async createCart() {
    try {
      const cart = await cartsRepository.createCart();
      return cart;
    } catch (error) {
      throw new Error("Can not create Cart");
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await cartsRepository.getCartById(cartId);
      const product = await productsRepository.getProductById(productId);
      if (!cart || !product) {
        throw new Error(`Cart (${cartId}) or product (${productId}) not found`);
      }

      const updatedCart = await cartsRepository.addProductToCart(
        cartId,
        productId,
        quantity
      );
      return updatedCart;
    } catch (error) {
      throw new Error(`Can not add product to cart ${cartId}`);
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const result = await cartsRepository.removeProductFromCart(cartId, productId);

      if (result === null) {
        throw new Error(`An error occurred while removing the product (${productId}) from the cart (${cartId})`);
      }

      return result;
    } catch (error) {
      throw new Error(`Could not remove product (${productId}) from cart (${cartId})`);
    }
  }

  async deleteCartById(cartId) {
    try {
      const result = await cartsRepository.deleteCartById(cartId);

      if (!result) {
        throw new Error(`Cart not found (${cartId})`);
      }

      return result;
    } catch (error) {
      throw new Error(`An error occurred while deleting the cart (${cartId})`);
    }
  }

  async updateCart(cartId, products) {
    try {
      const updatedCart = await cartsRepository.updateCart(cartId, products);

      if (!updatedCart) {
        throw new Error(`Cart not found (${cartId})`);
      }

      return updatedCart;
    } catch (error) {
      throw new Error("There was an error updating the cart");
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const updatedProduct = await cartsRepository.updateProductQuantity(
        cartId,
        productId,
        quantity
      );
      if (!updatedProduct) {
        throw new Error(`Could not update product (${productId}) from cart (${cartId})`);
      }

      return updatedProduct;
    } catch (error) {
      throw new Error("An error occurred while updating the product quantity");
    }
  }

  


  
}

export const cartService = new CartService();