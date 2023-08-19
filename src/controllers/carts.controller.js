import { cartService } from "../services/carts.service.js";
import {productService} from "../services/products.service.js";
import {ticketService} from "../services/ticket.service.js";
import{mailService} from "../services/mail.service.js"
export const getAllCarts = async (req, res) => {
  try {
    const carts = await cartService.getAllCarts();
    res.json(carts );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCartById = async (req, res) => {
  const id  = req.params.id
  try {
    const cart = await cartService.getCartById(id);
    res.json(cart);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createCart = async (req, res) => {
  try {
    const cart = await cartService.createCart();
    console.log(cart)
    res.status(200).json({status:"success",  payload: cart});
  } catch (error) {
    res.status(500).json({ error: "Can not create Cart" });
  }
};

export const addProductToCart = async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = Number(req.body.quantity);
  try {
    const updatedCart = await cartService.addProductToCart(cartId, productId, quantity);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: `Can not add product to cart ${cartId}` });
  }
};

export const removeProductFromCart = async (req, res) => {
  const { cartId, productId } = req.params;
  try {
    const result = await cartService.removeProductFromCart(cartId, productId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Could not remove product (${productId}) from cart (${cartId})` });
  }
};

export const deleteCartById = async (req, res) => {
  const cartId = req.params.cid;
  try {
    const result = await cartService.deleteCartById(cartId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `An error occurred while deleting the cart (${cartId})` });
  }
};

export const updateCart = async (req, res) => {
  const cartId = req.params.cid;
  const products = req.body.products;
  try {
    const updatedCart = await cartService.updateCart(cartId, products);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "There was an error updating the cart" });
  }
};

export const updateProductQuantity = async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity;
  try {
    const updatedProduct = await cartService.updateProductQuantity(cartId, productId, quantity);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the product quantity" });
  }

  
};

export const purchaseCart = async (req, res) => {
  const cartId = req.params.cid;

    const cart = await cartService.getCartById(cartId);
    const productsToPurchase = [];

  
  for (const cartProduct of cart.products) {
    const { product, quantity } = cartProduct;
    const availableStock = await productService.getAvailableStock(product._id);
    if (availableStock >= quantity) {
      const upStock = await productService.updateStock(product._id, availableStock - quantity);
    } else {
      productsToPurchase.push(product._id);
    }
  }



    const ticket = await ticketService.generateTicket(cartId, req.session.user.email);
    await mailService.createTransportEmail(req.session.user.email,"Compra Aprobada",`<div><h1>Gracias por comprar en carrito Express</h1></div>`)
    if (productsToPurchase.length > 0) {
      const failedProducts = cart.products.filter((cartProduct) => productsToPurchase.includes(cartProduct.product._id));
      cart.products = failedProducts;
      await cart.save();

    } else {
      cart.products = [];
      await cart.save();
    }

    res.json({ ticket, failedProducts: productsToPurchase });

};