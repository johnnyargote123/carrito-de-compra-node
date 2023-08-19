import { Router } from "express";
import {updateUserRole, updateUserDocumentStatus,addCartToUser,  getAllUsers, cleanupInactiveUsers } from "../controllers/users.controller.js"
import { uploader } from "../utils.js";
const router = Router();

router.patch('/premium/:uid', updateUserRole);

router.patch('/user/:uid', updateUserRole);

router.post('/:uid/documents', uploader.fields([
  { name: 'document', maxCount: 5 },
  { name: 'profile', maxCount: 1 }
]), updateUserDocumentStatus )


router.post("/:userId/add-cart", addCartToUser );


router.get("", getAllUsers)

router.delete("", cleanupInactiveUsers)


  export default router;