import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function TicketPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Charger détails du ticket
  useEffect(() => {
    fetch(`http://localhost:5173/api/tickets/${id}`)
      .then(res => res.json())
      .then(data => setTicket(data.ticket))
      .catch(err => console.error("Erreur ticket:", err));
  }, [id]);

  // Charger commentaires
  useEffect(() => {
    fetch(`http://localhost:5173/api/comments/${id}`)
      .then(res => res.json())
      .then(data => setComments(data))
      .catch(err => console.error("Erreur commentaires:", err));
  }, [id]);

  // Ajouter un commentaire
  const handleAddComment = async () => {
    try {
      const res = await fetch(`http://localhost:5173/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticket_id: id, content: newComment })
      });
      const data = await res.json();

      if (res.ok) {
        setComments([...comments, data]);
        setNewComment("");
        Swal.fire({
          icon: "success",
          title: "Commentaire ajouté",
          text: `Votre commentaire a été ajouté au ticket #${id}`,
          confirmButtonColor: "#3085d6"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: data.error || "Impossible d'ajouter le commentaire",
          confirmButtonColor: "#d33"
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Erreur serveur",
        text: err.message,
        confirmButtonColor: "#d33"
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Ticket #{id}</h1>

      {/* Layout 2 colonnes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Colonne gauche : infos ticket */}
        <div className="bg-white shadow rounded p-4">
          {ticket ? (
            <>
              <h2 className="text-xl font-bold mb-2">{ticket.title}</h2>
              <p className="mb-2">
                <span className="font-semibold">Statut:</span>{" "}
                <span className={ticket.status === "Ouvert" ? "text-green-600" : "text-red-600"}>
                  {ticket.status}
                </span>
              </p>
              <p className="mb-2"><span className="font-semibold">Priorité:</span> {ticket.priority}</p>
              <p className="mb-2"><span className="font-semibold">Département:</span> {ticket.department}</p>
              <p className="mb-2"><span className="font-semibold">Lieu:</span> {ticket.location}</p>
              <p className="mb-2"><span className="font-semibold">Type:</span> {ticket.type}</p>

              {/* Pièces jointes */}
              {ticket.attachments?.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold">📎 Pièces jointes</h3>
                  <ul>
                    {ticket.attachments.map((file, idx) => (
                      <li key={idx}>
                        <a href={file.path} className="text-blue-600 hover:underline">
                          {file.filename}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <p>Chargement des informations...</p>
          )}
        </div>

        {/* Colonne droite : timeline commentaires */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold mb-4">Commentaires</h2>
          <div className="space-y-4 mb-4">
            {comments.map(c => (
              <div
                key={c.id}
                className={`flex ${c.role === "agent" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg shadow ${
                    c.role === "agent" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"
                  }`}
                >
                  <p className="text-sm">{c.content}</p>
                  <span className="text-xs text-gray-500 block mt-1">
                    {c.role === "agent" ? "👨‍💼 Agent" : "👤 Client"} — {c.user_id}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Formulaire ajout commentaire */}
          <div className="flex gap-2">
            <input
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Écrire un commentaire..."
              className="flex-1 border rounded p-2"
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
