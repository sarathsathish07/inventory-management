import asyncHandler from "express-async-handler";
import Item from "../models/itemsScema.js";
import Bill from "../models/billsSchema.js";

const credentials = {
  email: "admin@gmail.com",
  password: "12345",
};

const authAdmin = asyncHandler(async (req, res) => {
  if (
    req.body.email == credentials.email &&
    req.body.password == credentials.password
  ) {
    res.status(201).json({
      email: credentials.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});
const addItem = async (req, res) => {
  const { name, description, availableStock, price, category, supplier } =
    req.body;

  try {
    const newItem = new Item({
      name,
      description,
      availableStock,
      price,
      category,
      supplier,
    });

    const savedItem = await newItem.save();

    res.status(201).json(savedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add item to inventory" });
  }
};

const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Failed to fetch items" });
  }
};
const getBills = async (req, res) => {
  try {
    const bills = await Bill.find().select("user createdAt totalPrice");

    res.status(200).json(bills);
  } catch (error) {
    console.error("Error fetching bills:", error);
    res.status(500).json({ message: "Failed to fetch bills" });
  }
};

const getBillById = async (req, res) => {
  const { id } = req.params;

  try {
    const bill = await Bill.findById(id)
      .populate("items.itemId", "name price")
      .exec();

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.status(200).json(bill);
  } catch (error) {
    console.error("Error fetching bill details:", error);
    res.status(500).json({ message: "Failed to fetch bill details" });
  }
};

const logoutAdmin = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Admin logged out" });
});

export { authAdmin, logoutAdmin, addItem, getItems, getBillById, getBills };
