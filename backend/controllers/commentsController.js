import Comment from '../models/Comment.js';
import Ticket from '../models/Ticket.js';
import Notification from "../models/Notification.js";

export const addComment = async (req, res) => {
  try {
    const { ticket_id, content } = req.body;
    const user_id = req.user.id;

    const comment = await Comment.create({ ticket_id, user_id, content });

    const ticket = await Ticket.findByPk(ticket_id);
    if (ticket && ticket.agent_id) {
      await Notification.create({
        user_id: ticket.agent_id,
        type: "comment",
        message: `Nouveau commentaire sur ticket #${ticket_id}`,
        status: "non_lu"
      });
    }

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getCommentsByTicket = async (req, res) => {
  const comments = await Comment.findAll({ where: { ticket_id: req.params.ticketId } });
  res.json(comments);
};
