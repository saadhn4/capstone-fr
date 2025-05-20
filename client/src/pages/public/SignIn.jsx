import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/reviews");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/api/public/login",
        formData
      );
      const token = res.data.token;
      localStorage.setItem("token", token);
      toast.success("Login Successful! ✅");
      navigate("/reviews");
    } catch (err) {
      const msg = err.response?.data?.msg;

      if (msg === "Email not verified.") {
        toast.error("Please verify your email before logging in! 📧");
      } else if (msg === "Invalid credentials.") {
        toast.error("Incorrect email or password ❌");
      } else {
        toast.error("Something went wrong. Try again later.");
      }

      toast.error("Signin Error ❌", msg || err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
        <div className="max-w-md w-full p-8 bg-white shadow-xl rounded-2xl">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
            Sign In
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {["email", "password"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                  {field}
                </label>
                <input
                  type={field === "password" ? "password" : "email"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md text-lg hover:bg-blue-700 transition duration-200"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
