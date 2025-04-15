// src/PrivateOutlet.jsx
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateOutlet = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    } else {
      setAuth(true);
    }
  }, [navigate]);

  return auth ? <Outlet /> : <div className="text-center mt-10 text-xl">Loading...</div>;
};

export default PrivateOutlet;