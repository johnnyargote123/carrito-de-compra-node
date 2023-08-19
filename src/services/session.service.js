import { sessionRepository } from "../dao/repositories/session.repository.js";
import UserDTO from "../dao/dtos/session.dto.js";
import { mailService } from "./mail.service.js";
class SessionService {
  async loginUser(email, password, rol) {
    try {
      const user = await sessionRepository.loginUser(email, password, rol);
      return user;
    } catch (error) {
      throw new Error("There are no products registered");
    }
  }

  async deleteUserByName(email) {
    try {
      const result = await sessionRepository.deleteUserByName(email);
      return result
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error");
    }
  }


  async forgotPasswordUser(email) {
    try {
      const userForgot = await sessionRepository.forgotPasswordUser(email)
      return userForgot
    } catch (error) {
      throw new Error("Email not registered");
    }
  }

  async  logoutUser(data) {
    try {
      await sessionRepository.logoutUser(data);
    } catch (error) {
      req.logger.error(error);
      throw new Error("An error occurred while logging out.");
    }
  }

  async registerUser(first_name, last_name, email, age, password, rol) {
    try {
      const result = await sessionRepository.registerUser(
        first_name,
        last_name,
        email,
        age,
        password,
        rol
      );
      return result;
    } catch (error) {
      throw new Error("Internal server error");
    }
  }

async resetPassUser (email,password,token){
  try {
    const result = await sessionRepository.resetPassUser(
      email,
      password,
      token
    );
    mailService.deleteToken(token)
    return result;
  } catch (error) {
    throw new Error("Internal server error");
  }
}

  githubAuth() {
  }

  githubCallback(req) {
    return sessionRepository.githubCallback(req);
  }

  


}

export const sessionService = new SessionService();