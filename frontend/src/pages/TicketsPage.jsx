import React, { useEffect, useState } from "react";
import { getAllTickets, deleteTicket } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      const result = await getAllTickets();
      if (result.success) {
        setTickets(Array.isArray(result.tickets) ? result.tickets : []);
      } else {
        setError(result.error || "Erreur lors du chargement des tickets");
      }
    };
    fetchTickets();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce ticket ?")) {
      const result = await deleteTicket(id);
      if (result.success) {
        setTickets(tickets.filter((t) => t.id !== id && t._id !== id));
      } else {
        alert("❌ Erreur lors de la suppression");
      }
    }
  };

  if (error) {
    return <div className="p-6 text-red-600">❌ {error}</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Liste des Tickets
      </h2>

      {/* Bouton Ajouter */}
      <div className="text-center mb-6">
        <button
          onClick={() => navigate("/create-ticket")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Ajouter un Ticket
        </button>
      </div>

      {tickets.length === 0 ? (
        <p className="text-center text-gray-600">Aucun ticket trouvé.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((t) => (
            <div
              key={t.id || t._id}
              className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t.title || t.subject}
              </h3>
              <p className="text-gray-600 mb-1">
                <span className="font-bold">Statut:</span>{" "}
                <span
                  className={
                    t.status === "Ouvert"
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {t.status}
                </span>
              </p>
              <p className="text-gray-500 text-sm mb-3">
                Créé le: {new Date(t.createdAt).toLocaleString()}
              </p>

              {/* Icônes d’action */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => navigate(`/edit-ticket/${t.id || t._id}`)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Modifier"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(t.id || t._id)}
                  className="text-red-600 hover:text-red-800"
                  title="Supprimer"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
