import React, { useEffect, useState } from "react";
import { getTicketsStats } from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function ReportsPage() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    async function load() {
      const data = await getTicketsStats();
      setStats(data || {});
    }
    load();
  }, []);

  const COLORS = ["#1E3A8A", "#10B981", "#DC2626"];

  const pieData = [
    { name: "Ouverts", value: stats.open || 0 },
    { name: "En cours", value: stats.inProgress || 0 },
    { name: "Résolus", value: stats.resolved || 0 },
  ];

  const barData = [
    { mois: "Jan", tickets: stats.jan || 0 },
    { mois: "Fév", tickets: stats.feb || 0 },
    { mois: "Mar", tickets: stats.mar || 0 },
    { mois: "Avr", tickets: stats.apr || 0 },
    { mois: "Mai", tickets: stats.may || 0 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Rapports & Statistiques</h2>

      {/* Pie Chart */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h3 className="text-xl font-semibold mb-4">Répartition des Tickets</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={pieData}
            cx={200}
            cy={150}
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-xl font-semibold mb-4">Tickets par Mois</h3>
        <BarChart width={500} height={300} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mois" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="tickets" fill="#1E3A8A" />
        </BarChart>
      </div>
    </div>
  );
}
