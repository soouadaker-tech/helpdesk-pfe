import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../services/api";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUserById(id);
      if (result.success) {
        setUser(result.data.user || result.data);
      } else {
        setError(result.error || "Erreur lors du chargement de l'utilisateur.");
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateUser(id, user);
    if (result.success) {
      alert("✅ Utilisateur modifié avec succès !");
      navigate("/users");
    } else {
      setError(result.error || "Erreur lors de la modification.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Modifier utilisateur</h2>
      {error && <div className="text-red-600 mb-4">❌ {error}</div>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-gray-700">Nom</label>
          <input
            type="text"
            value={user?.name || ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Sauvegarder
        </button>
      </form>
    </div>
  );
}
