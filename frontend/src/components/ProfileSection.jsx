import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function ProfileSection() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Exemple: récupérer depuis localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="mt-auto p-4 border-t border-blue-700 flex items-center">
      <FaUserCircle className="text-3xl mr-2 text-cyan-300" />
      {user ? (
        <div>
          <p className="text-sm font-semibold">{user.name}</p>
          <p className="text-xs text-gray-300">{user.role}</p>
        </div>
      ) : (
        <p className="text-sm text-gray-300">Utilisateur invité</p>
      )}
    </div>
  );
}
