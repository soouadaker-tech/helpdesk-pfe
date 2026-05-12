import express from 'express';
import { getCommentsByTicket, addComment } from '../controllers/commentsController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:ticketId', authMiddleware, getCommentsByTicket);
router.post('/', authMiddleware, addComment);

export default router;
