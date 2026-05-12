import React, { useState } from "react";

export default function CommentsSection({ comments, onAdd }) {
  const [newComment, setNewComment] = useState("");

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Commentaires</h3>
      {comments.length === 0 ? (
        <p className="text-gray-500">Aucun commentaire pour ce ticket.</p>
      ) : (
        comments.map((c, i) => (
          <div key={i} className="bg-gray-50 p-3 rounded mb-2 shadow-sm border">
            <p className="font-semibold">{c.author}</p>
            <p>{c.content}</p>
            <span className="text-xs text-gray-500">{c.date}</span>
          </div>
        ))
      )}

      <div className="mt-4 flex">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Écrire un commentaire..."
          className="flex-1 border rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={() => {
            if (newComment.trim()) {
              onAdd(newComment);
              setNewComment("");
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}
