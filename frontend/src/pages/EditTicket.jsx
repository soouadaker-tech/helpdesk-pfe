// src/pages/EditTicket.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTicketById, updateTicket } from "../services/api";

export default function EditTicket() {
  const { id } = useParams(); // récupère l'id depuis l'URL
  const navigate = useNavigate();
  const [ticket, setTicket] = useState({ title: "", status: "" });
  const [error, setError] = useState("");

    useEffect(() => {
    const fetchTicket = async () => {
        const result = await getTicketById(id);
        if (result.success) {
        const data = result.data?.ticket || result.data || {};
        setTicket(data);
        } else {
        setError(result.error || "Erreur lors du chargement du ticket");
        }
    };
    fetchTicket();
    }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateTicket(id, ticket);
    if (result.success) {
      navigate("/tickets"); // retour à la liste
    } else {
      setError(result.error || "Erreur lors de la modification");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Modifier Ticket</h2>

      {error && <div className="text-red-600 mb-4">❌ {error}</div>}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div>
          <label className="block text-gray-700">Titre</label>
          <input
            type="text"
            value={ticket.title}
            onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-gray-700">Statut</label>
          <select
            value={ticket.status}
            onChange={(e) => setTicket({ ...ticket, status: e.target.value })}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Ouvert">Ouvert</option>
            <option value="Fermé">Fermé</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Sauvegarder
        </button>
      </form>
    </div>
  );
}
