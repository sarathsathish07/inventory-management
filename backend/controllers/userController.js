import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Item from "../models/itemsScema.js";
import Bill from "../models/billsSchema.js";

const userCredentials = {
  email: "sarath@gmail.com",
  password: "12345",
};
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (
    email === userCredentials.email &&
    password === userCredentials.password
  ) {
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    res.status(201).json({
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

const getProducts = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const createBill = async (req, res) => {
  const { user, items, totalPrice } = req.body;
  console.log(req.body);

  try {
    const newBill = await Bill.create({
      user,
      items,
      totalPrice,
    });

    res.status(201).json(newBill);
  } catch (error) {
    console.error("Error creating bill:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
};

const updateItemQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.availableStock = quantity;

    await item.save();

    return res.status(200).json({
      message: "Item quantity updated successfully",
      item,
    });
  } catch (error) {
    console.error("Error updating item quantity:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const logoutUser = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ message: "User logged out" });
});

export { loginUser, logoutUser, getProducts, createBill, updateItemQuantity };
