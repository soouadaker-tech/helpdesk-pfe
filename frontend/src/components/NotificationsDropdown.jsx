import React, { useState, useEffect } from "react";
import { getNotifications } from "../services/api";

function NotificationsDropdown() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Try to get userId from token or state
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUserId(decoded.id);
      } catch (e) {
        console.log("Could not decode token");
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      loadNotifications();
      const interval = setInterval(loadNotifications, 30000); // Refresh every 30s
      return () => clearInterval(interval);
    }
  }, [userId]);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications(userId);
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading notifications:", err);
    }
  };

  const unreadCount = notifications.filter(n => n.status === "non_lu").length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:bg-gray-100 rounded"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-4 z-50">
          <h3 className="font-bold mb-2">Notifications</h3>
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-sm">Aucune notification</p>
          ) : (
            <ul className="space-y-2 max-h-96 overflow-y-auto">
              {notifications.map((n) => (
                <li key={n.id} className="text-sm p-2 bg-gray-50 rounded border-l-4 border-blue-500">
                  <p className="font-semibold">{n.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{n.status === "non_lu" ? "Non lu" : "Lu"}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationsDropdown;
