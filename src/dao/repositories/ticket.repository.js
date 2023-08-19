import {ticketMongo}  from "../mongo/tickets.mongo.js";

class TicketRepository {


  async createTicket(ticketData) {
    console.log(ticketData, 'userid')
    try {
      const ticket = await ticketMongo.createTicket(ticketData);
      console.log(ticket, 'datatkt')
      return ticket;
    } catch (error) {
      throw new Error("No se pudo crear el ticket");
    }
  }

  async getTicketByCode(ticketCode) {
    try {
      const ticket = await ticketMongo.getTicketByCode(ticketCode);
      return ticket;
    } catch (error) {
      throw new Error("No se pudo obtener el ticket");
    }
  }
}

export const ticketRepository = new TicketRepository();