import React, { useState } from "react";
import { createUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreateUser() {
  const [user, setUser] = useState({ username: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user.username || !user.email || !user.password) {
      setError("Tous les champs sont obligatoires");
      return;
    }

    const result = await createUser(user);
    if (result.success) {
      Swal.fire("Succès", "✅ Utilisateur ajouté avec succès !", "success");
      navigate("/users");
    } else {
      setError(result.error || "Erreur lors de l'ajout de l'utilisateur.");
      Swal.fire("Erreur", error, "error");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Ajouter un utilisateur</h2>
      {error && <div className="text-red-600 mb-4 bg-red-50 p-3 rounded">❌ {error}</div>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4 max-w-md">
        <div>
          <label className="block text-gray-700 font-semibold">Nom d'utilisateur</label>
          <input
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="w-full border rounded px-3 py-2"
            placeholder="nom_utilisateur"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full border rounded px-3 py-2"
            placeholder="user@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Mot de passe</label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full border rounded px-3 py-2"
            placeholder="••••••••"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Rôle</label>
          <select
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            className="w-full border rounded px-3 py-2"
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
            <option value="agent">Agent</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-semibold">
          ➕ Ajouter
        </button>
      </form>
    </div>
  );
}
