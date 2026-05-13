import express from "express";
import { getAttachmentsByTicket, addAttachment } from "../controllers/attachmentsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:ticketId", authMiddleware, getAttachmentsByTicket);
router.post("/", authMiddleware, addAttachment);

export default router;
