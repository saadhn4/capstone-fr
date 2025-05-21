import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; 
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out 👋");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-700">
        EatSure 🍽️
      </Link>

      {/* Hamburger button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <HiX className="text-3xl text-blue-700" />
          ) : (
            <HiMenu className="text-3xl text-blue-700" />
          )}
        </button>
      </div>

      {/* Menu */}
      <div className="hidden md:flex gap-4 items-center">
        {token ? (
          <>
            <Link
              to="/reviews"
              className="text-blue-600 font-medium hover:underline"
            >
              All Reviews
            </Link>
            <Link
              to="/create"
              className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 transition"
            >
              Post Review
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-20 right-6 w-52 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-4 md:hidden z-50">
          {token ? (
            <>
              <Link to="/reviews" onClick={() => setIsOpen(false)}>
                All Reviews
              </Link>
              <Link to="/create" onClick={() => setIsOpen(false)}>
                Post Review
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="text-red-500 text-left"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
