import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

async function test() {
  const key = process.env.GEMINI_API_KEY;
  console.log("GEMINI_API_KEY present:", !!key);
  if (!key) return;
  try {
    const ai = new GoogleGenAI({ apiKey: key });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say Hello in Arabic",
    });
    console.log("Response:", response.text);
  } catch (err) {
    console.error("Error:", err);
  }
}
test();