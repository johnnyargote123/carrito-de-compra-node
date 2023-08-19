import userModel from "../../dao/mongo/models/user.model.js";
import { cartModel } from "../mongo/models/cart.model.js";
import momentTimezone from "moment-timezone"
class Session {
  async findOneByEmail(email) {
    try {
      return await userModel.findOne({ email });
    } catch (error) {
      req.logger.error(error);
      throw new Error("Internal server error");
    }
  }

  async getAllUsers() {
    try {
      const users = await userModel.find()
      return users;
    } catch (error) {
      req.logger.error(error);
      throw new Error("Internal server error");
    }
  }


  async updateUserByEmail(email, update) {
    try {
      return await userModel.updateOne({ email }, update);
    } catch (error) {
      req.logger.error(error);
      throw new Error("Internal server error");
    }
  }

  async deleteUserByName(email) {
    try {
      const result = await userModel.deleteOne({ email });
      console.log(result, "mongo");
      if (result.deletedCount === 1) {
        return "Usuario eliminado correctamente.";
      } else {
        return "El usuario no fue encontrado.";
      }
    } catch (error) {
      req.logger.error(error);
      throw new Error("Error al eliminar el usuario");
    }
  }

  async deleteInactiveUsers() {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const currentDateTime = momentTimezone().tz(timeZone);
      const twentyMinutesAgo = currentDateTime.clone().subtract(30, "minutes")
  
      const usersToDelete = await userModel.find({
        last_connection: {
          $lt: twentyMinutesAgo.format("YYYY-MM-DD HH:mm:ss Z"),
        },
      }).select("email");
  
      const deletedUsers = await userModel.deleteMany({
        last_connection: {
          $lt: twentyMinutesAgo.format("YYYY-MM-DD HH:mm:ss Z"),
        },
      });
  
      return {
        deletedCount: deletedUsers.deletedCount || 0,
        deletedEmails: usersToDelete.map(user => user.email),
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar usuarios inactivos");
    }
  }

  async createUser(user) {
    try {
      const newCart = await cartModel.create({});
      user.cart = newCart._id;
      
      const createdUser = await userModel.create(user);
      
      return createdUser;
    } catch (error) {
      req.logger.error(error);
      throw new Error("Internal server error");
    }
  }

  async addCartToUser(userId) {
    try {
      const user = await userModel.findById(userId);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      const newCart = new cartModel({});
      await newCart.save();
      user.cart = newCart._id;
      await user.save();
    } catch (error) {}
  }
}

export const sessionMongo = new Session();
