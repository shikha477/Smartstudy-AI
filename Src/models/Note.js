import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title:String,
    userId:String,
    fileUrl:String,
    rawtext:String,
    summary:String,
    questions: Array,
    quiz: Array,
    revisionPlan: String,

    flashcards:[
        {
            question:String,
            answer:String
        }
    ],
    topic:String,
    weakAreas:[String]
}, { timestamps : true});

const Note = mongoose.model("Note", noteSchema);
export default Note;