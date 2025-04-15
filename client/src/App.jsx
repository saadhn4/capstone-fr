import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./pages/Home";
import Signin from "./pages/public/SignIn";
import Signup from "./pages/public/SignUp";

// Protected Pages (these are directly in /src)
import Reviews from "./pages/Reviews";
import ReviewDetails from "./ReviewDetails";
import Create from "./Create";

// Auth Wrapper
import PrivateOutlet from "./PrivateOutlet";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<PrivateOutlet />}>
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/reviews/:id" element={<ReviewDetails />} />
          <Route path="/create" element={<Create />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
