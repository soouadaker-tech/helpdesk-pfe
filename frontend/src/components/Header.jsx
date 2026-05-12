import React, { useEffect, useState } from "react";
import { FaUserCircle, FaBell } from "react-icons/fa";
import Breadcrumb from "./Breadcrumb";

export default function Header({ user }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user) {
      // Exemple: récupérer depuis API
      fetch(`/api/notifications?user_id=${user.id}&role=${user.role}`)
        .then(res => res.json())
        .then(setNotifications)
        .catch(err => console.error(err));
    }
  }, [user]);

  const unreadCount = notifications.filter(n => n.status === "non_lu").length;

  return (
    <header className="flex items-center justify-between bg-blue-800 text-white px-6 py-3 shadow">
      {/* Logo ou titre */}
      <Breadcrumb />

      {/* Section droite : notifications + profil */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <div className="relative cursor-pointer">
          <FaBell className="text-2xl text-yellow-300" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
              {unreadCount}
            </span>
          )}
        </div>

        {/* Profil */}
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-3xl text-cyan-300" />
          <div>
            <p className="text-sm font-semibold">{user?.name || "Invité"}</p>
            <p className="text-xs text-gray-300">{user?.role || "Utilisateur"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
