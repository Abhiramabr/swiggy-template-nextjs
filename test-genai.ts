import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      history: [{ role: 'user', parts: [{ text: 'hello' }] }],
    });
    const response = await chat.sendMessage({ message: 'world' });
    console.log('Success:', response.text);
  } catch (e: any) {
    console.log('Error:', e.message);
  }
}
run();
