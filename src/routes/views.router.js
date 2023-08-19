import express from "express";
import {
  getChat,
  getRegister,
  getLogin,
  getCartPersonal,
  getHome,
  getRealTimeProducts,
  getProduct,
  getCurrentUser,
  getForgot,
  getResetPassword,
  editUser
} from "../controllers/views.controller.js";
import { checkLogged, checkLogin } from "../middlewares/auth.js";
import { authorizeUser } from "../middlewares/auth.js";
const router = express.Router();

router.get("/chat",checkLogin,authorizeUser(["USER"]), getChat);

router.get("/register", checkLogged, getRegister);

router.get("/login", checkLogged, getLogin);

router.get("/forgot-pass", checkLogged, getForgot);

router.get("/reset-password/:token", getResetPassword);

router.get("/cart-personal", checkLogin, getCartPersonal);

router.get("/", checkLogin, getHome);

router.get("/current", checkLogin ,getCurrentUser )

router.get("/realtimeproducts", getRealTimeProducts);

router.get("/product/:id", checkLogin, getProduct);

router.get("/control-user", checkLogin, authorizeUser(["ADMIN"]), editUser)



export default router;