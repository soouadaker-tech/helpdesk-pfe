import React, { useState } from "react";
import { createTicket } from "../services/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CreateTicketPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Ouvert");
  const [priority, setPriority] = useState("Moyenne");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Incident");
  const [attachment, setAttachment] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      Swal.fire("❌ Erreur", "Veuillez remplir tous les champs obligatoires.", "error");
      return;
    }

    // Préparer FormData pour inclure fichier
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("priority", priority);
    formData.append("category", category);
    formData.append("department", department);
    formData.append("location", location);
    formData.append("type", type);
    if (attachment) formData.append("attachment", attachment);

    try {
      const result = await createTicket(formData); // ⚠️ ton api doit gérer FormData
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Ticket créé avec succès !",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/tickets");
        });

        // Reset form
        setTitle("");
        setDescription("");
        setStatus("Ouvert");
        setPriority("Moyenne");
        setCategory("");
        setDepartment("");
        setLocation("");
        setType("Incident");
        setAttachment(null);
      } else {
        Swal.fire("❌ Erreur", result.error || "Erreur lors de la création du ticket", "error");
      }
    } catch (err) {
      console.error("Erreur création ticket:", err);
      Swal.fire("❌ Erreur", "Erreur lors de la création du ticket", "error");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Créer un ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow rounded p-6">
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
          rows="4"
          required
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 w-full">
          <option value="Ouvert">Ouvert</option>
          <option value="En cours">En cours</option>
          <option value="Fermé">Fermé</option>
        </select>

        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border p-2 w-full">
          <option value="Basse">Basse</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Haute">Haute</option>
        </select>

        <input
          type="text"
          placeholder="Catégorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Département"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Lieu"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full"
        />

        <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 w-full">
          <option value="Incident">Incident</option>
          <option value="Demande">Demande</option>
        </select>

        {/* Upload fichier */}
        <input
          type="file"
          onChange={(e) => setAttachment(e.target.files[0])}
          className="border p-2 w-full"
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Créer
        </button>
      </form>
    </div>
  );
}
