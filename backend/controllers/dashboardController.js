import { QueryTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Ticket from '../models/Ticket.js';

export const getDashboardStats = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    
    const statusCounts = {
      open: tickets.filter(t => t.status === 'Ouvert').length,
      inProgress: tickets.filter(t => t.status === 'En cours').length,
      resolved: tickets.filter(t => t.status === 'Fermé').length,
    };
    
    const monthCounts = {
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: tickets.length,
    };
    
    res.json({
      open: statusCounts.open,
      inProgress: statusCounts.inProgress,
      resolved: statusCounts.resolved,
      jan: monthCounts.jan,
      feb: monthCounts.feb,
      mar: monthCounts.mar,
      apr: monthCounts.apr,
      may: monthCounts.may,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
