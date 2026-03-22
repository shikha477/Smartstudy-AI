import OpenAI from "openai";

const generateStudyMaterial = async (text) => {

  // 🔥 SWITCH: true = mock, false = real AI
  const USE_MOCK = true;

  
  if (USE_MOCK) {
    const shortText = text.slice(0, 100);

    return {
      summary: `This is a summary of your notes: ${shortText}...`,

      questions: [
        "What is the main topic of the notes?",
        "Explain the key concept in detail.",
        "Why is this topic important?",
        "Give one real-life example.",
        "What are the main points to remember?"
      ],

      quiz: [
        {
          question: "What is the main idea?",
          options: ["Concept A", "Concept B", "Concept C", "Concept D"],
          answer: "Concept A"
        },
        {
          question: "Which is correct?",
          options: ["Option 1", "Option 2", "Option 3", "Option 4"],
          answer: "Option 2"
        }
      ],

      revisionPlan: `
- Read notes daily
- Highlight important points
- Practice questions
- Revise weekly
`
    };
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
You are an AI study assistant.
From the following notes, generate:
1. Summary (short and clear)
2. 5 Important Questions
3. 5 MCQ Quiz (with options and correct answer)
4. Revision Plan

Notes:
${text}

Return ONLY valid JSON:
{
  "summary": "",
  "questions": [],
  "quiz": [
    {
      "question": "",
      "options": ["A", "B", "C", "D"],
      "answer": ""
    }
  ],
  "revisionPlan": ""
}
`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Return ONLY valid JSON. No extra text."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;

    return JSON.parse(content);

  } catch (error) {
    console.error("AI ERROR:", error.message);

    // 🔥 fallback to mock if AI fails
    return {
      summary: "Fallback summary (AI failed)",
      questions: ["Sample question"],
      quiz: [],
      revisionPlan: "Revise again"
    };
  }
};

export default generateStudyMaterial;





// import OpenAI from 'openai';


// const generateStudyMaterial = async (text) =>{
//     const client = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });
//     const prompt = `
//     You are an AI study assistant.
//     Analyze the following notes, generate:
//     1. Summary (short and clear)
//     2. 5 Important Questions
//     3. 5 MCQ Quiz (with options and correct answer)
//     4. Revision Plan (bullet points)
//     5. 5 Flashcards (question-answer)
//     6. Detect Subject Topic (Physics, Biology, Math, History, etc.)
//     7. Weak Areas (topics students usually struggle with)
    
//     Return response in JSON format:
//     {
//     "summary":"",
//     "questions":[],
//     "quiz":[{
//         "question":"",
//         "options":["A","B","C","D"],
//         "answer":""
//         }
//         ],
//         "revisionPlan":"",
//         "flashcards":[
//           {
//             "question":"",
//            "answer":""
//         }
//         ],
//         "topic":"",
//         "weakAreas":[]
//          }
//          Notes:
//     ${text}
//         `;
//         const response = await client .chat.completions.create({
//             model: "gpt-4o-mini",
//             messages:[{role:"user",content: prompt}],
//             temperature: 0.7,
//         });
//         const content = response.choices[0].message.content;
//         try{
//             return JSON.parse(content);
//         } catch (err){
//             throw new Error("AI response parsing failed");
//         }

// };
// export default generateStudyMaterial;



