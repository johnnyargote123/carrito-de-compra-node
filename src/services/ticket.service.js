
import { cartsRepository } from "../dao/repositories/cart.repository.js";

import {ticketRepository} from "../dao/repositories/ticket.repository.js";

class TicketService {


  async generateTicket(cartId, userId) {
    try {
      const ticketData = {
        code: this.generateTicketCode(),
        purchase_datetime: new Date(),
        amount: await this.calculateTotalAmount(cartId),
        purchaser: userId,
      };
  
      const ticket = await ticketRepository.createTicket(ticketData);
  
      if (!ticket) {
        throw new Error("Ticket creation failed");
      }
  
      return ticket;
    } catch (error) {
      throw new Error(`Error generating ticket: ${error.message}`);
    }
  }
  

  generateTicketCode() {
    // Generate a unique code for the ticket
    const timestamp = new Date().getTime().toString();
    const randomDigits = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    return `TICKET-${timestamp}-${randomDigits}`;
  }

  async calculateTotalAmount(cartId) {
    // Calculate the total amount of the cart by summing the prices of the products
    const cart = await cartsRepository.getCartById(cartId);
    let totalAmount = 0;

    for (const product of cart.products) {
      totalAmount += product.product.price * product.quantity;
    }
    return totalAmount;
  }
}

export const ticketService = new TicketService();