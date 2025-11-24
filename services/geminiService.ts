import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Ideally, this would be proxied through a backend to hide the key,
// but for this demo/SPA structure, we use process.env.
// The prompt instructions specify utilizing process.env.API_KEY directly.

let client: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!client) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY not found in environment variables. Chat will not function.");
      throw new Error("API Key missing");
    }
    client = new GoogleGenAI({ apiKey });
  }
  return client;
};

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    const ai = getClient();
    
    // We use the 'gemini-2.5-flash' model for speed and efficiency in a chat context.
    // As per guidelines, we instantiate the model via the client.
    
    // Construct the full prompt context or use system instructions if supported by the specific call structure,
    // but here we will append the system instruction to the history context conceptually or strictly if using Chat.
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const result: GenerateContentResponse = await chat.sendMessage({
        message: message
    });

    return result.text || "I apologize, I couldn't generate a response at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I am currently offline due to configuration. Please try emailing Liu directly.";
  }
};
