import React, { useState } from "react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-800 text-white px-6 py-3 shadow">
        <h1 className="text-xl font-bold">Administration</h1>
      </header>

      {/* Tabs */}
      <nav className="flex bg-white shadow px-6">
        <button
          className={`px-4 py-2 ${activeTab === "users" ? "border-b-2 border-blue-600 font-bold" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          Utilisateurs
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "tickets" ? "border-b-2 border-blue-600 font-bold" : ""}`}
          onClick={() => setActiveTab("tickets")}
        >
          Tickets
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "settings" ? "border-b-2 border-blue-600 font-bold" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          Paramètres
        </button>
      </nav>

      {/* Contenu principal */}
      <main className="flex-1 p-6">
        {activeTab === "users" && (
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-lg font-bold mb-4">Gestion des utilisateurs</h2>
            <p>Liste des utilisateurs ici...</p>
          </div>
        )}
        {activeTab === "tickets" && (
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-lg font-bold mb-4">Gestion des tickets</h2>
            <p>Liste des tickets ici...</p>
          </div>
        )}
        {activeTab === "settings" && (
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-lg font-bold mb-4">Paramètres</h2>
            <p>Options de configuration ici...</p>
          </div>
        )}
      </main>
    </div>
  );
}
