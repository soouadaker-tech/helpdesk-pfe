import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("✅ Déconnexion réussie !");
    navigate("/login");
  };

  return (
    <div className="w-full bg-blue-900 text-white flex items-center justify-between px-6 py-3 shadow">
      <h1 className="text-xl font-bold">Helpdesk - Gestion des Tickets</h1>

      <button
        onClick={handleLogout}
        className="flex items-center bg-red-600 px-3 py-2 rounded hover:bg-red-700"
      >
        <FaSignOutAlt className="mr-2" /> Déconnexion
      </button>
    </div>
  );
}
