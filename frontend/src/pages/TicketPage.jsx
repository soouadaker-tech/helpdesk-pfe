import React, { useEffect, useState } from "react";
import { getAllTickets } from "../services/api";

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      const result = await getAllTickets();
      console.log("Tickets API result:", result);

      if (result.success) {
        // ⚠️ تأكد من شكل الرد
        const data = result.data?.tickets || result.data || [];
        setTickets(Array.isArray(data) ? data : []);
      } else {
        setError(result.error || "Erreur lors du chargement des tickets");
      }
    };
    fetchTickets();
  }, []);

  if (error) {
    return <div className="p-6 text-red-600">❌ {error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Liste des Tickets</h2>
      {tickets.length === 0 ? (
        <p>Aucun ticket trouvé.</p>
      ) : (
        <ul className="space-y-2">
          {tickets.map((t) => (
            <li key={t.id || t._id} className="border p-2 rounded">
              <strong>{t.title || t.subject}</strong> — {t.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
