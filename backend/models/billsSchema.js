import mongoose from "mongoose";

const BillSchema = new mongoose.Schema({
  user: String,
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      },
      name: String,
      description: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Bill = mongoose.model("Bill", BillSchema);
export default Bill;
