import React, { useEffect, useState } from "react";
import { FaUserCircle, FaBell } from "react-icons/fa";
import Breadcrumb from "./Breadcrumb";
import { getNotifications } from "../services/api";

export default function Header({ user }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setCurrentUser({
          id: decoded.id,
          name: decoded.name || user?.name || "Utilisateur",
          role: decoded.role || user?.role || "Utilisateur",
        });
      } catch (e) {
        console.error("Impossible de décoder le token", e);
        setCurrentUser(user);
      }
    } else {
      setCurrentUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (currentUser?.id) {
      const loadNotifications = () => {
        getNotifications(currentUser.id)
          .then(data => setNotifications(Array.isArray(data) ? data : []))
          .catch(err => console.error("Erreur notifications:", err));
      };

      loadNotifications();
      const interval = setInterval(loadNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [currentUser?.id]);

  const unreadCount = notifications.filter(n => n.status === "non_lu").length;

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, status: "lu" } : n)
    );
    // Ici tu peux aussi appeler une API backend pour mettre à jour en DB
  };

  return (
    <header className="flex items-center justify-between bg-blue-800 text-white px-6 py-3 shadow">
      <Breadcrumb />

      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <div className="relative cursor-pointer">
          <FaBell
            className="text-2xl text-yellow-300"
            onClick={() => setOpen(!open)}
          />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
              {unreadCount}
            </span>
          )}

          {/* Menu déroulant */}
          {open && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded">
              {notifications.length === 0 ? (
                <p className="p-2 text-sm text-gray-500">Aucune notification</p>
              ) : (
                notifications.map(n => (
                  <div
                    key={n.id}
                    className={`p-2 border-b cursor-pointer ${n.status === "non_lu" ? "bg-gray-100" : ""}`}
                    onClick={() => markAsRead(n.id)}
                  >
                    <p className="text-sm">{n.message}</p>
                    <span className="text-xs text-gray-500">{n.created_at}</span>
                  </div>
                ))
              )}
            </div>
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
