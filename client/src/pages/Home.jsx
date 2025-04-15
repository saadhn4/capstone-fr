import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const Home = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      <Navbar />
      <div className="font-sans">
        {/* Hero Section */}
        <motion.section
          className="bg-blue-50 py-20 text-center px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800">
            Review Restaurants, <br />Promote food safety! 🍜
          </h2>
          <p className="text-lg mb-6 text-gray-700">
            Share your foodie adventures with the world
          </p>

          {token ? (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/create"
                className="bg-blue-600 font-bold text-white px-6 py-3 rounded text-lg hover:bg-blue-700 transition"
              >
                Start Posting 🍕
              </Link>
            </motion.div>
          ) : (
            <motion.div
              className="flex flex-col items-center gap-4"
              whileHover={{ scale: 1.03 }}
            >
              <Link
                to="/register"
                className="bg-green-600 font-bold text-white px-6 py-3 rounded text-lg hover:bg-green-700 transition"
              >
                Create an Account
              </Link>
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          )}
        </motion.section>

        {/* Sample Reviews */}
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <motion.h3
            className="text-2xl font-semibold mb-10 text-center text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Recent Reviews 📝
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Sea Shell",
                desc: "This Restaurant Fell off!",
                img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/aa/c6/fc/seashell-cafe.jpg",
              },
              {
                title: "Bait Al Shay",
                desc: "Best food in town. Lovely experience :)",
                img: "https://b.zmtcdn.com/data/pictures/3/20411913/1f6f4c211bdad8afd3e28c5ba3754510.jpg",
              },
              {
                title: "Green Palace Refreshments",
                desc: "Would not recommend this place at all. Huge drop in quality...",
                img: "https://b.zmtcdn.com/data/pictures/0/5702820/463400786af4e04bfb3b005362d045c3.jpg",
              },
            ].map((review, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition duration-300"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <img
                  src={review.img}
                  alt={review.title}
                  className="rounded-md mb-4 w-full h-40 object-cover"
                />
                <h4 className="font-bold text-xl mb-2 text-blue-700">
                  {review.title}
                </h4>
                <p className="text-gray-600 italic">“{review.desc}”</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
