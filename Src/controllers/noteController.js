import Note from '../models/Note.js';
import extractText from '../services/textExtractor.js';
import generateStudyMaterial from '../services/aiService.js';
import {successResponse} from '../utils/apiResponse.js';
import updateGamification from '../services/gamifictionService.js';

export const uploadNote = async (req,res,next)=>{
    try {
         req.user = { _id: req.headers['user-id'] };

        const file = req.file;
        const text = await extractText(req.file.path, req.file.mimetype);

        // const aiResult = await generateAdvancedStudyMaterial(text);

        const aiResponse = await generateStudyMaterial(text);

        const note = await Note.create({
            title: req.body.title || text.substring(0, 20),
            userID: req.user._id,
            fileUrl: file.path,
            rawText: text,
            
            summary: aiResponse.summary,
            questions: aiResponse.questions,
            quiz: aiResponse.quiz,
            revisionPlan: aiResponse.revisionPlan,

            flashcards: aiResponse.flashcards,
            topic: aiResponse.topic,
            weakAreas: aiResponse.weakAreas,

           

            // fileUrl: file.path,
            // rawText: text,
            // summary: aiResponse.summary,
            // questions : aiResponse.questions,
            // quiz: aiResponse.quiz,
            // revisionPlan: aiResponse.revisionPlan,

            // flashcards: aiResponse.flashcards,
            // topic: aiResponse.topic,
            //weakAreas: aiResponse.weakAreas
        });

        updateGamification(req.user,"upload");
        await req.user.save();
        
        successResponse(res, 201, "Note uploaded successfully");
    } catch (error){
        next(error);
    }

    };