import Notification from '../models/Notification.js';

export const getNotificationsByUser = async (req, res) => {
  const notifications = await Notification.findAll({ where: { user_id: req.params.userId } });
  res.json(notifications);
};

export const addNotification = async (req, res) => {
  const { user_id, message } = req.body;
  const notification = await Notification.create({ user_id, message });
  res.status(201).json(notification);
};

export const updateNotificationStatus = async (req, res) => {
  const { status } = req.body;
  await Notification.update(
    { status },
    { where: { id: req.params.id } }
  );
  res.send("Notification status updated");
};
