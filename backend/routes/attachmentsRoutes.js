import express from "express";
import { addAttachment } from "../controllers/attachmentsController.js";

const router = express.Router();

router.post("/", addAttachment);

export default router;
