import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    ipAddress: { type: String, required: true, unique: true },
    name: { type: String },
    email: { type: String },
    password: { type: String },
    isAdmin: { type: Boolean, default: false },
    chances: { type: Number, default: 5 },
  },
  { timestamps: true }
);

const CustomerModel =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default CustomerModel;
