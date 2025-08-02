// async function getResponse(userPrompt){
//     try{
//         const response = await fetch(
//           `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               contents: [
//                 {
//                   parts: [{ text: userPrompt }],
//                 },
//               ],
//             }),
//           }
//         );
//         const data = await response.json();
//         console.log(data);
//         return data;
//     }catch(er){
//         console.log(er);
//     }
// }
// export default getResponse;
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function getResponse(userPrompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: userPrompt,
  });
  return response.text;
}

export default getResponse;