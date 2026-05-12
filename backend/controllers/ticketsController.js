// controllers/ticketsController.js
import Ticket from "../models/Ticket.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";

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

    if (!title || !description) {
      return res.status(400).json({ success: false, error: "Title and description are required" });
    }

    const ticket = await Ticket.create({
      title,
      description,
      status: status || "Ouvert",
      agent_id,
      user_id: req.user?.id || null
    });

    // 🔔 Notification à l'auteur du ticket
    if (req.user?.id) {
      try {
        await Notification.create({
          user_id: req.user.id,
          type: "ticket",
          message: `Votre ticket "${title}" a été créé avec succès.`,
          status: "non_lu"
        });
      } catch (notifErr) {
        console.error("⚠️ Erreur notification auteur:", notifErr.message);
      }
    }

    // 🔔 Notification aux admins
    try {
      const admins = await User.findAll({ where: { role: "admin" } });
      for (const admin of admins) {
        await Notification.create({
          user_id: admin.id,
          type: "ticket",
          message: `Nouveau ticket #${ticket.id} : ${ticket.title} créé par ${req.user?.username || req.user?.id || 'un utilisateur'}`,
          status: "non_lu"
        });
      }
    } catch (notifErr) {
      console.error("⚠️ Erreur notification admins:", notifErr.message);
    }

    res.json({ success: true, ticket });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Mettre à jour un ticket
export const updateTicket = async (req, res) => {
  try {
    const { title, description, status, agent_id } = req.body;
    const ticketId = req.params.id;

    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      return res.status(404).json({ success: false, error: "Ticket introuvable" });
    }

    const statusChanged = ticket.status !== status;

    await Ticket.update(
      { title, description, status, agent_id },
      { where: { id: ticketId } }
    );

    // 🔔 Notification à l'agent assigné
    if (agent_id) {
      try {
        await Notification.create({
          user_id: agent_id,
          type: "ticket",
          message: `Le ticket #${ticketId} a été mis à jour. Nouveau statut: ${status}`,
          status: "non_lu"
        });
      } catch (notifErr) {
        console.error("⚠️ Erreur notification agent:", notifErr.message);
      }
    }

    // 🔔 Notification à l'auteur du ticket si différent
    if (ticket.user_id && ticket.user_id !== req.user?.id) {
      try {
        await Notification.create({
          user_id: ticket.user_id,
          type: "ticket",
          message: `Votre ticket #${ticketId} a été mis à jour. Nouveau statut: ${status}`,
          status: "non_lu"
        });
      } catch (notifErr) {
        console.error("⚠️ Erreur notification auteur:", notifErr.message);
      }
    }

    // 🔔 Notification aux admins si statut changé
    if (statusChanged) {
      try {
        const admins = await User.findAll({ where: { role: "admin" } });
        for (const admin of admins) {
          await Notification.create({
            user_id: admin.id,
            type: "ticket",
            message: `Le ticket #${ticketId} est passé de ${ticket.status} à ${status}`,
            status: "non_lu"
          });
        }
      } catch (notifErr) {
        console.error("⚠️ Erreur notification admins:", notifErr.message);
      }
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Supprimer un ticket
export const deleteTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
      return res.status(404).json({ success: false, error: "Ticket introuvable" });
    }

    await ticket.destroy();

    // 🔔 Notification sécurisée
    try {
      await Notification.create({
        user_id: req.user?.id || null,
        type: "ticket",
        message: `Ticket #${ticketId} supprimé`,
        status: "non_lu"
      });
    } catch (notifErr) {
      console.error("⚠️ Erreur notification:", notifErr.message);
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
