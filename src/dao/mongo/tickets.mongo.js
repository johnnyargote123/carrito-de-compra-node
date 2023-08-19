import  ticketModel  from "../mongo/models/ticket.model.js";


class Ticket {
  // Crear un nuevo ticket
  async createTicket(ticketData) {
    try {
      const ticket = await ticketModel.create(ticketData);
      return ticket;
    } catch (error) {
      throw new Error("No se pudo crear el ticket");
    }
  }

  // Obtener un ticket por su código
  async getTicketByCode(ticketCode) {
    try {
      const ticket = await ticketModel.findOne({ code: ticketCode });
      return ticket;
    } catch (error) {
      throw new Error("No se pudo obtener el ticket");
    }
  }
}

export const ticketMongo = new Ticket();