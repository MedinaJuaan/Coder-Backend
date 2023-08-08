import { TicketModel } from "./mongoose/tickets.mongoose.js";
import shortid from "shortid";
import { cartsService } from "../services/carts.service.js";


function generateUniqueCode() {
    return shortid.generate();
  }
try {
  const ticket = new TicketModel({
    code: generateUniqueCode(),
    amount: total, 
    purchaser: email,
  });

  const savedTicket = await ticket.save();

  const cart = await cartsService.getCartByUserId(userId);
  
  if (cart) {
    cart.tickets.push(savedTicket._id);
    await cart.save();
  } else {
  }
} catch (error) {
}