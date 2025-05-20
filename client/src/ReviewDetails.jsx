import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import axios from "axios";
import Navbar from "./components/Navbar";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const ReviewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: review, isLoading } = useFetch(`/api/posts/get/${id}`);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`/api/posts/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Review deleted successfully 🗑️");
      navigate("/reviews");
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      toast.error("Unauthorized ❌ — You must be signed in to delete this review.");
    }
  };

  return (
    <>
      <Navbar />
      <motion.div
        className="min-h-screen bg-blue-50 px-4 py-10 flex justify-center items-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {isLoading ? (
          <p className="text-lg text-gray-600">Loading...</p>
        ) : review ? (
          <motion.div
            className="max-w-2xl bg-white shadow-lg rounded-xl overflow-hidden w-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src={review.imageUrl}
              alt="restaurant"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-3xl font-bold text-blue-700 mb-2">
                {review.restaurantName}
              </h2>
              <p className="text-gray-700 text-lg mb-4">{review.review}</p>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete Review
              </button>
            </div>
          </motion.div>
        ) : (
          <p className="text-center text-red-500">Review not found ❌</p>
        )}
      </motion.div>
    </>
  );
};

export default ReviewDetails;
