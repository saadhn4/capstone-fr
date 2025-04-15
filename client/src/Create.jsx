import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { motion } from "framer-motion";

const Create = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [review, setReview] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = {
      restaurantName,
      imageUrl,
      review,
    };
    try {
      const token = localStorage.getItem("token");

      await axios.post("/api/posts/create", post, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Review posted successfully! ✅");
      navigate("/reviews");
    } catch (error) {
      console.error("Post error:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <Navbar />
      <motion.div
        className="min-h-screen flex justify-center items-center bg-blue-50 px-4 py-16"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
            Add a Restaurant Review 🍽️
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Restaurant Name:
              </label>
              <input
                type="text"
                required
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL:
              </label>
              <input
                type="text"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Review:
              </label>
              <textarea
                required
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full border px-4 py-2 rounded-md h-32 resize-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md text-lg hover:bg-blue-700 transition"
            >
              Post Review
            </button>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Create;
