import { fileModel } from "../FileHandler/fileSchema.js";
import { GoogleGenAI } from "@google/genai";
class TrialController {
  async sendFiles(req, res) {
    try {
      const { id } = req.params;
      const doc = await fileModel.findById(id);

      if (!doc) {
        res.status(400).send({ message: "File not found" });
      }

      res.setHeader("Content-Type", doc.contentType);
      res.send(doc.data);
    } catch (er) {
      res.status(500).json({ error: "Server error", details: err.message });
    }
  }

  //handeling file with the gemin api
  async dataExtract(req, res) {
    try {
      ///get the binary buffer from the db
      const { id } = req.params;
      const { prompt } = req.body;
      const response = await fileModel.findById(id);
      if (!response) return res.status(404).send("File not found");
      //as this data is buffer
      const filedata = response.data;
      //convert it to base64 to feed gemini api
      const base64 = filedata.toString("base64");
      //google gemini part
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const contents = [
        { text: prompt },
        {
          inlineData: {
            mimeType: response.contentType,
            data: base64,
          },
        },
      ];
      //get the gemin response
      const geminiResponse = await ai.models.generateContent({
        model: "gemini-1.5-pro", // or "gemini-2.0-flash"
        contents,
      });

      return res.status(200).send({ Summary: geminiResponse.text });
    } catch (er) {
      console.log(er);
    }
  }

  //Simple Question Generator
  async simpleQuestion(req, res) {
    try {
      const { summary } = req.body;
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const contents = [
        {
          text: `
            Based on the following summary, generate 10 multiple choice questions (MCQs). 
            Each question should have:
            - the question text,
            - four options (a, b, c, d),
            - the correct answer key (e.g., "b").

            Respond only in JSON format like:
            [
            {
                "question": "...",
                "options": {
                "a": "...",
                "b": "...",
                "c": "...",
                "d": "..."
                },
                "answer": "b"
            },
            ...
            ]

            Summary:
            ${summary}
            `,
        },
      ];

      const geminiResponse = await ai.models.generateContent({
        model: "gemini-1.5-pro", // or "gemini-2.0-flash"
        contents,
      });
      let  rawText = geminiResponse.text;
          rawText = rawText.trim();
          if (rawText.startsWith("```json")) {
            rawText = rawText
              .replace(/^```json/, "")
              .replace(/```$/, "")
              .trim();
          } else if (rawText.startsWith("```")) {
            rawText = rawText.replace(/^```/, "").replace(/```$/, "").trim();
          }


       let parsedQuestions;

       try {
         parsedQuestions = JSON.parse(rawText);
       } catch (jsonErr) {
         return res.status(500).json({
           error: "Failed to parse AI response to JSON",
           original: geminiResponse.text,
         });
       }
      return res.status(200).send({ Questions: parsedQuestions });
    } catch (er) {
      return res
        .status(500)
        .send("Internal Server problem! Please try again later");
    }
  }
}

export default TrialController;
