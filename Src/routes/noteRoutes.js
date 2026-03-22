import express from 'express';
import upload from '../middleware/upload.js';
import {uploadNote} from '../controllers/noteController.js';

const router = express.Router();

router.post("/upload", upload.single("file"), uploadNote);
export default router;