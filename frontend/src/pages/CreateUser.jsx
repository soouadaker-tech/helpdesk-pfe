import React, { useState } from "react";
import { createUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createUser(user);
    if (result.success) {
      alert("✅ Utilisateur ajouté avec succès !");
      navigate("/users");
    } else {
      setError(result.error || "Erreur lors de l'ajout de l'utilisateur.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Ajouter un utilisateur</h2>
      {error && <div className="text-red-600 mb-4">❌ {error}</div>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-gray-700">Nom</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          ➕ Ajouter
        </button>
      </form>
    </div>
  );
}
