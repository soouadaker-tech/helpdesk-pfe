import React from "react";

export default function TicketDetails({ ticket }) {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h2 className="text-xl font-bold">Ticket #{ticket.code}</h2>
      <p className="text-gray-700">Sujet: {ticket.subject}</p>
      <span
        className={`px-2 py-1 rounded ${
          ticket.status === "Ouvert"
            ? "bg-green-100 text-green-700"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        {ticket.status}
      </span>
      <span className="bg-red-100 text-red-700 px-2 py-1 rounded ml-2">
        {ticket.priority}
      </span>
      <p className="text-sm text-gray-500 mt-2">
        Département: {ticket.department} | Lieu: {ticket.location}
      </p>
    </div>
  );
}
