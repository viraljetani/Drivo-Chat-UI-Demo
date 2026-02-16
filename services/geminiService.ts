
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAiReplySuggestion = async (history: Message[], userInput: string): Promise<string> => {
  try {
    const chatContext = history.map(m => `${m.sender}: ${m.content}`).join('\n');
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are the Drivo Support AI Assistant. Your job is to help the Drivo Team agents draft professional, helpful responses to front desk inquiries regarding parking, gates, and billing.
      
Context:
${chatContext}

Current User Message: ${userInput}

Instruction: Provide a professional response as the Drivo Team. Keep it concise, helpful, and empathetic. If it's a technical issue, mention investigation. If it's a refund request, confirm receipt of details.`,
      config: {
        temperature: 0.7,
        topP: 0.8,
        maxOutputTokens: 250,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a suggestion right now.";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "The Drivo AI is currently offline. Please draft your reply manually.";
  }
};
