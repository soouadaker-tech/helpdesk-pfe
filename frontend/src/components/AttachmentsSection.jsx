import { useEffect, useState } from "react";
import { getAttachments } from "../services/api";

export default function AttachmentsSection({ ticketId }) {
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAttachments = async () => {
      try {
        const data = await getAttachments(ticketId);
        setAttachments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur chargement pièces jointes:", err);
        setAttachments([]);
      } finally {
        setLoading(false);
      }
    };

    if (ticketId) {
      loadAttachments();
    }
  }, [ticketId]);

  if (loading) {
    return <div className="mt-6 text-sm text-gray-500">Chargement des pièces jointes...</div>;
  }

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">📎 Pièces jointes ({attachments.length})</h3>
      {attachments?.length > 0 ? (
        <ul className="space-y-1">
          {attachments.map((file, i) => (
            <li key={file.id || i} className="flex items-center">
              📎{" "}
              <a 
                href={`http://localhost:5000/${file.file_path}`} 
                className="text-blue-600 ml-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {file.filename || `Pièce jointe ${i + 1}`}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">Aucune pièce jointe.</p>
      )}
    </div>
  );
}
