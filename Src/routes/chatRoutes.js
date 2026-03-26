import express from "express";
import { chatWithNote } from "../controllers/chatController.js";
import checkUsageLimit from "../middleware/checkUsageLimit.js";

const router = express.Router();

router.post("/", checkUsageLimit, chatWithNote);

export default router;