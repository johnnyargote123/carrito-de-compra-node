
import MessageManagerDB from "../../dao/mongo/message.mongo.js";
import { productDAO, cartsDAO } from "../factory.js";



class ViewsRepository {
  constructor() {
    this.messageManagerDB = new MessageManagerDB();
  }

  async getMessages() {
    return await this.messageManagerDB.getMessages();
  }

  async getCarts() {
    return await cartsDAO.getCarts();
  }

  async getCartById(cardId) {
    return await cartsDAO.getCartById(cardId)
  }

  async getProductPage(page, limit, category, status, sort) {
    return await productDAO.getProductPage(
      page,
      limit,
      category,
      status,
      sort
    );
  }

  async getProduct() {
    return await productDAO.getProduct();
  }

  async getProductById(productId) {
    return await productDAO.getProductById(productId);
  }
}

export const viewsRepository = new ViewsRepository;