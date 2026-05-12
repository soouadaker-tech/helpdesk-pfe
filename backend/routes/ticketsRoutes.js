import express from 'express';
import { getAllTickets, getTicketById, createTicket, updateTicket, deleteTicket } from '../controllers/ticketsController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllTickets);
router.get('/:id', authMiddleware, getTicketById);
router.post('/', authMiddleware, createTicket);  // Tous les utilisateurs peuvent créer des tickets
router.put('/:id', authMiddleware, roleMiddleware(['admin','agent']), updateTicket);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteTicket);

export default router;
