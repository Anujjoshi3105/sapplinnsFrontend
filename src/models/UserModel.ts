import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  userIp: string;
  checkIp?: string;
  name?: string;
  email?: string;
  password?: string;
  isAdmin: boolean;
  chances: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    userIp: { type: String, required: true, unique: true },
    checkIp: { type: String },
    name: { type: String, trim: true },
    email: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      minlength: 6,
    },
    isAdmin: { type: Boolean, default: false },
    chances: {
      type: Number,
      default: 2,
      min: 0,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default UserModel;
