import express from "express";
const router = express.Router();
import {
  authAdmin,
  logoutAdmin,
  addItem,
  getItems,
  getBills,
  getBillById,
} from "../controllers/adminController.js";

router.post("/auth", authAdmin);
router.post("/logout", logoutAdmin);
router.post("/add-item", addItem);
router.get("/items", getItems);
router.get("/get-bills", getBills);
router.get("/get-bills/:id", getBillById);

export default router;
