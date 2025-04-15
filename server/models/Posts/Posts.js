import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("restaurants", postSchema, "restaurants");
export default postModel;
