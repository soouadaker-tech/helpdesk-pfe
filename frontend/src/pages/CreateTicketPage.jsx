import React, { useState } from "react";
import { createTicket } from "../services/api";

export default function CreateTicketPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Ouvert");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("❌ Veuillez remplir tous les champs.");
      return;
    }

    const ticketData = {
      title,
      description,
      status,
    };

    try {
      const result = await createTicket(ticketData);
      if (result.success) {
        alert("✅ Ticket créé avec succès !");
        setTitle("");
        setDescription("");
        setStatus("Ouvert");
      } else {
        alert(`❌ ${result.error || "Erreur lors de la création du ticket"}`);
      }
    } catch (err) {
      console.error("Erreur création ticket:", err);
      alert("❌ Erreur lors de la création du ticket");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Créer un ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="Ouvert">Ouvert</option>
          <option value="En cours">En cours</option>
          <option value="Fermé">Fermé</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Créer
        </button>
      </form>
    </div>
  );
}
