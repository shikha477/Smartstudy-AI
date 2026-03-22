import OpenAI from "openai";

const useMock = true; // change to false when you get API key

let openai = null;

if (!useMock && process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
}

const askAI = async (context, question) => {
    if (useMock || !openai) {
        return `Mock Answer:
Question: ${question}

Context: ${context}

This is a simulated AI response.`;
    }

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: question }],
    });

    return response.choices[0].message.content;
};

export default askAI;



// import OpenAI from "openai";

// const client = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const askAI = async (context, question)=>{
//     const prompt =`
//     You are an AI tutor.
//     use the following notes as context to answer the student's question.
//     NOTES:
//     ${context}
    
//     QUESTION:
//     ${question}
    
//     Instructions:
//     -Explain clearly
//     -Use simple language
//     -Give example if possible 
//     `;
//     const response = await client.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages:[{role:"user",content:prompt}],
//         temperature: 0.7,
//     });
//     return response.choices[0].message.content;
// };
// export default askAI;