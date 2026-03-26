import express from 'express';
import upload from '../middleware/upload.js';
import {uploadNote} from '../controllers/noteController.js';
import checkUsageLimit from '../middleware/checkUsageLimit.js';

const router = express.Router();

// router.post("/upload", upload.single("file"), uploadNote);
router.post(
    "/upload",
    checkUsageLimit,
    upload.single("file"),
    uploadNote
)
export default router;