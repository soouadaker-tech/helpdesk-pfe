import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../services/api";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const data = await getAllUsers();
      setUsers(data || []);
    }
    load();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      const result = await deleteUser(id);
      if (result.success) {
        alert("✅ Utilisateur supprimé avec succès !");
        setUsers(users.filter((u) => u.id !== id));
      } else {
        alert("❌ Erreur lors de la suppression de l'utilisateur.");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        Liste des Utilisateurs
      </h2>

      {/* Bouton Ajouter */}
      <div className="mb-4">
        <button
          onClick={() => navigate("/create-user")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Ajouter un utilisateur
        </button>
      </div>

      <div className="bg-white shadow rounded p-4">
        {users.length === 0 ? (
          <p className="text-gray-600">Aucun utilisateur trouvé.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Nom</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border p-2">{user.id}</td>
                  <td className="border p-2">{user.name || "—"}</td>
                  <td className="border p-2">{user.email || "—"}</td>
                  <td className="border p-2 flex space-x-2">
                    {/* Modifier */}
                    <button
                      onClick={() => navigate(`/edit-user/${user.id}`)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center"
                    >
                      <FaEdit className="mr-1" /> Modifier
                    </button>
                    {/* Supprimer */}
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center"
                    >
                      <FaTrash className="mr-1" /> Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
