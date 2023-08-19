import config from "../config/config.js";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import moment from "moment"; 
const { service, port, user, password } = config;
class MailService {
  constructor() {
    this.passwordResetRequests = new Map()
  }
  async createTransportEmail(currentUser, subject, html) {
    try {
      const transporter = nodemailer.createTransport({
        service: service,
        port: port,
        auth: {
          user: user,
          pass: password,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      await transporter.sendMail({
        from: process.env.USER,
        to: currentUser,
        subject: subject,
        html: html,
      });
    } catch (error) {
      console.log(error)
    }
  }

  async sendPasswordResetEmail(email) {
    try {
      const token = uuidv4()
      const resetLink = `http://localhost:8080/reset-password/${token}`
      const expirationTime = moment().add(1, "hour")

      this.passwordResetRequests.set(token, {
        email,
        expirationTime,
      });
      const transporter = nodemailer.createTransport({
        service: service,
        port: port,
        auth: {
          user: user,
          pass: password,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      await transporter.sendMail({
        from: user,
        to: email,
        subject: "Restablecimiento de contraseña",
        html: `Haz clic en el siguiente enlace para restablecer tu contraseña: <a href="${resetLink}">${resetLink}</a>`,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error al enviar el correo de recuperación de contraseña.")
    }
  }

  isValidToken(token) {
    const request = this.passwordResetRequests.get(token)
    console.log(request)
    return request && moment().isBefore(request.expirationTime)
  }

  deleteToken(token) {
    this.passwordResetRequests.delete(token)
  }
}
export const mailService = new MailService();
