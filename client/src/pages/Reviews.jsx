import React from "react";
import useFetch from "../useFetch";
import ReviewList from "../ReviewList";
import { motion } from "framer-motion"; 

const Reviews = () => {
  const { data: reviews, isLoading } = useFetch(
    "/api/posts/getall"
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isLoading && <div>Loading...</div>}
      {reviews && <ReviewList reviews={reviews} title="All Reviews" />}
    </motion.div>
  );
};

export default Reviews;
