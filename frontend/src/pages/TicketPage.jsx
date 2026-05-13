import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getTicketDetails } from "../services/api";
import CommentsSection from "../components/CommentsSection";
import AttachmentsSection from "../components/AttachmentsSection";

export default function TicketPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger détails du ticket
  useEffect(() => {
    const loadData = async () => {
      try {
        const ticketData = await getTicketDetails(id);
        if (ticketData?.ticket) {
          setTicket(ticketData.ticket);
        } else {
          setTicket(ticketData);
        }
      } catch (err) {
        console.error("Erreur:", err);
        Swal.fire("Erreur", "Impossible de charger le ticket", "error");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center">Chargement...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Ticket #{ticket?.id}</h1>

      {/* Layout 2 colonnes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Colonne gauche : infos ticket */}
        <div className="bg-white shadow rounded p-4">
          {ticket ? (
            <>
              <h2 className="text-xl font-bold mb-4">{ticket.title}</h2>
              <p className="mb-2">
                <span className="font-semibold">Statut:</span>{" "}
                <span className={ticket.status === "Ouvert" ? "text-green-600" : "text-gray-600"}>
                  {ticket.status}
                </span>
              </p>
              <p className="mb-4 text-gray-700">{ticket.description}</p>
              
              {/* Pièces jointes */}
              <AttachmentsSection ticketId={id} />
            </>
          ) : (
            <p>Ticket non trouvé</p>
          )}
        </div>

        {/* Colonne droite : commentaires */}
        <CommentsSection ticketId={id} />
      </div>
    </div>
  );
}
