import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Ideally, this would be proxied through a backend to hide the key,
// but for this demo/SPA structure, we use process.env.
// The prompt instructions specify utilizing process.env.API_KEY directly.

let client: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!client) {
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("API_KEY not found in environment variables. Chat will not function.");
      console.warn("Please check .env.local file and ensure GEMINI_API_KEY is set.");
      throw new Error("API Key missing");
    }
    console.log("Gemini API Key loaded:", apiKey.substring(0, 10) + "...");
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
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error?.message === "API Key missing") {
      return "配置错误：未找到 Gemini API Key。请检查 .env.local 文件中的 GEMINI_API_KEY 配置。";
    }
    if (error?.message?.includes("API_KEY_INVALID") || error?.status === 401) {
      return "配置错误：Gemini API Key 无效。请检查 API Key 是否正确。";
    }
    return "Sorry, I am currently offline due to configuration. Please try emailing Liu directly.";
  }
};
