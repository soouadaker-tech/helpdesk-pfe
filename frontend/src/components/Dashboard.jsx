import React, { useState, useEffect } from "react";
import { getDashboardStats } from "../services/api";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  if (!stats) return <p>Chargement...</p>;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <h3>Dashboard</h3>

      <PieChart width={400} height={300}>
        <Pie
          data={stats.ticketsByStatus}
          dataKey="count"
          nameKey="status"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {stats.ticketsByStatus.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <BarChart width={500} height={300} data={stats.agentPerformance}>
        <XAxis dataKey="agent_id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="resolved" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}

export default Dashboard;
