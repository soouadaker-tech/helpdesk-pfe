import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

// Dictionnaire pour traduire les segments de l'URL
const labels = {
  dashboard: "Tableau de Bord",
  tickets: "Tickets",
  "create-ticket": "Créer un Ticket",
  "mes-tickets": "Mes Tickets",
  "tous-les-tickets": "Tous les Tickets",
  users: "Utilisateurs",
  agents: "Agents",
  categories: "Catégories",
  reports: "Rapports",
  settings: "Paramètres",
};

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(x => x);

  return (
    <nav className="text-sm text-gray-200" aria-label="Breadcrumb">
      <ol className="flex space-x-2">
        <li>
          <Link to="/" className="hover:underline text-white">Accueil</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;
          const label = labels[value] || value; // traduction si dispo
          return (
            <li key={to} className="flex items-center space-x-2">
              <FaChevronRight className="text-gray-400 text-xs" />
              {isLast ? (
                <span className="font-semibold text-white">{label}</span>
              ) : (
                <Link to={to} className="hover:underline">{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
