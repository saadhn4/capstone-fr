import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";

const ReviewList = ({ reviews, title }) => {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Link
              to={`/reviews/${review._id}`}
              key={review._id}
              className="bg-white shadow-md rounded-lg overflow-hidden transition hover:shadow-lg hover:scale-105 duration-300"
            >
              <img
                src={review.imageUrl}
                alt="restaurant"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {review.restaurantName}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReviewList;
