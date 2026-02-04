import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "10px 20px",
        background: "linear-gradient(135deg, #f5576c 0%, #f093fb 100%)",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "600",
        boxShadow: "0 4px 15px rgba(245, 87, 108, 0.4)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px) scale(1.05)";
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(245, 87, 108, 0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 15px rgba(245, 87, 108, 0.4)";
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
