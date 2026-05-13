import Notification from "../models/Notification.js";

// Récupérer les notifications d’un utilisateur
export const getNotificationsByUser = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Utilisateur non authentifié" });
    }

    const notifs = await Notification.findAll({
      where: { user_id: userId },
      order: [["created_at", "DESC"]],
    });
    res.json(notifs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Créer une notification
export const addNotification = async (req, res) => {
  try {
    const { user_id, type, message } = req.body;
    const notif = await Notification.create({ user_id, type, message });
    res.status(201).json(notif);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour le statut (lu/non lu)
export const updateNotificationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const notif = await Notification.findByPk(id);
    if (!notif) return res.status(404).json({ error: "Notification introuvable" });

    notif.status = status;
    await notif.save();
    res.json(notif);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
