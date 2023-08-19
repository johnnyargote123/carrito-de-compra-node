import { Router } from "express";
import { authorizeUser } from "../middlewares/auth.js";
import {
  getAllCarts,
  getCartById,
  createCart,
  addProductToCart,
  removeProductFromCart,
  deleteCartById,
  updateCart,
  updateProductQuantity,
  purchaseCart
} from "../controllers/carts.controller.js";

const router = Router();

router.get("/", getAllCarts);

router.get("/:id", getCartById);

router.post("/", authorizeUser(["USER"]), createCart);

router.post("/:cid/product/:pid", authorizeUser(["USER", "PREMIUM"]), addProductToCart);


router.post('/:cid/purchase',authorizeUser(["USER"]), purchaseCart);

router.delete("/:cid/products/:pid", removeProductFromCart);

router.delete("/:cid",  deleteCartById);

router.put("/:cid", updateCart);

router.put("/:cid/products/:pid",  updateProductQuantity);


export default router;