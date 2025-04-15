import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userVerify: {
      email: {
        type: Boolean,
        default: false,
      },
    },
    userVerifyToken: {
      email: { type: String },
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema, "users");
export default userModel;
