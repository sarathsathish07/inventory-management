import express from "express";
import {
  loginUser,
  logoutUser,
  getProducts,
  createBill,
  updateItemQuantity,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/auth", loginUser);
router.post("/logout", logoutUser);
router.get("/products", getProducts);
router.post("/bills", createBill);
router.patch("/items/:id", updateItemQuantity);

export default router;
