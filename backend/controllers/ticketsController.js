// controllers/ticketsController.js
import Ticket from "../models/Ticket.js";
import Notification from "../models/Notification.js";

// Lire tous les tickets
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json({ success: true, tickets });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

// Lire un ticket par ID
export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.json({ success: false, error: "Ticket introuvable" });
    res.json({ success: true, ticket });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

// Créer un ticket
export const createTicket = async (req, res) => {
  try {
    const { title, description, status, agent_id } = req.body;
    const ticket = await Ticket.create({ title, description, status, agent_id });
    res.json({ success: true, ticket });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

// Mettre à jour un ticket
export const updateTicket = async (req, res) => {
  try {
    const { title, description, status, agent_id } = req.body;
    await Ticket.update(
      { title, description, status, agent_id },
      { where: { id: req.params.id } }
    );
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

// Supprimer un ticket
export const deleteTicket = async (req, res) => {
  try {
    await Ticket.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};
