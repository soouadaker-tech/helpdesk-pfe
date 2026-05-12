import express from 'express';
import { getNotificationsByUser, addNotification, updateNotificationStatus } from '../controllers/notificationsController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:userId', authMiddleware, getNotificationsByUser);
router.post('/', authMiddleware, addNotification);
router.put('/:id', authMiddleware, updateNotificationStatus);

export default router;
