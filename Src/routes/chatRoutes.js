import express from "express";
import { chatWithNote } from "../controllers/chatController.js";

const router = express.Router();

router.post("/",chatWithNote);

export default router;