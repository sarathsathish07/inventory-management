import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", UserSchema);

export default User;
