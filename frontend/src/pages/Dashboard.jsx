import React, { useEffect, useState } from "react";
import { getAllTickets, getAllUsers } from "../services/api";
import { Link } from "react-router-dom";
import { FaTicketAlt, FaUsers, FaChartBar } from "react-icons/fa";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function load() {
      const t = await getAllTickets();
      const u = await getAllUsers();
      setTickets(t || []);
      setUsers(u || []);
    }
    load();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Tableau de Bord</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Carte Tickets */}
        <div className="bg-white shadow rounded p-4 flex items-center">
          <FaTicketAlt className="text-blue-600 text-3xl mr-4" />
          <div>
            <p className="text-gray-600">Total Tickets</p>
            <p className="text-xl font-bold">{tickets.length}</p>
          </div>
        </div>

        {/* Carte Utilisateurs */}
        <div className="bg-white shadow rounded p-4 flex items-center">
          <FaUsers className="text-green-600 text-3xl mr-4" />
          <div>
            <p className="text-gray-600">Total Utilisateurs</p>
            <p className="text-xl font-bold">{users.length}</p>
          </div>
        </div>

        {/* Carte Rapports */}
        <div className="bg-white shadow rounded p-4 flex items-center">
          <FaChartBar className="text-yellow-600 text-3xl mr-4" />
          <div>
            <p className="text-gray-600">Rapports</p>
            <Link
              to="/reports"
              className="text-blue-600 hover:underline font-semibold"
            >
              Voir les statistiques
            </Link>
          </div>
        </div>
      </div>

      {/* Section rapide */}
      <div className="bg-white shadow rounded p-6">
        <h3 className="text-xl font-semibold mb-4">Actions rapides</h3>
        <div className="flex space-x-4">
          <Link
            to="/create-ticket"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Nouveau Ticket
          </Link>
          <Link
            to="/users"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Gérer Utilisateurs
          </Link>
          <Link
            to="/tickets"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Voir Tickets
          </Link>
        </div>
      </div>
    </div>
  );
}
