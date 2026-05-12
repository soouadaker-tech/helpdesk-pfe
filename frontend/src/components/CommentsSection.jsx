import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function CommentsSection({ ticketId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Charger les commentaires
  useEffect(() => {
    fetch(`/api/comments/${ticketId}`)
      .then(res => res.json())
      .then(data => setComments(data))
      .catch(err => console.error("Erreur chargement:", err));
  }, [ticketId]);

  // Ajouter un commentaire
  const handleAddComment = async () => {
    try {
      const res = await fetch(`/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticket_id: ticketId, content: newComment })
      });
      const data = await res.json();

      if (res.ok) {
        setComments([...comments, data]);
        setNewComment("");
        Swal.fire({
          icon: "success",
          title: "Commentaire ajouté",
          text: `Votre commentaire a été ajouté au ticket #${ticketId}`,
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
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-2">Commentaires</h2>
      <ul className="space-y-2">
        {comments.map(c => (
          <li key={c.id} className="border p-2 rounded">
            <p className="text-sm">{c.content}</p>
            <span className="text-xs text-gray-500">Utilisateur #{c.user_id}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
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
  );
}
