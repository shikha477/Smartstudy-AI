import Notes from "../models/Note.js";
import askAI from "../services/chatService.js";
import {successResponse} from "../utils/apiResponse.js";
import updateGamification from "../services/gamifictionService.js";

export const chatWithNote = async (req, res, next)=>{
    try {
        const {noteId, question } = req.body;

        const note = await Notes.findById(noteId);
        if(!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }
        const answer = await askAI(note.rawtext, question);
        successResponse(res, {answer}, "AI response generated");

        updateGamification(req.user,"chat");
        await req.user.save();
        
    } catch (error){
        next(error);
    }
};