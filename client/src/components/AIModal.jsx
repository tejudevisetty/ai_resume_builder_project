import { GoogleGenerativeAI } from '@google/generative-ai';


const api_key = process.env.REACT_APP_GEMINI_API_KEY

const genAI = new GoogleGenerativeAI(api_key);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig,
  });

  export const AIChatSession = model.startChat({
    history: [
      
    ],
  });

  

