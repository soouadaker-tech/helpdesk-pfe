import express from 'express';
import { getAllUsers, getUserById, deleteUser } from '../controllers/usersController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteUser);

export default router;
