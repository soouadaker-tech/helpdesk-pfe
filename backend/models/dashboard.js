import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {

  const [ticketsByStatus] = await pool.query(
    "SELECT status, COUNT(*) as count FROM tickets GROUP BY status"
  );


  const [agentPerformance] = await pool.query(
    "SELECT agent_id, COUNT(*) as resolved FROM tickets WHERE status = 'fermé' GROUP BY agent_id"
  );

  res.json({ ticketsByStatus, agentPerformance });
});

export default router;
