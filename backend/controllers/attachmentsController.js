import Attachment from '../models/Attachment.js';

export const getAttachmentsByTicket = async (req, res) => {
  const attachments = await Attachment.findAll({ where: { ticket_id: req.params.ticketId } });
  res.json(attachments);
};

export const addAttachment = async (req, res) => {
  const { ticket_id } = req.body;
  const file_path = req.file ? req.file.path : null;
  const filename = req.file ? req.file.originalname : null;

  if (!file_path || !filename) {
    return res.status(400).json({ error: "Aucun fichier fourni" });
  }

  const attachment = await Attachment.create({ ticket_id, file_path, filename });
  res.status(201).json(attachment);
};
