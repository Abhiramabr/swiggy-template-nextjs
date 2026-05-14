import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  try {
    const history = [
      { role: 'user', parts: [{ text: 'Hello' }] }
    ];
    console.log('Sending message...');
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: 'How are you?' }] }
      ]
    });
    console.log('Response:', response.text);
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

run();
