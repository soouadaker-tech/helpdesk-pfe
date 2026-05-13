import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getComments, addComment } from "../services/api";

export default function CommentsSection({ ticketId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  // Charger les commentaires
  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await getComments(ticketId);
        setComments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur chargement commentaires:", err);
        Swal.fire("Erreur", "Impossible de charger les commentaires", "error");
      } finally {
        setLoading(false);
      }
    };
    
    loadComments();
  }, [ticketId]);

  // Ajouter un commentaire
  const handleAddComment = async () => {
    if (!newComment.trim()) {
      Swal.fire("Erreur", "Le commentaire ne peut pas être vide", "error");
      return;
    }

    try {
      const result = await addComment(ticketId, newComment);
      
      if (result.success) {
        setComments([...comments, result.data]);
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
          text: result.error || "Impossible d'ajouter le commentaire",
          confirmButtonColor: "#d33"
        });
      }
    } catch (err) {
      console.error("Erreur ajout commentaire:", err);
      Swal.fire({
        icon: "error",
        title: "Erreur serveur",
        text: err.message,
        confirmButtonColor: "#d33"
      });
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Chargement des commentaires...</div>;
  }

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-4">Commentaires ({comments.length})</h2>
      
      <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm">Aucun commentaire pour le moment</p>
        ) : (
          comments.map(c => (
            <div key={c.id} className="border-l-4 border-blue-500 pl-3 py-2 bg-gray-50 rounded">
              <p className="text-sm text-gray-800">{c.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                Utilisateur #{c.user_id} • {c.createdAt ? new Date(c.createdAt).toLocaleString('fr-FR') : 'Date inconnue'}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="border-t pt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Ajouter un commentaire..."
          className="w-full p-2 border rounded resize-none h-20"
        />
        <button
          onClick={handleAddComment}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
