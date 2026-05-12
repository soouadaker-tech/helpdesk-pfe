import React from "react";

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-800 text-white px-6 py-3 shadow">
        <h1 className="text-xl font-bold">Administration</h1>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 p-6">
        <div className="bg-white rounded shadow p-6 text-center text-gray-500">
          <p className="text-lg">Page Administration vide</p>
          <p className="text-sm">Ajoutez ici vos composants de gestion (utilisateurs, agents, tickets...)</p>
        </div>
      </main>
    </div>
  );
}
