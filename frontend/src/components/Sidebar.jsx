import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaTicketAlt,
  FaPlusCircle,
  FaUsers,
  FaChartBar,
  FaUserShield,
  FaSignInAlt,
  FaUserPlus,
  FaUserCircle 
} from "react-icons/fa";
import ProfileSection from "./ProfileSection";

export default function Sidebar() {
  return (
    <div className="w-64 bg-blue-900 text-white min-h-screen flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-blue-700">
        Helpdesk
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link to="/" className="flex items-center p-2 rounded text-gray-200 hover:bg-blue-700 hover:text-white">
          <FaHome className="mr-2" /> Accueil
        </Link>
        <Link to="/dashboard" className="flex items-center p-2 rounded text-gray-200 hover:bg-blue-700 hover:text-white">
          <FaHome className="mr-2" /> Tableau de Bord
        </Link>
        <Link to="/tickets" className="flex items-center p-2 rounded text-gray-200 hover:bg-blue-700 hover:text-white">
          <FaTicketAlt className="mr-2" /> Tickets
        </Link>
        <Link to="/create-ticket" className="flex items-center p-2 rounded text-gray-200 hover:bg-blue-700 hover:text-white">
          <FaPlusCircle className="mr-2" /> Nouveau Ticket
        </Link>
        <Link to="/users" className="flex items-center p-2 rounded text-gray-200 hover:bg-blue-700 hover:text-white">
          <FaUsers className="mr-2" /> Utilisateurs
        </Link>
        <Link to="/reports" className="flex items-center p-2 rounded text-gray-200 hover:bg-blue-700 hover:text-white">
          <FaChartBar className="mr-2" /> Rapports
        </Link>
        <Link to="/admin" className="flex items-center p-2 rounded text-gray-200 hover:bg-blue-700 hover:text-white">
          <FaUserShield className="mr-2" /> Administration
        </Link>
        <Link to="/login" className="flex items-center p-2 rounded text-gray-200 hover:bg-blue-700 hover:text-white">
          <FaSignInAlt className="mr-2" /> Connexion
        </Link>
        <Link to="/register" className="flex items-center p-2 rounded text-gray-200 hover:bg-blue-700 hover:text-white">
          <FaUserPlus className="mr-2" /> Inscription
        </Link>
      </nav>
      <ProfileSection />
    </div>
  );
}
